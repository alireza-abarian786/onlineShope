// src/js/funcs/pathHelper.js

/**
 * تصحیح مسیر برای GitHub Pages
 */
export function getImagePath(path) {
    if (!path) return '';
    if (path.startsWith('./')) return path;
    if (path.startsWith('/')) return '.' + path;
    return './' + path;
}

/**
 * اصلاح مسیرهای یک آبجکت
 */
export function fixPaths(obj, fields = ['image', 'thumbnail', 'images', 'icon', 'avatar']) {
    if (!obj) return obj;
    
    const result = { ...obj };
    
    for (const field of fields) {
        if (result[field]) {
            if (Array.isArray(result[field])) {
                result[field] = result[field].map(p => getImagePath(p));
            } else {
                result[field] = getImagePath(result[field]);
            }
        }
    }
    
    return result;
}

/**
 * اصلاح مسیرهای یک آرایه از آبجکت‌ها
 */
export function fixPathsArray(arr, fields = ['image', 'thumbnail', 'images', 'icon', 'avatar']) {
    if (!Array.isArray(arr)) return arr;
    return arr.map(item => fixPaths(item, fields));
}