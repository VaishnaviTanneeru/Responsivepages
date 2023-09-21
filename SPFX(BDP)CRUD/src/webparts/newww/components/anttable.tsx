import * as React from "react";
import { Table } from 'antd';
import { sp } from "sp-pnp-js";
import Top from "./TopBar";
import 'antd/dist/antd.css';

export interface ITableItem {
    key: string;
    title: string;
    description: string;
}
export default class Anttable extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            data: [],
        }
    }

    public async componentDidMount() {
        try {
            const items = await sp.web.lists.getByTitle("Sample").items.select("*").get();
            const data = items.map((item: any) => {
                return {
                    title: item.Title,
                    id: item.ID,
                    Name: item.Name,
                    Age: item.Age,

                };
            });
            this.setState({ data });
        } catch (error) {
            console.error(error);
        }
    }
    public render() {
        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: 'Age',
                dataIndex: 'Age',
                key: 'Age',
            },
        ];

        return (
            <div>
                <Top></Top>
                <div>
                    <p style={{ color: "#ff6666", fontSize: '24px', fontWeight: 'bold', border: 'none' }}>Antd Design Table</p>
                </div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                />

            </div>
        );
    }
}
