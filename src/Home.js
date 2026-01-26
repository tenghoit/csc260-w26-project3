import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home(props){
    const sites = props.sites
    const navigate = useNavigate()

    function goToRandomSite(){
        const randomIndex = Math.floor(Math.random() * sites.length)
        const randomSite = sites[randomIndex]
        navigate(`/sites/${randomSite.SiteID}`)
    }

    return(
        <main>
            <section>
                <h2>Discover Boyle County</h2>
                <p>
                    Welcome to the Boyle County history celebration! 
                    As the nation approaches our 250th anniversity, 
                    the America 250 KY Boyle County has been hard at work
                    to preserve and showcase the rich history of Boyle County.
                </p>
            </section>
            <section>
                <h2>Exploration</h2>
                <ul>
                    <li>
                        Historical Sites: 
                        Dive into a unique collection of historical sites in Boyle County,
                        complete with detailed description and street-view imagery
                    </li>
                    <li>
                        Interative tools: 
                        Enhance your exploration with powerful search tools, 
                        bookmarking, and history capabilities to quickly find
                        your desired sites
                    </li>
                    <li>
                        Growing Collection:
                        While we currently only feature {sites.length} sites, 
                        plans are underway to add support for hundreds of additional sites.
                    </li>
                </ul>
            </section>
            <section>
                <h2>Useful Links</h2>
                <p>Check out our full collection of sites: <Link to="/sites">All Sites</Link></p>
                <p>Click here to go see recent history: <Link to="/history">History</Link></p>
                <button onClick={goToRandomSite} >Feeling lucky?</button>
            </section>
        </main> 
    )
}

export default Home