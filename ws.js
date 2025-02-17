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
                "./css/style.css",
                "./lib/animate/animate.css",
                "./lib/animate/animate.min.css",
                "./lib/easing/easing.js",
                "./lib/easing/easing.min.js",
                "./lib/owlcarousel/owl.carousel.js",
                "./lib/owlcarousel/owl.carousel.min.js",
                "./lib/owlcarousel/assets/ajax-loader.gif",
                "./lib/owlcarousel/assets/owl.carousel.min.css",
                "./lib/owlcarousel/assets/owl.carousel.css",
                "./lib/owlcarousel/assets/owl.theme.default.css",
                "./lib/owlcarousel/assets/owl.theme.green.css",
                "./lib/owlcarousel/assets/owl.theme.green.min.css",
                "./lib/owlcarousel/assets/owl.video.play.png",
                "./lib/waypoints/links.php",
                "./lib/waypoints/waypoints.min.js",
                "./lib/wow/wow.js",
                "./lib/wow/wow.min.js"

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
            return response || fetch(event.request).catch(() => {
                // Si la solicitud es una página HTML, mostrar la 404.html
                if (event.request.destination === 'document') {
                    return caches.match('./404.html');
                }
            });
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
            body: "Descubre nuestros nuevos sabores y ofertas especiales. 🍩🍪✨",
            icon: "./img/icon-1.png"
        });
    }
});
