import React from 'react'

const BarberApplicationData = () => {


    const barberapplications=[
        {
            "applicationId":1,
            "barberId":"Ramesh",
            "shopId":"",
            "stsatus":"pending",
            'description':''    ,
            "experience":"5 years",
        },
        {
            "applicationId":2,
            "barberId":"tarun",
            "shopId":"",
            "stsatus":"pending",
            'description':''    ,
            "experience":"5 years",
        },
        {
            "applicationId":3,
            "barberId":"varaun",
            "shopId":"",
            "stsatus":"pending",
            'description':''    ,
            "experience":"5 years",
        },
        {
            "applicationId":4,
            "barberId":"Charan",
            "shopId":"",
            "stsatus":"pending",
            'description':''    ,
            "experience":"5 years",
        },
        {
            "applicationId":5,
            "barberId":"kiran",
            "shopId":"",
            "stsatus":"pending",
            'description':''    ,
            "experience":"5 years",
        },
        {
            "applicationId":6,
            "barberId":"Ramesh",
            "shopId":"",
            "stsatus":"pending",
            'description':''    ,
            "experience":"5 years",
        },

    ]
  return (
    <div>
      <ul>
            {
                barberapplications.map((application)=>{
                    return(
                        <li key={application.applicationId}>
                            <p>{application.barberId}</p>
                            <p>{application.stsatus}</p>
                            <p>{application.experience}</p>
                        </li>
                    )
                })
            }
      </ul>
    </div>
  )
}

export default BarberApplicationData
