import ReactDom from 'react-dom/server';
import template from '../client/components/App/App.jsx';

const componentHTML = ReactDom.renderToString(template({}));
console.log(componentHTML);