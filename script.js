const hoverColor = "#F2F2F2";
const themecolor = "#006699";
const captionColor = "#ccc";
const textColor = "#666666";
document.addEventListener("DOMContentLoaded", (event) => {
  var active = 0;
  var navlist = document.getElementsByClassName("list-item");
  Array.from(navlist).forEach((item, index) => {
    const triangle = item.getElementsByClassName("triangle")[0];
    const navVal = item.getElementsByClassName("nav-val")[0];
    item.addEventListener("mouseover", function () {
      triangle.style.visibility = "visible";
      item.style.background = hoverColor;
      navVal.style.marginLeft = "2.2em";
    });
    item.addEventListener("mouseout", function () {
      if (index != active) {
        item.style.background = "white";
        triangle.style.visibility = "hidden";
        navVal.style.marginLeft = "2em";
      }
    });
    item.addEventListener("click", function () {
      if (active != index) {
        var activeTriangle =
          navlist[active].getElementsByClassName("triangle")[0];
        var activeNavVal = navlist[active].getElementsByClassName("nav-val")[0];
        navlist[active].style.background = "white";
        activeTriangle.style.visibility = "hidden";
        activeNavVal.style.marginLeft = "2em";
        active = index;
      }
      triangle.style.visibility = "visible";
      item.style.background = hoverColor;
      navVal.style.marginLeft = "2.2em";
    });
    if (index == active) {
      triangle.style.visibility = "visible";
      item.style.background = hoverColor;
      navVal.style.marginLeft = "2.2em";
    }
  });

  const navToggle = document.getElementsByClassName("nav-menu-toggle")[0];
  const bar = document.getElementsByClassName("bar")[0];
  const navBar = document.getElementsByClassName("nav-bar")[0];
  var toggle = true;
  function updateToggle() {
    if (window.matchMedia("(min-width: 900px)").matches) {
      navBar.style.display = "block";
    }
  }
  updateToggle();
  window.addEventListener("resize", updateToggle);
  navToggle.addEventListener("click", function () {
    if (toggle) {
      navBar.style.display = "none";
      bar.style.left = "0.85em";
      toggle = false;
    } else {
      navBar.style.display = "block";
      bar.style.left = "12.7em";
      toggle = true;
    }
  });

  const sections = document.querySelectorAll(
    "#section-home, #section-gallery, #section-about, #section-contact"
  );
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        Array.from(navlist).forEach((link) => {
          const triangle = link.getElementsByClassName("triangle")[0];
          const navVal = link.getElementsByClassName("nav-val")[0];
          link.style.background = "white";
          triangle.style.visibility = "hidden";
          navVal.style.marginLeft = "2em";
          if (
            link.querySelector("a").getAttribute("href").substring(1) ===
            entry.target.id
          ) {
            triangle.style.visibility = "visible";
            link.style.background = hoverColor;
            navVal.style.marginLeft = "2.2em";
          }
        });
      }
    });
  }, options);
  sections.forEach((section) => {
    observer.observe(section);
  });
});

const images = [
  { src: "img/gallery/nature-01.jpg", category: "nature" },
  { src: "img/gallery/nature-02.jpg", category: "nature" },
  { src: "img/gallery/nature-03.jpg", category: "nature" },
  { src: "img/gallery/nature-04.jpg", category: "nature" },
  { src: "img/gallery/nature-05.jpg", category: "nature" },
  { src: "img/gallery/nature-06.jpg", category: "nature" },
  { src: "img/gallery/nature-07.jpg", category: "nature" },
  { src: "img/gallery/nature-08.jpg", category: "nature" },
  { src: "img/gallery/nature-09.jpg", category: "nature" },
  { src: "img/gallery/animal-01.jpg", category: "animal" },
  { src: "img/gallery/animal-02.jpg", category: "animal" },
  { src: "img/gallery/animal-03.jpg", category: "animal" },
  { src: "img/gallery/animal-04.jpg", category: "animal" },
  { src: "img/gallery/animal-05.jpg", category: "animal" },
  { src: "img/gallery/animal-06.jpg", category: "animal" },
  { src: "img/gallery/animal-07.jpg", category: "animal" },
  { src: "img/gallery/animal-08.jpg", category: "animal" },
  { src: "img/gallery/animal-09.jpg", category: "animal" },
  { src: "img/gallery/building-01.jpg", category: "building" },
  { src: "img/gallery/building-02.jpg", category: "building" },
  { src: "img/gallery/building-03.jpg", category: "building" },
  { src: "img/gallery/building-04.jpg", category: "building" },
  { src: "img/gallery/building-05.jpg", category: "building" },
  { src: "img/gallery/building-06.jpg", category: "building" },
  { src: "img/gallery/building-07.jpg", category: "building" },
  { src: "img/gallery/building-08.jpg", category: "building" },
  { src: "img/gallery/building-09.jpg", category: "building" },
  { src: "img/gallery/portrait-01.jpg", category: "potrait" },
  { src: "img/gallery/portrait-02.jpg", category: "potrait" },
  { src: "img/gallery/portrait-03.jpg", category: "potrait" },
  { src: "img/gallery/portrait-04.jpg", category: "potrait" },
  { src: "img/gallery/portrait-05.jpg", category: "potrait" },
  { src: "img/gallery/portrait-06.jpg", category: "potrait" },
  { src: "img/gallery/portrait-07.jpg", category: "potrait" },
  { src: "img/gallery/portrait-08.jpg", category: "potrait" },
  { src: "img/gallery/portrait-09.jpg", category: "potrait" },
];

const itemsPerPage = 9;
let currentPage = 1;
let currentFilter = "all";
let prevPage = 0;

function changePage(index) {
  prevPage = currentPage;
  currentPage = index;
  updateGallery();
}

function filterImages(category) {
  if (currentFilter != category) {
    const prevFilterElement = document.getElementById(currentFilter);
    prevFilterElement.style.color = themecolor;
  }
  currentFilter = category;
  const currentElement = document.getElementById(category);
  currentElement.style.color = textColor;
  currentPage = 1;
  updateGallery();
}

function renderGallery(images) {
  const gallery = document.getElementById("galleryImages");
  gallery.innerHTML = "";
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.title = image.title;
    imgElement.classList.add("galleryImage");
    gallery.appendChild(imgElement);
  });
}

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.id = `${i}`;
      button.classList.add("paginationBtn");
      if (currentPage == i) {
        button.classList.add("initialPage");
      }
      button.onclick = () => changePage(i);
      pagination.appendChild(button);
    }
  }
}

function updateGallery() {
  const filteredImages =
    currentFilter === "all"
      ? images
      : images.filter((image) => image.category === currentFilter);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  renderGallery(paginatedImages);
  renderPagination(filteredImages.length);
}
updateGallery();

const carouselItemPerPage = 3;
var currentCarouselIndex = 1;
const totalCarouselItems = 9;

function changeCarouselPage(i) {
  currentCarouselIndex = i;
  updateView();
}

function renderCarouselPagination() {
  const pagination = document.getElementById("carouselPagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(totalCarouselItems / carouselItemPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.id = `page-${i}`;
    button.classList.add("carouselPage");
    if(currentCarouselIndex==i){
      button.style.backgroundColor= themecolor;
    }
    button.onclick = () => changeCarouselPage(i);
    pagination.appendChild(button);
  }
}

renderCarouselPagination();

function updateView() {
  const startIndex = (currentCarouselIndex - 1) * carouselItemPerPage+1;
  const endIndex = startIndex + carouselItemPerPage-1;
  for (let i=1; i<=totalCarouselItems; i++){
    var currentCarouselElement = document.getElementById(`carousel-${i}`);
     if(i>= startIndex && i<= endIndex){
      if(!currentCarouselElement.classList.contains('carouselActive')){
        currentCarouselElement.classList.add('carouselActive');
      }
     }
     else{
     if(currentCarouselElement.classList.contains('carouselActive')){
      currentCarouselElement.classList.remove('carouselActive')
     }}
     renderCarouselPagination();
  }
}

updateView();

document.getElementById('send').addEventListener('click', function() {
  document.getElementById('section-home').scrollIntoView({ behavior: 'smooth' });
});