import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const cookies = request.headers.get("cookie");
  const cook = request.headers.delete("cookie");
  // console.log("cookies in post ===== ", cookies);
  const data = { cookie: cookies };
  return NextResponse.json(data);
}
