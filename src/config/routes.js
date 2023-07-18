import { createBrowserRouter,RouterProvider} from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Pokemon from "../pages/Pokemon";
import Pokemons from "../pages/Pokemons";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
            index: true,
            element: <Pokemons />
        },
        {
            path: "pokemons/:id",
            element: <Pokemon />
        }
      ]
    },
]);

export default router;