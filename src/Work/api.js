import fetch from 'isomorphic-fetch'

const API = 'https://us-central1-joanne-lee.cloudfunctions.net/getUrlsOrdered';

export default function getUrls(path) {
  return fetch(`${API}/${path}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.error('getUrls failed: ' + response.statusText)
      }
    })
    .catch(error => {
      console.error('getUrls:', error)
      throw new Error('getUrls error: ' + error)
    })
}
