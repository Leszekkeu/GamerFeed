/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "app.js",
    "revision": "8c5c1377da6a6d0780c34107b6769e81"
  },
  {
    "url": "images/banner.svg",
    "revision": "dc61505c11c6b86b157f5805172cdd54"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "bbfeeb9cdab3cc21e3d71f06ed320c51"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "f3c370577b301bc68087b1ad55568329"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "ebf6f326b00b9e50b8200e386e68d11a"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "a7a82632f32afb2a0b679f5542398fa0"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "7be21c811595b74019a0ab9a3025b65b"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "2fb45161792d07256d88b1e515d08ecb"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "52f95d986a6ffa1cc40857f32d6aae17"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "d37f708fb18f6b6559e7cfb7c1519349"
  },
  {
    "url": "index.html",
    "revision": "cc534e02004e460f3f044593716c77f0"
  },
  {
    "url": "jquery.rss.min.js",
    "revision": "5f106d10edf966c0b51d5cc611cee691"
  },
  {
    "url": "manifest.json",
    "revision": "fc6983a7662b74c59ab5cc6f8fbed9a6"
  },
  {
    "url": "splashscreens/ipad_splash.png",
    "revision": "b010eeb83866b7c2bc1ac381f9870096"
  },
  {
    "url": "splashscreens/ipadpro1_splash.png",
    "revision": "4a96caf1e228b82a5f37441e45297a2e"
  },
  {
    "url": "splashscreens/ipadpro2_splash.png",
    "revision": "dd806c2bd10f49e96e166f50cc193cb6"
  },
  {
    "url": "splashscreens/ipadpro3_splash.png",
    "revision": "9fda8a9ec032032308b264dac76cd90e"
  },
  {
    "url": "splashscreens/iphone5_splash.png",
    "revision": "35c73f5e76ee716635f46efc48bdc830"
  },
  {
    "url": "splashscreens/iphone6_splash.png",
    "revision": "52405089a77a4bdc7b43c565f8a0e6e9"
  },
  {
    "url": "splashscreens/iphoneplus_splash.png",
    "revision": "ba63e013560e50f10dee5493665bfb45"
  },
  {
    "url": "splashscreens/iphonex_splash.png",
    "revision": "70e44cde8ec40e36bb38d3f1bbf2938d"
  },
  {
    "url": "splashscreens/iphonexr_splash.png",
    "revision": "5cdcc25c600a8840e99b76fde51fab1e"
  },
  {
    "url": "splashscreens/iphonexsmax_splash.png",
    "revision": "12ddb28faf5219aa1c0191a8cfe0b2f0"
  },
  {
    "url": "style.css",
    "revision": "7aa3716b581072d28bfd3aec16e74a61"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
