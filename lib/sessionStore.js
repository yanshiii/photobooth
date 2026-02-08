// lib/sessionStore.js

/**
 * TEMPORARY in-memory session store.
 * Safe singleton for Next.js App Router.
 * Replace with Redis / DB before production scaling.
 */

const globalForSessions = globalThis;

if (!globalForSessions.__PHOTOBOOTH_SESSIONS__) {
  globalForSessions.__PHOTOBOOTH_SESSIONS__ = new Map();
}

const sessions = globalForSessions.__PHOTOBOOTH_SESSIONS__;

/**
 * Initialize a session
 */
export function createSession({ sessionId, layout }) {
  sessions.set(sessionId, {
    id: sessionId,
    layoutId: layout.id,
    slots: layout.slots,
    images: Array(layout.slots).fill(null),
    createdAt: Date.now(),
  });
}

/**
 * Get a session by ID
 */
export function getSession(sessionId) {
  return sessions.get(sessionId);
}

/**
 * Save image key at a given index (supports retake)
 */
export function saveCapturedImage(sessionId, index, s3Key) {
  const session = sessions.get(sessionId);
  if (!session) return;

  session.images[index] = s3Key;
}

/**
 * Check if session is complete
 */
export function isSessionComplete(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return false;

  return session.images.every(Boolean);
}
