# v2ex-pusher
v2ex-pusher 是一个可以自动获取最新消息并发送通知的工具。使用 Github Action 每5分钟执行一次获取最新消息
它可以帮助你及时了解 V2EX 社区的最新动态，无需手动刷新页面。


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2FbestK%2Fv2ex-pusher&hasTrialAvailable=1&showOptionalTeamCreation=false&project-name=v2ex-pusher&env=V2EX_TOKEN&env=JSON_TO_FETCH_BASE64&env=KV_URL&env=KV_REST_API_URL&env=KV_REST_API_TOKEN&env=KV_REST_API_READ_ONLY_TOKEN&framework=nextjs&totalProjects=1&remainingProjects=1)




### 环境变量
``` properties
V2EX_TOKEN=...<your_v2ex_token>
JSON_TO_FETCH_BASE64=...<your_push_request_base64> // 参考 telegram
KV_URL="redis://...."<your_vercel_kv_url>
KV_REST_API_URL="https://...vercel-storage.com" <your_vercel_kv_rest_api_url>
KV_REST_API_TOKEN="AYg...." <your_vercel_kv_rest_api_token>
KV_REST_API_READ_ONLY_TOKEN="..." <your_vercel_kv_rest_api_token>
```


### JSON_TO_FETCH_BASE64
``` json
// Telegram
{
    "method": "POST",
    "url": "https://api.telegram.org/bot<your_token>/sendMessage",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": {
        "chat_id": <your_chat_id>,
        "text": "#replace_hodler#"
    }
}
```
Github secrets define
```
secrets.VRECEL_APP_LINK
```

### APIs
| Request | Description |
| --- | --- |
| `http://<your_vercel_link>/api/notify?v2exToken=<your_v2ex_token>&jsonToFetchBase64=<your_fetch_json_base64>` | Manually trigger a request with the specified V2EX token and base64 encoded JSON to fetch. |
| `http://<your_vercel_link>/api/id-history` | View the processed message IDs. |
| `http://<your_vercel_link>/api/id-history?clear=true` | Reset the list of processed message IDs. |
