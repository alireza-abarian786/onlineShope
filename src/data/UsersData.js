// src/data/UsersData.js

const fakeUsers = [
    {
        _id: "user_001",
        name: "مدیر سایت",
        email: "admin@example.com",
        password: "admin123",
        phone: "09123456789",
        favorites: ["prod_001", "prod_004", "prod_008"],
        balance: 2500000,
        isAdmin: true,
        createdAt: "۱۴۰۵/۰۱/۰۱",
    },
    {
        _id: "user_002",
        name: "کاربر تست",
        email: "test@example.com",
        password: "test123",
        phone: "09123456788",
        favorites: ["prod_002", "prod_005"],
        balance: 500000,
        isAdmin: false,
        createdAt: "۱۴۰۵/۰۲/۱۵",
    },
    {
        _id: "user_003",
        name: "رضا محمدی",
        email: "reza@example.com",
        password: "reza123",
        phone: "09123456787",
        favorites: [],
        balance: 0,
        isAdmin: false,
        createdAt: "۱۴۰۵/۰۳/۲۰",
    }
];

export default fakeUsers;