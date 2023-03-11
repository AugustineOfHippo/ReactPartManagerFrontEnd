import React, { useEffect,useState } from 'react'
import { v4 } from 'uuid';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// import { setParts,setCategories,setSelectedTruck,deleteTruck,setMakes } from '../../actions';
import { setCategories } from '../../store/truckSlice';
import { setParts } from '../../store/partSlice';
import EditTruckComponent from './EditTruckComponent';
import AddPartComponent from './AddPartComponent';
import { loadCategories } from '../../store/menuSlice';


// MATERIAL UI


export default function TruckCardComponent1({truck}) {

  const dispatch = useDispatch();
  // const [myTruck,setMyTruck] = useState(truck);
  // const [categories,setMyCategories] = useState(truck.partcategories)

  const loadParts = async() => {
    // dispatch(setSelectedTruck(truck));
    // setShowParts(prevState => !prevState)
    dispatch(loadCategories(truck._id))
      await axios.get('http://localhost:3001/parts/part/' + truck._id)
      .then((res) => {
          dispatch(setParts(res.data))
      })

      await axios.get('http://localhost:3001/category/' +truck._id)
      .then(res => {
        dispatch(setCategories(res.data))
      })
    
  }



  // const dropDownFunction = () => {
  //   const doc1 = document.getElementById('truckCardDropDown'+truck._id);
  //       if(doc1.style.display === 'flex'){
  //           doc1.style.display = 'none'
  //       } else {
  //           doc1.style.display = 'flex'
  //       }
  // }
  // const editTruckDropDownFunction = () => {
  //   const doc1 = document.getElementById('editTruck'+truck._id);
  //       if(doc1.style.display === 'flex'){
  //           doc1.style.display = 'none'
  //       } else {
  //           doc1.style.display = 'flex'
  //       }
  // }
  // const addPartFunction = () => {
  //   const doc1 = document.getElementById('addPartForm'+truck._id);
  //       if(doc1.style.display === 'block'){
  //           doc1.style.display = 'none'
  //       } else {
  //           doc1.style.display = 'block'
  //       }
  // }
  // const handleDelete = async(e) => {
  //   e.preventDefault();
  //   await axios.delete('http://localhost:3001/trucks/'+ truck._id)
  //       .then((res) => {
  //       })
  //       await axios.get('http://localhost:3001/makes')
  //       .then((res) => {
  //         // dispatch(deleteTruck(truck._id))
  //         // dispatch(setMakes(res.data))
  //           })
  //      .catch(error => console.log('Got an error getting makes: ' + error))
  // }



  // console.log(truck);


  return (
    // 

      <li
      onClick={() => loadParts()}
      key={v4()} 
      className=" my-2 rounded-md cursor-pointer hover:bg-teal-400">
              <div  className='flex items-center  p-2 rounded-md' >

              <div className='relative'>
                  <img
                  className='rounded-sm object-cover w-12 h-12'
                  src={truck.image} />
              </div>

              <div className="font-medium capitalize text-xs "  >
                      <h4 className='text-center my-1 font-semibold uppercase p-1'>{truck.make} {truck.model} {truck.year}</h4>
                      <h5 className='text-left p-1 rounded-sm my-1'>{truck.vin}</h5>
                      {/* <h5 className='text-left p-1 bg-slate-700 rounded-sm my-1'>Engine:{truck.engine}</h5> */}
                      {/* <h5 className='text-left p-1 bg-slate-700 rounded-sm my-1'>Gearbox:{truck.transmission}</h5> */}
                      {/* <h5 className='text-left p-1 bg-slate-700 rounded-sm my-1'>Diff:{truck.reardiffmodel}</h5>   */}
                      {/* <h5 className='text-left p-1 bg-slate-700 rounded-sm my-1'>Ratio:{truck.reardiffratio}</h5> */}
              </div>

          </div>
      </li>

  )
}
