import kv from '@vercel/kv';

export async function getV2exNIds(): Promise<Array<number>> {
    const v2exNIds = await kv.get('v2exNIds') as Array<number>;
    return v2exNIds || [];
}


export async function updateV2exNIds(v2exNIds: Array<Number>) {
    return kv.set('v2exNIds', v2exNIds);
}

