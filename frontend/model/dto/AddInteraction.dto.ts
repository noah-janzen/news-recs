export interface AddInteractionDto {
  newsArticleId: string
  clicked?: boolean
  rating?: number | string
  ratingControlType?: string
}
