import * as React from "react";
import  { sp } from "sp-pnp-js";
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import Top from "./TopBar";

let lblarr: string[] = [];
let dataarr: any[] = [];    
export default class LineChart extends React.Component<any, any>{
  constructor(Props: any) {
    super(Props)
    this.state = {
      Arr: []
    };
    this.Get = this.Get.bind(this);
  }
  public async componentDidMount(): Promise<any> {
    await this.Get();
  }
  private async Get(): Promise<any> {
    const items: any[] = await sp.web.lists.getByTitle("Sample").items.select("*").get();
     items.forEach(element => {
      lblarr.push(element.Title);
      dataarr.push(element.ID);
    });
  }
  render() {
    return (
      <div>
        <Top></Top>
        <p style={{color:"#ff6666" ,textAlign:'center',fontSize:'24px',fontWeight:'bold'}}>Bar Char View</p>
    <ChartControl 
  type={ChartType.Bar}
  data={{
    labels: lblarr,
    datasets: [{
      label: 'My First dataset',
      data:dataarr
    }]
  }} />
      </div>
    )
  }
}
