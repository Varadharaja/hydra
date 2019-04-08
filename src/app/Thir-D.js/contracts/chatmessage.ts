export class ChatMessage
{
    UserName: string;

    Message: string;

    constructor(name: string, msg: string) {

        this.UserName = name;
        this.Message = msg;
    }

}
