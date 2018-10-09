self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('restaurant-reviews-v1').then((cache) => {
      return cache.addAll([
      'css/styles.css',
      'data/restaurants.json',
      'img/1.jpg',
      'img/2.jpg',
      'img/3.jpg',
      'img/4.jpg',
      'img/5.jpg',
      'img/6.jpg',
      'img/7.jpg',
      'img/8.jpg',
      'img/9.jpg',
      'img/10.jpg',
      'js/dbhelper.js',
      'js/main.js',
      'js/restaurant_info.js',
      'index.html',
      'restaurant.html'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open('restaurant-reviews-v1').then((cache) => {
          cache.put(event.request, responseClone);
        })
        return response;
      }).catch(()=>{
        return new Response("sorry, not available");
      });
    })
  );
});


// .then((response) => {
//   caches.open('restaurant-reviews-s1-v1').then((cache) => {
//     return cache.add(event.request);
//   })
// });
