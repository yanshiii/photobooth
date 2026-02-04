import { getSignedDownloadUrl } from "@/lib/s3";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return new Response("Missing key", { status: 400 });
  }

  const signedUrl = await getSignedDownloadUrl(key);

  // 🔁 Redirect, but force download
  return new Response(null, {
    status: 302,
    headers: {
      Location: signedUrl,
      "Content-Disposition": 'attachment; filename="photobooth-strip.png"',
    },
  });
}
