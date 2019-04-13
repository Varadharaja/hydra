import { Goal } from './goal';

export class ChatMessage
{
    UserName: string;

    Message: string;

    Goals: Goal[];

    constructor(name: string, msg: string, goals: Goal[] = new Array()) {

        this.UserName = name;
        this.Message = msg;
        this.Goals = goals;
    }

}
