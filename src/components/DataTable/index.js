import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ReactTables = () => {
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "phone", selector: (row) => row.phone, sortable: true },
    { name: "actions", selector: (row) => row.address.city, sortable: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setRecords(res.data);
          setFilteredRecords(res.data);
          console.log(res.data);
        })
        .then((error) => console.log(error));
    };
    fetchData();
  }, []);

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilteredRecords] = useState([]);
  const handleFilter = (event) => {
    let newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  return (
    <div style={{ padding: "50px 10%", backgroundColor: "gray" }}>
      <input type="search" onChange={handleFilter} />
      <DataTable
        columns={columns}
        data={records}
        pagination
        selectableRows
      ></DataTable>
      ;
    </div>
  );
};

export default ReactTables;
