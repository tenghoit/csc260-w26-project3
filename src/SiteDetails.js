import React from "react";

// TODO: Import components/hooks from react-router-dom
import { useParams } from "react-router-dom";
import Header from "./Header";

function SiteDetails(props) {
   // TODO: Call useParams() here
   const { SiteID } = useParams();

   // TODO: Replace "tt0034583" with the movie ID parameter
   // find() returns undefined if the SiteID cannot be found
   
   const site = props.sites.find(site => site.SiteID.toString() === SiteID);

   return(
    <>
        <Header />
        {site === undefined ? 
            <main>
                <p>Site with ID {SiteID} not found.</p>
            </main>
            :
            <main className="detail">
                <h2>{site.Site}</h2>
                <img src={`/${site.Image}`} alt={`${site.Site}`} />
                <p className="descDetail">{site.Description}</p>
                <p>Latitude: {site.Latitude} | Longitude: {site.Longitude}</p>
                <p><a href={`https://www.google.com/maps/search/?api=1&query=${site.Latitude},${site.Longitude}`}>Google Map Link</a></p>
            </main>
        }
    </>
   )
}

export default SiteDetails;