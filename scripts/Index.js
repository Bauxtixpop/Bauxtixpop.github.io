fetch('/layout/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;

    const currentPage = window.location.pathname.split('/').pop();

    const linksMap = {
      'index.html': 'link-index',
      'tienda.html': 'link-tienda',
      'acerca_de.html': 'link-about',
      'ayuda.html': 'link-ayuda',
    };

    const activeLink = linksMap[currentPage];
    if (activeLink) {
      const linkElement = document.getElementById(activeLink);
      if (linkElement) {
        linkElement.classList.add('active');
      }
    }
  })
  .catch(error => console.error('Error al cargar el navbar:', error));


  fetch('/layout/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => console.error('Error al cargar el footer:', error));

  fetch('/public/inicio.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById("content").innerHTML = data;
  })
  .catch(error => console.error('Error al cargar el inicio:', error));

  // Base de datos de juegos con URL de redirección
  const games = [
    { name: "FC25", image: "/imagenes/Fc25p.jpg", url: "FC25.html" },
    { name: "Cuphead", image: "/imagenes/zamnp.jpg", url: "Cuphead.html" },
    { name: "Aztec Project", image: "/imagenes/aztec.jpg", url: "aztec_project.html" },
];

const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

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
        resultItem.href = game.url; // Redirección al hacer clic
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