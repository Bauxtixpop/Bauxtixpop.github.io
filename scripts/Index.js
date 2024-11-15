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