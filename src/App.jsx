// import react-router-dom module
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

// import store
import { useAuth } from "./store";

// import pages
import LockPage from "./pages/lock-page";
import HomePage from "./pages/home-page";
import Auth from "./components/auth";
import AuthLayout from "./authLayout";

export default function App() {
  const { state } = useAuth();

  function protectedLoader() {
    if (!state.isAuthenticated) {
      return redirect("/auth");
    }
    return null;
  }

  const routes = createBrowserRouter([
    {
      // path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/lock",
          element: <LockPage />,
          isPrivate: true,
          // onEnter: () => {
          //   console.log('==============vbjklkhbvvbnm====')
          //   if (!state.isAuthenticated) {
          //     redirect("/auth");
          //   }
          // },

          loader: protectedLoader,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
