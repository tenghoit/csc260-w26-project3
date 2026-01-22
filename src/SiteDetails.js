import React from "react";

// TODO: Import components/hooks from react-router-dom
import { BrowserRouter, Route, Routes, Link, useParams } from "react-router-dom";

function SiteDetails(props) {
   // TODO: Call useParams() here
   const { SiteID } = useParams();

   // TODO: Replace "tt0034583" with the movie ID parameter
   // find() returns undefined if the SiteID cannot be found
   
   const site = props.sites.find(site => site.SiteID.toString() === SiteID);

   if(site === undefined){
    return(
        <>
        <p>Site with ID {SiteID} not found.</p>
        <footer><Link to="/">All Sites</Link></footer>
        </>

    )
   }else
    return(
        <>
        <header>
            <h1>{site.Site}</h1>
        </header>
        <main>
            <img src={`/${site.Image}`} alt={`Image of ${site.Site}`} />
            <p>{site.Description}</p>
            <p>Latitude: {site.Latitude} | Longitude: {site.Longitude}</p>
        </main>
        <footer><Link to="/">All Sites</Link></footer>
        </>
    )
}

export default SiteDetails;