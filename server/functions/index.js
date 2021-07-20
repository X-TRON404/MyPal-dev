const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
//  get api keys for the algolia from the env variable of cloud functions
const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

//  algolia client
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('pals');

//  ADD algolia index from firestore database when a document is created in firestore:
exports.addToIndex = functions.firestore.document('users/{userId}').onCreate(snapshot=>{
  const data = snapshot.data();
  const objectID = snapshot.id;
  //  add objectID to algolia index
  //  using saveObject addObject does not exists in the new version
  return index.saveObject({...data, objectID});
});

//  UPDATE algolia index from firestore database when a document is updated in firestore
exports.updateIndex = functions.firestore.document('users/{userId}').onUpdate(change =>{
  //  change.after gives the document after the change
  const newData = change.after.data();
  const objectID = change.id;
  //  update objectID to algolia index
  return index.saveObject({...newData, objectID});
});

//  DELETE algolia index from firestore database when a document is deleted in firestore
exports.updateIndex = functions.firestore.document('users/{userId}').onDelete(snapshot =>{
  //  delete objectID to algolia index
  return index.deleteObject(snapshot.id);
});
