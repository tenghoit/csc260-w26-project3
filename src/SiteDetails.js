import React from "react";

// TODO: Import components/hooks from react-router-dom
import { Link, useParams } from "react-router-dom";

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
        <footer><p><Link to="/">All Sites</Link></p></footer>
        </>

    )
   }else
    return(
        <>
        <header>
            <h1>{site.Site}</h1>
        </header>
        <main className="detail">
            <img src={`/${site.Image}`} alt={`${site.Site}`} />
            <p>{site.Description}</p>
            <p>Latitude: {site.Latitude} | Longitude: {site.Longitude}</p>
        </main>
        <footer><p><Link to="/">All Sites</Link></p></footer>
        </>
    )
}

export default SiteDetails;