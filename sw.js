const C='pomo-v1',A=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const f=fetch(e.request).then(n=>{if(n&&(n.ok||n.type=='opaque')){const cl=n.clone();caches.open(C).then(c=>c.put(e.request,cl))}return n}).catch(()=>r||caches.match('./index.html'));return r||f}))});
