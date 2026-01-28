import { uploadToS3 } from "@/lib/s3";
import { validateImage } from "@/lib/validation";
import { nanoid } from "nanoid";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  try {
    validateImage(file);

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `photos/${nanoid()}.png`;

    await uploadToS3(key, buffer, file.type);

    return Response.json({ key });
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
}
