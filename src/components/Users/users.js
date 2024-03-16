import React, { useEffect, useState } from "react";
import "./index.css";
import DataTable from "react-data-table-component";
import { tableHeaderstyle } from "../Bookings/index";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4001/api/get-all-users");
      const usersFromServer = await response.json();
      setUsers(usersFromServer.users);
      setFilteredUsers(usersFromServer.users);
      console.log(usersFromServer.users);
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      name: "FullName",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phonenumber", selector: (row) => row.phonenumber, sortable: true },
    { name: "TypeOfUser", selector: (row) => row.usertype, sortable: true },
  ];
  const handleFilter = (e) => {
   
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
    
    
      user.lastname.toLowerCase().includes(query) ||
      user.firstname.toLowerCase().includes(query) ||
      user.phonenumber.toLowerCase().includes(query)||
      user.usertype.toLowerCase().includes(query)
    
    );
    setFilteredUsers(filtered);
  
};
  return (
    <div className="dataTables">
      <input
        type="search"
        onChange={handleFilter}
        value={searchQuery}
        className="w-25 search pl-5 p-20"
        placeholder="Search by Status"
      />
      <DataTable
        paginationPerPage={10}
        columns={columns}
        data={filteredUsers}
        pagination
        selectableRows
        responsive={true}
        selectableRowsHighlight
        highlightOnHover
        customStyles={tableHeaderstyle}
        fixedHeader={true}
        fixedHeaderScrollHeight={"310px"}
      ></DataTable>
    </div>
  );
};

export default Users;
