import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SiteList from './SiteList';
import SiteDetails from './SiteDetails';

function App() {

  const [sites, setSites] = useState([])
  const [queriedSites, setQueriedSites] = useState([])
  const [bookmarks, setBookmarks] = useState({})

  useEffect(() => {
    async function fetchSites() {
        const url = "/BoyleSites.json";
        const response = await fetch(url);
        if(response.ok){          
          const result = await response.json();
          setQueriedSites(result)
          setSites(result)
          manageBookmarks(result)
        }
    };
    fetchSites();
  }, []);

  function manageBookmarks(sites){
    let result = {}
    for (const site of sites) {
      const key = `bookmark-${site.SiteID}`
      if(localStorage.getItem(key) === null){
         localStorage.setItem(key, "false")
      }
      result[key] = localStorage.getItem(key)
    }
    setBookmarks(result)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteList sites={sites} queriedSites={queriedSites} setQueriedSites={setQueriedSites} bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
          <Route path="/Site/:SiteID" element={<SiteDetails sites={sites} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
