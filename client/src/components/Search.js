import React from 'react'
import { Avatar} from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults} from 'react-instantsearch-dom';
import {Link} from 'react-router-dom'
import './Widgets.css'

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
  
function Search() {
    return (
        <div className="widgets__inputBox">
            <InstantSearch searchClient={searchClient} indexName="pals">
                <SearchBox className="widgets__search__searchBox"/>
                <div className="widgets__search__results">
                <Results/>
                </div>
            </InstantSearch>
        </div>
    )
}

export default Search

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
    //using window.location.href cause outside of Router
  <Link to={`/pals/${hit.objectID}`} onClick={()=>window.location.href=`/pals/${hit.objectID}`} style={{ textDecoration: 'none' }}>
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
  