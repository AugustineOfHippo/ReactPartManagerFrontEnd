import React, { useEffect } from 'react'
import TruckModelComponent from './TruckModelComponent'
import { v4 } from 'uuid';

import { useSelector,useDispatch } from 'react-redux'
import { setMakes, setCategories } from '../../store/truckSlice';
import { loadNewTruck, loadAllParts } from '../../store/menuSlice';
import { setParts } from '../../store/partSlice';
import axios from 'axios';

export default function TruckMakeComponent() {

    const dispatch = useDispatch();

    const makes = useSelector(state => state.trucks.makes)

    const openMenu = async(arg) => {
      let found = document.getElementById(arg+'Models');
      if(found.style.display === 'block'){
        found.style.display = 'none';
      } else {
        found.style.display = 'block';
      }
    }
    const showAll = async() => {
        await axios.get('http://35.169.107.36:4000/parts')
        .then((res) => {
          dispatch(setParts(res.data))
        })
        await axios.get('http://35.169.107.36:4000/category')
        .then((res) => {
          dispatch(loadAllParts())
        dispatch(setCategories(res.data))
        })
    }
    useEffect(() => {
        const fetchMakes = async() => {
          await axios.get('http://35.169.107.36:4000/makes')
          .then((res) => {
          dispatch(setMakes(res.data))
          })
          .catch(error => console.log('Got an error getting categories: ' + error))
        }
        fetchMakes();

    },[])
  return (
    <div className='bg-slate-900 text-slate-400 h-screen gap-1 p-3 w-1/6 overflow-auto flex-shrink-0'>
        <ul className='text-center text-white text-sm '>
                <li
                  onClick={() => dispatch(loadNewTruck())}
                  className="hover:bg-teal-500 cursor-pointer bg-teal-400 capitalize font-light py-2 px-20 rounded-md my-2">
                  Add Truck
                </li>
                <li 
                  className="hover:bg-slate-700 cursor-pointer bg-slate-800 capitalize font-light py-2 px-20 rounded-md"
                  onClick={() => showAll()}>
                  All
                </li>
                  {makes.map(make => (
                <>
                {
                  make.total > 0 ? 
                  <>
                  <div onClick={() => openMenu(make.make)} 
                    className='justify-center relative flex hover:bg-slate-700 cursor-pointer bg-slate-800 capitalize font-light py-2 px-20 my-2 rounded-md'>
                    <li className='text center text-slate-200' key={v4()} >
                      {make.make}
                    </li>
                  </div> 
                  {make.models.map(model => (
                    <>
                      <TruckModelComponent  model={model} key={`${make}Model`} make={make} />
                    </>
                  ))}
                  </>
                  : 
                  ''
                }               
                </>
            ))}
        </ul>
    </div>
  )
}
