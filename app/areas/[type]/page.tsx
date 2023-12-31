import RecipeList from "@/components/RecipeList";

const getRecipes = async (endpoint: string) => {
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error in getRecipes API");
  }
}

const Page = async ({ 
  params 
} : {
  params: { type: string };
}) => {
  const getRecipesUrl = `${process.env.RECIPE_ENDPOINT}/filter.php?a=${params.type}`;
  const recipes = await getRecipes(getRecipesUrl);
  return (
    <RecipeList recipes={recipes.meals} route={"/areas/" + params.type} />
  )
}

export default Page