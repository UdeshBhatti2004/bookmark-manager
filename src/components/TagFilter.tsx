'use client';

import { Tag as TagIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface TagFilterProps {
  tags: { tag: string; count: number }[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const tagColors = [
  'bg-blue-100 text-blue-700 hover:bg-blue-200',
  'bg-green-100 text-green-700 hover:bg-green-200',
  'bg-purple-100 text-purple-700 hover:bg-purple-200',
  'bg-pink-100 text-pink-700 hover:bg-pink-200',
  'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  'bg-red-100 text-red-700 hover:bg-red-200',
  'bg-teal-100 text-teal-700 hover:bg-teal-200',
];

function getTagColor(tag: string): string {
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tagColors[hash % tagColors.length];
}

export default function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <TagIcon className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900">Filter by Tags</h3>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            No tags yet. Add tags to your bookmarks to filter them!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagSelect(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTag === null
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </motion.button>

          
          {tags.map(({ tag, count }) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                tag === selectedTag
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : getTagColor(tag)
              }`}
            >
              {tag}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tag === selectedTag ? 'bg-white/20' : 'bg-black/10'
                }`}
              >
                {count}
              </span>
              {tag === selectedTag && <X className="w-3.5 h-3.5 ml-0.5" />}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}