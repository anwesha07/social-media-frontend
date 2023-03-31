import React, {useState, useContext} from 'react'
import { Link, Outlet } from 'react-router-dom';
import './layoutStyle.css';

import { UserContext } from '../../App';



function BaseLayout(props) {
    // alert("BaseLayout page")

    const {user} = useContext(UserContext);

    // console.log(user);
    const [searchValue, setSearchValue] = useState('');

    // const [reachedEndOfContent, setReachedEndOfContent] = useState(false);
    // const [pageNumber, setPageNumber] = useState(1);

    // const handleScroll = (e) => {
    //     // console.log("scrolling");
    //     // console.log({scrollHeight: e.target.scrollHeight});
    //     // console.log({scrollTop: e.target.scrollTop})
    //     const bottom = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight;
    //     // console.log({clientHeight: e.target.clientHeight})
    //     if (bottom <= 1) { 
    //         alert("bottom");
    //         setReachedEndOfContent(true);
    //         setPageNumber((prevPageNumber) => prevPageNumber + 1);
    //     }
    //  }

    return (
        <div className='layout'>
            <div className='navBar'>
                <div className='icon'> <h2>icon</h2> </div>
                <div className='searchBox'>
                    <input type='text' placeholder={'Search'} value={searchValue} onChange={(event) => {setSearchValue(event.target.value)}}/>
                </div>
                <div className='user'>
                    <div className='navBarProfilePicture'>
                        <img crossOrigin="anonymous" src={`http://localhost:3000/${user.profilePicture}`} alt=''/>
                    </div>
                    <div className='navBarUserName'>
                        <h2>{user.username}</h2>
                    </div>
                </div>
            </div>
            
            <div className='sideBar'>
                <ul>
                    <li>
                        <Link to='/timeline'>Home</Link>
                    </li>
                    <li>
                        <Link to='/profile'>{user.username}</Link>
                    </li>
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                </ul>
            </div>
            <div className='content'><Outlet/></div>
            
        </div>
    )
}

export default BaseLayout