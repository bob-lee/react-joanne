import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'
import App from './src/App';
import getUrls from './src/Work/api';
import express from 'express';
import * as fs from 'fs';
import * as functions from 'firebase-functions';

const index = fs.readFileSync(__dirname + '/index.html', 'utf8');

const app = express();
//app.use(express.static(__dirname + '/static'));

app.get('**', (req, res) => {
  const frags = req.url.split('/')
  const workPath = frags.length === 3 && frags[1] === 'work' ? frags[2] : ''
  console.log(`url: '${req.url}', ${frags.length}, '${workPath}'`)

  if (workPath) {
    getUrls(workPath).then(urls => {
      renderApplication(req, res, index, urls)
    })
  } else {
    renderApplication(req, res, index)
  }
})

function renderApplication(req, res, index, serverData) {
  const context = {}
  const appHtml = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )
  const tempHtml = index.replace('/** ::APP:: **/', appHtml)
  const finalHtml = tempHtml.replace('/** ::SERVER_DATA:: **/', JSON.stringify(serverData || ''))
  res.set('Cache-Control', 'public, max-age=600 s-maxage=1200')
  res.send(finalHtml)
}

export let ssrReactJoanne = functions.https.onRequest(app);