import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // あなたのサイトのベースURL（最後スラッシュなし）
  const baseUrl = 'https://konsuki.github.io/my-gh-pages-test'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // ページが増えたらここに追加していきます
  ]
}