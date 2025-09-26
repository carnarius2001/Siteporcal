self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("porcal-v1").then(cache => {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "perfil1.jpg",
        "imagens/fundo-montanha.jpg",
        "imagens/quizimagem.jpg",
        "imagens/lojaimagem.jpg",
        "imagens/historiaimagem.jpg",
        "imagens/codigoimagem.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});