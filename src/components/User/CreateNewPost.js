import React, { useState, useContext, useEffect } from 'react'
import CardLayout from '../Layouts/CardLayout'
import Modal from '../Modals'
import axios from 'axios'
import { UserContext } from '../../App';
import './createNewPostStyle.css'
import MultiPhotoUpload from './MultiPhotoUpload';


function CreateNewPost(props) {
    const [displayModal, setDisplayModal] = useState(false);
    const [createPostText, setCreatePostText] = useState('');
    const [createPostImage, setCreatePostImage] = useState([]);

    const {user} = useContext(UserContext);

    useEffect(() => {
        setCreatePostImage('');
        setCreatePostText('');
    }, [displayModal]);


    const createPostModalFunc = () => {
        setDisplayModal(true);
    }

    const displayModalButton = () => {
        return(
            <div>
                <button className='closeModal' onClick={() => setDisplayModal(false)}>&times;</button>
            </div>       
        );
    }
    const displayModalHeader = () => {
        return (
            <div>
                Create Post
            </div>
        )
    }

    const uploadPhoto = (pictureArray) => { 
        // console.log(pictureArray);
        setCreatePostImage([...pictureArray]) };


    const modalContents = () => {
        return (
            <div className='createPostBody'>
                <div className='createPostTextInput'>
                    <textarea id="newPostText" className='newPostTextArea' name="newPostText" rows="4" cols="50" value={createPostText} onChange={(event) => {setCreatePostText(event.target.value)}} />
                </div>
                <div className={`createPostImageInput ${createPostImage.length !== 0 ? "createPostImageInputUploaded" : ""}`}>
                    {/* <label className='innerImageInput'> */}
                     <MultiPhotoUpload picture={''} uploadPhoto={uploadPhoto}/>
                    {/* </label> */}
                </div>
                <div className='submitPost'>
                <button onClick={sendPost}>Post</button>
                </div> 
            </div>
        )
    }


    const sendPost = () => {
        console.log(createPostImage);
        const token = localStorage.getItem('TOKEN');
        const formData = new FormData();
        formData.append("description", createPostText);

        if(createPostImage.length > 0) {
            createPostImage.forEach((imageObj) => {
            // console.log(imageObj);
            formData.append('images', imageObj);
            })
        }

        const config = {
            headers : { 
                'x-token' : token,
                'Content-Type': 'multipart/form-data'
            }
        }
        axios
            .post('http://localhost:3000/api/post', formData, config)
            .then(response => {
                //closing modal
                setDisplayModal(false);
                alert("new Post created!")
                console.log(response.data);
                props.addNewPost({...response.data, numOfLikes: 0, numOfComments: 0})
            })
            .catch(err => {
                console.log(err.response?.data);
            });

    }






  return (
    <>
        <CardLayout>
            <div>
                <div className='createPostUpperHeader'>
                    <div className='createPostprofilePicture' >
                        <img crossOrigin="anonymous" src={`http://localhost:3000/${user.profilePicture}`} alt=''/>
                    </div>
                    <div className='inputPost' onClick={createPostModalFunc}>
                        <div>whats on your mind?</div>
                    </div>
                </div>
            </div>
        </CardLayout>
        {displayModal ? <Modal displayHeading={displayModalHeader()} displayButton={displayModalButton()}>{modalContents()}</Modal> : null}
    </>
  )
}

export default CreateNewPost