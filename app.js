// Open and Close navbar
const navbarBurger = document.querySelector(".navbar-burger");
const navbarMenu = document.querySelector(".navbar-menu");

function toggleMenu() {
    navbarBurger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
}

navbarBurger.addEventListener('click', toggleMenu);

// Filter products
const filterButtons = document.querySelectorAll('.filter-button');
const productColumns = document.querySelectorAll('.product-column');

function filterAnimation(selectCategories, action, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            productColumns.forEach(column => {
                if (action === 'fade-in') {
                    column.classList.add('fade-out');
                } else if (action === 'display') {
                    const productCategories = column.dataset.categories;

                    if (productCategories === selectCategories || selectCategories === 'all') {
                        column.classList.remove('is-hidden');
                    } else {
                        column.classList.add('is-hidden');
                    }
                } else if (action === 'fade-out') {
                    column.classList.remove('fade-out');
                }
            });
            resolve();
        }, delay);
    });
}

async function filterProducts(event) {
    // Change button color
    const selectedButton = event.target

    filterButtons.forEach((button) => {
        button.classList.remove('is-dark');
    });

    selectedButton.classList.add('is-dark');

    // check categories
    const selectCategories = selectedButton.dataset.categories;

    // Animation
    await filterAnimation(selectCategories, 'fade-in', 0);
    await filterAnimation(selectCategories, 'display', 500);
    await filterAnimation(selectCategories, 'fade-out', 200);
}

filterButtons.forEach((button) => {
    button.addEventListener('click', filterProducts);
});