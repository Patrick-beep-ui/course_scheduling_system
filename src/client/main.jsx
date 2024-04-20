import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Auth0Provider } from '@auth0/auth0-react';

import Student from "./views/Students";
import Course from "./views/Course";
import Faculty from "./views/Faculty";
import AddCourse from "./views/AddCourse";
import AddMajor from "./views/AddMajor";
import AddStudent from "./views/AddStudent";
import AddFaculty from "./views/AddFaculty";
import Login from "./views/Login";
import Signup from "./views/Signup";
import EditMajor from "./views/EditMajor";
import ShowStudents from "./views/ShowStudents";

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
  }, 
  {
    path: "/major/edit/:major_id",
    element: <EditMajor />
  },
  {
    path: "/login",
    element: <Login />
  }, 
  {
    path: "/sign-up", 
    element: <Signup />
  }, {
    path: "/students", 
    element: <ShowStudents />
  }
], { basename: "/" });

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RouterProvider>
);
