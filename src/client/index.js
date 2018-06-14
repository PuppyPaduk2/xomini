import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import HtmlStyle from './components/Html/Html.less';

let initialData = document.getElementById('initial-data').getAttribute('data-json');
initialData = typeof initialData === 'string' ? JSON.parse(initialData) : {};

ReactDOM.hydrate(<App {...initialData}/>, document.getElementById('root'));
