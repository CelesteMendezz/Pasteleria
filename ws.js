self.addEventListener('install', event => {
    console.log('Service Worker: Instalado');
    event.waitUntil(
        caches.open('mi-cache-v1').then(cache => {
            return cache.addAll([
                "./",
                "./index.html",
                "./404.html",
                "./about.html",
                "./app.js",
                "./contact.html",
                "./manifest.json",
                "./product.html",
                "./testimonial.html",
                "./img/about.jpg",
                "./img/cap1.png",
                "./img/cap2.png",
                "./img/carousel1.jpg",
                "./img/icon-1.png",
                "./img/icon-2.png",
                "./img/icon-3.png",
                "./img/icon1.png",
                "./img/icon2.png",
                "./img/product-1.jpg",
                "./img/product-2.jpg",
                "./img/product-3.jpg",
                "./img/product-4.jpg",
                "./img/product-5.jpg",
                "./img/product-6.jpg",
                "./img/product-7.jpg",
                "./img/product-8.jpg",
                "./img/testimonial-1.jpg",
                "./img/testimonial-2.jpg",
                "./img/testimonial-3.jpg",
                "./img/testimonial-4.jpg",
                "./js/main.js",
                "./ws.js",
                "./css/bootstrap.min.css",
                "./css/style.css"

            ]);
        })
    );
});


self.addEventListener('activate', event => {
    console.log('Service Worker: Activado');
    const cacheWhitelist = ['mi-cache-v1'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) 
                    {
                      return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open('mi-cache-v1').then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => {
            // Si falla la red y no hay en caché, redirige a la página 404
            if (event.request.destination === 'document') {
                return caches.match('./404.html');
            }
        })
    );
});



self.addEventListener ('sync',event => {
    if (event.tag === 'sincronizar-datos') 
    {
      event.waitUntil(
        console.log('Service Worker: Sincronizando datos')
      );
    }
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        self.registration.showNotification("🎂 ¡Dulcetta te tiene una sorpresa! 🎂", {
            body: "Ahora podras disfrutar nuestros nuevos sabores y ofertas especiales. 🍩🍪✨",
            icon: "./img/icon-1.png"
        });
    }
});
