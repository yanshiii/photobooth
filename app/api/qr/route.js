// app/api/qr/route.js
import { getSignedDownloadUrl } from "@/lib/s3";
import { generateQR } from "@/lib/qr";

export async function POST(req) {
  const { key } = await req.json();

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  // 🔐 still generate signed URL for preview / direct download
  const signedUrl = await getSignedDownloadUrl(key);

  // ✅ THIS is the QR target
  const publicDownloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?key=${key}`;

  const qr = await generateQR(publicDownloadUrl);

  return Response.json({
    downloadUrl: signedUrl, // for preview image
    qr,                     // QR forces download
  });
}
