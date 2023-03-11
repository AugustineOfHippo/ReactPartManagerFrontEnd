import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { loadEditTruck,loadTrucks } from '../../store/menuSlice';
import { editTrucks, removeTrucks, removeMakes } from '../../store/truckSlice';
import { setParts } from '../../store/partSlice';

export default function EditTruckComponent() {


    const [myTruck,setMyTruck] = useState('');
    const dispatch = useDispatch();
    const truckid = useSelector(state => state.menu.truckid)
    const showpage = useSelector(state => state.menu.edittruck);




    const handleChange = (e) => {
        setMyTruck(prevState => ({
                ...prevState,
                [e.target.name]:e.target.value
        }))
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        await axios.put(`http://3.89.86.239:4000/trucks/${myTruck._id}`,myTruck)
        .then(res  => {
            console.log(res.data);
            dispatch(editTrucks(myTruck));
            dispatch(loadEditTruck());
        });
    }

    const fetchParts = async() => {
        await axios.get('http://3.89.86.239:4000/parts')
       .then((res) => {
           dispatch(setParts(res.data))
       })
       .then(() => {
        deleteTruck();
       })
   }
   const deleteTruck = async() => {
        await axios.delete(`http://3.89.86.239:4000/trucks/${myTruck._id}`)
       .then()
   }

   const handleDispatch = () => {
    dispatch(removeTrucks(myTruck));
    dispatch(removeMakes({make:myTruck.make, model:myTruck.model}));
    dispatch(loadTrucks())
   }
    

    const handleDelete = async(e) => {
        e.preventDefault();

        handleDispatch();
        await fetchParts();
            // await deleteTruck();
            // handleDispatch();

    }

    useEffect(() => {
        const fetchTruck = async() => {
            await axios.get(`http://3.89.86.239:4000/trucks/${truckid}`)
                .then((res) => {
                    setMyTruck(res.data)
            })
        }
        if(truckid !== '' && showpage){
            fetchTruck();
        }
    },[showpage])

return (
    <>
    {   
        showpage? 
            <div className="fixed shadow-md top-1 border rounded-md flex flex-col p-2 w-2/12 items-center bg-white ml-4" id={`editTruck${myTruck._id}`} >
                <div className="w-10/12 rounded-md relative">
                    <img src={myTruck.image} alt="truckimage"/>
                    <i
                    onClick={(e) => handleDelete(e)} 
                    className="hover:bg-red-800 cursor-pointer bi bi-trash3 absolute bg-red-600 text-white text-2xl top-1 right-1 px-1 rounded-md"></i>
                </div>
                <div>
                    <h4 className='capitalize font-semibold p-1'>{myTruck.make} {myTruck.model} {myTruck.year}</h4>
                </div>
                <div className="w-10/12 text-sm">
                    <div>
                            <div className="flex flex-col">
                                <label className='font-semibold'>Make</label> 
                                <input
                                placeholder={myTruck.make}
                                className='p-2 border rounded-md '
                                onChange={handleChange} name="make" />
                            </div>
                            <div className="flex flex-col">
                                <label className='font-semibold'>Model</label> 
                                <input 
                                placeholder={myTruck.model}
                                className='p-2 border rounded-md '
                                onChange={handleChange} name="model" 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className='font-semibold'>Year</label>
                                <input 
                                placeholder={myTruck.year}
                                className='p-2 border rounded-md ' 
                                onChange={handleChange} name="year" 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className='font-semibold'>Vin</label>
                                <input
                                placeholder={myTruck.vin} 
                                className='p-2 border rounded-md '
                                onChange={handleChange} name="vin"  
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className='font-semibold'>Engine</label>
                                <input 
                                placeholder={myTruck.engine}
                                className='p-2 border rounded-md ' 
                                onChange={handleChange} name="engine" 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className='font-semibold'>Transmission</label>
                                <input
                                placeholder={myTruck.transmission}
                                className='p-2 border rounded-md ' 
                                onChange={handleChange} name="transmission" 
                                />
                            </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <label className='font-semibold'>Rear axle</label>
                            <input
                            placeholder={myTruck.reardiffmodel} 
                            className='p-2 border rounded-md '
                            onChange={handleChange} name="reardiffmodel" 
                            />
                        </div>
                        <div className="flex flex-col">
                        <label className='font-semibold'>Lbs:</label>
                        <input
                        placeholder={myTruck.reardifflbs} 
                        className='p-2 border rounded-md ' 
                        onChange={handleChange} name="reardifflbs"
                        />
                        </div>
                        <div className="flex flex-col">
                        <label className='font-semibold'>Ratio:</label>
                        <input 
                        placeholder={myTruck.reardiffratio}
                        className='p-2 border rounded-md ' 
                        onChange={handleChange} name="reardiffratio" 
                        />
                        </div>
                        <div className="flex flex-col">
                        <label className='font-semibold'>Front axle</label>
                        <input 
                        className='p-2 border rounded-md ' 
                        onChange={handleChange} name="frontidffmodel" 
                        />
                        </div>
                        <div className="flex flex-col">
                        <label className='font-semibold'>Lbs</label>
                        <input 
                        className='p-2 border rounded-md ' 
                        onChange={handleChange} name="frontdifflbs" 
                        />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-10/12 gap-2 mt-2">
                    <button 
                    className="hover:bg-teal-500 bg-teal-400 text-white rounded-md p-1" 
                    onClick={(e) => onSubmit(e)}>Edit</button>
                    {/* <button className="bg-red-400 text-white " onClick={(e) => handleDelete(e)}>DELETE</button> */}
                    <button
                    className="hover:bg-red-500 bg-red-400 text-white rounded-md p-1"
                    onClick={() => dispatch(loadEditTruck())}>Cancel</button>
                </div>
            </div>     
        :
''
    }
    </>
)
}
