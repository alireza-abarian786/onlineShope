// src/js/panel/fakeCategories.js

const fakeCategories = [
    {
        _id: "cat_001",
        name: "digital",
        label: "دیجیتال",
        englishLabel: "Digital",
        icon: "/src/assets/images/category/digital.png",
        description: "انواع لپ‌تاپ، تبلت، قطعات کامپیوتر و لوازم جانبی",
        image: "/src/assets/images/img-big/image-0.webp",
        subcategories: [
            {
                _id: "sub_001_1",
                name: "laptop",
                label: "لپ‌تاپ",
                icon: "/src/assets/images/digitals/digital-1.webp",
            },
            {
                _id: "sub_001_2",
                name: "tablet",
                label: "تبلت",
                icon: "/src/assets/images/digitals/digital-2.webp",
            },
            {
                _id: "sub_001_3",
                name: "computer-parts",
                label: "قطعات کامپیوتر",
                icon: "/src/assets/images/digitals/digital-3.webp",
            },
            {
                _id: "sub_001_4",
                name: "accessories",
                label: "لوازم جانبی",
                icon: "/src/assets/images/digitals/digital-4.webp",
            }
        ],
        productCount: 145,
        isActive: true,
        sortOrder: 1,
        tags: ["لپ‌تاپ", "کامپیوتر", "گیمینگ", "تبلت"]
    },
    
    {
        _id: "cat_002",
        name: "phone",
        label: "موبایل",
        englishLabel: "Mobile Phones",
        icon: "/src/assets/images/category/phone-call.png",
        description: "انواع گوشی موبایل، تبلت و لوازم جانبی موبایل",
        image: "/src/assets/images/img-big/image-1.webp",
        subcategories: [
            {
                _id: "sub_002_1",
                name: "smartphone",
                label: "گوشی هوشمند",
                icon: "/src/assets/images/phone/phone-2.webp",
            },
            {
                _id: "sub_002_2",
                name: "accessories-mobile",
                label: "لوازم جانبی موبایل",
                icon: "/src/assets/images/phone/phone-4.webp",
            },
            {
                _id: "sub_002_3",
                name: "smartwatch",
                label: "ساعت هوشمند",
                icon: "/src/assets/images/phone/phone-6.webp",
            }
        ],
        productCount: 230,
        isActive: true,
        sortOrder: 2,
        tags: ["موبایل", "گوشی", "آیفون", "سامسونگ", "ساعت هوشمند"]
    },
    
    {
        _id: "cat_003",
        name: "kitchen",
        label: "آشپزخانه",
        englishLabel: "Kitchen Appliances",
        icon: "/src/assets/images/category/kitchen.png",
        description: "انواع لوازم آشپزخانه، مخلوط‌کن، قهوه‌ساز و لوازم پخت و پز",
        image: "/src/assets/images/img-big/image-2.webp",
        subcategories: [
            {
                _id: "sub_003_1",
                name: "blender-mixer",
                label: "مخلوط‌کن و آبمیوه‌گیری",
                icon: "/src/assets/images/kitchen/kitchen-1.webp",
            },
            {
                _id: "sub_003_2",
                name: "coffee-maker",
                label: "قهوه‌ساز و اسپرسوساز",
                icon: "/src/assets/images/kitchen/kitchen-2.webp",
            },
            {
                _id: "sub_003_3",
                name: "air-fryer",
                label: "سرخ‌کن بدون روغن",
                icon: "/src/assets/images/kitchen/kitchen-3.webp",
            },
            {
                _id: "sub_003_4",
                name: "microwave",
                label: "مایکروویو و فر",
                icon: "/src/assets/images/kitchen/img-0.webp",
            }
        ],
        productCount: 98,
        isActive: true,
        sortOrder: 3,
        tags: ["آشپزخانه", "قهوه", "آبمیوه", "پخت و پز"]
    },
    
    {
        _id: "cat_004",
        name: "jewellery",
        label: "طلا و جواهرات",
        englishLabel: "Jewellery & Gold",
        icon: "/src/assets/images/category/gold.png",
        description: "انواع طلا، جواهرات، نقره و بدلیجات با طراحی منحصر به فرد",
        image: "/src/assets/images/img-big/image-3.webp",
        subcategories: [
            {
                _id: "sub_004_1",
                name: "ring",
                label: "انگشتر",
                icon: "/src/assets/images/jewellerys/jewellery-1.webp",
            },
            {
                _id: "sub_004_2",
                name: "earring",
                label: "گوشواره",
                icon: "/src/assets/images/jewellerys/jewellery-2.webp",
            },
            {
                _id: "sub_004_3",
                name: "bracelet",
                label: "دستبند",
                icon: "/src/assets/images/jewellerys/jewellery-3.webp",
            },
            {
                _id: "sub_004_4",
                name: "necklace",
                label: "گردنبند",
                icon: "/src/assets/images/jewellerys/jewellery-1.webp",
            }
        ],
        productCount: 67,
        isActive: true,
        sortOrder: 4,
        tags: ["طلا", "جواهر", "انگشتر", "گوشواره", "گردنبند"]
    },
    
    {
        _id: "cat_005",
        name: "sport",
        label: "ورزش و سفر",
        englishLabel: "Sports & Travel",
        icon: "/src/assets/images/category/sport-equipment.png",
        description: "انواع لوازم ورزشی، کفش، پوشاک ورزشی و وسایل سفر",
        image: "/src/assets/images/img-big/image-4.webp",
        subcategories: [
            {
                _id: "sub_005_1",
                name: "sport-shoes",
                label: "کفش ورزشی",
                icon: "/src/assets/images/sports/sport-1.webp",
            },
            {
                _id: "sub_005_2",
                name: "sport-clothes",
                label: "پوشاک ورزشی",
                icon: "/src/assets/images/sports/sport-2.webp",
            },
            {
                _id: "sub_005_3",
                name: "fitness",
                label: "بدنسازی و تناسب اندام",
                icon: "/src/assets/images/sports/sport-3.webp",
            },
            {
                _id: "sub_005_4",
                name: "travel",
                label: "سفر و کمپینگ",
                icon: "/src/assets/images/sports/sport-1.webp",
            }
        ],
        productCount: 120,
        isActive: true,
        sortOrder: 5,
        tags: ["ورزش", "کفش", "بدنسازی", "سفر", "کمپینگ"]
    },
    
    {
        _id: "cat_006",
        name: "stationery",
        label: "لوازم تحریر",
        englishLabel: "Stationery",
        icon: "/src/assets/images/category/tools.png",
        description: "انواع لوازم تحریر، دفتر، خودکار و ملزومات اداری",
        image: "/src/assets/images/img-big/image-5.webp",
        subcategories: [
            {
                _id: "sub_006_1",
                name: "pen-pencil",
                label: "خودکار و مداد",
                icon: "/src/assets/images/stationerys/stationery-1.webp",
            },
            {
                _id: "sub_006_2",
                name: "notebook",
                label: "دفتر و سررسید",
                icon: "/src/assets/images/stationerys/stationery-2.webp",
            },
            {
                _id: "sub_006_3",
                name: "office-supplies",
                label: "ملزومات اداری",
                icon: "/src/assets/images/stationerys/stationery-3.webp",
            }
        ],
        productCount: 85,
        isActive: true,
        sortOrder: 6,
        tags: ["تحریر", "دفتر", "خودکار", "اداری", "مدرسه"]
    },
    
    {
        _id: "cat_007",
        name: "tools",
        label: "ابزارآلات",
        englishLabel: "Tools & Hardware",
        icon: "/src/assets/images/category/tools.png",
        description: "انواع ابزار برقی و دستی، دریل، فرز و جعبه ابزار",
        image: "/src/assets/images/img-big/image-22.webp",
        subcategories: [
            {
                _id: "sub_007_1",
                name: "power-tools",
                label: "ابزار برقی",
                icon: "/src/assets/images/tools/tools-1.webp",
            },
            {
                _id: "sub_007_2",
                name: "hand-tools",
                label: "ابزار دستی",
                icon: "/src/assets/images/tools/tools-2.webp",
            },
            {
                _id: "sub_007_3",
                name: "toolbox",
                label: "جعبه ابزار",
                icon: "/src/assets/images/tools/tools-3.webp",
            },
            {
                _id: "sub_007_4",
                name: "measurement",
                label: "اندازه‌گیری",
                icon: "/src/assets/images/tools/tools-4.webp",
            }
        ],
        productCount: 76,
        isActive: true,
        sortOrder: 7,
        tags: ["ابزار", "دریل", "فرز", "تعمیرات", "صنعتی"]
    },
    
    {
        _id: "cat_008",
        name: "mode",
        label: "مد و پوشاک",
        englishLabel: "Fashion & Clothing",
        icon: "/src/assets/images/category/t-shirt.png",
        description: "انواع پوشاک مردانه و زنانه، کت، شلوار، عطر و اکسسوری",
        image: "/src/assets/images/img-big/image-33.webp",
        subcategories: [
            {
                _id: "sub_008_1",
                name: "men-clothing",
                label: "پوشاک مردانه",
                icon: "/src/assets/images/modes/mode-1.webp",
            },
            {
                _id: "sub_008_2",
                name: "women-clothing",
                label: "پوشاک زنانه",
                icon: "/src/assets/images/modes/mode-2.webp",
            },
            {
                _id: "sub_008_3",
                name: "perfume",
                label: "عطر و ادکلن",
                icon: "/src/assets/images/modes/mode-3.webp",
            },
            {
                _id: "sub_008_4",
                name: "accessories-fashion",
                label: "اکسسوری",
                icon: "/src/assets/images/category/beauty-product.png",
            }
        ],
        productCount: 110,
        isActive: true,
        sortOrder: 8,
        tags: ["مد", "پوشاک", "کت", "شلوار", "عطر"]
    },
    
    {
        _id: "cat_009",
        name: "beauty",
        label: "زیبایی و بهداشت",
        englishLabel: "Beauty & Health",
        icon: "/src/assets/images/category/beauty-product.png",
        description: "انواع لوازم آرایشی، بهداشتی، مراقبت پوست و مو",
        image: "/src/assets/images/img-big/image-0.webp",
        subcategories: [
            {
                _id: "sub_009_1",
                name: "skin-care",
                label: "مراقبت پوست",
                icon: "/src/assets/images/category/beauty-product.png",
            },
            {
                _id: "sub_009_2",
                name: "hair-care",
                label: "مراقبت مو",
                icon: "/src/assets/images/category/branding.png",
            },
            {
                _id: "sub_009_3",
                name: "makeup",
                label: "لوازم آرایش",
                icon: "/src/assets/images/category/cola.png",
            }
        ],
        productCount: 95,
        isActive: true,
        sortOrder: 9,
        tags: ["زیبایی", "آرایشی", "بهداشتی", "پوست", "مو"]
    },
    
    {
        _id: "cat_010",
        name: "car",
        label: "خودرو و موتور",
        englishLabel: "Car & Motorcycle",
        icon: "/src/assets/images/category/car.png",
        description: "انواع لوازم یدکی، لوازم تزئینی و قطعات خودرو و موتورسیکلت",
        image: "/src/assets/images/img-big/image-4.webp",
        subcategories: [
            {
                _id: "sub_010_1",
                name: "car-parts",
                label: "قطعات خودرو",
                icon: "/src/assets/images/category/car.png",
            },
            {
                _id: "sub_010_2",
                name: "car-accessories",
                label: "لوازم جانبی خودرو",
                icon: "/src/assets/images/category/localization.png",
            },
            {
                _id: "sub_010_3",
                name: "motorcycle",
                label: "موتورسیکلت",
                icon: "/src/assets/images/category/plane.png",
            }
        ],
        productCount: 62,
        isActive: true,
        sortOrder: 10,
        tags: ["خودرو", "قطعات", "لوازم یدکی", "موتور"]
    }
];

// ============ Export ============
export default fakeCategories;

// ============ توابع کمکی ============

/**
 * دریافت همه دسته‌بندی‌های فعال
 * @returns {Array} لیست دسته‌بندی‌های فعال
 */
export function getAllCategories() {
    return fakeCategories.filter(cat => cat.isActive);
}

/**
 * دریافت یک دسته‌بندی با نام انگلیسی
 * @param {string} categoryName - نام انگلیسی دسته‌بندی (مثل "digital")
 * @returns {Object|null} دسته‌بندی پیدا شده یا null
 */
export function getCategoryByName(categoryName) {
    return fakeCategories.find(cat => cat.name === categoryName) || null;
}

/**
 * دریافت یک دسته‌بندی با ID
 * @param {string} id - آیدی دسته‌بندی
 * @returns {Object|null} دسته‌بندی پیدا شده یا null
 */
export function getCategoryById(id) {
    return fakeCategories.find(cat => cat._id === id) || null;
}

/**
 * دریافت دسته‌بندی‌های محبوب (بر اساس تعداد محصول)
 * @param {number} limit - تعداد دسته‌بندی‌ها
 * @returns {Array} لیست دسته‌بندی‌های محبوب
 */
export function getPopularCategories(limit = 6) {
    return [...fakeCategories]
        .sort((a, b) => b.productCount - a.productCount)
        .slice(0, limit);
}

/**
 * جستجوی دسته‌بندی با نام
 * @param {string} query - عبارت جستجو
 * @returns {Array} لیست دسته‌بندی‌های پیدا شده
 */
export function searchCategories(query) {
    const searchTerm = query.toLowerCase();
    return fakeCategories.filter(cat => 
        cat.label.toLowerCase().includes(searchTerm) ||
        cat.name.toLowerCase().includes(searchTerm) ||
        cat.tags.some(tag => tag.includes(searchTerm))
    );
}

/**
 * دریافت زیرمجموعه‌های یک دسته‌بندی
 * @param {string} categoryName - نام انگلیسی دسته‌بندی
 * @returns {Array} لیست زیرمجموعه‌ها
 */
export function getSubcategories(categoryName) {
    const category = getCategoryByName(categoryName);
    return category ? category.subcategories : [];
}

/**
 * دریافت آیکون دسته‌بندی‌ها (برای منو یا اسلایدر)
 * @returns {Array} لیست ساده‌شده از دسته‌بندی‌ها با آیکون و نام
 */
export function getCategoriesForMenu() {
    return fakeCategories.map(cat => ({
        id: cat._id,
        name: cat.name,
        label: cat.label,
        icon: cat.icon,
        productCount: cat.productCount
    }));
}

/**
 * دریافت 3 دسته‌بندی پرطرفدار برای صفحه اصلی
 * @returns {Array} 3 دسته‌بندی برتر
 */
export function getTopCategories() {
    return [...fakeCategories]
        .filter(cat => cat.isActive)
        .sort((a, b) => b.productCount - a.productCount)
        .slice(0, 3);
}