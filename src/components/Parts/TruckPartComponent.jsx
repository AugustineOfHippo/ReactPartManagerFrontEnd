import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { loadEditPart } from '../../store/menuSlice';

import axios from 'axios';


export default function TruckPartComponent({part}) {

    const dispatch = useDispatch();
    const [quantity,setQuantity] = useState(part.quantity);

    const handleAddStock = async() => {
        await axios.put('http://18.141.159.166:4000/parts/edit/' + part._id + '/addQuantity')
        .then((res) => {
            setQuantity(prevState => prevState + 1)
        })
    }
    const handleRemoveStock = async() => {
        await axios.put('http://18.141.159.166:4000/parts/edit/' + part._id + '/removeQuantity')
        .then((res) => {
            setQuantity(prevState => prevState - 1)
        })
    }
    

    return (
        <>
        <div className=" relative flex flex-col  w-1/6 text-black  border shadow-md justify-center rounded-md text-xs items-center " >
                    <i
                    onClick={() => dispatch(loadEditPart({truckid:part.truck, partid:part._id}))}
                    class="z-40 cursor-pointer absolute top-1 right-1 bi bi-pencil-square text-lg text-white bg-slate-800 rounded-md px-1 hover:bg-teal-400">
                    </i>
            <>
                {/* IMAGE */}
                    <div 
                        className=" w-9/12 relative ">
                        <img
                        className='w-full h-40 object-contain bg-white' 
                        src={part.image} 
                        />
                    
                    </div>
                    {/* BODY */}
                    <div className="p-2 bg-slate-800 text-white w-full rounded-b-md" >
                        <h5 className="p-1 capitalize truncate"><span className='text-teal-400 uppercase text-xs font-semibold'>Name </span>{part.name}</h5>
                        <h5 className="p-1 capitalize truncate"><span className='text-teal-400 uppercase text-xs font-semibold '>Description </span >{part.description}</h5>
                        <h5 className='p-1 capitalize truncate'><span className='text-teal-400 uppercase text-xs font-semibold'>
                            Quantity </span>{quantity} 
                                <i className="bi bi-plus-circle ml-1 mr-1 hover:text-teal-400" onClick={() => handleAddStock()}></i>
                                <i onClick={() => handleRemoveStock()} className="bi bi-dash-circle hover:text-teal-400"></i>
                        </h5>
                        <h5 className='p-1 capitalize truncate'><span className='text-teal-400 uppercase text-xs font-semibold'>Location </span>{part.location}</h5>
                        <h5 className='p-1 capitalize truncate'><span className='text-teal-400 uppercase text-xs font-semibold'>Category </span>{part.category}</h5>
                    </div>
            </>
        </div>
        </>
)
}
