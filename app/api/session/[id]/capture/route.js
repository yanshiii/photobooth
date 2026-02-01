// app/api/session/[id]/capture/route.js

import { uploadToS3 } from "@/lib/s3";
import { validateCaptureSlot } from "@/lib/validation";
import {
  getSession,
  saveCapturedImage,
  isSessionComplete,
} from "@/lib/sessionStore";

export async function POST(req, { params }) {
  const sessionId = params.id;
  const formData = await req.formData();

  const index = Number(formData.get("index"));
  const file = formData.get("image");

  validateCaptureSlot({ index, blob: file });

  // 1️⃣ Load session
  const session = getSession(sessionId);
  if (!session) {
    return new Response("Invalid session", { status: 404 });
  }

  // 2️⃣ Enforce slot bounds
  if (index < 0 || index >= session.slots) {
    return new Response("Invalid capture index", { status: 400 });
  }

  // 3️⃣ Upload (retake overwrites same index)
  const buffer = Buffer.from(await file.arrayBuffer());
  const s3Key = await uploadToS3(
    `sessions/${sessionId}/${index}.png`,
    buffer,
    file.type
  );

  saveCapturedImage(sessionId, index, s3Key);

  return Response.json({
    index,
    s3Key,
    done: isSessionComplete(sessionId),
  });
}
