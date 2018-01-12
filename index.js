import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'
import App from './src/App';
// import getUrls from './src/api';
import express from 'express';
import * as fs from 'fs';
import * as functions from 'firebase-functions';

const index = fs.readFileSync(__dirname + '/index.html', 'utf8');

const app = express();
//app.use(express.static(__dirname + '/static'));

app.get('**', (req, res) => {
  console.log(`url: '${req.url}'`)
  const context = {}
  const html = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )
  const finalHtml = index.replace('<!-- ::APP:: -->', html);
  res.set('Cache-Control', 'public, max-age=600 s-maxage=1200');
  res.send(finalHtml);
})

export let ssrReactJoanne = functions.https.onRequest(app);