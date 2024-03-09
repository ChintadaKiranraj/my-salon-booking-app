
import React,{useEffect,useState} from 'react'


const Shops=()=>{

    const [shops,setShops]=useState([])
    useEffect(()=>{
        const fetchShops=async()=>{
            const response=await fetch("http://localhost:4001/api/get-all-shops")
            const shopsFromServer=await response.json()
            setShops(shopsFromServer.shops)
            console.log(shopsFromServer.shops)
        }
        fetchShops()
    },[])

    const EachShop=(props)=>{
        const {shop}=props
        const {shopid,shopname,location,ownername,phonenumber,userid,owneremail}=shop
        return(
            <li>
                <p>shopid: {shopid}</p>
                <p>userid: {userid}</p>
                <p>shopname: {shopname}</p>
                <p>location: {location}</p>
                <p>ownername: {ownername}</p>
                <p>owneremail: {owneremail}</p>
                <p>shop Phone number: {phonenumber}</p>
            </li>
        )
    }
    return(
        <div>
            <p>list of  the shops appeares here to the correesponding  shop owner</p>
           <ul>
                {shops.map((shop)=>(
                     <EachShop key={shop.shopid} shop={shop}/>
                ))}
           </ul>
        </div>
    )
}
export default Shops