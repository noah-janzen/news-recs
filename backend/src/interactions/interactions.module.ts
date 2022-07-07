import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interaction, InteractionSchema } from './interaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interaction.name, schema: InteractionSchema },
    ]),
  ],
  providers: [InteractionsService],
  controllers: [InteractionsController],
})
export class InteractionsModule {}
