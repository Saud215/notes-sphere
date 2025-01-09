import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardLayout,
  ErrorElement,
  HomeLayout,
  Login,
  // Logout,
  Register,
  DashboardLanding,
  AddNote,
  ViewNotes,
  EditNote,
  EditProfile,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addNoteAction } from "./pages/AddNote";
import { action as editNoteAction } from "./pages/EditNote";
import { action as deleteNoteAction } from "./pages/DeleteNote";
import { action as editProfileAction } from "./pages/EditProfile";

import { loader as logoutLoader } from "./pages/Logout";
import { loader as viewNotesLoader } from "./pages/ViewNotes";
import { loader as editNoteLoader } from "./pages/EditNote";
// import { loader as editProfileLoader } from "./pages/EditProfile";

import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction(store),
  },
  {
    path: "/logout",
    loader: logoutLoader(store),
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardLanding /> },
      { path: "add-note", element: <AddNote />, action: addNoteAction(store) },
      { path: "view-notes", element: <ViewNotes />, loader: viewNotesLoader },
      {
        path: "edit-note/:id",
        element: <EditNote />,
        loader: editNoteLoader,
        action: editNoteAction(store),
      },
      {
        path: "delete-note/:id",
        action: deleteNoteAction(store),
      },
      {
        path: "edit-profile/:id",
        element: <EditProfile />,
        // loader: editProfileLoader,
        action: editProfileAction(store),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
