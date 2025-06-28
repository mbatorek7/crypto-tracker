import React, { useState, useEffect } from 'react';

function App() {

  const [coins, setCoins] = useState([]);       // to store the coins data
  const [loading, setLoading] = useState(true); // to track loading state
  const [searchTerm, setSearchTerm] = useState(''); // store user input from search bar

  //useEffect to fetch data
  useEffect(() => {
    async function fetchCoins() {
      //show loading indicator while data is fetched
      setLoading(true);

      try {
        //make HTTP request to CoinGecko API URL
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        //convert response to JSON
        const data = await response.json();
        setCoins(data);

      } catch (error) {

        console.error('Error fetching data:', error);

      } finally {
        //hide loading error
        setLoading(false);

      }
    }

    fetchCoins();
  }, []);

  // filter coins based on search term
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-blue-400 min-h-screen px-4 py-10 w-full text-center'>
      <h1 className='text-3xl font-bold text-center mb-4'>Crypto Tracker</h1>

      <input className='bg-white max-w-sm py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 text-center w-200px mb-4'
        type="text"
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='bg-white p-4 rounded-lg hover:shadow-md grid gap-4 justify-center w-xl mx-auto'>
          <ul>
            {filteredCoins.map((coin) => (
              <li className='flex items-center gap-5 p-3' key={coin.id}>
                <img src={coin.image} alt={coin.name} width="25" />
                {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
