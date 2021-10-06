import React,{useState} from 'react';
import {DataBase} from '../firebase';
import firebase from 'firebase';
import {Button,TextField} from '@material-ui/core';
import {useStateValue} from '../../contexts/StateProvider'
import './CreateConfessions.css'
import AlertDialog from '../AlertDialog';

function CreateConfessions() {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //store confession
    const [confession,setConfession] = useState('')
    //open alert box when a new event is created
    const [openAlert,setOpenAlert] = useState(false)

    const handlePost = (e) => {
        DataBase.collection('confessions').add({
            confession:confession,
            user_id:user.uid,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setConfession('')
        setOpenAlert(true)

    }
    return (
        <div className="createConfessions">
            <AlertDialog text={"Your new confession is up!"} openAlert={openAlert} changeAlert={al=>{setOpenAlert(al)}}/>
                <form className="createConfessions__form">
                    <h2 id="createConfessions_h2"> Write a Confession </h2>
                    <TextField className = "createConfessions__textarea" onChange={(e)=>setConfession(e.target.value)} value={confession}
                                    id="outlined-multiline-static"
                                    label="Write a confession..."
                                    multiline
                                    rows={15}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    />
                    <Button className="createConfessions___iButton" disabled = {!confession} variant ='contained' color="primary" type ='submit' onClick={handlePost}>Post</Button>
                </form>
        </div>
        
    )
}

export default CreateConfessions;

