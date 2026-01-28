import mongoose, { Schema, Model } from 'mongoose';

export interface IBookmark {
  _id?: string;
  url: string;
  title: string;
  description?: string;
  favicon?: string;
  image?: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    favicon: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(tags: string[]) {
          return tags.length <= 10;
        },
        message: 'Cannot have more than 10 tags',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
BookmarkSchema.index({ title: 'text', description: 'text', tags: 'text' });
BookmarkSchema.index({ tags: 1 });
BookmarkSchema.index({ createdAt: -1 });

const Bookmark: Model<IBookmark> = 
  mongoose.models.Bookmark || mongoose.model<IBookmark>('Bookmark', BookmarkSchema);

export default Bookmark;
