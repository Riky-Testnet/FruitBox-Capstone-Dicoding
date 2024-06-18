document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {id: 1, name: 'Apel Fuji' , img: '1.jpg', price : 35000},
            {id: 2, name: 'Jeruk pontianak' , img: '2.jpg', price : 30000},
            {id: 3, name: 'Pisang Cavendish' , img: '3.jpg', price : 15000},
            {id: 4, name: 'Stoberi Impor' , img: '4.jpg', price : 50000},
            {id: 5, name: 'Buah Naga Putih' , img: '5.jpg', price : 25000},
            {id: 6, name: 'Anggur Merah' , img: '6.jpg', price : 30000},
        ],
    }));


    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            this.items.push(newItem);
            this.quantity++;
            this.total += newItem.price;
            console.log(this.total);
        },
    })
});

// Konversri Ke Rp
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};