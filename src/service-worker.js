/* eslint-disable no-restricted-globals */
import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyCpGwibkYz3Rfc3F94V5a7Ls9b1N1tUWzw',
  authDomain: 'taskflow-6a51f.firebaseapp.com',
  databaseURL: 'https://taskflow-6a51f.firebaseio.com',
  projectId: 'taskflow-6a51f',
  storageBucket: 'taskflow-6a51f.appspot.com',
  messagingSenderId: '350776321817',
  appId: '1:350776321817:web:8711f05ea7805e6a',
};

try {
  firebase.initializeApp(config);
} catch (e) {
  console.log(e);
}

const getIdToken = () => {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        user.getIdToken().then(
          (idToken) => {
            resolve(idToken);
          },
          () => {
            resolve(null);
          }
        );
      } else {
        resolve(null);
      }
    });
  });
};

const getOriginFromUrl = (url) => {
  const pathArray = url.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];
  return `${protocol}//${host}`;
};

self.addEventListener('fetch', (event) => {
  const requestProcessor = (idToken) => {
    let req = event.request;
    if (
      self.location.origin === getOriginFromUrl(event.request.url) &&
      (self.location.protocol === 'https:' || self.location.hostname === 'localhost') &&
      idToken
    ) {
      const headers = new Headers();
      for (const entry of req.headers.entries()) {
        headers.append(entry[0], entry[1]);
      }

      headers.append('Authorization', `Bearer ${idToken}`);
      try {
        req = new Request(req.url, {
          method: req.method,
          headers,
          mode: 'same-origin',
          credentials: req.credentials,
          cache: req.cache,
          redirect: req.redirect,
          referrer: req.referrer,
          body: req.body,
          bodyUsed: req.bodyUsed,
          context: req.context,
        });
      } catch (e) {
        console.log(e);
      }
    }
    return fetch(req);
  };

  event.respondWith(
    getIdToken()
      .then(requestProcessor, requestProcessor)
      .catch(console.log)
  );
});

const CACHE = 'cache-update-and-refresh-v1';

const urlsToCache = [
  '/index.html',
  '/service-worker.js',
  '/bundle.js',
  '/src/manifest.json',
  '/src/icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('offline', (event) => {
  event.respondWith(
    caches
      .open(CACHE)
      .then((cache) => cache.match(event.request).then((matching) => matching || Promise.reject('no-match')))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});