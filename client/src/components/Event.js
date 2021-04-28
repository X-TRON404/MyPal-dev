import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Event.css'
import { Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root: {
    backgroundColor:"#2E3336",
  },
  media: {
    height: 140,
  },
});
function Event() {
    const classes = useStyles();
    return (
        <div className="event">
            <div className="event__header">
                <div className="event__headerInfo">
                    <Typography className="event__title"  variant="h5">
                        {"Event Title"}
                    </Typography>
                    <Typography  className="event__date">
                        {"Date"}
                    </Typography>
                    <Typography  className="event__time">
                        {"Time"}
                    </Typography>
                    <Typography  className="event__location">
                        {"Location/Link"}
                    </Typography>
                </div>
                <MoreVertIcon style={{color:'white'}}/>
            </div>
            <Card className={classes.root}>

                <div className="event__thubnail">
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={"Event Image"}
                        title={"Event Title"}
                        />
                    </CardActionArea>
                </div>

                <CardContent className="event__description">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {"Event short description"}
                    </Typography>
                </CardContent>

                <div className="event__footer">
                    <CardActions className="event__interested">
                        <Button size="small" >    
                                I am Interested
                        </Button>
                    </CardActions>
    
                    <CardActions className="event__actions">
                            <Button size="small" >
                            Share with friends
                            </Button>
                            <Button size="small" >
                            Learn More
                            </Button>
                    </CardActions>
                </div>
            </Card>
        </div>
    )
}

export default Event


