import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setUser } from '../../actions';
import NewTruckComponent from '../New/NewTruckComponent'



export default function NavigationBar() {

  const user = useSelector(state => state.user);
  const [newTruckPage,setNewTruckPage] = useState(false);
  const dispatch = useDispatch();


  // const logoutHandler = () => {
  //   fetch('http://localhost:3001/' + "users/logout", {
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   }).then(async response => {
  //     dispatch(setUser({...user,details:undefined,token:null}))
  //     window.localStorage.setItem("logout", Date.now())
  //   })
  // }

  

    

  return (
    <div className="navigationBarContainer">
      {newTruckPage ? <NewTruckComponent setNewTruckPage={setNewTruckPage} /> : ''}
        <ul>
          {/* <Link to="/" className="navigationRouterLink">  <li> <i className="bi bi-tools"></i> </li></Link> */}
             {/* <Link to="/trucks" className="navigationRouterLink"> <li><i className="bi bi-truck"></i> </li></Link>  */}
             <li> <i className="bi bi-truck" onClick={() => setNewTruckPage(prevState => !prevState)}></i>  </li>
             {user.token ? 
             <li>  
             <i  class="bi bi-door-closed"></i>
                </li>
              :
              <Link to="/login" className="navigationRouterLink"><li ><i className="bi bi-door-open "></i></li></Link>
               }

        </ul>
    </div>
  )
}
