// __mocks__/api.js
const listPainting = [
  {
    fileName: 'painting1.jpg',
    url: '/painting1.jpg',
    thumbUrl: '/painting1_thumb.jpg',
    text: 'painting1_text',
  },
  {
    fileName: 'painting2.jpg',
    url: '/painting2.jpg',
    thumbUrl: '/painting2_thumb.jpg',
    text: 'painting2_text',
  },
  {
    fileName: 'painting3.jpg',
    url: '/painting3.jpg',
    thumbUrl: '/painting3_thumb.jpg',
    text: 'painting3_text',
  },
]
const listPortrait = [
  {
    fileName: 'portrait1.jpg',
    url: '/portrait1.jpg',
    thumbUrl: '/portrait1_thumb.jpg',
    text: 'portrait1_text',
  },
]

export default function getUrls(path) {
  return new Promise((resolve, reject) => {
    if (path === 'painting') {
      resolve(listPainting)
    } else if (path === 'portrait') {
      resolve(listPortrait)
    } else {
      reject({ error: 'invalid path' })
    }
  });
}
/*
export default function getUrls(path) {
  //return stub(path)
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => {
        if (path === 'painting') {
          resolve(list)
        } else if (path === 'portrait') {
          resolve(listPortrait)
        } else {
          reject({ error: 'invalid path' })
        }
      }
    );
  });
}
*/