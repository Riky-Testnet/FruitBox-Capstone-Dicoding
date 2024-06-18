// Toogle Class Active For Hamburger Menu
const navbarNav = document.querySelector('.navbar-nav');
// after Hamburger menu click
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Toogle Class Active For Search Form

const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');


document.querySelector('#search-button').onclick = (e) =>{
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
}

// toggle class active untuk shopping-cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}
// Click Di Luar Elemet
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button')

document.addEventListener('click', function(e) {
    if(!hm.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
    if(!sb.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active');
    }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active');
    }

    
});


// modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach ((btn) => {

    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault ();
    };


})





// Klik Tombol Close
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

// Klik di Luar modal
window.onclick = (e) => {
    if (e.target === itemDetailModal){
        modal.style.display = 'none';
    }
}
  
