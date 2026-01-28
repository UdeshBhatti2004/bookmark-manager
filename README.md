# 🔖 Bookmark Manager

A beautiful, modern bookmark manager built with Next.js 15, MongoDB, and Tailwind CSS. Save, organize, and search your favorite websites with automatic metadata fetching and tag-based filtering.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- 🚀 **Auto-fetch Metadata** - Automatically extracts title, description, favicon, and preview image from URLs
- 🏷️ **Smart Tagging** - Organize bookmarks with color-coded tags
- 🔍 **Real-time Search** - Search through titles, descriptions, and URLs instantly
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized with Next.js 15 and MongoDB indexing
- 🎯 **Tag Filtering** - Filter bookmarks by tags with one click
- ✏️ **Edit & Delete** - Manage your bookmarks easily
- 🖼️ **Grid/List Views** - Toggle between card grid and list layouts

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Web Scraping**: Cheerio
- **HTTP Client**: Axios

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn or pnpm
- MongoDB (local or Atlas cloud)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd bookmark-manager
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/bookmark-manager

# Or use MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookmark-manager?retryWrites=true&w=majority

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB locally from [mongodb.com/download](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # MongoDB runs as a service automatically
   ```

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free M0 tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Update `.env.local` with your Atlas connection string

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bookmark-manager/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bookmarks/
│   │   │   │   └── route.ts       # CRUD operations
│   │   │   └── tags/
│   │   │       └── route.ts       # Tag management
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   ├── components/
│   │   ├── AddBookmarkModal.tsx   # Add/Edit modal
│   │   ├── BookmarkCard.tsx       # Bookmark card component
│   │   ├── SearchBar.tsx          # Search component
│   │   └── TagFilter.tsx          # Tag filter component
│   ├── lib/
│   │   ├── mongodb.ts             # Database connection
│   │   └── scraper.ts             # Metadata fetcher
│   └── models/
│       └── Bookmark.ts            # Mongoose schema
├── .env.local.example             # Environment template
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Usage

### Adding a Bookmark

1. Click the **"Add Bookmark"** button in the header
2. Paste a URL (e.g., `https://github.com`)
3. Add tags (optional) - press Enter or comma to add
4. Click **"Add Bookmark"**
5. The app automatically fetches title, description, and favicon!

### Searching Bookmarks

- Use the search bar to find bookmarks by title, description, or URL
- Search is debounced for better performance

### Filtering by Tags

- Click on any tag pill to filter bookmarks
- Click again or click "All" to reset the filter

### Editing a Bookmark

1. Hover over a bookmark card
2. Click the edit icon (pencil)
3. Update title, description, or tags
4. Click **"Update Bookmark"**

### Deleting a Bookmark

1. Hover over a bookmark card
2. Click the delete icon (trash)
3. Confirm deletion

### View Modes

- Toggle between **Grid View** (cards) and **List View** using the buttons in the top-right

## 🔧 API Endpoints

### Bookmarks

- `GET /api/bookmarks` - Get all bookmarks (supports `?search=query` and `?tag=tagName`)
- `POST /api/bookmarks` - Create a new bookmark
- `PATCH /api/bookmarks?id=<id>` - Update a bookmark
- `DELETE /api/bookmarks?id=<id>` - Delete a bookmark

### Tags

- `GET /api/tags` - Get all tags with counts

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    },
  },
}
```

### Adding More Tag Colors

Edit the `tagColors` array in `BookmarkCard.tsx` and `TagFilter.tsx`.

# 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)


## 🔮 Future Features

- [ ] Browser extension
- [ ] Public/private bookmarks
- [ ] Collections/folders
- [ ] Import from browser
- [ ] Export to JSON/CSV
- [ ] Sharing bookmarks
- [ ] Dark mode toggle
- [ ] Bookmark notes
- [ ] URL preview on hover
- [ ] Keyboard shortcuts

If you find this project helpful, please give it a ⭐!
