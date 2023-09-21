import * as React from "react";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface INewwwProps {
    context: WebPartContext;
    }
export default class Http extends React.Component<INewwwProps,any>{
    constructor(props:any){
        super(props)
        this.state={

       }
        }
        componentDidMount(){
            const listName = 'Sample';
            const webUrl: string = "https://cloudangles.sharepoint.com/sites/Training"
            const endpoint = webUrl + `/_api/web/lists/getbytitle('${listName}')/items`;

            this.context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error(`Error: ${response.statusText}`);
                    }
                })
                .then((data: any) => {
                    console.log("HHttp",data)
                })
                .catch((error: any) => {
                    console.error('Error:', error);
                });  
        }
    render(){
        return(
            <div>RestAPI</div>
        )
    }
}
