interface Notification {
    id: number;
    member_id: number;
    for_member_id: number;
    text: string;
    payload: any;
    payload_rendered: string;
    created: number;
    member: {
        username: string;
    };
}

interface NotificationResponse {
    success: boolean;
    message: string;
    result: Notification[];
}
