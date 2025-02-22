// Массив товаров для мобильного поиска (используется для динамического рендеринга)
const productsArray = [
  { title: 'Бамбуковый веник', price: '534 ₽', image: 'bamboo_venik.webp' },
  { title: 'Березовый веник', price: '182 ₽', image: 'birch_venik.webp' },
  { title: 'Дубовый веник', price: '210 ₽', image: 'oak_venik.webp' },
  { title: 'Эвкалиптовый веник', price: '250 ₽', image: 'eucalyptus_venik.webp' },
  { title: 'Мята', price: '120 ₽', image: 'mint_trava.webp' },
  { title: 'Ромашка', price: '140 ₽', image: 'chamomile_trava.webp' },
  { title: 'Лаванда', price: '160 ₽', image: 'lavender_trava.webp' },
  { title: 'Шалфей', price: '180 ₽', image: 'sage_trava.webp' }
];

// Функция для создания HTML-карточки товара (для мобильного поиска)
function renderProduct(product) {
  return `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-4">
          <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.price}</p>
          </div>
        </div>
      </div>
    </div>`;
}

// Функция фильтрации карточек по категории (для десктопа)
function filterProducts(predicate) {
  const products = document.querySelectorAll('.card');
  products.forEach(product => {
    // Ищем ближайший родительский элемент-колонку
    const container = product.closest('.col-lg-3, .col-md-4, .col-sm-6, .col-6');
    container.style.display = predicate(product) ? 'block' : 'none';
  });
}

// Универсальный обработчик поиска для мобильных и десктопа
document.getElementById('searchInput').addEventListener('keyup', function() {
  const query = this.value.trim().toLocaleLowerCase('ru');

  // Если мобильное устройство (ширина экрана <768px)
  if (window.innerWidth < 768) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Очищаем контейнер перед каждым вводом
    const filtered = productsArray.filter(product =>
      product.title.toLocaleLowerCase('ru').includes(query)
    );
    if (filtered.length === 0) {
      searchResults.innerHTML = '<p class="text-center">Товары не найдены</p>';
    } else {
      filtered.forEach(product => {
        searchResults.innerHTML += renderProduct(product);
      });
    }
  } else {
    // Для ПК фильтруем существующие карточки
    const products = document.querySelectorAll('.card');
    products.forEach(function(product) {
      const title = product.querySelector('.card-title').textContent.toLocaleLowerCase('ru');
      const container = product.closest('.col-lg-3, .col-md-4, .col-sm-6, .col-6');
      container.style.display = title.includes(query) ? 'block' : 'none';
    });
  }
});

// Фильтрация по категориям (работает для ПК)
document.addEventListener("DOMContentLoaded", function () {
  const showVenikiBtn = document.getElementById("showVeniki");
  const showTravyBtn = document.getElementById("showTravy");
  const showAllBtn = document.getElementById("showAll");
  const showotzavBtn = document.getElementById("showotzav");
  const showGalleryBtn = document.getElementById("showGallery");
  if (showVenikiBtn) {
    showVenikiBtn.addEventListener("click", () => {
      filterProducts(product => product.getAttribute("data-category") === "veniki");
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (showTravyBtn) {
    showTravyBtn.addEventListener("click", () => {
      filterProducts(product => product.getAttribute("data-category") === "travy");
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (showAllBtn) {
    showAllBtn.addEventListener("click", () => {
      filterProducts(() => true);
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
  }
  if (showotzavBtn) {
    showotzavBtn.addEventListener("click", () => {
      
      document.getElementById("otzav").scrollIntoView({ behavior: "smooth" });
    });
  }
  if (showGalleryBtn) {
    showGalleryBtn.addEventListener("click", () => {
      document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
    });
  }
});
