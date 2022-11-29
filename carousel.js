document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.dei-pager-carousel-wrapper');

    Array.from(wrappers).forEach(wrapper => {
        const bg = wrapper.querySelector('.dei-pager-carousel-container-image');
        const items = wrapper.querySelectorAll('.dei-pager-carousel-item-wrapper');

        Array.from(items).forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                if (bg.dataset.image === el.dataset.image) return;

                bg.style.opacity = 0;
                bg.dataset.image = el.dataset.image;

                setTimeout(() => {
                    bg.style.backgroundImage = `url('assets/${el.dataset.image}')`;
                }, 400);

                setTimeout(() => {
                    bg.style.opacity = 1;
                }, 500);
            })
        })
    })
})