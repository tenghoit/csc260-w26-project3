import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";


function History(props){
    // console.log(props.history);

    return(
        <>
            <Header />
            <main>
                {props.history.map(site =>(
                    <article>
                        <h2>{site.Site}</h2> 
                        <Link to={`/sites/${site.SiteID}`}><img src={`/${site.Image}`} alt={`${site.Site}`} /></Link>
                    </article>
                ))}
            </main>
        </>

    )
}

export default History