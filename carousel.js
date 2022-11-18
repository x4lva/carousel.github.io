document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.dei-pager-carousel-item-wrapper');
    const bg = document.querySelector('#slider-container .dei-pager-carousel-container-image');

    Array.from(items).forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            if (bg.dataset.image === el.dataset.image) return;

            bg.style.opacity = 0;
            bg.dataset.image = el.dataset.image;

            setTimeout(() => {
                bg.style.backgroundImage = `url('assets/${el.dataset.image}')`;
            }, 200);

            setTimeout(() => {
                bg.style.opacity = 1;
            }, 250);
        })
    })
})