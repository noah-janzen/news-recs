import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AddInteractionDto } from './dto/add-interaction.dto';
import { Interaction, InteractionDocument } from './interaction.model';
import { NewsArticleCountItem } from './news-article-count-item';

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
    rating,
    ratingControlType,
  }: {
    userId: string;
    newsArticleId: string;
    clicked?: boolean;
    rating?: number | string;
    ratingControlType?: string;
  }) {
    if (clicked == undefined && rating == undefined)
      throw new BadRequestException('CLICKED_AND_RATING_MUST_NOT_BE_UNDEFINED');

    if (
      (rating != null && ratingControlType == null) ||
      (rating == null && ratingControlType != null)
    ) {
      throw new BadRequestException(
        'RATING_AND_RATINGCONTROLTYPE_MUST_BE_BOTH_SET_OR_UNDEFINED',
      );
    }

    const newInteraction = await new this.interactionModel({
      user: userId,
      newsArticleId: newsArticleId,
      clicked: clicked,
      ratingControlType: ratingControlType,
      rating: rating,
      timestamp: new Date(),
    });
    return await newInteraction.save();
  }

  async getInteractions({ userId }: { userId: string }) {
    return this.interactionModel.find({ user: userId });
  }

  async getMostPopularNewsArticleIds(): Promise<NewsArticleCountItem[]> {
    return await this.interactionModel.aggregate<NewsArticleCountItem>([
      {
        $match: { clicked: true },
      },
      {
        $group: {
          _id: '$newsArticleId',
          clicks: { $sum: { $cond: [{ $eq: ['$clicked', true] }, 1, 0] } },
        },
      },
      {
        $sort: { clicks: -1 },
      },
    ]);
  }
}
