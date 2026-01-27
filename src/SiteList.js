import React from "react";

// TODO: Import components from react-router-dom
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function SiteList(props) {
   const [searchTerm, setSearchTerm] = useState("");
   const [bookmarkOnly, setBookmarkOnly] = useState(false)
   
   const sites = props.sites
   const queriedSites = props.queriedSites
   const setQueriedSites = props.setQueriedSites
   const bookmarks = props.bookmarks
   const setBookmarks = props.setBookmarks
   
   function handleQuery(event){
      event.preventDefault()

      let result = [...sites]

      const hasSearch = !(searchTerm === "")
      if(hasSearch){
         result = result.filter((site) => site['Site'].toLowerCase().includes(searchTerm.toLowerCase()))
      }

      if(bookmarkOnly){
         result = result.filter((site) => bookmarks[site['SiteID']])
      }

      setQueriedSites(result)
   }

   function toggleBookmark(id){
      setBookmarks(prev => {
         let newBookmarks = {...prev}
         const newValue = newBookmarks[id] === true ? false : true
         newBookmarks[id] = newValue
         return newBookmarks
      })
   }

   useEffect(() => {
      const articles = document.querySelectorAll(".allSites article");
      const total = articles.length;
      const remainder = total % 3;

      articles.forEach((article, index) => {
         article.classList.remove("tilt-left", "tilt-center", "tilt-right");

      const pos = index % 3;
      const inLastRow = remainder !== 0 && index >= total - remainder;

      if (inLastRow) {
         if (remainder === 2) {
         article.classList.add(pos === 0 ? "tilt-left" : "tilt-right");
         }
         return;
      }

      if (pos === 0) article.classList.add("tilt-left");
      if (pos === 1) article.classList.add("tilt-center");
      if (pos === 2) article.classList.add("tilt-right");
      });
   }, [queriedSites]);

   return (
      <main>
         <section>
            <h2>All Sites</h2>
         </section>
         <section>
            <form onSubmit={handleQuery}>
               <div>
                  <label for="searchTerm">Search: </label>
                  <input type='text' id='searchTerm' name="searchTerm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
               </div>
               <div>
                  <label for="bookmarkOnly">Show only bookmarks: </label>
                  <input type="checkbox" id="bookmarkOnly" name="bookmarkOnly" checked={bookmarkOnly} onChange={e => setBookmarkOnly(e.target.checked)} />
               </div>
               <button type='submit' className='submit'>Submit</button>
            </form>
         </section>
         <section className="allSites">
            {queriedSites.map(site =>(
               <article key={site.SiteID}>
                  <h2>{site.Site}</h2> 
                  <button key="bookMark" onClick={() => toggleBookmark(site.SiteID)} value={bookmarks[site.SiteID]}>★</button>
                  <Link to={`/sites/${site.SiteID}`}><img src={`/${site.Image}`} alt={`${site.Site}`} /></Link>
               </article>
            ))}
         </section>
      </main>
   );
}

export default SiteList;