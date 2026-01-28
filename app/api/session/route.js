import { nanoid } from "nanoid";

export async function POST() {
  const sessionId = nanoid(16);

  return new Response(
    JSON.stringify({
      sessionId,
      expiresIn: Number(process.env.SESSION_EXPIRY_SECONDS),
    }),
    { status: 200 }
  );
}

