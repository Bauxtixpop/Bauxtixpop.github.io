if (!window.location.hash) {
  window.location.hash = '#/inicio';
}

// Cargar navbar y footer una sola vez
fetch('/layout/navbar.html')
.then(r => r.text())
.then(data => {
document.getElementById('navbar').innerHTML = data;

// Una vez insertado el navbar, adjunta el listener a los enlaces de navegación
const navLinks = document.querySelectorAll('#navbar .nav-link');
const navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Si el menú colapsado está abierto (tiene la clase "show"), ciérralo
    if (navbarCollapse.classList.contains('show')) {
      // Intenta obtener la instancia existente
      let collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
      if (collapseInstance) {
        collapseInstance.hide();
      } else {
        new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
      }
    }
  });
});
});

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
        runDownloadButton();
      });
  }, 400);
}

// Definir rutas hash y su mapeo a archivos
const routes = {
  '/inicio': '/public/inicio.html',
  '/tienda': '/public/tienda.html',
  '/ayuda': '/public/ayuda.html',
  '/acerca_de': '/public/acerca_de.html',
  '/MXWR': '/public/MXWR.html',
  '/aztec_project': '/public/aztec_project.html',
  '/CB': '/public/CB.html'
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


function runSearchListener() {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");
  if (!searchInput) return; // solo si existe en la página actual

  const games = [
    { name: "México Warriors", image: "/imagenes/MW.jpg", url: "/MXWR" },
    { name: "Champion's Brawl", image: "/imagenes/CBm.jpg", url: "/CB" },
    { name: "Aztec Project", image: "/imagenes/aztec.jpg", url: "/aztec_project" },
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

function runDownloadButton() {
  const downloadBtn = document.getElementById("download-btn");
  const modal = document.getElementById("download-modal");
  const barra = document.getElementById("progress-bar");
  const estado = document.getElementById("status");

  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", () => {
    modal.style.display = "block";
    barra.style.width = "0%";
    estado.innerText = "Iniciando descarga...";
    let progreso = 0;

    const interval = setInterval(() => {
      progreso += 10;
      barra.style.width = progreso + "%";
      estado.innerText = `Descargando... ${progreso}%`;
      if (progreso >= 100) {
        clearInterval(interval);
        estado.innerText = "¡Descarga completa!";
      }
    }, 400);
  });
}
