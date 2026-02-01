// app/api/layouts/route.js

import { layouts } from "@/lib/layouts";

/**
 * GET /api/layouts
 *
 * Returns all available photo booth layouts.
 * Backend is the single source of truth for layouts.
 */
export async function GET() {
  return Response.json(
    layouts.map((layout) => ({
      id: layout.id,
      slots: layout.slots,
    }))
  );
}
