import React from "react";

// TODO: Import components/hooks from react-router-dom
import { Link, useParams } from "react-router-dom";

function SiteDetails(props) {
   // TODO: Call useParams() here
   const { SiteID } = useParams();

   // TODO: Replace "tt0034583" with the movie ID parameter
   // find() returns undefined if the SiteID cannot be found
   
   const site = props.sites.find(site => site.SiteID.toString() === SiteID);

   return(
    <>
        <header>
            <h1>Sites of Boyle County</h1>
            <p><Link to="/">Home</Link></p>
        </header>
        {site === undefined ? 
            <main>
                <p>Site with ID {SiteID} not found.</p>
            </main>
            :
            <main className="detail">
                <h2>{site.Site}</h2>
                <img src={`/${site.Image}`} alt={`${site.Site}`} />
                <p>{site.Description}</p>
                <p>Latitude: {site.Latitude} | Longitude: {site.Longitude}</p>
                <p><a href={`https://www.google.com/maps/search/?api=1&query=${site.Latitude},${site.Longitude}`}>Google Map Link</a></p>
            </main>
        }
        <footer><p><Link to="/">All Sites</Link></p></footer>
    </>
   )
}

export default SiteDetails;