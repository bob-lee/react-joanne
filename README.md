# Joanne Lee

This is Joanne's website, shows images of her works. Images are dynamically served from `Firebase storage` and lazily loaded using `IntersectionObserver` API.

<img src="Joanne-home.PNG" width="60%">

The website was built and deployed using following technologies: 
* [React](https://reactjs.org/): A JavaScript library for building user interfaces
* [Create React App](https://github.com/facebookincubator/create-react-app): a React application build tool
* [Workbox](https://workboxjs.org/): JavaScript libraries for Progressive Web Apps
* [Firebase](https://firebase.google.com/): cloud platform for storage, hosting

[Visit the web!](https://react-joanne.firebaseapp.com)

To build, `yarn build:ssr` and edit `functions/index.html` file to insert a placeholder inside 'root' div for server rendering, then `yarn serve` or `firebase deploy`.

```
// functions/index.html
<div id="root"><!-- ::APP:: --></div>
```