import React from "react";

// TODO: Import components from react-router-dom
import { useState } from 'react';
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
               <article>
                  <h2>{site.Site}</h2> 
                  <button onClick={() => toggleBookmark(site.SiteID)} value={bookmarks[site.SiteID]}>★</button>
                  <Link to={`/sites/${site.SiteID}`}><img src={`/${site.Image}`} alt={`${site.Site}`} /></Link>
               </article>
            ))}
         </section>
      </main>
   );
}

export default SiteList;