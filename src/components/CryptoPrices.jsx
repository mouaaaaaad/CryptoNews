import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CryptoPrices = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live prices
  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: true,
          },
        }
      );
      setCryptoData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();

    // Refresh prices every minute
    const interval = setInterval(() => {
      fetchCryptoPrices();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading crypto prices...</p>;
  }

  return (
    <div className="w-full p-7">
      <div className="space-y-6">
        {cryptoData.map((crypto) => (
          <div
            key={crypto.id}
            className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-8 h-8 rounded-full"
              />
              <h2 className="text-xl font-semibold text-white">{crypto.name}</h2>
            </div>
            <div className="mb-2">
              <p className="text-green-400 text-2xl">${crypto.current_price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">
                {crypto.price_change_percentage_24h > 0
                  ? `+${crypto.price_change_percentage_24h.toFixed(2)}%`
                  : `${crypto.price_change_percentage_24h.toFixed(2)}%`}
              </p>
            </div>
            <div className="text-gray-300 text-sm mb-2">
              <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p>24h High: ${crypto.high_24h.toFixed(2)}</p>
              <p>24h Low: ${crypto.low_24h.toFixed(2)}</p>
              <p>Volume (24h): ${crypto.total_volume.toLocaleString()}</p>
            </div>
            <div className="h-40 mt-4">
              <Line
                data={{
                  labels: crypto.sparkline_in_7d.price.map((_, index) => index),
                  datasets: [
                    {
                      label: `${crypto.name} (7d)`,
                      data: crypto.sparkline_in_7d.price,
                      borderColor: "rgb(75, 192, 192)",
                      borderWidth: 2,
                      pointRadius: 0,
                      tension: 0.2,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoPrices;
