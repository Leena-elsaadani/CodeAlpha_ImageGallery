const images = [
  { src: "images/mountain.jpg", title: "Mountain", category: "nature" },
  { src: "images/sea.jpg", title: "Sunset Beach", category: "nature" },
  { src: "images/build1.jpg", title: "Modern Building", category: "architecture" },
  { src: "images/animal1.jpg", title: "Lion", category: "animals" },
  { src: "images/animal2.jpg", title: "Zebra", category: "animals" },
  { src: "images/mobile.jpg", title: "Mobile Phones", category: "technology" },
  { src: "images/fam.jpg", title: "Family", category: "family" },
  { src: "images/effiel.jpg", title: "Effiel Tower", category: "architecture" },
  { src: "images/ShihTzu.jpeg", title: "Shih Tzu Dog", category: "animals" },
  
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const counter = document.getElementById("imageCounter");

let filteredImages = [...images];
let currentIndex = 0;

/* Build Gallery */
function renderGallery() {
  gallery.innerHTML = "";
  filteredImages.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
      <img src="${img.src}" />
      <div class="gallery-item-overlay">
       <h3>${img.title}</h3>
       <span class="category-badge">${img.category.toUpperCase()}</span>
      </div>

    `;
    item.onclick = () => openLightbox(index);
    gallery.appendChild(item);
  });
}

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

function updateLightbox() {
  const img = filteredImages[currentIndex];
  lightboxImage.src = img.src;
  lightboxTitle.textContent = img.title;
  lightboxCategory.textContent = img.category.toUpperCase();
  counter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
}

document.getElementById("nextImage").onclick = () => {
  currentIndex = (currentIndex + 1) % filteredImages.length;
  updateLightbox();
};

document.getElementById("prevImage").onclick = () => {
  currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  updateLightbox();
};

document.getElementById("closeLightbox").onclick = closeLightbox;

/* Filters */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    filteredImages = filter === "all"
      ? [...images]
      : images.filter(img => img.category === filter);

    renderGallery();
  };
});

renderGallery();
