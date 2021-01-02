import React from 'react'
import './Widgets.css'
import SearchIcon from '@material-ui/icons/Search';
// import {TwitterTweetEmbed, TwitterTimelineEmbed, TwitterShareButton} from 'react-twitter-embed'

function Widgets() {
    return (
        <div className="widgets"> 
            <div className="widgets__input">
                <SearchIcon className="widgets__searchIcon"/>
                <input type= "text" placeholder="Search Texx" />
            </div>
            <div className="widgets___widgetContainer">
               {/* <h2> What's happening...</h2>
                <TwitterTweetEmbed tweetId={'1341399855856558086'}/>
                <TwitterTimelineEmbed sourceType="profile" screeName="murtikara" options={{height:400}}/>
                <TwitterShareButton url={'https://twitter.com/murtikara2'} options={{text:"React is love"}}/> */}
            </div>
        </div>
    )
}

export default Widgets
