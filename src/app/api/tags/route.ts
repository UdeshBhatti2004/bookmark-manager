import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bookmark from '@/models/Bookmark';

export async function GET() {
  try {
    await connectDB();

    
    const tags = await Bookmark.distinct('tags');

    
    const tagCounts: { [key: string]: number } = {};
    
    for (const tag of tags) {
      
      if (!tag || tag.trim() === '') continue;
      
      const count = await Bookmark.countDocuments({ tags: tag });
      tagCounts[tag] = count;
    }

    
    const sortedTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([tag, count]) => ({ tag, count }));

    return NextResponse.json({
      success: true,
      data: sortedTags,
    });
  } catch (error: any) {
    console.error('GET Tags Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}