import React from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux';
import { setCategories } from '../../store/truckSlice';
import { setParts } from '../../store/partSlice';
import { useEffect } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { loadTrucks } from '../../store/menuSlice';
import { loadEditTruck,loadNewPart } from '../../store/menuSlice';


export default function CategoryComponent() {

    const categories = useSelector(state => state.trucks.categories)
    const truckid = useSelector(state => state.menu.truckid);
    const parts = useSelector(state => state.parts.parts);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchCategories = async() => {
            if(truckid === ''){
                await axios.get('http://18.139.225.131:4000/category')
                .then((res) => {
                dispatch(setCategories(res.data))
                })
                await axios.get('http://18.139.225.131:4000/parts')
                .then((res) => {
                dispatch(setParts(res.data))
                })
            .catch(error => console.log('Got an error getting parts: ' + error))
            } else if (truckid !== '') {
                await axios.get('http://18.139.225.131:4000/category/' +truckid)
                .then(res => {
                dispatch(setCategories(res.data))
                })
                await axios.get('http://18.139.225.131:4000/parts/part/' + truckid)
                .then((res) => {
                dispatch(setParts(res.data))
                })
            }
        };
        fetchCategories();
    },[])


    // ONLY CHANGES PARTS
    const filterByCat = async(e,category,truckId) => {
        e.preventDefault();
        // IF I AM VIEWING A TRUCK, GET CATEGORIES AND PARTS THAT INCLUDE THAT TRUCKS
            if(truckid !== ''){
                await axios.get('http://18.139.225.131:4000/parts/' + category +'/' +truckId)
                .then((res) => {
                    dispatch(setParts(res.data));
                })
            } else {
                // IF I AM VIEWING ALL PARTS, LOAD THE CHOSEN CATEGORY AND PART
                await axios.get('http://18.139.225.131:4000/parts/' + category)
                .then((res) => {
                    dispatch(setParts(res.data));
                })
            }
    }

    const viewAll = async() => {
        if(truckid !== ''){
            await axios.get('http://18.139.225.131:4000/parts/part/' + truckid)
                    .then((res) => {
                        dispatch(setParts(res.data))
                    })
        } else {
            await axios.get('http://18.139.225.131:4000/parts')
                .then((res) => {
                dispatch(setParts(res.data))
                })
        }
    }

return (
            
            <div className="relative bg-slate-900 text-slate-400 h-screen gap-1 p-3 w-1/6 overflow-auto flex-shrink-0 ">
                        {parts.length < 0 ?
                        <p>No Parts Found</p>
                        :
                        <>
                                    <div
                                    onClick={() => dispatch(loadTrucks())}
                                    className='flex gap-1 items-center cursor-pointer hover:text-teal-400 w-1/4'>
                                        <FaArrowAltCircleLeft />
                                        <h2 className=''>Back</h2>
                                    </div>
                                <ul
                                id="catlist" 
                                className='text-center text-white text-sm'>
                                    {/* If we dont have a truck ID , dont show Edit and Add Part Button */}
                                    {truckid !== ''
                                    ? 
                                    <>
                                        <li
                                        onClick={() => dispatch(loadEditTruck())}
                                        className='  hover:bg-teal-500 cursor-pointer bg-teal-400 rounded-md capitalize font-light py-2  my-2 '>
                                        Edit Truck
                                        </li>
                                        <li
                                        onClick={() => dispatch(loadNewPart())}
                                        className='  hover:bg-teal-500 cursor-pointer bg-teal-400 rounded-md capitalize font-light py-2  my-2 '
                                        >
                                        Add Part
                                        </li>
                                    </>
                                    : 
                                    ''}
                                    
                                        <li
                                        onClick={viewAll}
                                        className=' hover:bg-slate-700 cursor-pointer bg-slate-800 capitalize font-light py-2  my-2 rounded-md ' 
                                        >
                                        View All
                                        </li>
                                    {categories.length > 0 ?
                                    <>
                                            {categories.map((cat,index) => (
                                                <>
                                                    {cat.parts.length > 0 ?
                                                    <li
                                                    onClick={(e) => filterByCat(e,cat.name,truckid)}
                                                    className='relative hover:bg-slate-700 cursor-pointer bg-slate-800 capitalize font-light py-2  my-2 rounded-md ' 
                                                    // onClick={(e) => filterByCat(e,cat.name,selectedTruck._id)} 
                                                    key={index}
                                                    >
                                                    {cat.name}   {cat.parts.length}
                                                    </li>   : '' }
                                                </>
                                            ))}
                                    </> 
                                    : 
                                    <p>No Parts Found</p>
                                    }
                                </ul>
                        </>
                        }
            </div>
)
}
