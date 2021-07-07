import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './SwipeTab.css'
import Skeleton from '@material-ui/lab/Skeleton';

const UserPosts = React.lazy(()=>import('./UserPosts'))
const UserEvents = React.lazy(()=>import('./UserEvents'))
const YourBookmarks = React.lazy(()=>import('./YourBookmarks'))

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#3F4347',
  },
}));

export default function UserScrollableTabsButtonAuto({palId}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" style={{backgroundColor:'#3F4347'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="POSTS" {...a11yProps(0)} />
          <Tab label="Events" {...a11yProps(1)} />
          <Tab label="Bookmarks" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <Suspense fallback={
                        <div><Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" width={210} height={118} /></div>} >
                        <UserPosts palId />
          </Suspense>
          </TabPanel>
      <TabPanel value={value} index={1}>
          <Suspense fallback={
                        <div><Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" width={210} height={118} /></div>} >
                        <UserEvents palId/>
          </Suspense>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Suspense fallback={
                        <div><Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" width={210} height={118} /></div>} >
                        <YourBookmarks/>
          </Suspense>
      </TabPanel>
    </div>
  );
}
