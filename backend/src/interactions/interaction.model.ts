import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from 'src/users/user.model';

export type InteractionDocument = Interaction & Document;

@Schema()
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
    default: new Date(),
  })
  timestamp: Date;

  @Prop({
    required: true,
    default: false,
  })
  clicked: boolean;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
