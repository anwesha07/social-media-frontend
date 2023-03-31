import React, {useState, useRef, useEffect} from 'react'

function PhotoUpload(props) {

    const [picture, setPicture] = useState(props.picture);
    const [preview, setPreview] = useState(null);

    const fileInputRef = useRef();

    //set the blob whenever picture changes
    useEffect(() => {
        if (picture) generatePreview();
        
        //remove blob from memory to avoid memory leaks
        return () => removePreview();
    }, [picture]);
    
    const generatePreview = () => {
        setPreview(URL.createObjectURL(picture)) //creating a blob and returning its url
    }
    
    const removePreview = () => {
        if (preview) URL.revokeObjectURL(preview); //removing the blob from memory to prevent memory leak
        setPreview(null);
    }
    
    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]); //setting the file object in state           
            props.uploadPhoto(e.target.files[0]);
        }

    }


    const removePicture = () => {
        if (picture) {
            //the value field for input type file can only be set as empty string 
            fileInputRef.current.value = '';
            setPicture(''); 
            props.uploadPhoto('');
        }
    }


    return (
    <div>
        <form>
            <input type="file" accept="image/*" onChange={onChangePicture} ref={fileInputRef} />
            
        </form>
        {
            preview && 
            <div>
                <img src={preview} />
                <button onClick={removePicture}>&times;</button>
            </div>
        }
    </div>
    )
}

export default PhotoUpload