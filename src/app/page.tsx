'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Bookmark as BookmarkIcon, Grid3x3, List } from 'lucide-react';
import BookmarkCard from '@/components/BookmarkCard';
import AddBookmarkModal from '@/components/AddBookmarkModal';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import { IBookmark } from '@/models/Bookmark';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<IBookmark[]>([]);
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState<IBookmark | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch bookmarks
  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedTag) params.append('tag', selectedTag);

      const response = await fetch(`/api/bookmarks?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setBookmarks(data.data);
        setFilteredBookmarks(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedTag]);

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags');
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
    fetchTags();
  }, [fetchBookmarks]);

  const handleAddBookmark = async (url: string, tags: string[]) => {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, tags }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error);
    }

    await fetchBookmarks();
    await fetchTags();
  };

  const handleUpdateBookmark = async (
    id: string,
    title: string,
    description: string,
    tags: string[]
  ) => {
    const response = await fetch(`/api/bookmarks?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, tags }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error);
    }

    await fetchBookmarks();
    await fetchTags();
    setEditingBookmark(null);
  };

  const handleDeleteBookmark = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return;

    const response = await fetch(`/api/bookmarks?id=${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (data.success) {
      await fetchBookmarks();
      await fetchTags();
    }
  };

  const handleEditBookmark = (bookmark: IBookmark) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBookmark(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
     <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left side - Logo and Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex-shrink-0">
          <BookmarkIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
            Bookmark Manager
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      {/* Right side - Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium text-sm sm:text-base whitespace-nowrap flex-shrink-0"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden xs:inline">Add Bookmark</span>
        <span className="xs:hidden">Add Bookmark</span>
      </button>
    </div>
  </div>
</header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="space-y-5 mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <TagFilter
            tags={tags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
          />
        </div>

        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading bookmarks...</p>
            </div>
          </div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookmarkIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery || selectedTag ? 'No bookmarks found' : 'No bookmarks yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedTag
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first bookmark'}
            </p>
            {!searchQuery && !selectedTag && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Your First Bookmark
              </button>
            )}
          </div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            <AnimatePresence>
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark._id}
                  bookmark={bookmark}
                  onDelete={handleDeleteBookmark}
                  onEdit={handleEditBookmark}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      
      <AddBookmarkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddBookmark}
        onUpdate={handleUpdateBookmark}
        editingBookmark={editingBookmark}
      />
    </div>
  );
}
