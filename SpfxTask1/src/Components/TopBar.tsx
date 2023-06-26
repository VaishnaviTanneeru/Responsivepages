import { faBell, faHome, faQuestion, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import * as pnp from "sp-pnp-js";
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./TopBar.css');
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Top() {
  const [name, setName] = useState('')
  useEffect(() => {
    debugger;
     pnp.sp.web.currentUser.get().then(user => {
        console.log("Current user name: " + user.Email);
        setName(user.Email);
      }).catch(e=>{
        console.log(e)
      });
   
  },[]);
  return (
    <div>
      <div className="topbar">
        <div><Link to='/'><FontAwesomeIcon className='Backicon' icon={faHome} /></Link></div>
        <div className="mt-3"><p>Rental Carz</p></div>
        <div className=" deflex justify-content-start align-items-center mt-2">
          <input className="search-input " type="search" placeholder="Search..."></input>
          <FontAwesomeIcon className="searchicon" icon={faSearch} />

        </div>
        <div className="Icon mt-2">
          <FontAwesomeIcon icon={faBell} />
          <div className="circle"><span className="num">3</span></div>

        </div>
        <div className="circle1 mt-2">
          <FontAwesomeIcon className="questionicon" icon={faQuestion} />
        </div>
        <div>
          <img src={`https://cloudangles.sharepoint.com/sites/Training/_layouts/15/userphoto.aspx?size=L&accountname=${name}`} alt="imageOfuser logo" className="ulogo mt-2" />
        </div>

      </div>
      
    </div>
  )
}