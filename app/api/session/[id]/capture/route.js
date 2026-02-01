// app/api/session/[id]/capture/route.js
import { uploadToS3 } from "@/lib/s3";
import { validateCaptureSlot } from "@/lib/validation";

export async function POST(req, { params }) {
  const formData = await req.formData();
  const index = Number(formData.get("index"));
  const file = formData.get("image");

  validateCaptureSlot({ index, blob: file });

  // TODO: load session by params.id
  // TODO: validate index < slots
  // TODO: overwrite if retake

  const s3Key = await uploadToS3(file);

  // TODO: update session.images[index] = s3Key

  return Response.json({ index, s3Key });
}
