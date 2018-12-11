import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import './component/css/general.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
