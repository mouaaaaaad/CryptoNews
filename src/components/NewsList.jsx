import React, { useState, useEffect } from "react";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("hot"); // Default filter
  const filters = ["hot", "medium", "cold"];
  
  // Keywords that determine the "temperature" of news
  const hotKeywords = ["surge", "soar", "jump", "breakthrough", "record", "massive", "rally", "high", "bull"];
  const coldKeywords = ["drop", "fall", "crash", "decline", "bearish", "low", "plunge", "dump", "fear"];

  const fetchCryptoNews = async () => {
    try {
      // Fetch top 100 coins data
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      // Transform coin data into news-like format
      const newsArticles = data.map(coin => {
        const priceChange = coin.price_change_percentage_24h;
        let temperature = "medium";
        let title = "";
        
        if (priceChange > 5) {
          temperature = "hot";
          title = `${coin.name} surges ${priceChange.toFixed(2)}% in 24 hours`;
        } else if (priceChange < -5) {
          temperature = "cold";
          title = `${coin.name} drops ${Math.abs(priceChange.toFixed(2))}% in 24 hours`;
        } else {
          title = `${coin.name} shows stable movement at $${coin.current_price}`;
        }
        
        return {
          title,
          temperature,
          urlToImage: coin.image,
          source: { name: "CoinGecko" },
          description: `Current price: $${coin.current_price}. Market Cap: $${coin.market_cap.toLocaleString()}. 24h Volume: $${coin.total_volume.toLocaleString()}`,
          url: `https://www.coingecko.com/en/coins/${coin.id}`,
          timestamp: new Date().toISOString()
        };
      });
      
      // Filter articles based on selected temperature
      const filteredArticles = newsArticles.filter(article => article.temperature === filter);
      setArticles(filteredArticles);
      
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      setArticles([]); // Clear articles on error
    }
  };

  useEffect(() => {
    fetchCryptoNews();
    // Fetch news every 2 minutes
    const interval = setInterval(fetchCryptoNews, 120000);
    return () => clearInterval(interval);
  }, [filter]);

  return (
    <div className="max-w-3xl mx-auto p-5 py-25">
      <h1 className="text-center text-4xl font-bold text-white mb-6">Crypto Market Updates</h1>
      <p className="text-gray-400 text-center mb-6">Filter by price movement:</p>

      {/* Temperature Filter Selector */}
      <div className="flex justify-center space-x-4 mb-6">
        {filters.map((temp) => (
          <button
            key={temp}
            className={`px-4 py-2 rounded-lg text-white ${
              filter === temp 
                ? temp === "hot" 
                  ? "bg-red-500"
                  : temp === "medium"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                : "bg-gray-700"
            } hover:opacity-80 transition`}
            onClick={() => setFilter(temp)}
          >
            {filter === temp ? "✓ " : ""}{temp.charAt(0).toUpperCase() + temp.slice(1)}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
            >
              <div className="w-full bg-gray-700">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-white">{article.title}</h2>
                  <span className={`px-2 py-1 rounded text-xs ${
                    article.temperature === "hot" 
                      ? "bg-red-500" 
                      : article.temperature === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  } text-white`}>
                    {article.temperature}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  {article.description}
                </p>
                <p className="text-gray-500 text-sm mt-2">Source: {article.source.name}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline mt-4 block"
                >
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center">
            <p className="text-gray-400">No updates available for this filter. Try a different filter or check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;