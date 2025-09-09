# CafeYub 🍽️

A modern cafe discovery and management platform built with Next.js 15, featuring a beautiful UI for discovering local cafes and an admin panel for content management.

## ✨ Features

### Public Features

- **Cafe Discovery**: Browse and search through local cafes
- **Detailed Cafe Pages**: View cafe information, images, contact details, and working hours
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Image Gallery**: High-quality cafe images with placeholder fallbacks

### Admin Features

- **Post Management**: Create, edit, and delete cafe posts
- **Image Upload**: Upload and manage cafe cover images
- **Search & Filter**: Find posts quickly with search functionality
- **Modern Admin UI**: Clean, intuitive admin interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18.18.0+ (recommended: 24.7.0+)
- Yarn package manager
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cafeyub
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Run database migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the development server**

   ```bash
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Image Handling**: Next.js Image Optimization
- **Icons**: Custom SVG icons
- **Package Manager**: Yarn

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   │   └── posts/         # Post management
│   ├── post/              # Public post pages
│   ├── api/               # API routes
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Post/              # Post-related components
│   ├── Button/            # UI components
│   └── PostImage.tsx      # Image component with fallbacks
├── types/                 # TypeScript type definitions
└── constant/              # Application constants
```

## 🎯 Key Pages

### Public Pages

- **Home** (`/`): Cafe discovery with search functionality
- **Cafe Detail** (`/post/[id]`): Individual cafe information page

### Admin Pages

- **Admin Dashboard** (`/admin`): Main admin interface
- **Posts List** (`/admin/posts`): Manage all cafe posts
- **Create Post** (`/admin/posts/create`): Add new cafe posts
- **Edit Post** (`/admin/posts/[id]`): Edit existing posts

## 🖼️ Image Management

The app includes a sophisticated image system:

- **Upload**: Images are stored in `/storage/` directory
- **Fallbacks**: Automatic placeholder images when uploads fail
- **Optimization**: Next.js Image component for performance
- **Supported Formats**: All standard image formats

## 🔧 Development

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint

# Database
npx prisma migrate dev    # Run migrations
npx prisma studio         # Open Prisma Studio
npx prisma generate       # Generate Prisma client
```

### Database Schema

The app uses a simple Post model with the following fields:

- `id`: Unique identifier
- `title`: Cafe name
- `content`: Description
- `address`: Location
- `cover`: Image filename
- `instagramId`: Social media handle
- `contactNumber`: Phone number
- `workingTime`: Operating hours
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 🚀 Deployment

### Build for Production

```bash
# Build the application
yarn build

# Start production server
yarn start
```

### Environment Setup

Ensure your production environment has:

- Node.js 18.18.0+
- PostgreSQL database
- Proper environment variables
- Image storage directory (`/storage/`)

## 🎨 Customization

### Styling

- Modify Tailwind classes in components
- Update color scheme in `tailwind.config.js`
- Customize component styles in individual files

### Adding Features

- Create new API routes in `src/app/api/`
- Add new pages in `src/app/`
- Extend the database schema with Prisma migrations

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

**Build Errors**: Ensure Node.js version is 18.18.0+

```bash
node --version  # Should be 18.18.0 or higher
```

**Database Connection**: Verify your DATABASE_URL in `.env`

```bash
npx prisma db push  # Test database connection
```

**Image Upload Issues**: Check storage directory permissions

```bash
mkdir -p storage  # Ensure storage directory exists
```

## 📄 License

This project is licensed under the MIT License.

---

**Happy Cafe Hunting! ☕️**
