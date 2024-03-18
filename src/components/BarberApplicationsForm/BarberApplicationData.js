import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FcViewDetails } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
const BarberApplicationData = () => {


    const [barberapplications, setBarberapplications] = useState([]);
  
  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  const handleDelete = (row) => {
    console.log("Delete", row);
  };

  useEffect(() => {
    console.log("BarberApplicationData component is mounted");
    const ownerid = 4;
    const status = "pending";

    fetch(`http://localhost:4001/api/get-barbers-by-shoownerId/${ownerid}/${status}`)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData.data);
        setBarberapplications(jsonData.data);
      });
  }, []);
  const columns = [
    { name: "Full Name", selector: (row) => row.firstname +" "+row.lastname, sortable: true },
    {
      name: "Phone Number",
      selector: (row) => row.phonenumber,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Experience", selector: (row) => row.experience, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div>

            <FcViewDetails className="icon" onClick={() => handleEdit(row)} />
         <MdDeleteOutline  className ="icon" onClick={() => handleDelete(row)}/>
         
          
        </div>
      ),
    },
  ];
  return (
    <DataTable
      paginationPerPage={10}
      columns={columns}
      data={barberapplications}
      pagination
      selectableRows
      responsive={true}
      selectableRowsHighlight
      highlightOnHover
      //   customStyles={tableHeaderstyle}
      fixedHeader={true}
      //   fixedHeaderScrollHeight={"30px"}
    ></DataTable>
  );
};

export default BarberApplicationData;
