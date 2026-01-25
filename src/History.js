import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";


function History(props){
    // console.log(props.history);

    return(
        <>
            <Header />
            <main>
                <h2>Recently Visited</h2>
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
            </main>
        </>

    )
}

export default History