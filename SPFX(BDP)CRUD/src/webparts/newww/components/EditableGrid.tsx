import { DetailsListLayoutMode, mergeStyles, mergeStyleSets, SelectionMode, TextField } from '@fluentui/react';
import { EditableGrid, EditControlType, IColumnConfig, EventEmitter, EventType, NumberAndDateOperators } from 'fluentui-editable-grid';
import * as React from 'react';
import { useState } from 'react';
import Top from './TopBar';
import pnp from 'sp-pnp-js';
import * as moment from 'moment';

const Consumer = () => {
    const classNames = mergeStyleSets({
        controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        }
    });
  
const [items, setItems] :any= useState([]);
const columns: IColumnConfig[] = [
    {
    
            key: 'Name',
            name: 'Name',
            text: 'Name',
            editable: true,
            dataType: 'string',
            minWidth: 100,
            maxWidth: 100,
            isResizable: true,
            includeColumnInExport: false,
            includeColumnInSearch: false,
            applyColumnFilter: false,
            disableSort: true,
    
    },
    {
        key: 'Age',
        name: 'Age',
        text: 'Age',
        editable: true,
        dataType: 'string',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: false,
        includeColumnInSearch: false,
        applyColumnFilter: false,
        disableSort: true,
        // hoverComponentOptions: { enable:true, hoverChildComponent: <CellHover customProps={{ someProp: '' }} /> }
    },
    {
        key: 'course',
         name: 'course',
        text: 'course',
        editable: true,
        dataType: 'string',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        applyColumnFilter: true
    },
    {
        key: 'ID',
                name: 'ID',
                text: 'ID',
        editable: true,
        dataType: 'number',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        applyColumnFilter: true
    },
    {
        key: 'Date1',
        name: 'Date1',
        text: 'Date1',
        editable: true,
        dataType: 'date',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        inputType: EditControlType.MultilineTextField,
        applyColumnFilter: true
    },
    {
        key: 'personName',
        name: 'personName',
        text: 'personName',
        editable: true,
        dataType: 'number',
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: false,
        includeColumnInSearch: true,
        maxLength:5,
        applyColumnFilter: true,
        cellStyleRule: { 
            enable: true, 
            rule: { 
                operator : NumberAndDateOperators.LESSTHAN, 
                value: 50000 
            }, 
            whenTrue: { textColor: '#EF5350', fontWeight: 'bold' },
            whenFalse: { textColor: '#9CCC65' }
        }
    },
       
    {
        key: 'employmenttype',
        name: 'Employment Type',
        text: 'Employment Type',
        editable: true,
        dataType: 'string',
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        inputType: EditControlType.Picker,
        pickerOptions: {
            pickerTags: ['Employment Type1', 'Employment Type2', 'Employment Type3', 'Employment Type4', 'Employment Type5', 'Employment Type6', 'Employment Type7', 'Employment Type8', 'Employment Type9', 'Employment Type10', 'Employment Type11', 'Employment Type12'],
            minCharLimitForSuggestions: 2,
            tagsLimit: 1,
            pickerDescriptionOptions: { 
                enabled: true, 
                values: [
                    { key: 'Employment Type1', description: 'Employment Type1 Description'},
                    { key: 'Employment Type2', description: 'Employment Type2 Description'},
                    { key: 'Employment Type3', description: 'Employment Type3 Description'},
                    { key: 'Employment Type4', description: 'Employment Type4 Description'},
                    { key: 'Employment Type5', description: 'Employment Type5 Description'},
                    { key: 'Employment Type6', description: 'Employment Type6 Description'},
                    { key: 'Employment Type7', description: 'Employment Type7 Description'},
                    { key: 'Employment Type8', description: 'Employment Type8 Description'},
                    { key: 'Employment Type9', description: 'Employment Type9 Description'},
                    { key: 'Employment Type10', description: 'Employment Type10 Description'},
                    { key: 'Employment Type11', description: 'Employment Type11 Description'},
                    { key: 'Employment Type12', description: 'Employment Type12 Description'},
            ] },
        }
    }
];
const dateTemplate = (date: any) => {
    return <span>{moment(date).format("DD/MM/YYYY")}</span>;
}
const GetList=()=>{
let ArrayResult: any = [];
         pnp.sp.web.lists.getByTitle("Sample").items.select("*,personName/EMail,personName/Title,personName/ID,Image").expand("personName").get().then((itmes: any[]) => {

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
                    ID: itmes[i].ID,
                    Date1: dateTemplate(itmes[i].Date1),
                    personName: PersonFeildTitle,
                    Email: PersonFeildEmail,
                    Choice: itmes[i].Choice,

                })

            }
            setItems(ArrayResult)
        }).catch((e) => {
            console.log(e)
        })
    }
  
React.useEffect(() => {
    GetList();
}, []);

return (
    <div>
        <Top></Top>
        <br></br>
        <div className={classNames.controlWrapper}>
            <TextField placeholder='Search Grid' className={mergeStyles({ width: '60vh', paddingBottom:'10px' })} onChange={(event) => EventEmitter.dispatch(EventType.onSearch, event)}/>
        </div>
        <EditableGrid
            id={1}
            columns={columns}
            items={items}
            enableCellEdit={true}
            enableExport={true}
            enableTextFieldEditMode={true}
            enableTextFieldEditModeCancel={true}
            enableGridRowsDelete={true}
            enableGridRowsAdd={true}
            height={'70vh'}
            width={'140vh'}
            position={'relative'}
            enableUnsavedEditIndicator={true}
            // onGridSave={onGridSave}
            enableGridReset={true}
            enableColumnFilters={true}
            enableColumnFilterRules={true}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.multiple}
            enableRowEdit={true}
            enableRowEditCancel={true}
            enableColumnEdit={true}
            enableSave={true}
            // customCommandBarItems={[
            //     {
            //         key: "CustomCommandBarItem1",
            //         name: "Custom Command Bar Item1",
            //         iconProps: { iconName: "Download" },
            //         onClick: () => {
            //           alert('Clicked');
            //         },
            //     }
            // ]}
        />
    </div>
);
};

export default Consumer;