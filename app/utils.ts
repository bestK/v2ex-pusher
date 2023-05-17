interface FetchOptions {
    method: string;
    url: string;
    headers?: HeadersInit;
    body?: string;
}

/**
 * Parses the query parameters from a URL string and returns them as an object.
 * @param url The URL string to parse.
 * @returns An object containing the query parameters.
 */
export function queryParams(url: string) {
    // Split the URL string at the "?" character to get the query parameters.
    const searchParams = url.split("?").slice(1).join("&");
    // Create a new URLSearchParams object from the query parameters string, and convert it to an object using Object.fromEntries().
    return Object.fromEntries(new URLSearchParams(searchParams).entries());
}


/**
 * 将 JSON 格式的 Fetch 请求选项转换为 Fetch 请求
 * @param fetchOptions JSON 格式的 Fetch 请求选项
 * @param pushText 推送的文本
 * @returns Fetch 请求的响应数据
 */
export async function jsonToFetch(fetchOptions: string, pushText: string) {
    // 将 JSON 格式的 Fetch 请求选项解析为对象

    fetchOptions = fetchOptions.replace("#replace_hodler#", pushText)
    const options: FetchOptions = JSON.parse(fetchOptions);
    // 发送 Fetch 请求并等待响应
    options.body = JSON.stringify(options.body)
    const response = await fetch(options.url, options);

    // 将响应数据解析为文本格式
    const data = await response.text();

    // 返回响应数据
    return data;
}
