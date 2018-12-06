import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import {createLogger} from 'redux-logger';
// import ReduxThunk from redux-thunk'; //미들웨어1
// import promiseMiddleware from 'redux-promise-middleware'; //미들웨어2
import penderMiddleware from 'redux-pender'; //미들웨어3

const logger = createLogger();
// const pm = promiseMiddleware({
//   promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
// });

const store = createStore(modules, applyMiddleware(logger, penderMiddleware()));

export default store;
