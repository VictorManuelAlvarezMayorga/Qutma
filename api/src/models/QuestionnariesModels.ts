import { Schema, model } from "mongoose";

interface IQuestionnaries {
    title: string,
    description: string;
    UserId:Schema.Types.ObjectId | string;
}

const QuestionnairesSchema = new Schema<IQuestionnaries>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    }
})

export const QuestionnairesModels = model('questionnares',QuestionnairesSchema);