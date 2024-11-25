import { Schema, model } from "mongoose";
import { IQuestion } from "../globalTypes";

const QuestionSchema = new Schema<IQuestion>({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['radio', 'checkbox', 'select', 'text'],
        required:true
    },
    isMandatory:{
        type:Boolean,
        required:true
    },
    QstnrId:{
        type: Schema.Types.ObjectId,
        ref: 'questionnaires',
        required:true
    }
})

export const QuestionsModels = model('questions',QuestionSchema);