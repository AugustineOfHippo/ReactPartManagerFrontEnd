import React from 'react'
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addParts } from '../../store/partSlice';
import { loadNewPart } from '../../store/menuSlice';
import { setCategories } from '../../store/truckSlice';

export default function AddPartComponent() {

    const dispatch = useDispatch();
    // const categories = useSelector(state => state.categories)
    const truckid = useSelector(state => state.menu.truckid)
    const showpage = useSelector(state => state.menu.newpart)
    const [truck,setTruck] = useState('');

    const [newPart,setNewPart] = useState({
        image:'',
        name:'',
        description:'',
        quantity:1,
        category:'',
        location:''
    });

    const [success,setSuccess] = useState(false);

    // const addPartFunction = () => {
    //     const doc1 = document.getElementById('addPartForm'+truckid);
    //         if(doc1.style.display === 'block'){
    //             doc1.style.display = 'none'
    //         } else {
    //             doc1.style.display = 'block'
    //         }
    //   }


    const handleImage = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",e.target.files[0]);
        formData.append("upload_preset","quy7tyzr");
        axios.post("https://api.cloudinary.com/v1_1/dqav5svfm/image/upload",formData)
        .then((res) => {
            console.log(res);
                setNewPart(prevState => ({
                    ...prevState,
                    image:res.data.url
                }))
            }) 
    }
    
    const handleChange = (e) => {
        setNewPart(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    useEffect(() => {
    const fetchTruck = async() => {
        await axios.get(`http://3.89.86.239:4000/trucks/${truckid}`)
            .then((res) => {
                setTruck(res.data)
        })
    }
    if(truckid !== '' && showpage){
        fetchTruck();
    }
    },[showpage])


    const onSubmit = async(e) => {
        e.preventDefault();
        await axios.post('http://3.89.86.239:4000/trucks/'+truckid,newPart)
        .then((res) => {
                dispatch(addParts(res.data));
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false)
                },2000)
        })
        await axios.get('http://3.89.86.239:4000/category/' +truckid)
        .then(res => {
        dispatch(setCategories(res.data))
        })
    }


return (
    <>
    { showpage ? 
        <div className="absolute border shadow-md bg-white left-2 top-4 rounded-md w-3/12" id={`addPartForm${truckid}`}>
            {success ? <Alert>Part Successfully Created</Alert> : ''}

            <div className="w-12/12 p-2">
                <img 
                className='rounded-md'
                src={truck.image}/>
            </div>

            <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                <div className="p-2 text-sm bg-slate-800">

                        <h4 className='capitalize text-center font-semibold text-white'>{truck.make} {truck.model} {truck.year}</h4>

                        <div className='flex flex-col'>
                            <label className="text-white">Image</label>
                            <label htmlFor="image" class=" bg-teal-400 hover:bg-teal-500 border-teal-400 hover:border-teal-500   text-center text-white  rounded-md p-1 cursor-pointer">Add</label>
                            <input className=" p-1  text-white font-semi hidden rounded-md " id="image" type="file" onChange={handleImage} name="image" />
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-white">Name</label> 
                            <input
                            className=' p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white'  
                            onChange={handleChange} name="name" placeholder='Part Name' />
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-white">Description</label> 
                            <input
                            className='p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white'  
                            onChange={handleChange} name="description" placeholder='Part Description'/>
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-white">Quantity</label>
                            <input
                            className=' p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white'  
                            onChange={handleChange} name="quantity" placeholder='Quantity' />
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-white">Category</label>
                            <input
                            className=' p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white'  
                            onChange={handleChange} name="category" placeholder='Category' />
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-white">Location</label> 
                            <input 
                            className=' p-1 rounded-md outline-none focus:bg-teal-400 focus:text-white' 
                            onChange={handleChange} name="location" placeholder='Location' />
                        </div>         
                </div>

                <div className="flex flex-col gap-1 p-2 bg-slate-800 rounded-b-md">
                    <button 
                    className='p-1 bg-teal-400 hover:bg-teal-500 text-white rounded-md' 
                    type="submit" > {success ? 'Please Wait' : 'Add Part'} </button>
                    <button
                    onClick={() => dispatch(loadNewPart())} 
                    className='p-1 bg-red-400 hover:bg-red-500 text-white rounded-md'
                    type="button"  >Cancel</button>
                </div>
            </form>
        </div>
    : ''

    }
    </>

    
)
}
