// 1. Linkをインポート
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDetail, getList } from '../../../lib/microcms';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

// 静的生成（SSG）のための関数
export async function generateStaticParams() {
  const { contents } = await getList();
  return contents.map((post) => ({
    id: post.id,
  }));
}

// 日付フォーマット関数
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// 詳細ページコンポーネント
export default async function BlogDetailPage({ params }) {
  const { id } = await params;

  let post;
  try {
    post = await getDetail(id);
  } catch (e) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow pt-24 pb-20">
        <article className="container mx-auto px-4 max-w-3xl">
          
          {/* --- 記事ヘッダーエリア --- */}
          <div className="mb-10 text-center">
            {/* 日付 */}
            <div className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* サムネイル画像 */}
            {post.thumbnail && (
              <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={post.thumbnail.url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* --- 記事本文エリア --- */}
          <div
            className="
              text-gray-800 leading-8
              [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-gray-200
              [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:mb-6 [&>p]:text-base md:[&>p]:text-lg
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
              [&>li]:mb-2
              [&>a]:text-blue-600 [&>a]:underline [&>a]:hover:text-blue-800
              [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:mb-6
              [&>img]:rounded-xl [&>img]:shadow-md [&>img]:my-8 [&>img]:mx-auto
            "
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </article>

        {/* 記事下のナビゲーション */}
        <div className="container mx-auto px-4 max-w-3xl mt-16 pt-10 border-t border-gray-100 text-center">
          {/* 2. <a>タグを <Link>タグに変更 */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            記事一覧に戻る
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}