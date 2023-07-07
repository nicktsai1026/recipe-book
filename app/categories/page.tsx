import Link from 'next/link';
import Image from 'next/image';

interface RecipeCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface category {
  name: string;
  thumb: string;
}

const fetchRecipesCategories = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data.categories.map((category: RecipeCategory) : category => {
      return {
        name: category.strCategory,
        thumb: category.strCategoryThumb
      };
    });
  } catch (error) {
    console.log(error)
    throw new Error("Error in fetchRecipesCategories API");
  }
};

const page = async () => {
  const recipeCategoryUrl: string = `${process.env.RECIPE_ENDPOINT}/categories.php`;
  const categories: category[] = await fetchRecipesCategories(recipeCategoryUrl);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
      {categories.map((category: category, index: number) => (
        <div key={index} className='relative'>
          <div className='absolute h-full w-full group'>
            <div className='bg-black opacity-50 h-full rounded group-hover:opacity-20 group-hover:duration-100'></div>
            <div></div>
            <Link href={`/categories/${category.name}`} 
              className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'
            >
              <div className='px-3 py-2 flex flex-col justify-around items-center
                group-hover:border-4 group-hover:border-primary group-hover:duration-75'
              >
                <span className='text-white text-xl font-semibold group-hover:text-orange-400'>{category.name}</span>
                <span className='bg-white border w-1/2 mt-2 group-hover:hidden'></span>
              </div>
            </Link>
          </div>
          <Image className='rounded' src={category.thumb} alt={category.name} width={300} height={300} />
        </div>
      ))}
    </div>
  )
}
 
export default page
