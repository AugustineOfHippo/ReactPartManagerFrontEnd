
import React,{useState} from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setSelectedTruck } from '../../actions';
import { useEffect } from 'react';
import { addTrucks,setMakes } from '../../store/truckSlice';
import { loadNewTruck } from '../../store/menuSlice';

export default function NewTruckComponent() {

    const dispatch = useDispatch();
    const newtruck = useSelector(state => state.menu.newtruck)


  const [newTruck,setNewTruck] = useState({
      truck:{
          make:"",
          model:"",
          year:"",
          vin:"",
          engine:"",
          transmission:"",
          reardiffmodel:"",
          reardiffratio:"",
          reardifflbs:"",
          frontdiffmodel:"",
          frontdifflbs:""
      }
  });

  const handleChange = (e) => {
      setNewTruck(prevState => ({
          truck:{
              ...prevState.truck,
              [e.target.name]:e.target.value
          }
      }))
  };
  const handleImage = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",e.target.files[0]);
        formData.append("upload_preset","quy7tyzr");
        axios.post("https://api.cloudinary.com/v1_1/dqav5svfm/image/upload",formData)
        .then((res) => {
            setNewTruck(prevState => ({
                    truck : {
                        ...prevState.truck,
                        image:res.data.secure_url
                }
            }))
        }) 
        .catch(err => alert('Got an error: ' + err))
}
  const onSubmit = async(e) => {
      e.preventDefault();

      await axios.post('http://3.89.86.239:4000/trucks',newTruck)
      .then(res => {
        console.log(res.data);
          dispatch(addTrucks(res.data));
      })
      .catch(err => alert('Got an error: ' + err))
      await axios.get('http://3.89.86.239:4000/makes')
            .then((res) => {
                dispatch(setMakes(res.data))
            })
       .catch(error => console.log('Got an error getting makes: ' + error))
      
  }

return (
    <>
        {newtruck ?
        <div className="absolute bg-slate-800 w-3/12 shadow-md p-3 left-2 top-2 rounded-md text-sm">
            <div className="">
                <h4 className='text-md uppercase text-white font-semi text-center'>Add new truck</h4>
            <form onSubmit={onSubmit}>
                <div className='flex flex-col'>
                    <label className='text-white'>Image</label>
                    <label htmlFor="image" class=" bg-teal-400 hover:bg-teal-500 border-teal-400 hover:border-teal-500   text-center text-white  rounded-md p-1 cursor-pointer">Add</label>
                    <input className=" p-1  text-white font-semi hidden rounded-md " id="image" type="file" onChange={handleImage} name="image" />
                </div>
                    <div className="flex flex-col gap-1 ">
                        <label htmlFor="make" className="text-white">Make</label>
                        <input id="make" placeholder="Make" name="make" onChange={handleChange} className=" p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="model" className="text-white">Model</label>                      
                        <input id="model" placeholder="Model" name="model" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" required />                          
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="year" className="text-white">Year</label>
                        <input id="year" placeholder="Year" name="year" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" required /> 
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="vin" className="text-white">Vin</label>
                        <input id="vin" placeholder="Vin" name="vin" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white"  /> 
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="engine" className="text-white">Engine</label>
                        <input id="engine" placeholder="Engine" name="engine" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white"  /> 
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="transmission" className="text-white">Transmission</label>
                        <input id="transmission" placeholder="Transmission" name="transmission" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white"  /> 
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="frontdiffmodel" className="text-white">Front Axle</label>
                        <input id="frontdiffmodel" placeholder="Model" name="frontdiffmodel" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" />
                        <input id="frontdifflbs" placeholder="Lbs" name="frontdifflbs" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" /> 
                    </div>
                    <div className="flex flex-col gap-1">
                            <label htmlFor="reardiffmodel" className="text-white">Rear Axle</label>
                         {/* <div> */}
                            <input id="reardiffmodel" placeholder="Model" name="reardiffmodel" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" /> 
                            <input id="reardifflbs" placeholder="Lbs" name="reardifflbs" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" /> 
                            <input id="reardiffratio" placeholder="Ratio" name="reardiffratio" onChange={handleChange} className="p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white" /> 
                         {/* </div> */}
                    </div>
                    <div className='flex flex-col gap-1 mt-1'>
                        <button type="submit" className="bg-teal-400 hover:bg-teal-500 text-white rounded-md p-1">Add</button>
                        <button type="button" className="bg-red-400 hover:bg-red-500 text-white rounded-md p-1" 
                        onClick={() => dispatch(loadNewTruck())}>Cancel</button>
                    </div>
            </form>
        </div>
    </div> 
: 
''}
</>


)
}
