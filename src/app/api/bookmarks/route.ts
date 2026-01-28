import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bookmark from '@/models/Bookmark';
import { fetchMetadata, isValidUrl } from '@/lib/scraper';


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');

    let query: any = {};

    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { url: { $regex: search, $options: 'i' } },
      ];
    }

   
    if (tag) {
      query.tags = tag;
    }

    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: bookmarks,
    });
  } catch (error: any) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { url, tags = [] } = body;

    
    if (!url || !isValidUrl(url)) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL' },
        { status: 400 }
      );
    }

    
    const existingBookmark = await Bookmark.findOne({ url });
    if (existingBookmark) {
      return NextResponse.json(
        { success: false, error: 'Bookmark already exists' },
        { status: 400 }
      );
    }

    
    const metadata = await fetchMetadata(url);

    
    const cleanedTags = tags
      .map((tag: string) => tag.toLowerCase().trim())
      .filter((tag: string) => tag.length > 0); // Remove empty tags

    
    const bookmark = await Bookmark.create({
      url,
      title: metadata.title,
      description: metadata.description,
      favicon: metadata.favicon,
      image: metadata.image,
      tags: cleanedTags,
    });

    return NextResponse.json({
      success: true,
      data: bookmark,
    }, { status: 201 });
  } catch (error: any) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Bookmark ID is required' },
        { status: 400 }
      );
    }

    const bookmark = await Bookmark.findByIdAndDelete(id);

    if (!bookmark) {
      return NextResponse.json(
        { success: false, error: 'Bookmark not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Bookmark deleted successfully',
    });
  } catch (error: any) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Bookmark ID is required' },
        { status: 400 }
      );
    }

    const { title, description, tags } = body;

    const updateData: any = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (tags) {
      
      updateData.tags = tags
        .map((tag: string) => tag.toLowerCase().trim())
        .filter((tag: string) => tag.length > 0); 
    }

    const bookmark = await Bookmark.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!bookmark) {
      return NextResponse.json(
        { success: false, error: 'Bookmark not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: bookmark,
    });
  } catch (error: any) {
    console.error('PATCH Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}