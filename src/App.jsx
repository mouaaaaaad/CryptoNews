import React from "react";
import CryptoPrices from "./components/CryptoPrices"; // Assurez-vous d'importer le composant CryptoPrices
import NewsList from "./components/NewsList"; // Assurez-vous d'importer le composant NewsList

const App = () => {
  return (
    <div className="flex space-x-6 p-7">
    {/* CryptoPrices Component - 1/3 de la largeur */}
    <div className="w-1/3">
      <CryptoPrices />
    </div>

    {/* NewsList Component - 2/3 de la largeur */}
    <div className="w-2/3">
      <NewsList />
    </div>
  </div>
  );
};

export default App;
