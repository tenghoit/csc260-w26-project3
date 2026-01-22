import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteList from './SiteList';
import SiteDetails from './SiteDetails';

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteList sites={sites} />} />
          <Route path="/Site/:SiteID" element={<SiteDetails sites={sites} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
