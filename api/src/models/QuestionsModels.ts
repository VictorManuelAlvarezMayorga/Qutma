import { Schema, model } from "mongoose";

interface IQuestion {
    title: string,
    type: 'radio' | 'checkbox' | 'select' | 'text',
    isMandatory: boolean,
    QstnrId: Schema.Types.ObjectId | string;
}

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