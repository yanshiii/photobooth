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

  // 1️⃣ Validate input
  validateCaptureSlot({ index, blob: file });

  // 2️⃣ Load session
  const session = getSession(sessionId);
  if (!session) {
    return new Response("Invalid session", { status: 404 });
  }

  // 3️⃣ Enforce slot bounds
  if (index < 0 || index >= session.slots) {
    return new Response("Invalid capture index", { status: 400 });
  }

  // 4️⃣ Upload to S3 (retake overwrites same index)
  const buffer = Buffer.from(await file.arrayBuffer());
  const s3Key = `sessions/${sessionId}/${index}.png`;

  await uploadToS3(s3Key, buffer, file.type);

  // 5️⃣ Save reference in session store
  saveCapturedImage(sessionId, index, s3Key);

  // 6️⃣ Respond
  return Response.json({
    index,
    s3Key,
    done: isSessionComplete(sessionId),
  });
}
