import React from 'react';
import ReactDOM from 'react-dom';
import PlayerApp from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import Store from './Store'

const app = (
    <Provider store={Store}>
        <PlayerApp />
    </Provider>
)

const container = document.getElementById('root')

ReactDOM.render(app,container)

serviceWorker.unregister();