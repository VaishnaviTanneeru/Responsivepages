import * as React from "react";
require('../webparts/smallProject/components/SmallProject.module.scss')
import {Route,HashRouter, Routes} from "react-router-dom"
import Dashboard from "./Dashboard";
import CustomerForm from "./CustomerForm";
export default class App extends React.Component<any, any>{
    constructor(props: any){
        super(props)
        
    }
    render() {
        
        return(
            <div>
            <HashRouter>
                <Routes>
                    <Route path="/" Component={Dashboard}/>
                    <Route path="/CustomerForm" Component={CustomerForm}/>
                </Routes>
            </HashRouter>
            </div>
        )
    }
}