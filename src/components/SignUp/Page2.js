import React, {useState} from 'react';
import PhotoUpload from './PhotoUpload';


function Page2(props) {
    const [profilePicture, setProfilePicture] = useState(props.inputs.profilePicture);
    const [description, setDescription] = useState(props.inputs.description);


    const uploadPhoto = (picture) => { setProfilePicture(picture) };
    const setDescriptionInput = (event) => { setDescription(event.target.value) };

    const goToNextPage = () => {
        props.goToNextPage({profilePicture, description});
    }
    
    return (
        <div>
            <h1>Set your Profile picture</h1>
            <PhotoUpload picture={profilePicture} uploadPhoto={uploadPhoto}/>
            <h2>Enter a description:</h2>
            <textarea id="description" name="description" rows="4" cols="50" value={description} onChange={setDescriptionInput}/>
            <button onClick={goToNextPage}>Next</button>
        </div>
    )
}

export default Page2