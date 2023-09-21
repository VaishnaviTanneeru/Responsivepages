import * as React from "react";
import Top from "./TopBar";
import * as moment from "moment"; 
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { sp } from "sp-pnp-js";

export const viewFields: IViewField[] = [{
  name: "Title",
  displayName: "Employee",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 150,
}, {
  name: "ID",
  displayName: "ID",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 100
},{
name: "Age",
displayName: "Age",
isResizable: true,
sorting: true,
minWidth: 0,
maxWidth: 150,
},{
name: "Person",
displayName: "Person",
isResizable: true,
sorting: true,
minWidth: 0,
maxWidth: 150,
},
{
  name: "Email",
  displayName: "Email",
  isResizable: true,
  sorting: true,
  minWidth: 0,
  maxWidth: 150,
  },
  {
    name: "Date1",
    displayName: "Date1",
    isResizable: true,
    sorting: true,
    minWidth: 0,
    maxWidth: 150,
    },];
export default class Lview extends React.Component<any, any>{
  constructor(props: any) {
    super(props)
    this.state = {
      items: []
    }
    this.GetData = this.GetData.bind(this);
  }
  public async componentDidMount(): Promise<any> {
    debugger;
    await this.GetData();
  }
  public async GetData(): Promise<any> {
    debugger;
    let results: any = [];
    await sp.web.lists.getByTitle("Sample").items.select("*,Email/ID,Email/Title,Email/EMail,personName/ID,personName/Title,personName/EMail").expand("Email,personName").getAll().then((items: any[]) => {
      for (let i = 0; i < items.length; i++) {
        let PersonFeildTitle = '';
        let PersonFeildEmail = '';
        if (items[i].personName) {
          PersonFeildTitle = items[i].personName.Title
          PersonFeildEmail = items[i].personName.EMail
        }
        results.push({
          Title: items[i].Title,
          ID: items[i].ID,
          Age: items[i].Age,
          Person: PersonFeildTitle,
          Email: PersonFeildEmail,
          Date1: this.dateTemplate(items[i].Date1)
        
        })
        console.log(results.Date1)
      }
      this.setState({ items: results })
      console.log("state value" + this.state.items)
    })
  }
  dateTemplate = (date: any) => {
    
    let Date= moment(date).format("DD/MM/YYYY");
    return Date
}

  render() {

    return (
      <div>
        <Top></Top>
        <p style={{color:"#ff6666",fontSize:'24px',fontWeight:'bold'}}>List View</p>
        <ListView
          items={this.state.items}
          viewFields={viewFields}
          iconFieldName="ServerRelativeUrl"
          compact={true}
          selectionMode={SelectionMode.multiple}
          // selection={this._getSelection}
          showFilter={true}
          filterPlaceHolder="Search..." />

      </div>
    )
  }
}