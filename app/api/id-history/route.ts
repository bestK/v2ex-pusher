import { NextResponse } from "next/server";

import { getV2exNIds, updateV2exNIds } from "@/app/kv";
import { queryParams } from "../../utils"
async function handle(req: Request) {

    const { clear } = queryParams(req.url);

    if (clear) {
        await updateV2exNIds([]);
        return NextResponse.json({ code: 0, message: 'ok', data: [] });
    }

    const v2exNids = await getV2exNIds()
    return NextResponse.json({ code: 0, message: 'ok', data: v2exNids });
}



export const GET = handle;
export const POST = handle;

export const runtime = "edge";