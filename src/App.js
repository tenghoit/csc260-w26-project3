import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SiteList from './SiteList';
import SiteDetails from './SiteDetails';

function App() {

  const [sites, setSites] = useState([])
  const [queriedSites, setQueriedSites] = useState([])
  const [bookmarks, setBookmarks] = useState(initializeBookmarks)

  useEffect(() => {
    async function fetchSites() {
        const url = "/BoyleSites.json";
        const response = await fetch(url);
        if(response.ok){          
          const result = await response.json();
          setQueriedSites(result)
          setSites(result)
          syncBookmarks(result)
        }
    };
    fetchSites();
  }, []);


  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);


  function initializeBookmarks(){
    const val = localStorage.getItem("bookmarks")
    return val ? JSON.parse(val) : {}
  }

  function syncBookmarks(sites){
    setBookmarks(prev => { // updater
      let newBookmarks = {...prev}
      for (const site of sites) {
        if(newBookmarks[site.SiteID] === undefined){
          newBookmarks[site.SiteID] = false // init false
        }
      }
      return newBookmarks
    })
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
