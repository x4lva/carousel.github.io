const carouselData = {
    title: 'It’s all about the people',
    content: 'Welcome to our Contingent Workforce space, where you can find additional details on how to engage a contractor with the variety of solutions and options available in our program. ',
    slides: [
        {
            id: 1,
            number: 1,
            image: 'image1.png',
            title: 'Consulting',
            numberOfPeople: 821,
            link: '/sites/US/CWM/Pages/Consulting'
        },
        {
            id: 2,
            number: 2,
            image: 'image2.png',
            title: 'Risk and Financial Advisory',
            numberOfPeople: 198,
            link: '/sites/US/CWM/Pages/Risk'
        }
    ]
}

const selectedSlides = [];
const carouselSlides = document.querySelector('#carousel-slides tbody');

document.addEventListener("DOMContentLoaded", (event) => {
    const carouselTitle = document.querySelector('#carousel-title');
    const carouselContent = document.querySelector('#carousel-content');
    const removeSelected = document.querySelector('#carousel-remove-selected');
    const sortable = document.querySelectorAll('#carousel-slides .dashboard-table-sortable');
    const carouselSave = document.querySelector('#carousel-save');
    const carouselSelectAll = document.querySelector('#carousel-select-all input');

    carouselTitle.value = carouselData.title;
    carouselContent.value = carouselData.content;

    renderTable();

    let currentSort;

    Array.from(sortable).forEach(el => {
        el.addEventListener('click', (e) => {
            let sortDir = el.dataset.sort;

            if (sortDir === undefined && currentSort === undefined) {
                currentSort = el.dataset.field;
                el.classList.add('sort-down');
                el.dataset.sort = 'sort-down';
                sortCarousel(currentSort, 'sort-down')
            } else if (sortDir !== undefined) {
                if (sortDir === 'sort-up') {
                    currentSort = el.dataset.field;
                    el.classList.remove('sort-up');
                    el.classList.add('sort-down');
                    el.dataset.sort = 'sort-down';
                    sortCarousel(currentSort, 'sort-down')
                }

                if (sortDir === 'sort-down') {
                    currentSort = el.dataset.field;
                    el.classList.remove('sort-down');
                    el.classList.add('sort-up');
                    el.dataset.sort = 'sort-up';
                    sortCarousel(currentSort, 'sort-up')
                }
            } else if (currentSort !== undefined) {
                currentSort = el.dataset.field;
                el.classList.add('sort-down');
                el.dataset.sort = 'sort-down';
                sortable.forEach(btn => {
                    if (btn !== el){
                        btn.removeAttribute('data-sort')
                        btn.classList.remove('sort-down');
                        btn.classList.remove('sort-up');
                    }
                })
                sortCarousel(currentSort, 'sort-down')
            }

            renderTable()
        })
    })

    removeSelected.addEventListener('click', (e) => {
        selectedSlides.length > 0 ? alert(JSON.stringify(selectedSlides)) : null;
    })

    carouselSave.addEventListener('click', (e) => {
        alert(JSON.stringify(carouselData))
    })

    carouselTitle.addEventListener('change', (e) => {
        carouselData.title = e.target.value;
    })

    carouselContent.addEventListener('change', (e) => {
        carouselData.content = e.target.value;
    })

    carouselSelectAll.addEventListener('change', (e) => {
        const slideCheckboxes = document.querySelectorAll('.dashboard-table-checkbox input');

        if (selectedSlides.length === 0 || selectedSlides.length === carouselData.slides.length) {
            Array.from(slideCheckboxes).forEach(el => {
                el.click();
            })
        } else {
            Array.from(slideCheckboxes).forEach(el => {
                if (!el.checked) el.click();
            })
        }
    })
});

const renderTable = () => {
    const carouselSelectAll = document.querySelector('#carousel-select-all input');

    carouselSlides.innerHTML = carouselData.slides.map(el => {
        return `<tr data-item="${el.id}" class="carousel-slide ${selectedSlides.indexOf(el) !== -1 ? 'active' : ''}" role="row">
            <td role="cell">
                <label class="dashboard-table-checkbox">
                    <input ${selectedSlides.indexOf(el) !== -1 ? 'checked' : ''} type="checkbox" title="Toggle Row Selected" style="cursor: pointer;">
                    <div class="dashboard-table-checkbox-dec"></div>
                </label>
            </td>
            <td role="cell">${el.number}.</td>
            <td role="cell">
                <div class="d-flex flex-center">
                    <img draggable="false" width="58" height="86" class="carousel-slide-image" src="${el.image}" alt="">
                </div>
            </td>
            <td role="cell">
                <div class="dashboard-table-input">
                    <input data-item="${el.id}" data-field="title" type="text" value="${el.title}">
                </div>
            </td>
            <td role="cell">
                <div class="dashboard-table-input">
                    <input data-item="${el.id}" data-field="numberOfPeople" type="text" value="${el.numberOfPeople}">
                </div>
            </td>
            <td role="cell">
                <div class="dashboard-table-input">
                    <input data-item="${el.id}" data-field="link" type="text" value="${el.link}">
                </div>
            </td>
        </tr>`;
    }).join('');

    const slideInputs = document.querySelectorAll('.dashboard-table-input input');
    Array.from(slideInputs).forEach(el => {
        el.addEventListener('change', (e) => {
            const index = carouselData.slides.indexOf(carouselData.slides.find(el => el.id === parseInt(e.target.dataset.item)));

            if (index > -1) {
                carouselData.slides[index][e.target.dataset.field] = e.target.value;
            }
        })
    })

    const slideCheckboxes = document.querySelectorAll('.dashboard-table-checkbox input');
    Array.from(slideCheckboxes).forEach(el => {
        el.addEventListener('click', (e) => {
            const row = el.parentElement.parentElement.parentElement;
            const itemId = JSON.parse(row.dataset.item);

            row.classList.toggle('active');
            if (!row.classList.contains('active')) {
                carouselSelectAll.checked = false;
            }

            if (!selectedSlides.find(el => el.id === itemId)) {
                selectedSlides.push(carouselData.slides.find(el => el.id === itemId));
            } else {
                const index = selectedSlides.indexOf(carouselData.slides.find(el => el.id === itemId));

                if (index > -1) {
                    selectedSlides.splice(index, 1);
                }
            }

            if (selectedSlides.length === carouselData.slides.length) {
                carouselSelectAll.checked = true;
            }
        })
    })
}

const sortCarousel = (currentSort, dir) => {
    if (typeof carouselData.slides[0][currentSort] === 'string' && dir === 'sort-down') {
        carouselData.slides.sort(function (a, b) {return a[currentSort].localeCompare(b[currentSort])})
    }

    if (typeof carouselData.slides[0][currentSort] === 'string' && dir === 'sort-up') {
        carouselData.slides.sort(function (a, b) {return b[currentSort].localeCompare(a[currentSort])})
    }

    if (typeof carouselData.slides[0][currentSort] === 'number' && dir === 'sort-down') {
        carouselData.slides.sort(function (a, b) {return a[currentSort] - b[currentSort]})
    }

    if (typeof carouselData.slides[0][currentSort] === 'number' && dir === 'sort-up') {
        carouselData.slides.sort(function (a, b) {return b[currentSort] - a[currentSort]})
    }
}
