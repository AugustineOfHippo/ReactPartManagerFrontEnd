import React from 'react'
import { useEffect } from 'react'
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

  const menu = useSelector(state => state.menu.value);
  
  
  const dispatch = useDispatch();
  // GET ALL TRUCKS AND PARTS
  
  useEffect(() => {
    const fetchAllTrucks = async() => {
      await axios.get('http://18.141.159.166:4000/parts')
        .then((res) => {
          dispatch(setParts(res.data))
        })
      .catch(error => console.log('Got an error getting parts: ' + error))

        await axios.get('http://18.141.159.166:4000/category')
        .then((res) => {
        dispatch(setCategories(res.data))
        })
      .catch(error => console.log('Got an error getting categories: ' + error))

          await axios.get('http://18.141.159.166:4000/makes')
            .then((res) => {
                dispatch(setMakes(res.data))
            })
      .catch(error => console.log('Got an error getting makes: ' + error))

        await axios.get('http://18.141.159.166:4000/trucks')
        .then((res) => {
          ('Main Component Sent Request')
            dispatch(setTrucks(res.data))
            })
        };
    fetchAllTrucks();
  },[])



  return (
    <>
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
    </>

  )
}
