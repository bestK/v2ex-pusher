# v2ex-pusher
v2ex-pusher 是一个可以自动获取最新消息并发送通知的工具。它可以帮助你及时了解 V2EX 社区的最新动态，无需手动刷新页面。


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FbestK%2Fv2ex-pusher&project-name=v2ex-pusher&repository-name=v2ex-pusher)


``` json

{
    "method": "POST",
    "url": "http://example.com/api/sendRawMessage?robotId=xxxxx",
    "headers": {
        "Content-Type": "application/json"
    },
    "body": <your_request_body> // #replace_hoder# 会被替换成实际消息，所以请定义在具体的字段值内
}

```

```
http://localhost:3000/api/notify?v2exToken=<your_v2ex_token>&jsonToFetchBase64=<your_fetach_json_base64>

```
