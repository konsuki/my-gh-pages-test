// Client Component
'use client';

import React, { useState } from 'react';
// Server Actionをインポート (パスは src/app/actions.js を想定)
import { searchCommentsWithGemini } from '../app/actions';

/** 
 * コメント検索コンポーネント。ユーザー入力を受け付け、Server Action経由でGemini APIを呼び出します。 
 * @param {Array} comments - YouTube APIから取得したコメントの配列 
 * @param {function} onSearchResult - 検索結果のJSON文字列を受け取るコールバック関数 
 */
export const CommentSearch = ({ comments, onSearchResult }) => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!keyword.trim() || !comments || comments.length === 0) {
      alert('キーワードを入力するか、先にYouTubeコメントを取得してください。');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // クライアント側でのAPIキー管理やプロンプト作成は廃止し、
      // サーバーアクションにキーワードとデータを渡して処理を依頼します。
      // これによりAPIキーがブラウザに露出するのを防ぎます。
      const result = await searchCommentsWithGemini(keyword, comments);

      if (result.success) {
        // 成功した場合、抽出されたJSON文字列を親コンポーネントに渡す
        onSearchResult(result.data);
      } else {
        // サーバー側でエラーが発生した場合
        throw new Error(result.error || "Gemini APIからの応答が不正です。");
      }

    } catch (e) {
      console.error('Gemini API呼び出しエラー:', e);
      setError(`検索中にエラーが発生しました: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
        AIキーワード検索
      </h2>
      <div className="flex space-x-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="コメント内を検索するキーワードを入力..."
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-50"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !comments || comments.length === 0}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isLoading || !comments || comments.length === 0
              ? 'bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          }`}
        >
          {isLoading ? '検索中...' : '検索'}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};