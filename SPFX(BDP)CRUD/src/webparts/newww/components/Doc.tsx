import * as React from "react";
import Top from "./TopBar";
import { sp } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IViewField, ListView, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import * as moment from "moment";
export const viewFields: IViewField[] = [{

    name: "Name",
    linkPropertyName: "ServerRelativeUrl",
    displayName: "Name",
    sorting: true,
    minWidth: 250,
},

{
    name: "TimeCreated",
    displayName: "Created",
    minWidth: 150,
    render: (item: any) => {
        const created = item["TimeCreated"];
        if (created) {
            const createdDate = moment(created);
            return <span>{createdDate.format('DD/MM/YYYY HH:mm:ss')}</span>;
        }
    }
}

];
export default class Doc extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            Arr: []
        }
        this.Get = this.Get.bind(this);
    }
    public async componentDidMount(): Promise<any> {
        await this.Get();

    }


    public async Get(): Promise<any> {
        const listName = "Vaish";
        const allItems: any[] = await sp.web.getFolderByServerRelativeUrl(listName).files.select("*").get();
        this.setState({ Arr: allItems })
        console.log(allItems);

    }

    render() {
        return (
            <div>
                <Top></Top>
                <p style={{ color: "#ff6666", fontSize: '24px', fontWeight: 'bold', border: 'none' }}>Document Library View</p>
                <div>
                    <ListView
                        items={this.state.Arr}
                        viewFields={viewFields}
                        iconFieldName="ServerRelativeUrl"
                        compact={true}
                        selectionMode={SelectionMode.multiple}
                        showFilter={true}
                        filterPlaceHolder="Search..." />
                </div>
            </div>

        )
    }
}