import React from 'react'
import TruckCardComponent1 from './TruckCardComponent1'
import { useSelector, useDispatch } from 'react-redux'
import { v4 } from 'uuid';
import { useEffect,useState } from 'react';
import axios from 'axios';
// import { setTrucks } from '../../store/truckSlice';


export default function TruckModelComponent({model,make}) {
    const dispatch = useDispatch();
    const trucks = useSelector(state => state.trucks.trucks);
    const [showTrucks,setShowTrucks] = useState(false);

    // const openModelMenu = (arg) => {
    //     const doc1 = document.getElementById(arg+'Model');
    //     if(doc1.style.display === 'block'){
    //         doc1.style.display = 'none'
    //     } else {
    //         doc1.style.display = 'block'
    //     }
    // }

return (
    <ul id={`${make.make}Models`}
    className="hidden text-center text-white text-sm  rounded-md">
        {/* MAP THROUGHT MODELS */}
            <>
                {
                    // CHECK IF WE HAVE ANY MODELS FOR THIS MAKE
                    model.quantity > 0 ?       
                    <> 
                    <div 
                        onClick={() => setShowTrucks(prevState => !prevState)} 
                        className='relative flex justify-center cursor-pointer bg-teal-600 hover:bg-teal-700 capitalize font-light py-2 px-20 my-2 rounded-md'>
                        <li key={v4()} 
                            className="text-center" >
                            {model.name}
                        </li>
                        <p className='absolute right-3 '>{model.quantity}</p>
                    </div>
                    
                    {showTrucks ? 
                    <>
                            <ul id={`${model.name}Model`} 
                                className="">
                                {/* MAP THROUGH ALL TRUCKS */}
                                {trucks.map(truck => (
                                    <>
                                        {
                                            // CHECK IF TRUCK.MODEL MATCHES THIS MODEL
                                            truck.model === model.name ? 
                                            <TruckCardComponent1 truck={truck} />
                                            // ''
                                        : 
                                        ''
                                    }
                                    </>
                                ))} 
                            </ul>
                    </> 
                    : 
                    '' }

                    </> 
                    : 
                    ''
                }   
            </>
    </ul>           
)
}
