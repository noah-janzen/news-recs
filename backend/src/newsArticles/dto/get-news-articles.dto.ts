import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

class GetNewsArticlesDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit?: number;
}

export { GetNewsArticlesDto };
