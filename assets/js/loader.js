function loader(_success) {
    obj = document.querySelector('.load');
    page = document.querySelector('.container');
    header = document.querySelector('.header');

    obj.classList.add('hidden');
    obj.remove();
    page.classList.remove('hidden');
    cursor.classList.remove('hidden');
    header.classList.remove('hidden');
}

window.onload = loader;