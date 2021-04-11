
//users in sidebar chat (online/offline)

import React from 'react'
import './WidgetsChat.css'
import Badge from '@material-ui/core/Badge';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {ButtonBase} from '@material-ui/core';
//==================================================Card Styles==============================================
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
    fontWeight:300,
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
//==================================================================================================================
function WidgetsChat() {
    const classes = useStyles();
    const theme = useTheme();
    return (
//==========================================Online members===========================================================
        <div className="widgetsChat">
            <div className="widgetsChat__online">
                 <p>Online<span><Badge color="primary" overlap="circle"  variant="dot"></Badge></span></p>
                 <div className="widgetsChat__onlineMembers">
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                 </div>
            </div>
                                                        {/* offline members */}
            <div className="widgetsChat__offline">
                 <p>Offline<span><Badge color="secondary" overlap="circle"  variant="dot"></Badge></span></p> 
                 <div className="widgetsChat__offlineMembers">
                 <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                    <ButtonBase>
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
                    </ButtonBase>
                 </div>
            </div>
        </div>
    )
}

export default WidgetsChat
