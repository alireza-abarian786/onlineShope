// src/data/FavoriteData.js

const fakeFavorites = {
    // لیست محصولات مورد علاقه
    items: [
        {
            _id: "fav_001",
            productId: "prod_002",
            name: "مک‌بوک پرو 16 اینچ M3 Pro",
            image: "/src/assets/images/digitals/digital-2.webp",
            price: 112000000,
            discount: 10,
            finalPrice: 100800000,
            category: "digital",
            categoryLabel: "دیجیتال",
            brand: "اپل",
            rating: 4.8,
            reviews: 256,
            inStock: true,
            stock: 8,
            isNew: true,
            addedAt: "۱۴۰۵/۰۵/۰۲",
            addedAtTime: "۱۱:۳۰",
            note: "برای تولد داداشم می‌خوام 😍", // یادداشت کاربر
        },
        {
            _id: "fav_002",
            productId: "prod_005",
            name: "سامسونگ گلکسی S25 اولترا",
            image: "/src/assets/images/phone/phone-4.webp",
            price: 65000000,
            discount: 10,
            finalPrice: 58500000,
            category: "phone",
            categoryLabel: "موبایل",
            brand: "سامسونگ",
            rating: 4.7,
            reviews: 315,
            inStock: true,
            stock: 18,
            isNew: true,
            addedAt: "۱۴۰۵/۰۴/۲۸",
            addedAtTime: "۲۰:۱۵",
            note: "",
        },
        {
            _id: "fav_003",
            productId: "prod_011",
            name: "گوشواره طلا 18 عیار زنانه",
            image: "/src/assets/images/jewellerys/jewellery-2.webp",
            price: 24500000,
            discount: 13,
            finalPrice: 21315000,
            category: "jewellery",
            categoryLabel: "طلا و جواهرات",
            brand: "گالری طلا",
            rating: 4.9,
            reviews: 52,
            inStock: true,
            stock: 5,
            isNew: true,
            addedAt: "۱۴۰۵/۰۴/۲۵",
            addedAtTime: "۰۹:۴۵",
            note: "هدیه سالگرد ازدواج 💍",
        },
        {
            _id: "fav_004",
            productId: "prod_023",
            name: "ساعت مچی مردانه کاسیو Edifice",
            image: "/src/assets/images/modes/mode-2.webp",
            price: 6500000,
            discount: 17,
            finalPrice: 5395000,
            category: "mode",
            categoryLabel: "مد و پوشاک",
            brand: "کاسیو",
            rating: 4.6,
            reviews: 95,
            inStock: true,
            stock: 14,
            isNew: true,
            addedAt: "۱۴۰۵/۰۴/۲۰",
            addedAtTime: "۱۶:۰۰",
            note: "",
        },
        {
            _id: "fav_005",
            productId: "prod_008",
            name: "سرخ‌کن بدون روغن تفال EY501",
            image: "/src/assets/images/kitchen/kitchen-2.webp",
            price: 6800000,
            discount: 14,
            finalPrice: 5848000,
            category: "kitchen",
            categoryLabel: "آشپزخانه",
            brand: "تفال",
            rating: 4.5,
            reviews: 143,
            inStock: false, // ناموجود
            stock: 0,
            isNew: false,
            addedAt: "۱۴۰۵/۰۴/۱۵",
            addedAtTime: "۱۳:۲۰",
            note: "فعلاً موجود نیست، منتظر می‌مونم ⏳",
        },
        {
            _id: "fav_006",
            productId: "prod_016",
            name: "خودکار پارکر IM مات مشکی",
            image: "/src/assets/images/stationerys/stationery-1.webp",
            price: 3400000,
            discount: 13,
            finalPrice: 2958000,
            category: "stationery",
            categoryLabel: "لوازم تحریر",
            brand: "پارکر",
            rating: 4.4,
            reviews: 63,
            inStock: true,
            stock: 25,
            isNew: false,
            addedAt: "۱۴۰۵/۰۴/۱۰",
            addedAtTime: "۱۰:۰۰",
            note: "",
        },
    ],

    // لیست‌های سفارشی (Custom Lists)
    lists: [
        {
            _id: "list_001",
            name: "تجهیزات اداری جدید",
            icon: "💼",
            color: "#3b82f6",
            productIds: ["fav_006"],
            isDefault: false,
            createdAt: "۱۴۰۵/۰۴/۱۰",
        },
        {
            _id: "list_002",
            name: "کادوهای تولد",
            icon: "🎁",
            color: "#ec4899",
            productIds: ["fav_001", "fav_003"],
            isDefault: false,
            createdAt: "۱۴۰۵/۰۴/۲۵",
        },
        {
            _id: "list_default",
            name: "علاقه‌مندی‌های من",
            icon: "❤️",
            color: "#ef4444",
            productIds: ["fav_001", "fav_002", "fav_003", "fav_004", "fav_005", "fav_006"],
            isDefault: true,
            createdAt: "۱۴۰۵/۰۱/۰۱",
        },
    ],

    // تنظیمات
    settings: {
        enableNotifications: true,      // اطلاع از تخفیف محصولات مورد علاقه
        notifyOnPriceDrop: true,        // اطلاع از کاهش قیمت
        notifyOnAvailable: true,        // اطلاع از موجود شدن
        sortBy: "newest",              // newest | oldest | priceLow | priceHigh | discountHigh
        viewMode: "grid",              // grid | list
    },

    // آمار
    stats: {
        totalItems: 6,
        availableItems: 5,
        outOfStockItems: 1,
        onSaleItems: 4,               // تعداد محصولات دارای تخفیف
        totalValue: 223500000,         // ارزش کل محصولات (قیمت اصلی)
        totalDiscountedValue: 197435000, // ارزش کل با تخفیف
        potentialSavings: 26065000,     // صرفه‌جویی احتمالی
    }
};

// ============ تاریخچه قیمت (برای نمودار) ============
const fakePriceHistory = {
    "prod_002": [
        { date: "۱۴۰۴/۱۲/۰۱", price: 125000000 },
        { date: "۱۴۰۵/۰۱/۱۵", price: 118000000 },
        { date: "۱۴۰۵/۰۳/۰۱", price: 112000000 },
        { date: "۱۴۰۵/۰۵/۰۱", price: 100800000 },
    ],
    "prod_005": [
        { date: "۱۴۰۴/۱۲/۰۱", price: 72000000 },
        { date: "۱۴۰۵/۰۱/۲۰", price: 68000000 },
        { date: "۱۴۰۵/۰۳/۱۰", price: 65000000 },
        { date: "۱۴۰۵/۰۵/۰۱", price: 58500000 },
    ],
};

// ============ Export ============
export { fakeFavorites, fakePriceHistory };

// ============ توابع کمکی ============

/**
 * افزودن محصول به علاقه‌مندی‌ها
 */
export function addToFavorites(product, note = "") {
    // چک کردن تکراری نبودن
    const exists = fakeFavorites.items.find(item => item.productId === product._id);
    if (exists) {
        return { success: false, message: "این محصول قبلاً به علاقه‌مندی‌ها اضافه شده", item: exists };
    }

    const discount = product.discount || 0;
    const finalPrice = discount > 0 
        ? Math.round(product.price - (product.price * discount / 100))
        : product.price;

    const now = new Date();
    const newFavorite = {
        _id: "fav_" + Date.now(),
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        discount: discount,
        finalPrice: finalPrice,
        category: product.category,
        categoryLabel: product.categoryLabel || product.category,
        brand: product.brand,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        inStock: product.stock > 0,
        stock: product.stock || 0,
        isNew: product.isNew || false,
        addedAt: now.toLocaleDateString('fa-IR'),
        addedAtTime: now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        note: note,
    };

    fakeFavorites.items.unshift(newFavorite);
    updateFavoritesStats();
    
    // اضافه به لیست پیش‌فرض
    const defaultList = fakeFavorites.lists.find(list => list.isDefault);
    if (defaultList) {
        defaultList.productIds.push(newFavorite._id);
    }

    return { success: true, message: "✅ به علاقه‌مندی‌ها اضافه شد", item: newFavorite };
}

/**
 * حذف محصول از علاقه‌مندی‌ها
 */
export function removeFromFavorites(favoriteId) {
    const item = fakeFavorites.items.find(f => f._id === favoriteId);
    
    fakeFavorites.items = fakeFavorites.items.filter(f => f._id !== favoriteId);
    
    // حذف از همه لیست‌ها
    fakeFavorites.lists.forEach(list => {
        list.productIds = list.productIds.filter(id => id !== favoriteId);
    });
    
    updateFavoritesStats();
    
    return { 
        success: true, 
        message: "🗑️ از علاقه‌مندی‌ها حذف شد",
        removedItem: item 
    };
}

/**
 * تغییر وضعیت علاقه‌مندی (اضافه/حذف)
 */
export function toggleFavorite(product) {
    const exists = fakeFavorites.items.find(item => item.productId === product._id);
    
    if (exists) {
        removeFromFavorites(exists._id);
        return { status: "removed", message: "از علاقه‌مندی‌ها حذف شد" };
    } else {
        addToFavorites(product);
        return { status: "added", message: "به علاقه‌مندی‌ها اضافه شد" };
    }
}

/**
 * بررسی وجود محصول در علاقه‌مندی‌ها
 */
export function isFavorite(productId) {
    return fakeFavorites.items.some(item => item.productId === productId);
}

/**
 * دریافت علاقه‌مندی با productId
 */
export function getFavoriteByProductId(productId) {
    return fakeFavorites.items.find(item => item.productId === productId) || null;
}

/**
 * ویرایش یادداشت
 */
export function updateFavoriteNote(favoriteId, note) {
    const item = fakeFavorites.items.find(f => f._id === favoriteId);
    if (item) {
        item.note = note;
        return { success: true, message: "یادداشت بروزرسانی شد" };
    }
    return { success: false, message: "محصول پیدا نشد" };
}

/**
 * دریافت علاقه‌مندی‌های موجود
 */
export function getAvailableFavorites() {
    return fakeFavorites.items.filter(item => item.inStock);
}

/**
 * دریافت علاقه‌مندی‌های ناموجود
 */
export function getOutOfStockFavorites() {
    return fakeFavorites.items.filter(item => !item.inStock);
}

/**
 * دریافت علاقه‌مندی‌های دارای تخفیف
 */
export function getOnSaleFavorites() {
    return fakeFavorites.items.filter(item => item.discount > 0);
}

/**
 * مرتب‌سازی علاقه‌مندی‌ها
 */
export function sortFavorites(sortBy = "newest") {
    switch (sortBy) {
        case "oldest":
            fakeFavorites.items.sort((a, b) => a.addedAt.localeCompare(b.addedAt));
            break;
        case "priceLow":
            fakeFavorites.items.sort((a, b) => a.finalPrice - b.finalPrice);
            break;
        case "priceHigh":
            fakeFavorites.items.sort((a, b) => b.finalPrice - a.finalPrice);
            break;
        case "discountHigh":
            fakeFavorites.items.sort((a, b) => b.discount - a.discount);
            break;
        case "newest":
        default:
            fakeFavorites.items.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
            break;
    }
    fakeFavorites.settings.sortBy = sortBy;
    return fakeFavorites.items;
}

/**
 * ایجاد لیست سفارشی جدید
 */
export function createList(name, icon = "📋", color = "#3b82f6") {
    const newList = {
        _id: "list_" + Date.now(),
        name: name,
        icon: icon,
        color: color,
        productIds: [],
        isDefault: false,
        createdAt: new Date().toLocaleDateString('fa-IR'),
    };
    
    fakeFavorites.lists.push(newList);
    return newList;
}

/**
 * افزودن محصول به لیست سفارشی
 */
export function addToList(listId, favoriteId) {
    const list = fakeFavorites.lists.find(l => l._id === listId);
    if (list && !list.productIds.includes(favoriteId)) {
        list.productIds.push(favoriteId);
        return { success: true, message: "به لیست اضافه شد" };
    }
    return { success: false, message: "قبلاً در این لیست وجود دارد" };
}

/**
 * دریافت محصولات یک لیست
 */
export function getListItems(listId) {
    const list = fakeFavorites.lists.find(l => l._id === listId);
    if (!list) return [];
    
    return fakeFavorites.items.filter(item => list.productIds.includes(item._id));
}

/**
 * بروزرسانی آمار
 */
function updateFavoritesStats() {
    const items = fakeFavorites.items;
    
    fakeFavorites.stats.totalItems = items.length;
    fakeFavorites.stats.availableItems = items.filter(i => i.inStock).length;
    fakeFavorites.stats.outOfStockItems = items.filter(i => !i.inStock).length;
    fakeFavorites.stats.onSaleItems = items.filter(i => i.discount > 0).length;
    fakeFavorites.stats.totalValue = items.reduce((sum, i) => sum + i.price, 0);
    fakeFavorites.stats.totalDiscountedValue = items.reduce((sum, i) => sum + i.finalPrice, 0);
    fakeFavorites.stats.potentialSavings = fakeFavorites.stats.totalValue - fakeFavorites.stats.totalDiscountedValue;
}

/**
 * دریافت تاریخچه قیمت
 */
export function getPriceHistory(productId) {
    return fakePriceHistory[productId] || [];
}

/**
 * دریافت بیشترین کاهش قیمت
 */
export function getBiggestPriceDrop(productId) {
    const history = getPriceHistory(productId);
    if (history.length < 2) return null;
    
    const oldPrice = history[0].price;
    const newPrice = history[history.length - 1].price;
    const drop = oldPrice - newPrice;
    const percent = Math.round((drop / oldPrice) * 100);
    
    return {
        amount: drop,
        percent: percent,
        oldPrice: oldPrice,
        newPrice: newPrice,
    };
}

/**
 * انتقال به سبد خرید
 */
export function moveToCart(favoriteId) {
    const item = fakeFavorites.items.find(f => f._id === favoriteId);
    if (!item) return { success: false, message: "محصول پیدا نشد" };
    
    if (!item.inStock) return { success: false, message: "محصول ناموجود است" };
    
    // اینجا می‌تونی تابع addToCart از CartData رو صدا بزنی
    // import { addToCart } from './CartData.js';
    
    // حذف از علاقه‌مندی‌ها
    removeFromFavorites(favoriteId);
    
    return { success: true, message: "به سبد خرید منتقل شد", item: item };
}