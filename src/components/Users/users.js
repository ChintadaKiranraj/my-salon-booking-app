

import React,{useEffect,useState} from 'react'
const Users=()=>{
    const[users,setUsers]=useState([]);
    useEffect(()=>{
        const fetchUsers=async()=>{
            const response=await fetch("http://localhost:4001/api/get-all-users")
            const usersFromServer=await response.json()
            setUsers(usersFromServer.users)
            console.log(usersFromServer.users)
        }
        fetchUsers()
    },[])
const EachUser=(props)=>{
    const {user}=props
    const {userid,username,usertype,firstname,lastname,email,phonenumber,profilephoto}=user
    return(
        <li>
            <p>userid: {userid}</p>
            <p>username: {username}</p>
            <p>email: {email}</p>
            <p>phonenumber: {phonenumber}</p>
            <p>usertype: {usertype}</p>
            <p>full  name: {firstname +" "+ lastname}</p>
            <p>email: {email}</p>
            <p>profilephoto: {profilephoto}</p>
        </li>
    )
}
    return(
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user)=>(
                    <EachUser key={user.userid} user={user}/>
                ))}
            </ul>
        </div>
    )
}


export default Users;