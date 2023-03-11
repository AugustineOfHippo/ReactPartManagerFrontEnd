import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TruckPartComponent from './TruckPartComponent';


export default function PartsContainer() {

  const dispatch = useDispatch();
  const parts = useSelector(state => state.parts.parts)

  // useEffect(() => {
  //       const fetchParts = async() => {
  //         if(selectedtruck === '') {
  //           await axios.get('http://localhost:3001/parts')
  //              .then((res) => {
  //                dispatch(setParts(res.data))
  //              })
  //            .catch(error => console.log('Got an error getting parts: ' + error))
  //         } else {
  //           try {
  //             await axios.get('http://localhost:3001/parts/part/' + selectedtruck)
  //             .then((res) => {
  //                 dispatch(setParts(res.data))
  //             })
  //           } catch (error) {
  //             console.log('Error when getting parts for this truck ')
  //           }
  //         }
  //       }

  //       fetchParts();

  // },[])
  console.log('parts component reload')
  return (
    <div className=" p-2 overflow-auto w-full ">
            {parts.length > 0 ?
            <>
                  <div className=' flex gap-2 flex-wrap '>
              {parts.map((part,index) => (
                  <>
                    <TruckPartComponent part={part} key={index} />  
                  </>
              ))}
              </div>
            </>
            : 
                <>
                <div>
                  <h1>This truck has no parts</h1>
                </div>
                </>
            }
        </div>
  )
}
