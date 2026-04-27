import { useEffect, useMemo, useState } from 'react';
import { Check, Heart, Lock, Pencil, Trash2 } from 'lucide-react';

type GuestBookSide = 'groom' | 'bride';

interface GuestBookEntry {
  id: string;
  side: GuestBookSide;
  name: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

interface GuestBookForm {
  side: GuestBookSide;
  name: string;
  message: string;
}

const EDIT_TOKEN_STORAGE_KEY = 'weddingGuestbookEditTokens';
const emptyForm: GuestBookForm = {
  side: 'groom',
  name: '',
  message: '',
};

function getSideLabel(side: GuestBookSide) {
  return side === 'groom' ? '신랑측' : '신부측';
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function loadEditTokens() {
  try {
    return JSON.parse(localStorage.getItem(EDIT_TOKEN_STORAGE_KEY) || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

function saveEditToken(entryId: string, editToken: string) {
  const tokens = loadEditTokens();
  tokens[entryId] = editToken;
  localStorage.setItem(EDIT_TOKEN_STORAGE_KEY, JSON.stringify(tokens));
}

function removeEditToken(entryId: string) {
  const tokens = loadEditTokens();
  delete tokens[entryId];
  localStorage.setItem(EDIT_TOKEN_STORAGE_KEY, JSON.stringify(tokens));
}

export function GuestBook() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [form, setForm] = useState<GuestBookForm>(emptyForm);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [lastSubmittedEntryId, setLastSubmittedEntryId] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const editTokens = useMemo(() => loadEditTokens(), [entries, lastSubmittedEntryId]);

  const fetchEntries = async (password = adminPassword) => {
    setIsLoading(true);
    setError('');

    try {
      const tokens = loadEditTokens();
      const response = await fetch('/api/guestbook', {
        headers: {
          ...(password ? { 'x-guestbook-admin-password': password } : {}),
          'x-guestbook-edit-tokens': JSON.stringify(tokens),
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '방명록을 불러오지 못했습니다.');
      }

      setEntries(data.entries || []);
      setIsAdmin(Boolean(data.isAdmin));
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : '방명록을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchEntries('');
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingEntryId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    const editToken = editingEntryId ? editTokens[editingEntryId] : undefined;
    const method = editingEntryId ? 'PATCH' : 'POST';
    const payload = editingEntryId
      ? { id: editingEntryId, editToken, ...form }
      : form;

    try {
      const response = await fetch('/api/guestbook', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '방명록 저장에 실패했습니다.');
      }

      if (data.editToken) {
        saveEditToken(data.entry.id, data.editToken);
        setLastSubmittedEntryId(data.entry.id);
      }

      resetForm();
      await fetchEntries();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : '방명록 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (entry: GuestBookEntry) => {
    if (!entry.message) return;

    setForm({
      side: entry.side,
      name: entry.name,
      message: entry.message,
    });
    setEditingEntryId(entry.id);
  };

  const deleteEntry = async (entry: GuestBookEntry) => {
    const editToken = editTokens[entry.id];

    if (!isAdmin && !editToken) {
      setError('삭제 권한이 없습니다.');
      return;
    }

    const confirmed = window.confirm('이 방명록을 삭제할까요?');
    if (!confirmed) return;

    try {
      const response = await fetch('/api/guestbook', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: entry.id,
          editToken,
          adminPassword: isAdmin ? adminPassword : undefined,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '방명록 삭제에 실패했습니다.');
      }

      removeEditToken(entry.id);
      await fetchEntries();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : '방명록 삭제에 실패했습니다.');
    }
  };

  const unlockAdmin = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchEntries(adminPassword);
  };

  const visibleMessage = lastSubmittedEntryId && !editingEntryId;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-6 p-6 bg-white rounded-lg border border-neutral-200">
        <div className="mb-4">
          <p className="block text-sm text-neutral-600 mb-2">어느 쪽 방명록인가요?</p>
          <div className="grid grid-cols-2 gap-2">
            {(['groom', 'bride'] as GuestBookSide[]).map((side) => (
              <button
                key={side}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, side }))}
                className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                  form.side === side
                    ? 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-neutral-200 bg-white text-neutral-600'
                }`}
              >
                {getSideLabel(side)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm text-neutral-600 mb-2">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder="이름을 입력해주세요"
            maxLength={40}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm text-neutral-600 mb-2">
            축하 메시지
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-none"
            rows={4}
            placeholder="축하 메시지를 남겨주세요"
            maxLength={500}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400 transition-colors"
        >
          {isSaving ? '저장 중...' : editingEntryId ? '방명록 수정하기' : '방명록 남기기'}
        </button>

        {editingEntryId && (
          <button
            type="button"
            onClick={resetForm}
            className="mt-2 w-full py-3 border border-neutral-200 text-neutral-600 rounded-md hover:bg-neutral-50 transition-colors"
          >
            수정 취소
          </button>
        )}

        {visibleMessage && (
          <div className="mt-4 rounded-lg bg-rose-50 p-4 text-center text-sm text-rose-700">
            <Check className="w-4 h-4 inline-block mr-1" />
            방명록이 남겨졌습니다. 감사합니다.
            <div className="mt-3 flex justify-center gap-2">
              <button type="button" className="text-rose-700 underline" onClick={resetForm}>
                다시 남기기
              </button>
              <button
                type="button"
                className="text-rose-700 underline"
                onClick={() => {
                  const entry = entries.find((item) => item.id === lastSubmittedEntryId);
                  if (entry) startEditing(entry);
                }}
              >
                수정하기
              </button>
              <button
                type="button"
                className="text-rose-700 underline"
                onClick={() => {
                  const entry = entries.find((item) => item.id === lastSubmittedEntryId);
                  if (entry) void deleteEntry(entry);
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}
      </form>

      <form onSubmit={unlockAdmin} className="mb-8 flex gap-2">
        <input
          type="password"
          value={adminPassword}
          onChange={(event) => setAdminPassword(event.target.value)}
          className="min-w-0 flex-1 px-4 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
          placeholder="관리자 비밀번호"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700 transition-colors"
        >
          {isAdmin ? '새로고침' : '관리자 보기'}
        </button>
      </form>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12 text-neutral-400">방명록을 불러오는 중입니다</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">첫 번째 축하 메시지를 남겨주세요</div>
        ) : (
          entries.map((entry) => {
            const canEdit = Boolean(editTokens[entry.id]);
            const canSeeMessage = isAdmin || canEdit;

            return (
              <div key={entry.id} className="p-6 bg-white rounded-lg border border-neutral-200">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                      <span className="font-medium">{entry.name}</span>
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-500">
                        {getSideLabel(entry.side)}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400">{formatDate(entry.createdAt)}</span>
                  </div>
                  {(canEdit || isAdmin) && (
                    <div className="flex gap-2">
                      {canEdit && entry.message && (
                        <button
                          type="button"
                          onClick={() => startEditing(entry)}
                          className="p-2 text-neutral-500 hover:text-neutral-800"
                          aria-label="방명록 수정"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => void deleteEntry(entry)}
                        className="p-2 text-neutral-500 hover:text-red-500"
                        aria-label="방명록 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {canSeeMessage && entry.message ? (
                  <p className="text-neutral-700 whitespace-pre-wrap">{entry.message}</p>
                ) : (
                  <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
                    <Lock className="w-4 h-4" />
                    남겨주신 메시지는 신랑신부만 확인할 수 있습니다.
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
