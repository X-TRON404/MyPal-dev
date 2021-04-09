import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import {storage,DataBase} from './firebase';
import firebase from 'firebase';
import './ImageUpload.css'

function ImageUpload({username}) {
    //caption
    const [caption,setCaption] = useState('');
    //image 
    const [image,setImage] = useState(null);
    //profress bar
    const [progress,setProgress] = useState(0); 

    //get the name of the first image file you selected (image as a file)
    const handleChange = (e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () =>{
  //=============================={Upload the image to firebase database}========================
            if (image) {
            //Access the storage and upolad the image in the 'images' folder and give it the name =image.name
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
        
            //listen to changes in the state of the upload
            uploadTask.on(
                "state_changed",
                //keep track of the progress and give a snapshot each time
                (snapshot) =>{

                    //a number between 0 to 100 is stored in progress_ to keep track of the progress
                    const progress_ = Math.round(
                        (snapshot.bytesTransferred/snapshot.totalBytes)*100
                    );
                    setProgress(progress_)
                },
                //catch the error
                (error) => {
                    //because the error is not user friendly just log it to the console
                    console.log(error)
                    //show the error message
                    alert(error.message)
                }, 

//===================={get the uploaded image from the firebase database}========================

                () => {
                    storage
                    //access the 'images' folder in the storage
                    .ref('images')
                    //get the name of the image file
                    .child(image.name)
                    //get the url to download the image
                    .getDownloadURL()
                    //add the image to the 'posts' folder of the database
                    .then((url)=>{
                        DataBase.collection('posts').add({
                            //set the attribute to the time stamp of the server which serves the file
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            //set the cation attribute to the cation user entered   
                                caption:caption,
                            //set image url attribute to the 'url' we got from the getDownloadURL() method
                                imageUrl:url,
                            //get the username as a prop from the 'App.js' file
                                username:username

                            })
                            //once done set clear the input 
                            setProgress(0);
                            setCaption("");
                            setImage(null)

                    })

                }

            )
    }
    else{
        alert("No image selected")
    }
}

    return (
        <div className="imageUpload">
            <progress className="imageUpload__uploadProgress" value={progress} max="100"/>
            {/*input the image and caption from the user*/}
            <input className="imageUpload__caption" type="text" placeholder="Enter a caption..." onChange={(e)=>setCaption(e.target.value)} value={caption}></input>
            <input className="imageUpload__fileInput" type="file" placeholder="Choose a file" onChange={handleChange}/>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload;

