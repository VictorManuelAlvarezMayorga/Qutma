import { Schema, model } from "mongoose";

interface IAnswers {
    QstnrId:Schema.Types.ObjectId | string;
    QuestionId:Schema.Types.ObjectId | string;
    answer: string;
}
    
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