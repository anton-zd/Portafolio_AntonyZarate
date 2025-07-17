# Proyecto de Portafolio Personal
![Image](https://github.com/anton-zd/Main-Portfolio/blob/main/assets/Readme_File/begin_page.png?raw=true)

Desarrollé un portafolio web dinámico e innovador, con el objetivo de presentar mi perfil profesional de manera creativa y funcional.
Desarrolle el proyecto desde la concepción de la arquitectura y UX/UI hasta la implementación front-end completa.

Utilizando HTML para una base sólida, CSS para un diseño visual moderno y adaptable, y JavaScript. Además con asistencia de IA logré soluciones rápidas e innovadoras.
Construí una plataforma que integra funcionalidades esenciales de forma intuitiva.  Implementé la descarga de CV, enlaces directos a mis principales redes, y un showcase interactivo de proyectos,
explorando con IA nuevas formas de mejorar la estructura y la experiencia de navegación web.

***

## Estructura HTML
### Encabezado del Documento
El `<head>` de este documento HTML establece la información clave. Define la codificación de caracteres en UTF-8, garantizando la compatibilidad con distintos navegadores (especialmente IE) y
establece la ventana gráfica para la capacidad de respuesta en distintos dispositivos. El título es 'Portfolio', y enlaza los archivos CSS (`style.css` y `mediaqueries.css`)
para el estilo y el diseño responsivo usando media queries.
```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio</title>
  <link rel="icon" href="/assets/portfolio.png" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="mediaqueries.css" />
</head>
```

### Navegación
Este código crea una barra de navegación de escritorio para mi portafolio. Incluye tu nombre como logotipo y una lista de enlaces a diferentes
secciones: Acerca de, Habilidades, Proyectos, Contacto y una versión en inglés que aun esta en desarrollo. Los atributos `pid`y `class` permiten
estilizarla y manipularla con CSS o JavaScript.
![Image](https://github.com/anton-zd/Main-Portfolio/blob/main/assets/Readme_File/bar_navegation.png?raw=true)
```html
<nav id="desktop-nav">
  <div class="logo">Jorge Antony Zarate Davila</div>
  <div>
    <ul class="nav-links">
      <li><a href="#about">Hacerca de</a></li>
      <li><a href="#experience">Habilidades</a></li>
      <li><a href="#projects">Proyectos</a></li>
      <li><a href="#contact">Contacto</a></li>
      <li><a href="">Ingles</a></li>
    </ul>
  </div>
</nav>
```

## Diseño CSS 
###  Diseños Generales
En esta sección establecí en cero el margen y el relleno por defecto para todos los elementos, utiliza la fuente «Poppins» para el texto del cuerpo, activa el
desplazamiento suave para todo el documento HTML, añade un margen inferior de 10 píxeles a todos los párrafos y establece el color del texto de los párrafos en gris oscuro.
```css
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
html {
  scroll-behavior: smooth;
}
p {
  margin-bottom: 10px;
  color: rgb(85, 85, 85);
}
```

### Navegación
Este código estiliza los elementos de navegación y los enlaces. Dispone la navegación y los enlaces horizontalmente con `display: flex`, distribuye el espacio alrededor
de los elementos y los centra verticalmente. Los enlaces se estilizan con un espacio, un tamaño de fuente mayor y sin subrayado por defecto. Al pasar el ratón por encima
de los enlaces, el color cambia a gris y se añade un subrayado. El tamaño de la fuente del logotipo aumenta y, al pasar el ratón sobre él.
```css
nav,
.nav-links {
  display: flex;
}
nav {
  justify-content: space-around;
  align-items: center;
  height: 17vh;
}
.nav-links {
  gap: 2rem;
  list-style: none;
  font-size: 1.5rem;
}
a {
  color: black;
  text-decoration: none;
  text-decoration-color: white;
}
a:hover {
  color: grey;
  text-decoration: underline;
  text-underline-offset: 1rem;
  text-decoration-color: rgb(181, 181, 181);
}
.logo {
  font-size: 2rem;
}
.logo:hover {
  cursor: default;
}
```

## JavaScript 
Este código JavaScript añade interactividad a una página web con botones e imágenes. Selecciona todos los botones e imágenes utilizando sus respectivos selectores de clase CSS.
Cuando se pulsa un botón, filtra las imágenes basándose en sus atributos de datos. La función `setActiveBtn` resalta el botón pulsado, mientras que la función `filterImg` expande o
encoge las imágenes basándose en su tipo comparado con el tipo de botón. El primer botón probablemente sirve como botón «mostrar todo», expandiendo todas las imágenes.
```js
const btns = document.querySelectorAll('.buttons button');
const imgs = document.querySelectorAll('.images img');
for(let i = 1; i < btns.length; i++) {
  btns[i].addEventListener('click', filterImg);
}
function setActiveBtn(e) {
  btns.forEach(btn => {
    btn.classList.remove('btn-clicked');
  });
  e.target.classList.add('btn-clicked');
}
function filterImg(e) {
  setActiveBtn(e);
  imgs.forEach(img => {
    img.classList.remove('img-shrink');
    img.classList.add('img-expand');
    const imgType = parseInt(img.dataset.img);
    const btnType = parseInt(e.target.dataset.btn);
    if (imgType !== btnType) {
      img.classList.remove('img-expand');
      img.classList.add('img-shrink');
    }
  });
}
btns[0].addEventListener('click', (e) => {
  setActiveBtn(e);
  imgs.forEach(img => {
    img.classList.remove('img-shrink');
    img.classList.add('img-expand');
  });
});
```
