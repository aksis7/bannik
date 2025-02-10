function adjustTopImage() {
    let container = document.querySelector('.top-image-container');
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let imageRatio = 16 / 9; // Соотношение сторон картинки

    if (screenWidth < 768) {
        container.style.height = `${screenWidth / imageRatio}px`; // Авто высота под экран
        container.style.backgroundSize = 'contain'; // Полное отображение
        container.style.backgroundPosition = 'center top';
    } else {
        container.style.height = `${screenHeight * 0.5}px`; // 50% экрана
        container.style.backgroundSize = '100% auto'; // Фиксированная ширина, авто высота
        container.style.backgroundPosition = 'center center';
    }
}

// Убираем лишний отступ между `.top-image-container` и `main`
document.addEventListener("DOMContentLoaded", function () {
    let main = document.querySelector("main");
    let topImage = document.querySelector(".top-image-container");

    if (main && topImage) {
        let space = main.getBoundingClientRect().top - topImage.getBoundingClientRect().bottom;
        if (space < 30) { 
            main.style.marginTop = `10px`; // Минимальный отступ 30px
        }
    }
    
    let buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20, // Чуть выше для удобства
                    behavior: "smooth"
                });
            }
        });
    });
});


// Запускаем при загрузке и изменении размера окна
window.addEventListener('load', adjustTopImage);
window.addEventListener('resize', adjustTopImage);
