import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { Interaction, InteractionSchema } from './interaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interaction.name, schema: InteractionSchema },
    ]),
  ],
  providers: [InteractionsService],
  controllers: [InteractionsController],
  exports: [InteractionsService],
})
export class InteractionsModule {}
