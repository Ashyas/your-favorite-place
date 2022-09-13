import React, {useRef, useState, useEffect} from "react";

import ImageUpload from "./ImageUplaod.css";
import Button from "./Button";

const ImageUplaod = props => {

    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [isValid, setIsValid] = useState(false);
    const [previewUrl, setPreviewUrl] = useState();

    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event) => {
      let pickedFile;
      let isFileValid = isValid;
      if (event.target.files || event.target.files.length === 1) {
        pickedFile = event.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        isFileValid = true;
      } else {
        setIsValid(false);
        isFileValid = false;
      }
      props.onInput(props.id, pickedFile, isFileValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <React.Fragment>
        <div className="form-control">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{display: "none"}}
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={pickedHandler}
            />
            <div className={`image-uplad ${props.center && "center"}`}>
                <div className="image-uplad__preview">
                    {previewUrl && <img style={{width:"250px"}} src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Pick an image</p>}
                </div>
            </div>
                <Button type="button" onClick={pickImageHandler} >Upload an Image</Button>
            {!isValid && <p>{props.errorText}</p>}
        </div>
            </React.Fragment>
    );
}

export default ImageUplaod;