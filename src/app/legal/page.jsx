import React from 'react';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold leading-6 text-gray-900">
            特定商取引法に基づく表記
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            法律に基づく運営者情報の開示
          </p>
        </div>
        
        <div className="border-t border-gray-200">
          <dl>
            {/* 販売事業者名 */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">販売事業者名</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* ↓↓↓ あなたの名前に書き換えてください ↓↓↓ */}
                勝又 悠希
              </dd>
            </div>

            {/* 代表者 */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">代表者または運営統括責任者</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* ↓↓↓ あなたの名前に書き換えてください ↓↓↓ */}
                勝又 悠希
              </dd>
            </div>

            {/* 所在地 */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">所在地</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* 住所を省略する場合の定型文 */}
                消費者からの請求がある場合、遅滞なく開示いたします。
              </dd>
            </div>

            {/* 電話番号 */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">電話番号</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                 {/* 電話番号を省略する場合の定型文 */}
                消費者からの請求がある場合、遅滞なく開示いたします。
              </dd>
            </div>

            {/* メールアドレス */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">メールアドレス</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {/* ↓↓↓ お問い合わせ用アドレスに書き換えてください ↓↓↓ */}
                0yama3111yk2@gmail.com
              </dd>
            </div>

            {/* 販売価格 */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">販売価格</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                3,980円（税込）
              </dd>
            </div>

            {/* 商品代金以外の必要料金 */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">商品代金以外の必要料金</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                サイトの閲覧、お問い合わせ等の電子メールの送受信時などに、所定の通信料が発生いたします。
              </dd>
            </div>

            {/* お支払方法 */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">お支払方法</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                クレジットカード決済（Stripe）
              </dd>
            </div>

            {/* 代金の支払時期 */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">代金の支払時期</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                商品購入時（即時決済）となります。
              </dd>
            </div>

            {/* 商品の引渡時期 */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">商品の引渡時期</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                決済完了後、直ちにご利用いただけます。
              </dd>
            </div>

            {/* 返品・キャンセルについて */}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">返品・キャンセルについて</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                商品の性質上、決済完了後の返品・キャンセル・交換はお受けできません。予め動作環境等をご確認の上、お買い求めください。<br />
                ※ツールに欠陥がある場合は、修正版の提供等で対応いたします。
              </dd>
            </div>

            {/* 動作環境 */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">動作環境</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Google Chrome 最新版
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}