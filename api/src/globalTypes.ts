import { Schema } from "mongoose";

export interface IAnswers {
    QstnrId:Schema.Types.ObjectId | string;
    QuestionId:Schema.Types.ObjectId | string;
    answer: string;
}

export interface IOptions {
    title: string,
    QuestionId:Schema.Types.ObjectId | string;
}

export interface IQuestionnaries {
    title: string,
    description: string;
    UserId:Schema.Types.ObjectId | string;
}

export interface IQuestion {
    title: string,
    type: 'radio' | 'checkbox' | 'select' | 'text',
    isMandatory: boolean,
    QstnrId: Schema.Types.ObjectId | string;
}

export interface IUsers {
    name: string;
    email: string;
    lastNames: string;
    password: string;
    rol: 'administrator' | 'client';
}