import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

function App() {

  const [sites, setSites] = useState([])

  useEffect(() => {
    async function fetchSites() {
        const url = "/BoyleSites.json";
        const response = await fetch(url);
        if(response.ok){          
          const result = await response.json();
          setSites(result)
        }
    };
    fetchSites();
  }, []);

  return (
    <div className="App">
      <p># Sites: {sites.length}</p>
    </div>
  );
}

export default App;
