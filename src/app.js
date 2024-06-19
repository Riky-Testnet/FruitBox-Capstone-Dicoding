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
            // Check Barang
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // Jika Belum ada
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) => {
                    if(item.id !== newItem.id) {
                        return item;
                    }else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }

        },
        remove(id) {
            // Ambil item remove
            const cartItem = this.items.find((item) => item.id === id);

            // Jika item lebih dari 1
            if(cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if(item.id !== id){
                        return item;
                    }else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            }else if (cartItem.quantity === 1) {
                // Jika Barangnya sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

// form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled= true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function () {
    for(let i = 0; i < form.elements.length; i++ ) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }

    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// Send data
checkoutButton.addEventListener('click', async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // window.open('http://wa.me/6282297431860?text=' + encodeURIComponent(message));
    // Request Snap Token
    try {
        const response = await fetch('php/placeOrder.php', {
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        window.snap.pay(token);
    } catch(err) {
        console.log(err.message);
    }

});

const formatMessage = (obj) => {
    return `data Customer
        Nama: ${obj.name}
        Email: ${obj.email}
        Phone: ${obj.phone}
        Data Pesanan
        ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n `)}
        TOTAL: ${rupiah(obj.total)}
        Terima Kasih`;
}

// Konversri Ke Rp
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};




