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
import { Link } from 'react-router-dom';


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

export default function YourPosts() {
    const classes = useStyles();

    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //posts array
    const [posts, setPosts] = useState([]);
//====================================GET user created posts=========================================
    useEffect( () => {
      if (user){
        //grab the posts which belong to the logged in user from the db
        DataBase.collection('posts').where("user_id", "==", user?.uid).get()
        .then((querySnapshot) => {
            setPosts(querySnapshot.docs.map(doc =>({id:doc.id,post:doc.data()})))
            console.log(posts)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
              }
    },[,user]);
    

  return (
    <div className="yourPosts">
      <GridList cellHeight={180} className={classes.gridList}>
            {posts.length!=0?(                            
            posts.filter(post=>(post.post.imageUrl!='no-image')).map((post) => (
            <GridListTile key={post.id}>
                <img src={post.post.imageUrl} alt={post.post.caption} />
                <Link to={`/yourposts/${post.id}`}>
                <GridListTileBar
                title={post.post.caption}
                actionIcon={
                    <IconButton aria-label={`info about ${post.post.caption}`} className={classes.icon}>
                            <InfoIcon />
                    </IconButton>
                }
                />
                </Link>
            </GridListTile>
            ))):(<h4 style={{color:'aliceblue'}}>Empty. Nothing to see here</h4>)}
      </GridList>
    </div>
  );
}
