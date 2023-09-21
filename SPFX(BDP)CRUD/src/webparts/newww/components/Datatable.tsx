import * as jQuery from 'jquery';
import 'datatables.net';
import * as React from 'react';
import { sp } from "sp-pnp-js";
import * as moment from 'moment';
import Top from './TopBar';
require('./DataTable.css')

export default class Data extends React.Component<any, any>{
  domElement: any;
  constructor(props: any) {
    super(props)
    this.state = {
      items: []
    }
    this.GetData = this.GetData.bind(this);
  }
  dateTemplate = (date: any) => {

    let Date = moment(date).format("DD/MM/YYYY");
    return Date
  }
  public async componentDidMount(): Promise<void> {
    debugger;
    const data = await this.GetData();
    const table = jQuery('#listData').DataTable({
      data: data,
      columns: [
        { title: 'Employee', data: 'Title' },
        { title: 'Age', data: 'Age' },
        { title: 'Email', data: 'Email' },
        { title: 'Person', data: 'Person' },
        { title: 'Date', data: 'Date1' },
        { title: 'ID', data: 'ID' },
        { title: 'Status', data: 'Status' },
      ],
    });
    console.log(table)
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
          Date1: this.dateTemplate(items[i].Date1),
          Status: items[i].Status

        })
        console.log(results.Date1)
      }
      this.setState({ items: results })
      console.log("state value" + this.state.items)
    })
    return results
  }
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />
        <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
        <Top></Top>
        <p style={{ color: "#ff6666", fontSize: '24px', fontWeight: 'bold' }}>DataTable View</p>
        <table id='listData' className='display'  style={{ border: '2px', width: "100%" }}></table>
      </div>
    )


  }

}
