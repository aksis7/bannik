 // Пример массива товаров
 const products = [
    { title: 'Бамбуковый веник', price: '534 ₽', image: 'bamboo_venik.webp' },
    { title: 'Березовый веник', price: '182 ₽', image: 'birch_venik.webp' },
    { title: 'Дубовый веник', price: '210 ₽', image: 'oak_venik.webp' },
    { title: 'Эвкалиптовый веник', price: '250 ₽', image: 'eucalyptus_venik.webp' },
    { title: 'Мята', price: '120 ₽', image: 'mint_trava.webp' },
    { title: 'Ромашка', price: '140 ₽', image: 'chamomile_trava.webp' },
    { title: 'Лаванда', price: '160 ₽', image: 'lavender_trava.webp' },
    { title: 'Шалфей', price: '180 ₽', image: 'sage_trava.webp' }
  ];

  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Функция для рендеринга карточки товара
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
      </div>
    `;
  }

  // Обработчик ввода в поле поиска
  searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    // Фильтруем товары по названию
    const filtered = products.filter(product => product.title.toLowerCase().includes(query));
    
    // Очищаем контейнер результатов
    searchResults.innerHTML = '';
    
    if (filtered.length === 0) {
      searchResults.innerHTML = '<p class="text-center">Товары не найдены</p>';
      return;
    }
    
    // Выводим найденные карточки
    filtered.forEach(product => {
      searchResults.innerHTML += renderProduct(product);
    });
  });