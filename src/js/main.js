import "./funcs/store/events.js";

// دریافت داده‌ها از سرور
fetch('http://localhost:4000/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data); // تمام داده‌ها در Console نمایش داده می‌شوند

    // نمایش لیست محصولات
    const productList = document.getElementById('product-list');
    data.products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - قیمت: ${product.price} تومان`;
      productList.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching data:', error));