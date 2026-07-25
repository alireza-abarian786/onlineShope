# 🛒 DigiStore – Offline E-Commerce Platform

DigiStore is a fully offline e-commerce web application built with **HTML**, **CSS**, and **Vanilla JavaScript**. All data is stored locally in the browser using **localStorage**, eliminating the need for a backend server or database. The project is designed for educational purposes and takes inspiration from modern e-commerce platforms like **Digikala**.

🌐 **Live Demo:**  
[👉 View on GitHub Pages](https://alireza-abarian786.github.io/onlineShope/)

---

## ✨ Key Features

- Fully **offline** – no server or internet connection required
- **Responsive design** – optimized for mobile, tablet, and desktop
- **Advanced search** with support for Persian typo handling and space-insensitive matching
- **Local authentication** system with user registration and login
- **Shopping cart** management with quantity controls and total calculation
- **Wishlist (bookmarks)** for saving favorite products
- **Discount system** with live countdown timer
- **Product detail page** with image gallery and related products
- **User dashboard** with statistics, tasks, recent activities, and balance
- **Category filtering**, sorting, and pagination
- **Blog and articles** section on the homepage

---

## 🛠️ Technologies Used

- HTML5, CSS3, JavaScript (Vanilla ES Modules)
- Bootstrap 5, Swiper.js, Glide.js, AOS, SweetAlert2
- localStorage for data persistence

---

## 🚀 How to Run

```bash
# Clone the repository
git clone https://github.com/alireza-abarian786/onlineShope.git

# Open with Live Server (VS Code)
# Right-click on index.html → Open with Live Server
```

**Or simply open `index.html` directly in your browser.**

**Live Demo:**  
[https://alireza-abarian786.github.io/onlineShope/](https://alireza-abarian786.github.io/onlineShope/)

---

## 👤 Default Users

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Admin |
| test@example.com | test123 | Regular User |

> 💡 You can also register a new account directly from the login page.

---

## 📁 Project Structure

```
onlineShope/
├── src/
│   ├── data/          ← Mock data (products, users, blogs)
│   ├── js/
│   │   ├── funcs/     ← Utility functions (cart, wishlist, menu)
│   │   ├── panel/     ← User dashboard logic
│   │   └── *.js       ← Main page scripts
│   └── assets/
│       ├── css/       ← Stylesheets
│       └── images/    ← Product images and icons
├── public/vendor/     ← Third-party libraries
├── *.html             ← HTML pages
├── .nojekyll          ← Disables Jekyll for GitHub Pages
└── README.md
```

---

## 📷 Screenshots

### 🔐 Authentication

| Login State | Token Expiration |
|-------------|------------------|
| ![Login](https://i.ibb.co/XkVHw1XX/Screenshot-2025-05-24-124255.png) | ![Token Expired](https://i.ibb.co/Fkx8s5vG/Screenshot-2025-05-24-113119.png) |

---

### 🛒 Cart Button State

| Cart Empty | Cart Full |
|------------|-----------|
| ![Empty Cart](https://i.ibb.co/QFqzsfxh/Screenshot-2025-05-24-122836.png) | ![Full Cart](https://i.ibb.co/4ZqVpLPF/Screenshot-2025-05-24-123414.png) |

---

### 🕹️ Login Button State

| Before Login | After Login | Token Expiration |
|--------------|-------------|------------------|
| ![Before Login](https://i.ibb.co/RkXC90Y0/Screenshot-2025-05-24-105318.png) | ![After Login](https://i.ibb.co/sdphfwbQ/Screenshot-2025-05-24-112531.png) | ![Token Expiration](https://i.ibb.co/3Y0knkYr/Screenshot-2025-05-24-113148.png) |

---

### 🧭 Category & Search UI

| Category Menu | Global Search |
|---------------|---------------|
| ![Categories](https://i.ibb.co/qLL1NX4d/Screenshot-2026-07-26-012254.png) | ![Search](https://i.ibb.co/nMrSXKJR/Screenshot-2026-07-26-012707.png) |

---

### 🛒 Cart State

| Cart View | Remove Product |
|-----------|----------------|
| ![Cart](https://i.ibb.co/Xk5P27JG/Screenshot-2025-06-03-154131jjjjjjjjjjjjjjj.png) | ![Remove](https://i.ibb.co/kF11wCq/Screenshot-2025-06-03-154248.png) |

---

## 📄 Page Status

| Page | Status |
|------|--------|
| Homepage | ✅ Complete |
| Category | ✅ Complete |
| Product Detail | ✅ Complete |
| Shopping Cart | ✅ Complete |
| User Dashboard | ✅ Complete |
| Login / Register | ✅ Complete |
| Blog | ✅ Complete |

---

## 👨‍💻 Developer

**Alireza Abarian**  
[GitHub](https://github.com/alireza-abarian786) · [Email](mailto:alirezaabarian786@gmail.com)

---

## 🤝 Contributing

Found a bug? Have a suggestion?  
Feel free to open an **Issue** or submit a **Pull Request**.

⭐ If you like this project, don't forget to give it a **Star**!
