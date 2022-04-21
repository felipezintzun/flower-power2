import React from "react";
import "./gallery.css";
import {Link} from  'react-router-dom';

function Gallery ({img,link,name, description}) {


  return (

      <div className="gallery">

          <section className="flower-cards">

          <article className="flower-card">

            <a href={"/thoughts"} target="_blank" rel="noreferrer">
                <img src={img} alt="" className="gallery-img"/>
            </a>
            
            <div className="card-text">

              <h4 className="flower-name">{name}</h4>
              <p className="flower-description">{description}</p>
              <Link to={"/thoughts"} className="fThought-btn">Flower Talk</Link>

            </div>
            

            
            

          </article>

          </section>

  </div>

  )
}


export default Gallery