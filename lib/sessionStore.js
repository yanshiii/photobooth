// lib/sessionStore.js

/**
 * TEMPORARY in-memory session store.
 * This will later be replaced by Redis / DB.
 */

const sessions = new Map();

/**
 * Initialize a session
 */
export function createSession({ sessionId, layout }) {
  sessions.set(sessionId, {
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
  session.images[index] = s3Key;
}

/**
 * Check if session is complete
 */
export function isSessionComplete(sessionId) {
  const session = sessions.get(sessionId);
  return session.images.every(Boolean);
}
