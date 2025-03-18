if (!window.location.hash) {
    window.location.hash = '#/inicio';
  }
// Cargar navbar y footer una sola vez
fetch('/layout/navbar.html')
  .then(r => r.text())
  .then(data => document.getElementById('navbar').innerHTML = data);

fetch('/layout/footer.html')
  .then(r => r.text())
  .then(data => document.getElementById('footer').innerHTML = data);

// SPA Router: Función para cargar secciones con transición
function loadSection(url) {
  const content = document.getElementById('content');
  content.classList.add('fade-out');
  setTimeout(() => {
    fetch(url)
      .then(r => r.text())
      .then(data => {
        content.innerHTML = data;
        content.classList.remove('fade-out');
        runSearchListener();
      });
  }, 400);
}

// Definir rutas hash y su mapeo a archivos
const routes = {
  '/public/inicio.html': '/public/inicio.html',
  '/public/tienda.html': '/public/tienda.html',
  '/public/ayuda.html': '/public/ayuda.html',
  '/public/acerca_de.html': '/public/acerca_de.html',
  '/public/.FC25html': '/public/FC25.html',
  '/public/aztec_project.html': '/public/aztec_project.html',
  '/public/CB.html': '/public/CB.html'
  
};

function router() {
  let hash = window.location.hash;
  // Si no hay hash, redirige a /inicio
  let route = hash ? hash.substring(1) : '/inicio';
  if (!routes[route]) {
    document.getElementById('content').innerHTML = '<h2>Página no encontrada</h2>';
    return;
  }
  loadSection(routes[route]);
}

// Primera carga y al cambiar el hash
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

// SPA: Capturar clicks en enlaces con [data-link]
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-link]');
  if (link) {
    e.preventDefault();
    // Se asume que el atributo href de los enlaces es algo como "/inicio" o "/tienda"
    const href = link.getAttribute('href');
    // Actualizamos el hash para disparar el router
    location.hash = href;
  }
});

// Buscador SPA (se mantiene igual)
function runSearchListener() {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");
  if (!searchInput) return; // solo si existe en la página actual

  const games = [
    { name: "FC25", image: "/imagenes/Fc25p.jpg", url: "/public/FC25.html" },
    { name: "Champion's Brawl", image: "/imagenes/CBm.jpg", url: "/public/Champion's Brawl.html" },
    { name: "Aztec Project", image: "/imagenes/aztec.jpg", url: "/public/aztec_project.html" },
  ];

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";
    if (query === "") {
      resultsContainer.style.display = "none";
      return;
    }
    const filteredGames = games.filter(game => game.name.toLowerCase().includes(query));
    if (filteredGames.length === 0) {
      resultsContainer.style.display = "none";
      return;
    }
    filteredGames.forEach(game => {
      const resultItem = document.createElement("a");
      resultItem.classList.add("result-item");
      resultItem.setAttribute('href', game.url);
      resultItem.setAttribute('data-link', '');
      resultItem.innerHTML = `
          <img src="${game.image}" alt="${game.name}">
          <span>${game.name}</span>
      `;
      resultsContainer.appendChild(resultItem);
    });
    resultsContainer.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
      resultsContainer.style.display = "none";
    }
  });
}
