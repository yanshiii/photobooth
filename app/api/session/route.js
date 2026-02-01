import { nanoid } from "nanoid";
import { validateCreateSession } from "@/lib/validation";
import { getLayoutById } from "@/lib/layouts";

export async function POST(req) {
  try {
    const body = await req.json();

    // 1️⃣ Validate input shape
    validateCreateSession(body);

    // 2️⃣ Validate layout on backend
    const layout = getLayoutById(body.layoutId);

    // 3️⃣ Create session
    const sessionId = nanoid(16);

    return new Response(
      JSON.stringify({
        sessionId,
        layoutId: layout.id,
        slots: layout.slots,
        expiresIn: Number(process.env.SESSION_EXPIRY_SECONDS),
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
}
