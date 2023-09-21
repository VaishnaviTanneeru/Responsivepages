import * as React from "react";
import pnp from 'sp-pnp-js';
import { CheckboxVisibility, DetailsList, IColumn } from "office-ui-fabric-react";
import * as moment from 'moment';
import Top from "./TopBar";
// import B from "./B";
export default class Detailist extends React.Component<any, any>{
    private columns: IColumn[];
    constructor(props: any) {
        super(props)
        this.state = {
            Arr: []
        }
        this.columns = [
                       {
                key: 'Name',
                name: 'Name',
                fieldName: 'Name',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true,
            },
            {
                key: 'Age',
                name: 'Age',
                fieldName: 'Age',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true
            },
            {
                key: 'course',
                name: 'course',
                fieldName: 'course',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true
            },
            {
                key: 'ID',
                name: 'ID',
                fieldName: 'ID',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true
            },
            {
                key: 'Date1',
                name: 'Date1',
                fieldName: 'Date1',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true
            },
            {
                key: 'personName',
                name: 'personName',
                fieldName: 'personName',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true
            },
            {
                key: 'Email',
                name: 'Email',
                fieldName: 'Email',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true
            },
            {
                key: 'Image',
                name: 'Image',
                fieldName: 'Image',
                minWidth: 100,
                maxWidth: 200,
                isResizable: true,
                data:"image"
                
            }

        ]

        this.Get = this.Get.bind(this);
    }
    dateTemplate = (date: any) => {
        return <span>{moment(date).format("DD/MM/YYYY")}</span>;
    }
    public async Get(): Promise<any> {
        debugger;
        let ArrayResult: any = [];
        await pnp.sp.web.lists.getByTitle("Sample").items.select("*,personName/EMail,personName/Title,personName/ID,Image").expand("personName").get().then((itmes: any[]) => {

            for (let i = 0; i < itmes.length; i++) {
                debugger;
                console.log(itmes)
                let PersonFeildTitle = '';
                let PersonFeildEmail = '';
                if (itmes[i].personName) {
                    PersonFeildTitle = itmes[i].personName.Title
                    PersonFeildEmail = itmes[i].personName.EMail
                }
                ArrayResult.push({
                    Title: itmes[i].Title,
                    Name: itmes[i].Name,
                    Age: itmes[i].Age,
                    course: itmes[i].course,
                    // Image:window.location.origin+itmes[i].Image.match('"serverRelativeUrl":(.*),"id"')[1].replace(/['"']+/g,''),
                    ID: itmes[i].ID,
                    Date1: this.dateTemplate(itmes[i].Date1),
                    personName: PersonFeildTitle,
                    Email: PersonFeildEmail,
                    Choice: itmes[i].Choice,

                })

            }
            console.log(ArrayResult)
            this.setState({ Arr: ArrayResult })
        });

    }

    public async componentDidMount(): Promise<any> {
        await this.Get();
    }
    render() {


        return (
            <div>
                <Top></Top>
                <p style={{color:"#ff6666",fontSize:'24px',fontWeight:'bold'}}>Detatil List View</p>
                <DetailsList columns={this.columns} items={this.state.Arr}
                    setKey='Id'
                    checkboxVisibility={CheckboxVisibility.onHover}></DetailsList>          
                
            </div>
        )
    }
}