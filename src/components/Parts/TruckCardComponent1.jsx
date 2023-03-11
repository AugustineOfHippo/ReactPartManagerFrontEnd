import React from 'react'
import { v4 } from 'uuid';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/truckSlice';
import { setParts } from '../../store/partSlice';
import { loadCategories } from '../../store/menuSlice';


// MATERIAL UI


export default function TruckCardComponent1({truck}) {

  const dispatch = useDispatch();

  const loadParts = async() => {
    dispatch(loadCategories(truck._id))
      await axios.get('http://3.89.86.239:4000/parts/part/' + truck._id)
      .then((res) => {
          dispatch(setParts(res.data))
      })

      await axios.get('http://3.89.86.239:4000/category/' +truck._id)
      .then(res => {
        dispatch(setCategories(res.data))
      })
    
  }


  return (

      <li
      onClick={() => loadParts()}
      key={v4()} 
      className=" my-2 rounded-md cursor-pointer hover:bg-teal-400">
              <div  className='flex items-center  p-2 rounded-md' >

              <div className='relative'>
                  <img
                  alt="truckcardimage"
                  className='rounded-sm object-cover w-12 h-12'
                  src={truck.image} />
              </div>

              <div className="font-medium capitalize text-xs "  >
                      <h4 className='text-center my-1 font-semibold uppercase p-1'>{truck.make} {truck.model} {truck.year}</h4>
                      <h5 className='text-left p-1 rounded-sm my-1'>{truck.vin}</h5>
              </div>
          </div>
      </li>
  )
}
