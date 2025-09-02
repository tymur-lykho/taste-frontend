// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOwnRecipes, fetchFavoritesRecipes } from "../redux/recipes/operations";
// // import { selectMyRecipes, selectFavoriteRecipes } from "../redux/recipes/selectors";
// import RecipesList from "../components/RecipesList/RecipesList";
// import SectionRecipes from "../components/SectionRecipes/SectionRecipes";
import MyRecipes from "../components/MyRecipes/MyRecipes";
// import NavigationProfile from "../components/NavigationProfile/NavigationProfile";

// export default function UserPage() {
//   const dispatch = useDispatch();

//   // const ownRecipes = useSelector(selectMyRecipes);
//   // const favoriteRecipes = useSelector(selectFavoriteRecipes);

//   useEffect(() => {
//     dispatch(fetchOwnRecipes());
//     dispatch(fetchFavoritesRecipes());
//   }, [dispatch]);

//   return (
//     <div>
//       {/* <SectionRecipes /> */}
//       <NavigationProfile />
//       <MyRecipes/>
//       <Routes>
//           <Route path="/own" element={<SectionRecipes />} />
//           <Route path="/favorite" element={<FavoriteRecipes />} />
//       </Routes>

//       {recipes.length > 0 ? (
//         <ul>
//           {recipes.map((recipe) => (
//             <li key={recipe._id}>
//               <RecipesList recipe={recipe} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No found my recipes</p>
//       )}
//     </div>
//   );
// };

import SectionRecipes from "../components/SectionRecipes/SectionRecipes";
import { Outlet } from "react-router-dom";
import NavigationProfile from "../components/NavigationProfile/NavigationProfile";
import Container from "../reuseable/Container/Container";

export default function UserPage() {
  return (
    <Container>
      <NavigationProfile />
      <main>
        <Outlet />
      </main>
    </Container>
  );
}
