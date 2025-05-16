import { headers } from "next/headers";
import { userAgentFromString } from "next/server";

export async function GET() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const { device } = userAgentFromString(userAgent);
  const isMobile = device.type === "mobile";

  return new Response(JSON.stringify({ isMobile }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
