import * as React from "react";
import Top from "./TopBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Icon } from "office-ui-fabric-react";
import { Link } from "react-router-dom";

require('./Homepage.css');
// import image = require('./images/ig.png');

export default class Home extends React.Component<any, any>{
    constructor(props: any) {
        super(props)

    }

    render() {

        return (
            <div>
                <div>
                    <Top />
                </div>
                <div>
                    <div className="row col-12">
                        <div className="col-3">
                            <div className="card ">
                                {/* <img className="card-img-top"src={image} /> */}
                                <div className="card-body">
                                    <h5 className="card-title">Types of Views</h5>
                                    <Link to="/listview" style={{ textDecoration: "none" }}>
                                        <span style={{ cursor: "pointer", textDecoration: 'none', color: '#ff5050', fontWeight: 'bold' }}>
                                            List View
                                        </span>
                                    </Link >
                                    <br></br>
                                    <Link to="/detailview" style={{ textDecoration: "none" }}>
                                        <span style={{ cursor: "pointer", fontWeight: 'bold' }}>Detaillist View </span>
                                    </Link>
                                    <br></br>
                                    <Link to={"/table"} style={{ textDecoration: "none ", color: "#cc3300" }}>
                                        <span style={{ cursor: "pointer", fontWeight: 'bold' }}>Table View</span>
                                    </Link>
                                    <br></br>
                                    <Link to={"/datatable"} style={{ textDecoration: "none ", color: "#ff8000" }}>
                                        <span style={{ cursor: "pointer", fontWeight: 'bold' }}>DataTable View</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card">
                                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                                <div className="card-body">
                                    <h5 className="card-title">Document library View</h5>
                                    <Link to={"/Doclib"} style={{ textDecoration: "none" }}>
                                        <span style={{ cursor: "pointer", textDecoration: 'none', color: '#ff5050', fontWeight: 'bold' }}>
                                            View Items
                                        </span>
                                    </Link>
                                    <br></br>
                                    <Link to={"/Chart"} style={{ textDecoration: "none" }}>
                                        <span style={{ cursor: "pointer", textDecoration: 'none', fontWeight: 'bold' }}>
                                            View Chart  Items
                                        </span>
                                    </Link>
                                    <br></br>
                                    <Link to={"/Anttable"} style={{ textDecoration: "none",color:'#cc3300' }}>
                                        <span style={{ cursor: "pointer", textDecoration: 'none', fontWeight: 'bold' }}>
                                           AntTableItems
                                        </span>
                                    </Link>
                                    <br></br>
                                    <Link to={"/Editable"} style={{ textDecoration: "none", color: "#ff8000" }}>
                                        <span style={{ cursor: "pointer", textDecoration: 'none', fontWeight: 'bold' }}>
                                           EditableGrid
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Rest Api</h5>
                                    <Link to={"/Http"} style={{ textDecoration: "none" }}>
                                        <span style={{ cursor: "pointer", textDecoration: 'none', color: '#ff5050', fontWeight: 'bold' }}>
                                            List Data
                                        </span>
                                    </Link>                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Card Title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div><Icon iconName="Bell" /></div>
            </div>
        )
    }
}