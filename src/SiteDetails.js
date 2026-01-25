import React, { useEffect } from "react";

// TODO: Import components/hooks from react-router-dom
import { useParams } from "react-router-dom";
import Header from "./Header";

function SiteDetails(props) {
   const { SiteID } = useParams();
   
   const site = props.sites.find(site => site.SiteID.toString() === SiteID);
   const setHistory = props.setHistory

   useEffect(() => {
        if(!site) return

        setHistory(prev => {
            let newHistory = prev.filter(site => site.SiteID.toString() !== SiteID) // if already in then rm
            newHistory = [site, ...newHistory]
            return newHistory.splice(0,10)
        })
   }, [SiteID, site, setHistory])

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