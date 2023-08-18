import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 }
]

const Datatable = () => {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((data) => data.json())
            .then((data) => setTableData(data))
            console.log(tableData);
    }, [])

    console.log(tableData)

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
            />
        </div>
    )
}

export default Datatable;