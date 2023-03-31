import React, {useState, useRef, useEffect} from 'react'

function MultiPhotoUpload(props) {

    const [pictureArray, setPictureArray] = useState([]);
    const [previewArray, setPreviewArray] = useState([]);

    const fileInputRef = useRef();

    //set the blob whenever picture changes
    useEffect(() => {
        if (pictureArray.length > 0) {
            props.uploadPhoto(pictureArray);
            generatePreview();
        }
        
        //remove blob from memory to avoid memory leaks
        return () => removePreview();
    }, [pictureArray]);
    
    const generatePreview = () => {
        const previews = [];
        pictureArray.forEach(picture => {
            previews.push(URL.createObjectURL(picture));
        });
        // console.log(pictureArray)
        // const previews = pictureArray.map((picture, index) => {
        //     URL.createObjectURL(picture);
        // });
        setPreviewArray(previews);
        // setPreview(URL.createObjectURL(picture)) //creating a blob and returning its url
    }
    
    const removePreview = () => {
        if (previewArray.length > 0) {
            previewArray.forEach(preview => {
                URL.revokeObjectURL(preview); //removing the blob from memory to prevent memory leak
            }); 
        } 
        setPreviewArray([]);
    }
    
    const onChangePicture = (e) => {
        if (e.target.files) {
            setPictureArray([...pictureArray,...e.target.files]); //setting the file object in state           
            // props.uploadPhoto([...e.target.files]);
        }
    }


    const removePicture = (indexToRemove) => {
        if (pictureArray.length > indexToRemove) {
            //the value field for input type file can only be set as empty string 
            // fileInputRef.current.value = '';
            // setPicture(''); 
            // props.uploadPhoto('');

            setPictureArray(pictureArray.filter((picture, index) => index != indexToRemove))
        }
    }

    const handleImageInputClick = () => {
        fileInputRef.current.click();
    }


    return (
        <>
            <input id='pictureInput' type="file" accept="image/*" onChange={onChangePicture} ref={fileInputRef} multiple/>
            <div className={`imageInputBox ${pictureArray.length !== 0 ? "imageUploadedInputBox" : ""}`} onClick={handleImageInputClick} > Upload images</div>

            {
                previewArray.length > 0 && 
            
                previewArray.map((preview, index) => {
                    return (
                        <div className='createPostImagePreview' key={index}>
                            <img src={preview} />
                            <button className='removePictureButton' onClick={() => {removePicture(index)}}>&times;</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default MultiPhotoUpload