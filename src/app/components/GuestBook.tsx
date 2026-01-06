import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

export function GuestBook() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedEntries = localStorage.getItem('guestbook');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestBookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('ko-KR'),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('guestbook', JSON.stringify(updatedEntries));

    setName('');
    setMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg border border-neutral-200">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm text-neutral-600 mb-2">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder="이름을 입력해주세요"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm text-neutral-600 mb-2">
            축하 메시지
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-none"
            rows={4}
            placeholder="축하 메시지를 남겨주세요"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
        >
          방명록 남기기
        </button>
        <p className="mt-3 text-xs text-neutral-400 text-center">
          방명록은 현재 사용 중인 기기에만 저장됩니다.
        </p>
      </form>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            첫 번째 축하 메시지를 남겨주세요
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 bg-white rounded-lg border border-neutral-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                  <span className="font-medium">{entry.name}</span>
                </div>
                <span className="text-sm text-neutral-400">{entry.date}</span>
              </div>
              <p className="text-neutral-700 whitespace-pre-wrap">{entry.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
