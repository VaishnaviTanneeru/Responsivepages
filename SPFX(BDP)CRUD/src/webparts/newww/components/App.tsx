import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Lview from "./ListView";
import Top from "./TopBar";
import Home from "./HomePage";
import Detailist from "./Detaillist";
import Data from "./Datatable";
import Table from "./table";
import Doc from "./Doc";
import LineChart from "./Chart";
import Anttable from "./anttable";
import Consumer from "./EditableGrid";
import Http from "./Http";
export default class App extends React.Component<any, any>{
    constructor(props: any) {
        super(props)

    }
    render() {
        return (<div>
<HashRouter>
    <Routes>
    <Route  path='/' Component={Home} />

<Route path="/listview" Component={Lview} />
<Route path="/top" Component={Top} />
<Route path="/detailview" Component={Detailist} />
<Route path="/datatable" Component={Data} /> 
<Route path="/table" Component={Table} /> 
<Route path="/Doclib" Component={Doc} />
<Route path="/chart"  Component={LineChart} />
<Route path="/Anttable" Component={Anttable}/>
<Route path="/Editable" Component={Consumer}/>
<Route path="/Http" Component={Http}/>

    </Routes>

</HashRouter>
           


        </div>

        )
    }
}