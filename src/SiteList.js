import React from "react";

// TODO: Import components from react-router-dom
import { useState } from 'react';
import { Link } from "react-router-dom";

function SiteList(props) {
   const [searchTerm, setSearchTerm] = useState("");
   
   const sites = props.sites
   const queriedSites = props.queriedSites
   const setQueriedSites = props.setQueriedSites
   const bookmarks = props.bookmarks
   const setBookmarks = props.setBookmarks
   
   function handleQuery(event){
      event.preventDefault()

      console.log(`Term: ${searchTerm}`);
      
      if(searchTerm === ""){
         setQueriedSites(sites)
         return
      }

      let result = queriedSites.filter((site) => site['Site'].toLowerCase().includes(searchTerm.toLowerCase()))
      setQueriedSites(result)
   }

   function toggleBookmark(id){
      setBookmarks(prev => {
         let newBookmarks = {...prev}
         const newValue = newBookmarks[id] === "true" ? "false" : "true"
         newBookmarks[id] = newValue
         return newBookmarks
      })
   }


   return (
      <>
         <header>
            <h1>Sites of Boyle County</h1>
            <p><Link to="/">Home</Link></p>
            <form onSubmit={handleQuery}>
               {/* <label for="searchTerm">Search</label> */}
               <input type='text' id='searchTerm' name="searchTerm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
               <button type='submit' className='submit'>Search</button>
            </form>
         </header>
         <main>
            {queriedSites.map(site =>(
                <article>
                    <h2>{site.Site}</h2> 
                    <button onClick={() => toggleBookmark(site.SiteID)} value={bookmarks[site.SiteID]}>★</button>
                    <Link to={`/Site/${site.SiteID}`}><img src={`/${site.Image}`} alt={`${site.Site}`} /></Link>
                </article>
            ))}
         </main>
      </>
   );
}

export default SiteList;