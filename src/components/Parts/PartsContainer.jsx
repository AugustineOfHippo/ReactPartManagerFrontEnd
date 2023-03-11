import React from 'react'
import { useSelector } from 'react-redux';
import TruckPartComponent from './TruckPartComponent';


export default function PartsContainer() {

  const parts = useSelector(state => state.parts.parts)


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
