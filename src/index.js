import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import USER_DATA from './userData.json';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(<App {...USER_DATA} />, document.getElementById('root'));
registerServiceWorker();
