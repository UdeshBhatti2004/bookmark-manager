'use client';

import { IBookmark } from '@/models/Bookmark';
import { Trash2, Edit2, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BookmarkCardProps {
  bookmark: IBookmark;
  onDelete: (id: string) => void;
  onEdit: (bookmark: IBookmark) => void;
}

const tagColors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-yellow-100 text-yellow-700',
  'bg-indigo-100 text-indigo-700',
  'bg-red-100 text-red-700',
  'bg-teal-100 text-teal-700',
];

function getTagColor(tag: string): string {
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tagColors[hash % tagColors.length];
}

export default function BookmarkCard({ bookmark, onDelete, onEdit }: BookmarkCardProps) {
  const [imageError, setImageError] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  const handleVisit = () => {
    window.open(bookmark.url, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
    >
      
      {bookmark.image && !imageError && (
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={bookmark.image}
            alt={bookmark.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      
      <div className="p-5">
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {bookmark.favicon && !faviconError ? (
              <img
                src={bookmark.favicon}
                alt=""
                className="w-5 h-5 flex-shrink-0 rounded"
                onError={() => setFaviconError(true)}
              />
            ) : (
              <div className="w-5 h-5 flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded" />
            )}
            <h3 className="font-semibold text-gray-900 truncate text-lg">
              {bookmark.title}
            </h3>
          </div>

          
          <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(bookmark)}
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit bookmark"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => bookmark._id && onDelete(bookmark._id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete bookmark"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>

        
        {bookmark.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {bookmark.description}
          </p>
        )}

        
        <button
          onClick={handleVisit}
          className="text-xs text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-1 group/link"
        >
          <span className="truncate max-w-[250px]">{bookmark.url}</span>
          <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </button>

        
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {bookmark.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        
        <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-3 border-t border-gray-100">
          <Calendar className="w-3.5 h-3.5" />
          <span>Added {formatDate(bookmark.createdAt)}</span>
        </div>
      </div>
    </motion.div>
  );
}
