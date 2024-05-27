// Toogle Class Active
const navbarNav = document.querySelector('.navbar-nav');
// after Hamburger menu click
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Click Di Luar Sidebar Untuk Menghilangkan Nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target))
        navbarNav.classList.remove('active');
})


  
