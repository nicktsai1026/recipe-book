import Image from 'next/image';

interface categoryProps {
  category: string;
  id: string;
}

const getRecipeDetail = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data.meals[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error in getRecipeDetail API");
  }
}

const getIngredients = (details: any): string[] => {
  return Object.keys(details)
    .filter((key) => key.indexOf("strIngredient") === 0)
    .map((key) => details[key])
    .filter((ingredient) => ingredient);
}

const page = async ({
  params
}: {
  params: categoryProps
}) => {
  const getRecipeDetailUrl = `${process.env.RECIPE_ENDPOINT}/lookup.php?i=${params.id}`;
  const recipeDetail = await getRecipeDetail(getRecipeDetailUrl);
  const ingredients = getIngredients(recipeDetail);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 p-5'>
      <div>
        <Image 
          width={500} 
          height={500}
          src={recipeDetail.strMealThumb} 
          alt={recipeDetail.strMeal}
          className='w-full'
        />
      </div>
      <div className='p-5'>
        <div className='mb-3'>
          <h1>Recipe Name:</h1>
          <span className='text-2xl font-bold'>{recipeDetail.strMeal}</span>
        </div>
        <div className='tags mt-3'>
          <p className='mb-1'>Ingredients: </p>
          {ingredients.map((ingredient, index) => (
            <span key={index} 
              className='bg-orange-300 text-white px-2 py-1 rounded inline-block mr-2 mb-1'
            >
              {ingredient}
            </span>
          ))}
        </div>
        <div className='mt-3'>
          <p className='mb-1'>Recipe Instructions: </p>
          <span className='font-semibold'>{recipeDetail.strInstructions}</span>
        </div>
        {recipeDetail.strYoutube && (
          <div className='mt-3'>
            <p className='mb-1'>Video Link: </p>
            <a href={recipeDetail.strYoutube} target='_blank' rel='noreferrer' className='text-blue-500'>
              How to make {recipeDetail.strMeal}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default page