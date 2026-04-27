import crypto from 'node:crypto';

const TABLE_NAME = 'wedding_guestbook';
const MAX_NAME_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 500;
const VALID_SIDES = new Set(['groom', 'bride']);

function getConfig() {
  return {
    supabaseUrl: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    adminPassword: process.env.GUESTBOOK_ADMIN_PASSWORD,
  };
}

function send(res, status, data) {
  res.status(status).json(data);
}

function normalizeEntry(row, includeMessage = false) {
  return {
    id: row.id,
    side: row.side,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(includeMessage ? { message: row.message } : {}),
  };
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function isAdminRequest(req, body = {}) {
  const { adminPassword } = getConfig();
  const submittedPassword =
    req.headers['x-guestbook-admin-password'] || body.adminPassword || req.query?.adminPassword;

  return Boolean(adminPassword && submittedPassword === adminPassword);
}

function validateEntryInput({ side, name, message }, requireMessage = true) {
  const normalizedSide = String(side || '').trim();
  const normalizedName = String(name || '').trim();
  const normalizedMessage = String(message || '').trim();

  if (!VALID_SIDES.has(normalizedSide)) {
    return { error: '신랑측 또는 신부측을 선택해 주세요.' };
  }

  if (!normalizedName || normalizedName.length > MAX_NAME_LENGTH) {
    return { error: `이름은 1~${MAX_NAME_LENGTH}자 사이로 입력해 주세요.` };
  }

  if (requireMessage && (!normalizedMessage || normalizedMessage.length > MAX_MESSAGE_LENGTH)) {
    return { error: `방명록 내용은 1~${MAX_MESSAGE_LENGTH}자 사이로 입력해 주세요.` };
  }

  return {
    value: {
      side: normalizedSide,
      name: normalizedName,
      message: normalizedMessage,
    },
  };
}

async function supabaseFetch(path, options = {}) {
  const { supabaseUrl, serviceRoleKey } = getConfig();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase environment variables are not configured.');
  }

  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
    ...(options.headers || {}),
  };

  Object.keys(headers).forEach((key) => {
    if (headers[key] === undefined) {
      delete headers[key];
    }
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error || 'Supabase request failed.';
    throw new Error(message);
  }

  return data;
}

async function findEntry(id) {
  const rows = await supabaseFetch(
    `${TABLE_NAME}?id=eq.${encodeURIComponent(id)}&select=id,edit_token_hash`,
  );

  return rows?.[0] || null;
}

function canEditEntry(req, body, entry) {
  if (isAdminRequest(req, body)) return true;
  const editToken = String(body.editToken || '');
  return Boolean(editToken && entry?.edit_token_hash === hashToken(editToken));
}

function getViewerEditTokens(req) {
  try {
    const rawTokens = req.headers['x-guestbook-edit-tokens'];
    if (!rawTokens || Array.isArray(rawTokens)) return {};
    return JSON.parse(rawTokens);
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const isAdmin = isAdminRequest(req);
      const viewerEditTokens = getViewerEditTokens(req);
      const rows = await supabaseFetch(
        `${TABLE_NAME}?select=id,side,name,message,edit_token_hash,created_at,updated_at&order=created_at.desc&limit=300`,
        { method: 'GET', headers: { Prefer: undefined } },
      );

      send(res, 200, {
        entries: rows.map((row) => {
          const editToken = viewerEditTokens[row.id];
          const canViewMessage = isAdmin || (editToken && row.edit_token_hash === hashToken(editToken));
          return normalizeEntry(row, Boolean(canViewMessage));
        }),
        isAdmin,
      });
      return;
    }

    if (req.method === 'POST') {
      const validation = validateEntryInput(req.body || {});
      if (validation.error) {
        send(res, 400, { error: validation.error });
        return;
      }

      const editToken = crypto.randomUUID();
      const rows = await supabaseFetch(TABLE_NAME, {
        method: 'POST',
        body: JSON.stringify({
          ...validation.value,
          edit_token_hash: hashToken(editToken),
        }),
      });

      send(res, 201, {
        entry: normalizeEntry(rows[0], true),
        editToken,
      });
      return;
    }

    if (req.method === 'PATCH') {
      const { id } = req.body || {};
      if (!id) {
        send(res, 400, { error: '수정할 방명록을 찾을 수 없습니다.' });
        return;
      }

      const entry = await findEntry(id);
      if (!entry || !canEditEntry(req, req.body || {}, entry)) {
        send(res, 403, { error: '수정 권한이 없습니다.' });
        return;
      }

      const validation = validateEntryInput(req.body || {});
      if (validation.error) {
        send(res, 400, { error: validation.error });
        return;
      }

      const rows = await supabaseFetch(`${TABLE_NAME}?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...validation.value,
          updated_at: new Date().toISOString(),
        }),
      });

      send(res, 200, { entry: normalizeEntry(rows[0], true) });
      return;
    }

    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) {
        send(res, 400, { error: '삭제할 방명록을 찾을 수 없습니다.' });
        return;
      }

      const entry = await findEntry(id);
      if (!entry || !canEditEntry(req, req.body || {}, entry)) {
        send(res, 403, { error: '삭제 권한이 없습니다.' });
        return;
      }

      await supabaseFetch(`${TABLE_NAME}?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      send(res, 200, { ok: true });
      return;
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE');
    send(res, 405, { error: '허용되지 않은 요청입니다.' });
  } catch (error) {
    send(res, 500, {
      error: error instanceof Error ? error.message : '방명록 요청 처리 중 오류가 발생했습니다.',
    });
  }
}
