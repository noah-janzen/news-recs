import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AddInteractionDto } from './dto/add-interaction.dto';
import { Interaction, InteractionDocument } from './interaction.model';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectModel(Interaction.name)
    private interactionModel: Model<InteractionDocument>,
  ) {}

  async addInteraction({
    userId,
    newsArticleId,
    clicked,
  }: {
    userId: string;
    newsArticleId: string;
    clicked: boolean;
  }) {
    const interaction = await new this.interactionModel({
      user: userId,
      newsArticleId: newsArticleId,
      clicked: clicked,
    });
    await interaction.save();
    return interaction;
  }
}
