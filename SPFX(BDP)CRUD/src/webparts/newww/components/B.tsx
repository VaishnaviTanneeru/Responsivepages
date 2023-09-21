import * as React from 'react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {sp} from "sp-pnp-js"
export default class B extends React.Component<any,any>{
    constructor(props: any){
        super(props)
        this.state={
            addUsers: 0

        }
        this._getPeoplePickerItems=this._getPeoplePickerItems.bind(this);
    }
    private _getPeoplePickerItems(items: any[]) {
        debugger;
console.log('Items:', items);
this.setState({addUsers:items[0].id})
}
private async addSelectedUsers(): Promise<any> {
    debugger;
    await sp.web.lists.getByTitle("Sample").items.add({
        Title:"111",
        personNameId:this.state.addUsers

    })
}
    render(){
        return(
            <div>
<PeoplePicker
context={this.props.context}
titleText="People Picker"
personSelectionLimit={3}
groupName={""} // Leave this blank in case you want to filter from all users
showtooltip={true}
required={true}
disabled={false}
ensureUser={true}
onChange={this._getPeoplePickerItems}
showHiddenInUI={false}
principalTypes={[PrincipalType.User]}
resolveDelay={1000} />
<button onClick={this.addSelectedUsers}>add users</button>
            </div>
        )
    }
}