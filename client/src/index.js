import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { StateProvider } from './contexts/StateProvider';
import reducer,{initialState} from './contexts/reducer';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';




ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


