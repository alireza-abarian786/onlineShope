// src/data/CartData.js

const fakeCart = {
    // آیتم‌های داخل سبد خرید
    items: [
        {
            _id: "cart_item_001",
            productId: "prod_001",
            name: "لپ‌تاپ ایسوس TUF Gaming F15",
            image: "./src/assets/images/digitals/digital-1.webp",
            price: 45900000,        // قیمت اصلی (تومان)
            discount: 13,            // درصد تخفیف
            finalPrice: 39933000,    // قیمت نهایی بعد از تخفیف
            quantity: 1,             // تعداد
            color: "مشکی",
            warranty: "گارانتی ۲۴ ماهه آواژنگ",
            inStock: true,
            maxQuantity: 15,         // حداکثر تعداد قابل سفارش
            addedAt: "۱۴۰۵/۰۵/۰۲ - ۱۴:۳۰",
        },
        {
            _id: "cart_item_002",
            productId: "prod_004",
            name: "گوشی آیفون 16 پرو مکس",
            image: "./src/assets/images/phone/phone-2.webp",
            price: 78500000,
            discount: 8,
            finalPrice: 72220000,
            quantity: 1,
            color: "تیتانیوم طبیعی",
            warranty: "گارانتی ۱۸ ماهه اپل",
            inStock: true,
            maxQuantity: 25,
            addedAt: "۱۴۰۵/۰۵/۰۲ - ۱۲:۱۵",
        },
        {
            _id: "cart_item_003",
            productId: "prod_013",
            name: "کفش ورزشی نایک Air Max",
            image: "./src/assets/images/sports/sport-1.webp",
            price: 5200000,
            discount: 20,
            finalPrice: 4160000,
            quantity: 2,
            color: "مشکی",
            size: "42",
            inStock: true,
            maxQuantity: 30,
            addedAt: "۱۴۰۵/۰۵/۰۱ - ۱۸:۴۵",
        },
    ],

    // اطلاعات قیمت‌گذاری
    pricing: {
        subtotal: 116313000,        // جمع قیمت‌ها بدون تخفیف
        totalDiscount: 12337000,    // کل تخفیف
        shippingCost: 0,            // هزینه ارسال (رایگان)
        tax: 0,                     // مالیات
        finalTotal: 116313000,      // مبلغ نهایی قابل پرداخت
    },

    // کدهای تخفیف
    discountCodes: [
        {
            code: "WELCOME10",
            type: "percent",
            value: 10,
            minPurchase: 5000000,
            maxDiscount: 5000000,
            isActive: true,
            usageLimit: 1,
            usedCount: 0,
            expiresAt: "۱۴۰۵/۰۶/۳۰",
        },
        {
            code: "TAKHFA50",
            type: "fixed",
            value: 500000,
            minPurchase: 1000000,
            isActive: true,
            usageLimit: null,
            usedCount: 0,
            expiresAt: null,
        },
        {
            code: "FREE_SHIPPING",
            type: "free_shipping",
            value: 0,
            minPurchase: 2000000,
            isActive: true,
            usageLimit: 5,
            usedCount: 0,
            expiresAt: "۱۴۰۵/۰۵/۳۰",
        },
    ],

    // کد تخفیف اعمال شده
    appliedDiscountCode: null,

    // اطلاعات ارسال
    shipping: {
        method: "post",             // post | tipax | snapbox
        address: null,              // آدرس انتخاب نشده
        estimatedDelivery: "۳ تا ۵ روز کاری",
        freeShippingThreshold: 5000000, // آستانه ارسال رایگان
    },

    // اطلاعات پرداخت
    payment: {
        method: null,               // online | cash | wallet
        status: "pending",
        gateway: null,
    },
};

// ============ سفارش‌های قبلی (تاریخچه خرید) ============
const fakeOrders = [
    {
        _id: "order_001",
        orderNumber: "DS-14050401",
        date: "۱۴۰۵/۰۴/۰۱",
        status: "delivered",        // pending | processing | shipped | delivered | cancelled
        items: [
            {
                name: "مخلوط‌کن فیلیپس HR3573",
                image: "./src/assets/images/kitchen/kitchen-1.webp",
                price: 4200000,
                quantity: 1,
            },
        ],
        total: 4200000,
        paymentMethod: "online",
        trackingCode: "TPX-12345678",
    },
    {
        _id: "order_002",
        orderNumber: "DS-14040328",
        date: "۱۴۰۵/۰۳/۲۸",
        status: "delivered",
        items: [
            {
                name: "دمبل 10 کیلویی پروتئین",
                image: "./src/assets/images/sports/sport-3.webp",
                price: 890000,
                quantity: 2,
            },
            {
                name: "ست ورزشی آدیداس مردانه",
                image: "./src/assets/images/sports/sport-2.webp",
                price: 1850000,
                quantity: 1,
            },
        ],
        total: 3630000,
        paymentMethod: "cash",
        trackingCode: "TPX-87654321",
    },
    {
        _id: "order_003",
        orderNumber: "DS-14040315",
        date: "۱۴۰۵/۰۳/۱۵",
        status: "shipped",
        items: [
            {
                name: "دفتر یادداشت چرمی لدرم",
                image: "./src/assets/images/stationerys/stationery-2.webp",
                price: 420000,
                quantity: 3,
            },
            {
                name: "خودکار پارکر IM مات مشکی",
                image: "./src/assets/images/stationerys/stationery-1.webp",
                price: 3400000,
                quantity: 1,
            },
        ],
        total: 4660000,
        paymentMethod: "online",
        trackingCode: "TPX-11223344",
    },
];

// ============ علاقه‌مندی‌ها (Bookmarks) ============
const fakeFavorites = [
    "prod_002",  // مک‌بوک پرو
    "prod_005",  // سامسونگ S25 اولترا
    "prod_011",  // گوشواره طلا
    "prod_023",  // ساعت کاسیو
];

// ============ Export ============
export { fakeCart, fakeOrders, fakeFavorites };
