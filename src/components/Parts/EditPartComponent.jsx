import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { setCategories } from '../../store/truckSlice';
import { editParts,removeParts } from '../../store/partSlice';
import { loadEditPart } from '../../store/menuSlice';

export default function EditPartComponent() {

    const dispatch = useDispatch();
    const truckid = useSelector(state => state.menu.truckid)
    const showpage = useSelector(state => state.menu.editpart);
    const partid = useSelector(state => state.menu.partid)


      const [myTruck,setMyTruck] = useState('');
      const [myPart,setMyPart] = useState('');


      const handleChange = (e) => {
        setMyPart(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
      }

      const handleImage = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",e.target.files[0]);
        formData.append("upload_preset","quy7tyzr");
        axios.post("https://api.cloudinary.com/v1_1/dqav5svfm/image/upload",formData)
        .then((res) => {
            console.log(res);
                setMyPart(prevState => ({
                    ...prevState,
                    image:res.data.url
                }))
            }) 
    }

    const handleDelete = async(e) => {
      e.preventDefault();
        await axios.delete('http://35.169.107.36:4000/parts/delete/' + myPart._id)
            .then(async(res) => {
              dispatch(loadEditPart({truckid:myTruck._id, partid:myPart._id}));
              dispatch(removeParts(myPart))

              if(truckid !== ''){
                await axios.get('http://35.169.107.36:4000/category/' +truckid)
                    .then(res => {
                    dispatch(setCategories(res.data))
                    })
              } else {
                console.log("We dont have a truckid")
                await axios.get('http://35.169.107.36:4000/category')
                    .then((res) => {
                    dispatch(setCategories(res.data))
                    })
              }
            })
    }


      const onSubmit = async(e) => {
        e.preventDefault();
        await axios.put('http://35.169.107.36:4000/parts/edit/' + myPart._id,myPart)
        .then(async(res) => {

          dispatch(editParts(myPart));
          if(truckid !== ''){
            await axios.get('http://35.169.107.36:4000/category/' +truckid)
                .then(res => {
                dispatch(setCategories(res.data))
                })
          } else {
            console.log("We dont have a truckid")
            await axios.get('http://35.169.107.36:4000/category')
                .then((res) => {
                dispatch(setCategories(res.data))
                })
          }

        })
        .catch(err => console.log(err))



    }
    const getPartById = async() => {
      if(partid !== '') {
        await axios.get(`http://35.169.107.36:4000/parts/part/onePart/${partid}`)
        .then((res) => {
          setMyPart(res.data);
        })
        await axios.get(`http://35.169.107.36:4000/trucks/${truckid}`)
        .then((res) => {
                setMyTruck(res.data);
        })
      }
    }

    useEffect(() => {
      getPartById();
    },[showpage])

  return (
    <>  
    {showpage ?
      <div 
      className="w-3/12 absolute bg-slate-800   left-2 top-2 shadow-md rounded-md justify-center " 
      id={`editPart${myPart._id}`}
      >
          <i
          onClick={(e) => handleDelete(e)}
            class="cursor-pointer absolute top-1 right-1 bi bi-trash3 text-xl text-white bg-red-600 rounded-md px-1 hover:bg-red-700">
          </i>
          <div className=" flex justify-center bg-white">
              <img 
              alt="partimage"
              className='  h-48 object-contain '
              src={myPart.image}/>
          </div>
          <div className="flex flex-col text-sm p-2 ">

            <div className='flex flex-col'>
              <label className='text-white'>Image</label>
            <label htmlFor="image" class=" bg-teal-400 hover:bg-teal-500 border-teal-400 hover:border-teal-500   text-center text-white  rounded-md p-1 cursor-pointer">Add/Edit</label>

              <input className=" p-1  text-white font-semi hidden rounded-md " id="image" type="file" onChange={handleImage} name="image" />
            </div>

            <div className='flex flex-col'>
              <label className="text-white">Name</label>
              <input 
              placeholder={myPart.name}
              className="p-1  rounded-md outline-none focus:text-white focus:bg-teal-400 focus:border-teal-400 placeholder:text-gray-400"
              onChange={handleChange} 
              name="name" 
              />
            </div>

            <div className='flex flex-col'>
              <label className="text-white">Description</label>
              <input
              placeholder={myPart.description} 
              className="p-1  rounded-md outline-none focus:text-white focus:bg-teal-400 focus:border-teal-400 placeholder:text-gray-400"

              onChange={handleChange} name="description"  />
            </div>

            <div className='flex flex-col'>
              <label className="text-white">Quantity</label> 
              <input
              placeholder={myPart.quantity}
              className="p-1  rounded-md outline-none focus:text-white focus:bg-teal-400 focus:border-teal-400 placeholder:text-gray-400"

              onChange={handleChange} name="quantity"  />
            </div>

            <div className='flex flex-col'>
              <label className="text-white">Category</label>
              <input
              placeholder={myPart.category}
              className="p-1  rounded-md outline-none focus:text-white focus:bg-teal-400 focus:border-teal-400 placeholder:text-gray-400"

              onChange={handleChange} name="category"  />
            </div>
  
            <div className='flex flex-col'>
              <label className="text-white">Location</label>
              <input
              placeholder={myPart.location} 
              className="p-1  rounded-md outline-none focus:text-white focus:bg-teal-400 focus:border-teal-400 placeholder:text-gray-400"

              onChange={handleChange} name="location"  />
            </div>


          </div>
          <div className="flex flex-col gap-2 mt-2 shadow-md p-2">
            <button 
            className="p-1 bg-teal-400 hover:bg-teal-500 text-white rounded-md" 
            onClick={(e) => onSubmit(e)}>EDIT</button>
            <button
            onClick={() => dispatch(loadEditPart({truckid:myTruck._id, partid:myPart._id})) } 
            className="p-1 bg-red-400 hover:bg-red-500 text-white rounded-md" >CANCEL</button>
          </div>
    </div> 
    : 
    ''
    }
    </>
  )
}
