import fetch from 'isomorphic-fetch'

const API = 'https://us-central1-joanne-lee.cloudfunctions.net/getUrls';

export default function getUrls(path) {
  return fetch(`${API}/${path}`)
    .then(response => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        console.error('getUrls failed: ' + response.statusText)
      }
    })
    .catch(error => {
      throw new Error('getUrls error: ' +  error)
    })
}

