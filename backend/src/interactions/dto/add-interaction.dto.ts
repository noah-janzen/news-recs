import { IsHexadecimal, IsOptional, Length } from 'class-validator';

export class AddInteractionDto {
  @Length(24)
  @IsHexadecimal()
  newsArticleId: string;

  @IsOptional()
  clicked?: boolean;

  @IsOptional()
  ratingControlType: string;

  @IsOptional()
  rating?: number | string;
}
