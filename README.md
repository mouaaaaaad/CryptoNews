# CryptoNews 📰

A dynamic cryptocurrency news dashboard that provides real-time market updates with an intuitive temperature-based filtering system. Monitor cryptocurrency price movements and market trends with an elegant, user-friendly interface.

## Features ✨

- **Real-time Market Updates**: Automatic data refresh every 2 minutes
- **Smart Filtering System**:
  - 🔴 Hot: Significant price increases (>5%)
  - 🟡 Medium: Stable price movements (-5% to 5%)
  - 🔵 Cold: Significant price decreases (<-5%)
- **Detailed Coin Information**:
  - Current market price
  - 24-hour price changes
  - Market capitalization
  - Trading volume
- **Responsive Design**: Seamless experience across all devices

## Technology Stack 💻

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [CoinGecko API](https://www.coingecko.com/en/api) - Cryptocurrency data
- [Vercel](https://vercel.com/) - Deployment platform

## Getting Started 🛠️

### Prerequisites

- Node.js (version 14 or higher)
- npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mouaaaaaad/CryptoNews.git
```

2. Navigate to the project directory:
```bash
cd CryptoNews
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure 📁

```
CryptoNews/
├── src/
│   ├── assets/
│   │   └── CryptoNews.png
│   ├── components/
│   │   └── NewsList.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Author 👨‍💻

**Mouad**
- GitHub: [@mouaaaaaad](https://github.com/mouaaaaaad)

