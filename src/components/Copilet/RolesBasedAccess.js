// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const RolesBasedAccess = () => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://api.example.com/data');
//                 setData(response.data);
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         fetchData();
//     }, []);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!data) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Data from API:</h1>
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//     );
// };

// export default RolesBasedAccess;