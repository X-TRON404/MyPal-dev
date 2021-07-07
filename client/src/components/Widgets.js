import React, { Suspense } from 'react'
import './Widgets.css'
import {useStateValue} from '../contexts/StateProvider'
import Skeleton from '@material-ui/lab/Skeleton';
import { Avatar} from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom'


const algoliaClient = algoliasearch('QAL7BSNSX5', process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY);
//avoid making an empty query
const searchClient = {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
          })),
        });
      }
  
      return algoliaClient.search(requests);
    },
  };
  

const WidgetsChat = React.lazy(()=>import('./chat/WidgetsChat'))
const WigetsDummy  = React.lazy(()=>import('./chat/WigetsDummy'))





function Widgets() {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();

    return (
        <div className="widgets"> 
            <div className="widgets__inputBox">
            <InstantSearch searchClient={searchClient} indexName="pals">
                <SearchBox className="widgets__search__searchBox"/>
                <div className="widgets__search__results">
                <Results/>
                </div>
            </InstantSearch>
                {/* <Input style={{color:"aliceblue"}} className="widgets__input" type= "text" placeholder="Search MyPal" /> */}
            </div>
            <div className="widgets___widgetContainer">
                {/* if user doesnt exists WidgetsChat component wasthrwoing an error hence I Made a dummy component which doesnt have a user object and 
                will be rendered during refresh transitions when momentarily user is unavailable instead of throwing an error  */}
                {user?(<Suspense fallback={<Skeleton variant="rect" width={100} height={500} />}><WidgetsChat/></Suspense>):(<Suspense fallback={<Skeleton variant="rect" width={100} height={400} />}><WigetsDummy/></Suspense>)}
            </div>
        </div>
    )
}

//Dont show reslts when no query is entered
const Results = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <Hits hitComponent={Hit} />
  ) : (
    <></>
  )
); 
// const Results = connectStateResults(
//   ({ searchState, searchResults, children }) =>
//     searchResults && searchResults.nbHits !== 0 ? (
//       children
//     ) : (
//       <div>No results have been found for {searchState.query}.</div>
//     )
// );

  const Hit = ({ hit }) => (
  <Link to={`/pals/${hit.objectID}`} >
    <div className="widgets__search__hit">
        <Avatar className="widgets__search__hit__avatar" alt={hit.displayName} src={hit.displayName}></Avatar>
        <div className="widgets__search__hit__content">
            <p className="widgets__search__hit__displayName">{hit.displayName}</p>
            <p className="widgets__search__hit__bio">{hit.bio}</p>
        </div>
        {/* {console.log("HITS HITS HITS "+hit)} */}
    </div>
  </Link>
  );
  




export default Widgets
