/* GYM Leveling: modo sin internet. Sube la version para forzar la actualizacion de la cache. */
var V='gl-v2',FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==location.origin)return;
if(r.mode==='navigate'){e.respondWith(new Promise(function(ok){var done=false,t=setTimeout(function(){caches.match('./index.html').then(function(c){if(c&&!done){done=true;ok(c)}})},3000);
fetch(r).then(function(n){clearTimeout(t);var cp=n.clone();caches.open(V).then(function(c){c.put('./index.html',cp)});if(!done){done=true;ok(n)}}).catch(function(){clearTimeout(t);caches.match('./index.html').then(function(c){if(!done){done=true;ok(c||Response.error())}})})}));return}
e.respondWith(caches.match(r).then(function(c){var n=fetch(r).then(function(x){if(x&&x.ok){var cp=x.clone();caches.open(V).then(function(k){k.put(r,cp)})}return x}).catch(function(){return c});return c||n}))});
