import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from 'src/users/user.model';

export type InteractionDocument = Interaction & Document;

@Schema({ versionKey: false })
export class Interaction {
  id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    required: true,
  })
  newsArticleId: string;

  @Prop({
    required: true,
  })
  timestamp: Date;

  @Prop({
    required: false,
  })
  clicked: boolean;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.Mixed,
  })
  rating: number | string;

  @Prop({
    required: false,
  })
  ratingControlType: string;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
