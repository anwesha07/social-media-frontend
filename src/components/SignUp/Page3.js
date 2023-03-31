import React, {useState} from 'react';
import PhotoUpload from './PhotoUpload';


function Page3(props) {
    const [coverPicture, setCoverPicture] = useState(props.inputs.coverPicture);

    const uploadPhoto = (picture) => {
        setCoverPicture(picture);
    }

    const goToNextPage = () => {
        props.goToNextPage({coverPicture});
    }

    return (
        <div>
            <h1>Set your Cover picture</h1>
            <PhotoUpload picture={coverPicture} uploadPhoto={uploadPhoto}/>
            <button onClick={goToNextPage}>Next</button>
        </div>
    )
}

export default Page3