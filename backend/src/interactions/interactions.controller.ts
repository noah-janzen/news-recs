import { Body, Controller, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AddInteractionDto } from './dto/add-interaction.dto';
import { InteractionsService } from './interactions.service';

@Controller('interactions')
export class InteractionsController {
  constructor(private interactionsService: InteractionsService) {}

  @Post()
  async addInteraction(
    @GetCurrentUserId() userId: string,
    @Body() addInteractionDto: AddInteractionDto,
  ) {
    await this.interactionsService.addInteraction({
      userId: userId,
      newsArticleId: addInteractionDto.newsArticleId,
      clicked: addInteractionDto.clicked,
      rating: addInteractionDto.rating,
    });
  }
}
