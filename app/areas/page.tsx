import Link from 'next/link';

const fetchRecipesAreas = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data.meals.map(( area: { strArea: string }) => area.strArea);
  } catch (error) {
    console.log(error)
    throw new Error("Error in fetchRecipesAreas API");
  }
};

const Page = async () => {
  const recipeAreaUrl: string = `${process.env.RECIPE_ENDPOINT}/list.php?a=list`;
  const areas = await fetchRecipesAreas(recipeAreaUrl);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5'>
      {areas.map((area: string, index: number) => (
        <Link className='shadow-orange-800 text-2xl rounded py-10 text-center font-bold
        bg-gradient-to-l from-orange-500 via-orange-300 to-orange-500 
        hover:from-orange-300 hover:via-orange-500 hover:to-orange-300 hover:text-white' 
          key={index} href={`/areas/${area}`}
        >
          <div>{area}</div>
        </Link>
      ))}
    </div>
  )
}
 
export default Page