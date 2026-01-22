import React from "react";

// TODO: Import components from react-router-dom
import { Link } from "react-router-dom";

function SiteList(props) {

   return (
      <>
         {/* <table>
            <tr>
               <th>Site</th>
            </tr>
            {props.sites.map(site => (
               <tr>
                  <td><Link to={`/Site/${site.SiteID}`}>{site.Site}</Link></td>
               </tr>
            ))}

         </table> */}


        <header>
            <h1>Sites of Boyle County</h1>
        </header>
         <main>
            {props.sites.map(site =>(
                <article>
                    <h2>{site.Site}</h2>
                    <Link to={`/Site/${site.SiteID}`}><img src={`/${site.Image}`} alt={`${site.Site}`} /></Link>
                </article>
            ))}
         </main>
      </>
   );
}

export default SiteList;