import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import styles from  './Style.less';

ReactDOM.hydrate(<App />, document.getElementById('root'));