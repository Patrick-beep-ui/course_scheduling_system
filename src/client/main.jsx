import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from "react-router-dom";
import Student from "./views/Students";
import Course from "./views/Course";
import Faculty from "./views/Faculty";
import AddCourse from "./views/AddCourse";
import AddMajor from "./views/AddMajor";
import AddStudent from "./views/AddStudent";
import AddFaculty from "./views/AddFaculty";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
      path: "/students/:major_id",
      element: <Student />
  },
  {
    path: "/courses/:major_id",
    element: <Course />
  }  
   ,
   {
     path: "/courses/add/:major_id",
     element: <AddCourse />
   }, 
   {
    path: "/major/add",
    element: <AddMajor />
  },
  {
    path: "/students/add/:major_id",
    element: <AddStudent />
  },
  {
    path: "/faculty",
    element: <Faculty />
  },
  {
    path: "/faculty/add",
    element: <AddFaculty />
  }
], { basename: "/" });

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RouterProvider>
);
