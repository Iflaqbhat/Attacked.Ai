# 🚨 Attacked.AI - Global Threat Intelligence Platform

A modern, real-time threat intelligence platform that monitors and visualizes global cyberattacks, natural disasters, and security incidents as they unfold worldwide.

![Attacked.AI Platform](https://img.shields.io/badge/Status-Live%20Monitoring-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC)

## 🌟 Features

### 🗺️ Interactive 3D Globe Visualization
- **Mapbox-powered 3D globe** with real-time incident mapping
- **Interactive controls**: Drag to rotate, scroll to zoom, Ctrl+drag to tilt
- **Heatmap visualization** showing incident density and severity
- **Pulsing incident markers** with color-coded threat types
- **Click-to-navigate** to detailed incident pages

### 📊 Real-Time Live Feed
- **Live incident feed** with real-time updates
- **Severity-based color coding** (Critical, High, Medium, Low)
- **Location tracking** with city and country information
- **Timestamp tracking** with relative time display
- **Quick navigation** to detailed incident views

### 🎯 Top Stories Carousel
- **Featured stories** with premium card design
- **Smooth carousel navigation** with arrow controls
- **Progress indicators** for easy navigation
- **Responsive design** that adapts to screen size
- **Centered layout** for optimal viewing experience

### 📱 Modern UI/UX Design
- **Dark theme** with premium glass morphism effects
- **Responsive design** optimized for all devices
- **Smooth animations** and hover effects
- **Fixed navigation** that stays visible when scrolling
- **Professional typography** with Inter and JetBrains Mono fonts

### 🔍 Advanced Features
- **Dynamic routing** for individual incident pages
- **Copy link functionality** for easy sharing
- **Search and filtering** capabilities
- **Real-time statistics** and incident counts
- **Professional branding** with Attacked.AI logo

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL JS
- **Deployment**: Vercel/Netlify ready
- **Icons**: Custom emoji-based icons
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Mapbox API token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Iflaqbhat/Attacked.Ai.git
   cd Attacked.Ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. **Get a Mapbox token**
   - Visit [Mapbox](https://www.mapbox.com/)
   - Create a free account
   - Generate an access token
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Attacked.ai/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage with all sections
│   ├── globals.css        # Global styles
│   ├── incident/          # Dynamic incident pages
│   └── incidents/         # All incidents page
├── components/            # React components
│   ├── Globe.tsx          # 3D globe visualization
│   ├── LiveFeed.tsx       # Real-time incident feed
│   ├── TopStories.tsx     # Featured stories carousel
│   ├── MiniMap.tsx        # Small map for incident pages
│   └── CopyLink.tsx       # Copy link functionality
├── lib/                   # Utility functions
│   └── mockData.ts        # Mock incident data
├── public/                # Static assets
└── README.md             # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: `#FD5D00` (Gold)
- **Background**: `#121212` (Dark)
- **Text**: `#E0E0E0` (Light)
- **Accent Colors**:
  - Cyberattack: `#2C84D8` (Blue)
  - Earthquake: `#FC6000` (Orange)
  - Flood: `#00BFA6` (Teal)
  - Outage: `#FD5D00` (Gold)
  - Conflict: `#E63946` (Red)
  - Breach: `#9b87f5` (Purple)
  - Outbreak: `#eab308` (Yellow)

### Typography
- **Primary Font**: Inter (sans-serif)
- **Monospace Font**: JetBrains Mono
- **Responsive sizing** with Tailwind's scale

## 🌐 Deployment

### Vercel (Recommended)
1. **Connect your GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on every push

### Netlify
1. **Connect your GitHub repository** to Netlify
2. **Set build command**: `npm run build`
3. **Set publish directory**: `.next`
4. **Add environment variables** in Netlify dashboard

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Mock Data

The application uses realistic mock data including:
- **Cyberattacks**: DDoS, data breaches, ransomware
- **Natural Disasters**: Earthquakes, floods, storms
- **Infrastructure**: Power outages, service disruptions
- **Conflicts**: Regional tensions, security incidents
- **Health**: Disease outbreaks, public health emergencies

Each incident includes:
- Unique ID and timestamp
- Location data (city, country, coordinates)
- Severity classification
- Detailed description
- Source and target information

## 🔧 Customization

### Adding New Incident Types
1. Update `mockData.ts` with new incident types
2. Add corresponding icons in `tagIcon()` functions
3. Update color schemes in components

### Styling Modifications
- Modify `tailwind.config.ts` for theme changes
- Update component styles in respective files
- Customize animations and transitions

### Map Configuration
- Adjust Mapbox style in `Globe.tsx`
- Modify fog and atmosphere settings
- Customize heatmap colors and intensity

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mapbox** for the 3D globe visualization
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first styling
- **Attacked.AI** for the original concept and branding

## 📞 Support

For support, email support@attacked.ai or create an issue in this repository.

---

**Built with ❤️ for the security community**

*Real-time threat intelligence for a safer digital world*