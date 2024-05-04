import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Auth0Provider } from '@auth0/auth0-react';

import Student from "./views/Students";
import Course from "./views/Course";
import Faculty from "./views/Faculty";
import Term from "./views/Term";
import Building from "./views/Building";
import Room from "./views/Room";
import AddCourse from "./views/AddCourse";
import AddMajor from "./views/AddMajor";
import AddStudent from "./views/AddStudent";
import AddFaculty from "./views/AddFaculty";
import AddTerm from "./views/AddTerm";
import AddBuilding from "./views/AddBuilding";
import AddRoom from "./views/AddRoom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import EditMajor from "./views/EditMajor";
import EditCourse from "./views/EditCourse";
import EditStudent from "./views/EditStudent";
import EditFaculty from "./views/EditFaculty";
import EditTerm from "./views/EditTerm";
import EditBuilding from "./views/EditBuilding"; 
import EditRoom from "./views/EditRoom";
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
  }, 
  {
    path: "/terms",
    element: <Term />
  },
  {
    path: "/terms/add",
    element: <AddTerm />
  },
  {
    path: "/terms/edit/:term_id",
    element: <EditTerm />
  },
  {
    path: "/course/edit/:major_id/:course_id",
    element: <EditCourse />
  }, {
    path: "/student/edit/:major_id/:student_id", 
    element: <EditStudent />
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
    element: <AddStudent/>
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
    path: "/faculty/edit/:faculty_id",
    element: <EditFaculty />
  },
  {
    path: "/major/edit/:major_id",
    element: <EditMajor />
  },
  {
    path: "/buildings",
    element: <Building />
  },
  {
    path: "/buildings/add",
    element: <AddBuilding />
  },
  {
    path: "/buildings/edit/:building_id",
    element: <EditBuilding />
  },
  {
    path: "/rooms/:building_id",
    element: <Room />
  },
  {
    path: "/rooms/add/:building_id",
    element: <AddRoom />
  },
  {
    path: "/rooms/edit/:building_id/:room_id",
    element: <EditRoom />
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
