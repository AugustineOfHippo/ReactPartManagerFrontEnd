import React from 'react'
import { useEffect,useState,useCallback } from 'react'
import axios from 'axios'
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setParts } from '../../store/partSlice';
import { setTrucks,setCategories,setMakes } from '../../store/truckSlice';
import { useSelector } from 'react-redux';

import TruckMakeComponent from './TruckMakeComponent';
import CategoryComponent from './CategoryComponent';
import PartsContainer from './PartsContainer'
import EditTruckComponent from './EditTruckComponent';
import EditPartComponent from './EditPartComponent';
import NewTruckComponent from '../New/NewTruckComponent';
import AddPartComponent from './AddPartComponent';

export default function MainComponent() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user)
  const menu = useSelector(state => state.menu.value);

  // const fetchUserDetails = useCallback(() => {
  //   fetch(process.env.REACT_APP_API_ENDPOINT + "users/me", {
  //     method: "GET",
  //     credentials: "include",
  //     // Pass authentication token as bearer token in header
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userContext.token}`,
  //     },
  //   }).then(async response => {
  //     if (response.ok) {
  //       const data = await response.json()
  //       setUserContext(oldValues => {
  //         return { ...oldValues, details: data }
  //       })
  //     } else {
  //       if (response.status === 401) {
  //         // Edge case: when the token has expired.
  //         // This could happen if the refreshToken calls have failed due to network error or
  //         // User has had the tab open from previous day and tries to click on the Fetch button
  //         window.location.reload()
  //       } else {
  //         setUserContext(oldValues => {
  //           return { ...oldValues, details: null }
  //         })
  //       }
  //     }
  //   })
  // }, [setUserContext, userContext.token])





  // const verifyUser = useCallback(() => {
  //   fetch('http://3.89.86.239:4000/users/refreshToken', {
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //   .then(async (res) => {
  //     if (res.status === 200) {
  //       const data = await res.json();
  //       console.log(data);
  //       dispatch(setRefreshUser(data.token))
  //     } else {
  //       console.log('error')
  //       dispatch(setRefreshUser(null))
  //     }
  //     // call refreshToken every 45*2 minutes to renew the authentication token.
  //     setTimeout(verifyUser, 6 * 900000 * 2)
  //   })
  // },[user])

  //   useEffect(() => {
  //     verifyUser()
  //   }, [])

  // GET ALL TRUCKS AND PARTS

  useEffect(() => {
    const fetchAllTrucks = async() => {
       await axios.get('http://3.89.86.239:4000/parts')
         .then((res) => {
           dispatch(setParts(res.data))
         })
       .catch(error => console.log('Got an error getting parts: ' + error))

         await axios.get('http://3.89.86.239:4000/category')
         .then((res) => {
         dispatch(setCategories(res.data))
         })
       .catch(error => console.log('Got an error getting categories: ' + error))

          await axios.get('http://3.89.86.239:4000/makes')
            .then((res) => {
                dispatch(setMakes(res.data))
            })
       .catch(error => console.log('Got an error getting makes: ' + error))

        await axios.get('http://3.89.86.239:4000/trucks')
        .then((res) => {
          console.log('Main Component Sent Request')
            dispatch(setTrucks(res.data))
            })
        };
    fetchAllTrucks();
  },[])

  if(!loading) { return <h1>Loading..</h1>}


  return (
    <>
      {/* {user.token ?  */}
            <div className="flex relative">
              {menu === 'trucks' ? 
                      <TruckMakeComponent  key={v4()} /> 
              : 
                <CategoryComponent key={v4()} />
              }
                  <div className='relative h-screen overflow-auto flex w-full'>
                      <PartsContainer />
                      <EditTruckComponent />
                      <EditPartComponent />
                      <NewTruckComponent />
                      <AddPartComponent />
                  </div>
            </div>
      
      {/* //  :
      //   <LoginComponent />
      //   } */}
    
    </>
   

  )
}
