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
function Event({eventId, dateTime, venue, username,title, description, user_id, imageUrl, interestedCount}) {

    const convertToDate = (date) => {
        //convert to miliseconds
        let k = date.seconds*1000
        let dat = Date(k)
        dat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "long" ,day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(k)
        return dat
    }
//=====
    const classes = useStyles();
    return (
        <div className="event">
            <div className="event__header">
                <div className="event__headerInfo">
                    <Typography className="event__title"  variant="h5">
                        {title}
                    </Typography>
                    <span className="event__dateTime">
                        Date and time:{" "+convertToDate(dateTime)}
                    </span>
                    <span  className="event__location">
                        Venue:{venue}
                    </span>
                </div>
                <MoreVertIcon style={{color:'white'}}/>
            </div>
            <Card className={classes.root}>

                <div className="event__thubnail">
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        />
                    </CardActionArea>
                </div>

                <CardContent className="event__description">
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>

                <div className="event__footer">
                    <CardActions className="event__interested">
                        <Button size="small" >    
                                I am Interested
                        </Button>
                    </CardActions>
    
                    <CardActions className="event__actions">
                            <Button size="small" onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                        title: document.title,
                                                        text: "Event short description",
                                                        url: window.location.href,
                                                    })
                                                    .then(() => console.log('Successful share'))
                                                    .catch((error) => alert('Error sharing', error));
                                            } else {
                                                alert("Web Share API is not supported in your browser.")
                                            }
                                        }} >
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


