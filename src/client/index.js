import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

import HtmlStyle from './components/Html/Html.less';
import AppStyle from  './components/App/App.less';
import PaletteStyle from './components/Palette/Palette.less';

let initialData = document.getElementById('initial-data').getAttribute('data-json');
initialData = typeof initialData === 'string' ? JSON.parse(initialData) : {};

ReactDOM.hydrate(<App {...initialData}/>, document.getElementById('root'));
