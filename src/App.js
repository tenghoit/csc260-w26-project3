import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Header from "./Header";
import SiteList from './SiteList';
import SiteDetails from './SiteDetails';
import Home from './Home';
import History from './History'

function App() {

  const [sites, setSites] = useState([])
  const [queriedSites, setQueriedSites] = useState([])
  const [bookmarks, setBookmarks] = useState(() => {
    const val = localStorage.getItem("bookmarks")
    return val ? JSON.parse(val) : {}
  })
  const [history, setHistory] = useState(() => {
    const val = localStorage.getItem("history")
    return val ? JSON.parse(val) : []
  })

  useEffect(() => {
    async function fetchSites() {
        const url = "/BoyleSites.json";
        const response = await fetch(url);
        if(response.ok){          
          const result = await response.json();
          setQueriedSites(result)
          setSites(result)
          syncBookmarks(result)
          localStorage.clear()
        }
    };
    fetchSites();
  }, []);


  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);
  

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
        <Header />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/sites" element={<SiteList sites={sites} queriedSites={queriedSites} setQueriedSites={setQueriedSites} bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
          <Route path="/sites/:SiteID" element={<SiteDetails sites={sites} history={history} setHistory={setHistory} />} />
          <Route path="/history" element={<History sites={sites} history={history} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
