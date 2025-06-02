//todo======================================================== URL فیلتر کردن دسته بندی ها بر اساس
const categories = async () => {
  const fetchCategories = await fetch('https://onlineshope.onrender.com/api/categories')
  const categoriesData = await fetchCategories.json()
  return categoriesData;
}

export {categories}