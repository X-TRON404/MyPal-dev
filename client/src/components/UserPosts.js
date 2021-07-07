import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { useStateValue } from '../contexts/StateProvider';
import { DataBase } from './firebase';
import './YourPosts.css'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#3F4347',
  },
  gridList:{
    flex:1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#363A3E',
    overflowY: 'scroll', 
    width:'100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function UserPosts({palId}) {
    const classes = useStyles();
    //posts array
    const [posts, setPosts] = useState([]);
//====================================GET user created posts=========================================
    useEffect( () => {
        //grab the posts which belong to the logged in user from the db
        DataBase.collection('posts').where("user_id", "==", palId).get()
        .then((querySnapshot) => {
            setPosts(querySnapshot.docs.map(doc =>({id:doc.id,post:doc.data()})))
            console.log(posts)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        
    },[,palId]);
    

  return (
      <GridList cellHeight={180} className={classes.gridList}>
            {posts.map((post) => (
            <GridListTile key={post.id}>
                <img src={post.post.imageUrl} alt={post.post.caption} />
                <GridListTileBar
                title={post.post.caption}
                actionIcon={
                    <IconButton aria-label={`info about ${post.post.caption}`} className={classes.icon}>
                            <InfoIcon />
                    </IconButton>
                }
                />
            </GridListTile>
            ))}
      </GridList>
  );
}
