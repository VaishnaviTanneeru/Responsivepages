import * as React from "react";
import Top from "./TopBar";
import { sp } from "sp-pnp-js";
import * as moment from "moment";
require('./DataTable.css')
export default class Table extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            items: []
        }
        this.GetData = this.GetData.bind(this);

    }
    public async componentDidMount(): Promise<any> {
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
    dateTemplate = (date: any) => {

        let Date = moment(date).format("DD/MM/YYYY");
        return Date
    }
    render() {
        return (
            <div>
                <Top></Top>
                <div >
                    <p style={{ color: "#ff6666", fontSize: '24px', fontWeight: 'bold', border: 'none' }}>Table View</p>

                    <table className="Table">
                        <tr style={{ backgroundColor: "#ffccff" }}>
                            <th>ID</th>
                            <th>Person</th>
                            <th>Employee</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        <tbody>
                            {this.state.items.map((item: any, i: any) => {
                                return [
                                    <tr key={i} >
                                        <td>{item.ID}</td>
                                        <td>{item.Person}</td>
                                        <td>{item.Title}</td>
                                        <td>{item.Age}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Date1}</td>
                                        <td>{item.Status}</td>
                                    </tr>
                                ]
                            })}
                        </tbody>
                    </table>
                </div>


            </div>


        )
    }
}