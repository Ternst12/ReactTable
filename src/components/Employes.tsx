import { assertPipelinePrimaryTopicReference } from '@babel/types';
import { type } from 'os';
import React, { useState, useEffect,  useMemo } from 'react';
import { useGlobalFilter, useTable, useSortBy} from 'react-table';
import { values } from 'regenerator-runtime';
import regeneratorRuntime from "regenerator-runtime";
import "../App.css";
import SearchField from './SearchField';

/* OBS !!! start json-server with the "npm run server" command   */

interface IState {
    employes: {
        id: string,
        name: string,
        gender: string,
        company: string,
        email: string,
        isActive: boolean,
        picture: string,

    }[],
}


const Employes = () => {


   
    const [employes, setEmployes] = useState<IState["employes"]>([]);

    const employesData = useMemo(() => [...employes], [employes]);

    const employesColumns = useMemo(
        
        () => 
            employes[0] 
                ? Object.keys(employes[0]).map((key) => {
                
                

                if(key === "picture")
                    return {
                        
                        Header: key,
                        accessor: key,
                        Cell: ({value}) => <img src={value} />,
                        maxWidth : 70,

                    };
                
                if(key === "isActive")
                    return {
                        Header: key,
                        accessor: row => row.isActive ? "✔️" : "❌"
                    }
                    
                    return {Header: key, accessor: key};
                }):
                [],
                [employes]);
    
    const tableInstance = useTable({
        //@ts-ignore
        columns: employesColumns, 
        data: employesData
    },useGlobalFilter, useSortBy);

    const {getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,  
        footerGroups, 
        preGlobalFilteredRows, 
        setGlobalFilter,
        state} = tableInstance 

    // Getting data from the db.json file

    const fetchEmployes = async () => {
        const response = await 
            fetch("http://localhost:5000/Employes")
            const data = await response.json()

            console.log(data)
            return data

    }

    // Setting the state with the data from db.json

    useEffect(() => {
        const getEmployes = async () => {
           const EmployesFromServer = await fetchEmployes()
           setEmployes(EmployesFromServer) 
        }

        getEmployes();
    }, [])

    console.log(" employes ", employes)

    return (
        <>
        <SearchField
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />


        <table {...getTableProps()} >
            <thead>
                {headerGroups.map((headerGroup) => (
                
                <tr  {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps( 
                        column.getSortByToggleProps())}> 
                        {column.render("Header")} 
                        {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼"): ""}
                    </th>
                    ))}
                    
                </tr>
    
                ))}
            </thead>
    
            <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                    return   <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                    })
                                }
                                    
                                </tr>
                            )
                        })
                    }
    
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map(column => (
                                    <td {...column.getFooterProps}> 
                                        {
                                            column.render("Footer")
                                        }
    
                                    </td>
    
                                ))
                        
                            }
                        </tr>
                    ))
                }
            </tfoot>
            
        </table>
        </>
    
    )    
}

export default Employes;

