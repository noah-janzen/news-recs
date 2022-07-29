import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from 'src/users/user.model';

export type SurveyAnswerDocument = SurveyAnswer & Document;

export enum AnswerControlType {
  RADIO = 'RADIO',
  RANGE = 'RANGE',
  TEXT = 'TEXT',
}

@Schema({ versionKey: false })
export class SurveyAnswer {
  id: string;

  @Prop({
    required: true,
  })
  createdTimestamp: Date;

  @Prop({
    required: false,
  })
  lastUpdatedTimestamp: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    required: true,
  })
  surveyId: number;

  @Prop({
    required: true,
  })
  questionId: number;

  @Prop({
    required: true,
    enum: AnswerControlType,
  })
  answerControlType: AnswerControlType;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Mixed,
  })
  answer: number | string;
}

export const SurveyAnswerSchema = SchemaFactory.createForClass(SurveyAnswer);
