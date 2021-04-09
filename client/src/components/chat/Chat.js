import React from 'react'
import './Chat.css'
import Badge from '@material-ui/core/Badge';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 250,
    height:60,
    background: '#1A1A1A',
    '&:hover': {
       background: '#363A3E',
    },
    border:'1px grey',
    marginBottom:'5px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    Bottom:'20px',
    fontWeight:250,
    color: 'white',
    marginBottom:10,
  },
  avatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
  },
  typoStatus:{
    color:'grey',
  }

}));

function Chat() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className="chat">
            <div className="chat__online">
                 <p>Online<span><Badge color="primary" overlap="circle"  variant="dot"></Badge></span></p>
                 <div className="chat__onlineMembers">
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                 </div>
            </div>



            <div className="chat__offline">
                 <p>Offline<span><Badge color="secondary" overlap="circle"  variant="dot"></Badge></span></p> 
                 <div className="chat__offlineMembers">
                 <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                    <Card className={classes.root}>
                        <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="p">
                                        User
                                    </Typography>
                                    <Typography className={classes.typoStatus} variant="caption">
                                        status
                                    </Typography>
                                </CardContent>
                        </div>
                    </Card>
                 </div>
            </div>
        </div>
    )
}

export default Chat
