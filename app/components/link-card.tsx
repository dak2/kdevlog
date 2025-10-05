'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaStar } from 'react-icons/fa';

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  url: string;
  stars?: number;
  language?: string;
}

interface LinkCardProps {
  url: string;
}

export default function LinkCard({ url }: LinkCardProps) {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/link-metadata?url=${encodeURIComponent(url)}`);
        if (response.ok) {
          setMetadata(await response.json());
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
  }, [url]);

  if (loading) return <div className="h-24 my-4 animate-pulse bg-gray-200 rounded-lg"></div>;
  if (error || !metadata) return <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{url}</a>;

  const urlObj = new URL(url);
  const hostname = urlObj.hostname;

  const isGitHub = hostname === 'github.com';
  const isSpeakerDeck = hostname === 'speakerdeck.com';

  // ========== GitHub専用デザイン ==========
  if (isGitHub) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 my-4 rounded-lg bg-[#22272E] text-white no-underline border border-gray-700 hover:border-gray-500 transition-colors"
      >
        <div className="flex items-center text-xl font-semibold">
          <FaGithub className="mr-2" />
          {metadata.title}
        </div>
        <p className="mt-2 text-sm text-gray-400 truncate">{metadata.description}</p>
        <div className="mt-3 flex items-center text-xs text-gray-400">
          {metadata.stars !== undefined && <div className="flex items-center mr-4"><FaStar className="mr-1" />{metadata.stars}</div>}
          {metadata.language && <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-400 mr-1.5"></span>{metadata.language}</div>}
        </div>
      </a>
    );
  }

  // ========== Speaker Deck専用デザイン (画像のみ) ==========
  if (isSpeakerDeck) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-gray-700 rounded-lg my-4 hover:opacity-75 transition-all duration-200 no-underline overflow-hidden"
      >
        {/* 👇 下のテキストdivを削除し、画像のみを表示します */}
        {metadata.image && (
          <img 
            src={metadata.image} 
            alt={metadata.title || 'Speaker Deck Image'} 
            className="w-full object-cover aspect-video block" 
          />
        )}
      </a>
    );
  }

  // ========== その他すべてのサイトの汎用デザイン ==========
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      // 全体を flex-col から flex に戻し、横並びにする
      className="flex my-4 rounded-lg bg-[#22272E] text-white no-underline border border-gray-700 hover:border-gray-500 transition-colors"
    >
      {/* テキストエリア */}
      <div className="flex-1 p-3 min-w-0 pr-4"> {/* 右側に少し余白を追加 */}
        <div className="font-semibold truncate">{metadata.title}</div>
        <div className="text-sm text-gray-400 mt-1 truncate">{metadata.description}</div>
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <img
            src={`https://www.google.com/s2/favicons?sz=32&domain_url=${hostname}`}
            alt=""
            className="w-4 h-4 mr-1.5"
          />
          {hostname}
        </div>
      </div>

      {/* 画像エリア */}
      {metadata.image && (
        // 👇 ここを修正: 幅を固定から「画面に合わせて可変」にするか、「特定のアスペクト比を持つ固定幅」にする
        // スクリーンショットに合わせて、右端に寄せるための flex-shrink-0 は維持
        <div className="flex-shrink-0 w-1/3 md:w-40 aspect-square rounded-md overflow-hidden"> 
          <img src={metadata.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </a>
  );
}
