// updateImageExtensionsInDB.js
// webp به فرمت jpg و png  تغییر فرمت عکس ها از 
// node updateImageExtensionsInDB.js   <=  اجرا با کد روبرو

const mongoose = require('mongoose');

// تنظیمات
const MONGO_URI = "mongodb+srv://alireza-user:PcCjLKlPX2QdvKMc@cluster0.ay7lp.mongodb.net/onlineShopDB?retryWrites=true&w=majority"; // URI دیتابیس
const COLLECTION_NAME = 'blogs'; // اسم کالکشن
const FIELD_TO_UPDATE = 'image'; // اسم فیلد آرایه‌ای

async function updateImageExtensions() {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const collection = mongoose.connection.collection(COLLECTION_NAME);

    const cursor = collection.find({});

    while (await cursor.hasNext()) {
        const doc = await cursor.next();

        if (Array.isArray(doc[FIELD_TO_UPDATE])) {
            const updatedImages = doc[FIELD_TO_UPDATE].map(url => {
                return url
                    .replace(/\.jpe?g$/i, '.webp')
                    .replace(/\.png$/i, '.webp');
            });

            // فقط اگر تغییری وجود داشته باشه آپدیت کن
            if (JSON.stringify(updatedImages) !== JSON.stringify(doc[FIELD_TO_UPDATE])) {
                console.log(`Updating ${doc._id}:`, updatedImages);
                await collection.updateOne(
                    { _id: doc._id },
                    { $set: { [FIELD_TO_UPDATE]: updatedImages } }
                );
            }
        }
    }

    await mongoose.disconnect();
    console.log('✅ All image extensions updated successfully.');
}

updateImageExtensions();






// updateBlogImageExtensions.js

// const mongoose = require('mongoose');

// // تنظیمات
// const MONGO_URI = "mongodb+srv://alireza-user:PcCjLKlPX2QdvKMc@cluster0.ay7lp.mongodb.net/onlineShopDB?retryWrites=true&w=majority"; // URI دیتابیس
// const COLLECTION_NAME = 'blogs'; // اسم کالکشن وبلاگ
// const FIELD_TO_UPDATE = 'image'; // اسم فیلد تصویر

// async function updateBlogImageExtensions() {
//     await mongoose.connect(MONGO_URI);

//     const collection = mongoose.connection.collection(COLLECTION_NAME);

//     const cursor = collection.find({});

//     while (await cursor.hasNext()) {
//         const doc = await cursor.next();

//         if (doc[FIELD_TO_UPDATE] && typeof doc[FIELD_TO_UPDATE] === 'string') {
//             let newUrl = doc[FIELD_TO_UPDATE]
//                 .replace(/\.jpe?g$/i, '.webp')
//                 .replace(/\.png$/i, '.webp');

//             if (newUrl !== doc[FIELD_TO_UPDATE]) {
//                 console.log(`Updating ${doc._id}: ${doc[FIELD_TO_UPDATE]} → ${newUrl}`);
//                 await collection.updateOne(
//                     { _id: doc._id },
//                     { $set: { [FIELD_TO_UPDATE]: newUrl } }
//                 );
//             }
//         }
//     }

//     await mongoose.disconnect();
//     console.log('✅ All blog image extensions updated successfully.');
// }

// updateBlogImageExtensions();