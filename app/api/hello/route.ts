import { NextResponse } from "next/server";

async function handle(req: Request) {
    const searchParams = req.url.split("?").slice(1).join("&");
    let params = new URLSearchParams(searchParams);
    const id = Number(params.get("id"));
    const message = params.get("message") ?? 'Hello World!';
    return NextResponse.json({ code: 0, message: message, data: id });
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";