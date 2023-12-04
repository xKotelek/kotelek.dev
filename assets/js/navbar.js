function toggleNavbar() {
    var navbar = document.getElementById('navbar');
    var navOpenBtn = document.querySelector('.tab-right-nav');
    
    var isNavbarOpen = navOpenBtn.getAttribute("data-nav-opened");
    if (isNavbarOpen === "false") {
        navOpenBtn.setAttribute("data-nav-opened", "true");
        navOpenBtn.classList.add("opened");
        navOpenBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
        navbar.classList.remove('hidden');
    } else {
        navOpenBtn.setAttribute("data-nav-opened", "false");
        navOpenBtn.classList.remove("opened");
        navOpenBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        navbar.classList.add('hidden');
    }
}


function navhref(href) {
    toggleNavbar();
    window.location.href = href;
}