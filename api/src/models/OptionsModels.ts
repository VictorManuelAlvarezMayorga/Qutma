import { Schema, model } from "mongoose";

interface IOptions {
    title: string,
    QuestionId:Schema.Types.ObjectId | string;
}

const OptionsSchema = new Schema<IOptions>({
    title:{
        type:String,
        required:true
    },
    QuestionId:{
        type: Schema.Types.ObjectId,
        ref: 'questions',
        required:true
    }
})

export const OptionsModels = model('options',OptionsSchema);