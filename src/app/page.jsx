'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { CommentDisplay } from '../components/CommentDisplay';
import { CommentSearch } from '../components/CommentSearch'; 
import { VideoUrlInput } from '../components/VideoUrlInput';
import { LimitModal } from '../components/LimitModal';

/**
 * API接続先の設定
 * NEXT_PUBLIC_API_URL が未定義の場合はローカル環境(http://localhost:8000)を使用します。
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const COMMENTS_API_ENDPOINT = `${API_BASE_URL}/api/comments`;

export default function Home() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  
  // 制限モーダル表示用のState
  const [showLimitModal, setShowLimitModal] = useState(false);

  const fetchComments = async (videoId) => {
    setSearchResult(null);
    setApiData(null);
    setLoading(true);
    setError(null);
    setShowLimitModal(false);

    try {
      // ローカルストレージからJWTトークンを取得
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setError("ログインが必要です。右上のボタンからログインしてください。");
        setLoading(false);
        return;
      }

      // 整理した変数を使用してURLを構築
      const url = `${COMMENTS_API_ENDPOINT}?video_id=${videoId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
      });

      // ステータスコードに応じたエラーハンドリング
      if (response.status === 402) {
        console.warn("利用制限に達しました");
        setShowLimitModal(true);
        setLoading(false);
        return;
      }
      
      if (response.status === 401) {
        setError("ログインセッションが切れました。再ログインしてください。");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.status === 'error') {
        setError(data.message || 'コメント取得中にエラーが発生しました。');
        setApiData(data);
      } else {
        setApiData(data);
      }
    } catch (e) {
      console.error('API呼び出しエラー:', e);
      setError('ネットワークエラーまたはAPI接続に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Header/>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
        YouTubeコメント分析ツール (Gemini連携)
      </h1>

      {/* 動画URL入力コンポーネント */}
      <VideoUrlInput 
        onFetch={fetchComments} 
        loading={loading} 
      />

      {/* 制限モーダル */}
      <LimitModal 
        isOpen={showLimitModal} 
        onClose={() => setShowLimitModal(false)} 
      />

      {/* エラー表示 */}
      {error && (
         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
         </div>
      )}
      
      {/* 検索コンポーネント */}
      {apiData && apiData.status === 'success' && apiData.comments && (
        <CommentSearch
          comments={apiData.comments}
          onSearchResult={setSearchResult}
        />
      )}

      {/* コメント表示コンポーネント */}
      <CommentDisplay 
        apiData={apiData} 
        searchResultJson={searchResult}
      />
    </div>
  );
}