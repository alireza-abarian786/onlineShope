// src/data/FavoriteData.js

const fakeFavorites = {
    // لیست محصولات مورد علاقه
    items: [
        {
            _id: "fav_001",
            productId: "prod_002",
            name: "مک‌بوک پرو 16 اینچ M3 Pro",
            image: "./src/assets/images/digitals/digital-2.webp",
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
            image: "./src/assets/images/phone/phone-4.webp",
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
            image: "./src/assets/images/jewellerys/jewellery-2.webp",
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
            image: "./src/assets/images/modes/mode-2.webp",
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
            image: "./src/assets/images/kitchen/kitchen-2.webp",
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
            image: "./src/assets/images/stationerys/stationery-1.webp",
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