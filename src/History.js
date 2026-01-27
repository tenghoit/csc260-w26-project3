import React from "react";
import { Link } from "react-router-dom";


function History(props){

    return(
        <main>
            <section>
                <div id="historyHeader">
                    <h2>Recently Visited</h2>
                    <p><strong>Progress Tracker</strong>: Visited {props.history.length} / {props.sites.length} sites</p>
                </div>
                
                <div className="allSites">
                    {props.history.length < 1 ? 
                        <p>No History</p>
                        :
                        props.history.map(site =>(
                            <article>
                                <h2>{site.Site}</h2> 
                                <Link to={`/sites/${site.SiteID}`}><img src={`/${site.Image}`} alt={`${site.Site}`} /></Link>
                            </article>
                        ))
                    }
                </div>
            </section>
        </main>
    )
}

export default History