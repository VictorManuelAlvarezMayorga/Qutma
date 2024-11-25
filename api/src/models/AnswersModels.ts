import { Schema, model } from "mongoose";
import { IAnswers } from "../globalTypes";
    
const AnswerSchema = new Schema<IAnswers>({
    QstnrId:{
        type: Schema.Types.ObjectId,
        ref: 'questionnaires',
        required:true
    },
    QuestionId:{
        type: Schema.Types.ObjectId,
        ref: 'questions',
        required:true
    },
    answer:{
        type:String,
        required:true
    }
})

export const AnswerModels = model('answers',AnswerSchema);