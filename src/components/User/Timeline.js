import React, { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'

import CreateNewPost from './CreateNewPost';
import CardLayout from '../Layouts/CardLayout';
import './postStyle.css'
import './timelineStyles.css'

import { UserContext } from '../../App';


function Timeline() {
  const [posts, setPosts] = useState([]);
  const TOKEN = localStorage.getItem('TOKEN')

  const {user} = useContext(UserContext);
  // console.log(user);

  // const pageNumber = useOutletContext();
  // console.log(outletContext)

  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const postIdSetRef = useRef();
  postIdSetRef.current = new Set();

  
  useEffect(() => {
    const config = {
      headers: { 
          'x-token': TOKEN
      },
      params : {
        page: pageNumber
      }
    }
    axios
      .get('http://localhost:3000/api/user/timeline', config)
      .then(
        response => {
          const newPosts = [];
          console.log(response.data.posts);
          response.data.posts.forEach(post => {
            if(!(postIdSetRef.current.has(post._id))) {
              postIdSetRef.current.add(post._id);
              newPosts.push(post);
            }
          })
          setPosts([...posts, ...newPosts]);
          setHasNextPage(response.data.hasNextPage);
        }
      )
      .catch(
        err => {
          // console.log(err?.response?.data);
          console.log(err);

        }

      ) 
  }, [pageNumber])

  const handleScroll = (e) => {
    // console.log("scrolling");
    // console.log({scrollHeight: e.target.scrollHeight});
    // console.log({scrollTop: e.target.scrollTop})
    const bottom = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight;
    // console.log({clientHeight: e.target.clientHeight})
    if (bottom < 1 && hasNextPage) { 
      alert("bottom");
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
 }

const likePost = (likedPost) => {
  console.log("like button pressed!");
  console.log(likedPost);
  const TOKEN = localStorage.getItem('TOKEN')

  const config = {
    headers: { 
        'x-token': TOKEN
    }
  }
  axios.put(`http://localhost:3000/api/post/${likedPost._id}/like`, {}, config)
    .then((response) => {
      const modifiedPosts = posts.map((post) => {
        if (post._id === likedPost._id) {
          if (response.data.postLiked) {
            post.numOfLikes += 1;
            console.log("post liked!");

          } else {
            post.numOfLikes -= 1
            console.log("post unliked!");

          }
        }
        return post
      });
      setPosts(modifiedPosts);
    })
    .catch(
      err => {console.log(err?.response?.data)}
    )
  
}


  const displayPost = (post) => {
    // console.log(post);
    const {description, image, numOfComments, numOfLikes} = post;
    // console.log(image);
    return (
    <>
      <div className='postHeader'>
        <div className='postProfilePicture'>
          <img crossOrigin="anonymous" src={`http://localhost:3000/${post.author.profilePicture}`} alt=''/>
        </div>
        <div className='postUserName'>
          {post.author.username}
        </div>
      </div>
      <hr/>
      <div className='postContent'>

        <div className='postDescription'>
          {description}
        </div>
        
        {
          image.length > 0 ?
          <div className='postImages'>
          {
            image.map((img, index) => {
              return <img crossOrigin='anonymous' src={`http://localhost:3000/${img}`} alt='' key={index} />
            })
          }
        </div>
        : null
        }

      </div>
      <hr/>

      <div className='postFooter'>
          <div className='upperFooter'>
            {`${numOfLikes} likes, ${numOfComments} comments`} 
          </div> 
          <div className='lowerFooter'>
            <div className='like' onClick={() => likePost(post)}>Like</div>
            <div className='comment'>Comment</div>
          </div>     
      </div>
    </>)
    // return "hello"
  }

 

  return (
    <div className='timeline' onScroll={handleScroll}>
      <CreateNewPost addNewPost={(post) => {setPosts([post, ...posts])}}/>
      {
        posts.map((post, index) => <CardLayout key={index}> {displayPost(post)} </CardLayout>)
      }
      
    </div>
    
  )
}

export default Timeline