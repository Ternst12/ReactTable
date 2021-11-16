import React, {useState} from 'react'
import { useAsyncDebounce } from "react-table";
import "../App.css"
import "regenerator-runtime"


const SearchField = ({preGlobalFilteredRows, globalFilter,  setGlobalFilter}) => {

    let count : number;

    count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 1000);
  
    return (
        <span>
            
            <input 
            value={value  || ""} 
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`${count} records...`} />
        </span>
    );
  }


export default SearchField;