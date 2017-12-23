// __mocks__/api.js
const list = [
  {
    fileName: 'test1.jpg',
    url: '/test1.jpg',
    thumbUrl: '/test1_thumb.jpg',
    text: 'test1_text',
  },
  {
    fileName: 'test2.jpg',
    url: '/test2.jpg',
    thumbUrl: '/test2_thumb.jpg',
    text: 'test2_text',
  },
  {
    fileName: 'test3.jpg',
    url: '/test3.jpg',
    thumbUrl: '/test3_thumb.jpg',
    text: 'test3_text',
  },
]

// export const PATH_GOOD = 'goodPath'
// export const PATH_BAD = 'badPath'

// export const stub = jest.fn((path) => {
//   if (path === 'painting') {
//     return Promise.resolve(list)
//   } else {
//     return Promise.reject({
//       error: 'invalid path \'' + path + '\'',
//     })
//   }
// })

export default function getUrls(path) {
  //return stub(path)
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => {
        if (path === 'painting') {
          resolve(list)
        } else {
          reject({ error: 'invalid path'})
        }
      }
    );
  });
}