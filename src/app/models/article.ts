export interface Article {
  source: {
    id?: any,
    name: string,
  },
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage?: string,
  publishedAt: Date,
  content: string,
  _id?: string,
}
