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
    <div style={{ padding: '20px' }}>
      <h1 className='text-3xl font-bold text-center mb-4'>Crypto Tracker</h1>

      <input
        type="text"
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '200px' }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredCoins.map((coin) => (
            <li key={coin.id}>
              <img src={coin.image} alt={coin.name} width="25" />
              {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
