const productImages = document.querySelectorAll(".product-images img"); // selecting all image thumbs
const productImageSlide = document.querySelector(".image-slider"); // seclecting image slider element

let activeImageSlide = 0; // default slider image

productImages.forEach((item, i) => { // loopinh through each image thumb
    item.addEventListener('click', () => { // adding click event to each image thumbnail
        productImages[activeImageSlide].classList.remove('active'); // removing active class from current image thumb
        item.classList.add('active'); // adding active class to the current or clicked image thumb
        productImageSlide.style.backgroundImage = `url('${item.src}')`; // setting up image slider's background image
        activeImageSlide = i; // updating the image slider variable to track current thumb
    })
})

const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0;
let size;


sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn =i ;
        size = item.innerHTML;
    })

})


const setData = (data) => {
    let title = document.querySelector('title');
    title.innerHTML += data.name;

    productImages.forEach((img, i) => {
        if(data.images[i]){
            img.src = data.images[i];

        }else{
            img.style.display ='none';
        }
    })
    productImages[0].click();

    sizeBtns.forEach(item => {
        if(!data.sizes.includes(item.innerHTML)){
            item.style.display ='none';
        }
    })

    const name = document.querySelector('.product-brand');
    const shortDes = document.querySelector('.product-short-des');
    const des = document.querySelector('.des');

    title.innerHTML += name.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    des.innerHTML = data.des;


    const sellPrice = document.querySelector('.product-price');
    const actualPrice = document.querySelector('.product-actual-price');
    const discount = document.querySelector('.product-discount');

    sellPrice.innerHTML = `$${data.sellPrice}`;
    actualPrice.innerHTML = `$${data.actualPrice}`;
    discount.innerHTML = `( ${data.discount}% off)`;

    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', () => {
        wishlistBtn.innerHTML = add_product_to_card_or_wishlist('wishlist', data);
    })

    const cartBtn = document.querySelector('.cart-btn');    
    cartBtn.addEventListener('click', () => {
        cartBtn.innerHTML = add_product_to_card_or_wishlist('cart', data);
    })

}


const fetchProductData = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers ({'Content-Type':'application/json' }),
        body: JSON.stringify({id: productId})
    })
    .then(res => res.json())
    .then(data => {
        setData(data);
        getProducts(data.tags[1]).then(data => createProductSlider(data, '.container-for-card-slider','similar products'))
    })
    .catch(err => {
        location.replace('/404');
    })
}

let productId = null;
if(location.pathname != '/products'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}