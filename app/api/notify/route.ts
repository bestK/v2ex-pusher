import { NextResponse } from "next/server";
import { queryParams, jsonToFetch, getServerSideConfig } from "../../utils"
import { getV2exNIds, updateV2exNIds } from "@/app/kv";
import { Buffer } from 'buffer';


const cheerio = require('cheerio');



async function handle(req: Request) {
    let { jsonToFetchBase64, v2exToken } = queryParams(req.url)

    v2exToken = v2exToken ?? getServerSideConfig().v2exToken

    jsonToFetchBase64 = jsonToFetchBase64 ?? getServerSideConfig().jsonToFetchBase64

    if (!v2exToken) {
        return NextResponse.json({ code: 400, message: "url params {v2exToken} must not be null or empty.", data: null }, { status: 400 });
    }


    if (!jsonToFetchBase64) {
        return NextResponse.json({ code: 400, message: "url params {jsonToFetchBase64} must not be null or empty.", data: null }, { status: 400 });
    }

    let notify: NotificationResponse
    try {
        const v2exApi = await fetch('https://www.v2ex.com/api/v2/notifications?p=1', {
            'method': "GET",
            headers: { "Authorization": `Bearer ${v2exToken}` },
        });

        notify = await v2exApi.json() as NotificationResponse
        if (!notify || !notify.success) {
            return NextResponse.json({ code: 400, message: `V2EX:${notify?.message}` });
        }
    } catch (error: any) {
        return NextResponse.json({ code: 400, message: `V2EX:${error.message}`, data: null }, { status: 400 });
    }


    const notifyId = notify.result[0].id
    const notifyText = notify.result[0].text

    let pushed_ids: number[] = await getV2exNIds()
    if (pushed_ids.includes(notifyId)) {
        return NextResponse.json({ code: 0, message: "don't have new message." });
    }
    pushed_ids.push(notifyId)
    await updateV2exNIds(pushed_ids)


    const $ = cheerio.load(notifyText);

    const text = $('a, :not(a)').slice(0, 2).text().trim();
    const topicLink = $('a').eq(1).attr('href');

    const pushText = `${text} https://v2ex.com${topicLink}`

    const fetchOptions = Buffer.from(jsonToFetchBase64, 'base64').toString();

    const pushResponse = await jsonToFetch(fetchOptions, pushText)


    return NextResponse.json({ code: 0, message: pushResponse });
}



export const GET = handle;
export const POST = handle;

export const runtime = "edge";