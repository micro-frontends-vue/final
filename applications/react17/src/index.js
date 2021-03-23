import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let applications = null

if (window._applications) {
  let appInstance = false

  const bootstrap = async () => { }
  const mount = async () => {
    if (appInstance) return

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('react17')
    );

    appInstance = true
  }
  const unmount = async () => {
    if (appInstance) {
      ReactDOM.unmountComponentAtNode(document.getElementById('react17'))
      appInstance = false
    }
  }

  applications = {
    bootstrap: [bootstrap],
    mount: [mount],
    unmount: [unmount]
  }
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default applications
