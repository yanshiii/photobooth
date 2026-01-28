import { getSignedDownloadUrl } from "@/lib/s3";
import { generateQR } from "@/lib/qr";

export async function POST(req) {
  const { key } = await req.json();

  const signedUrl = await getSignedDownloadUrl(key);
  const qr = await generateQR(signedUrl);

  return Response.json({
    downloadUrl: signedUrl,
    qr,
  });
}
