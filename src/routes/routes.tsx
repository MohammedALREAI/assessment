import {  RouteObject } from "react-router-dom";
import ProjectListPage from "../pages/ProjectList";
import Layout from "../components/layout";
import ProjectDetail from "../pages/ProjectList/ProjectDetail";

export const routes: RouteObject[] = [

  {
    path: "/",
    element: <Layout>
      <ProjectListPage />
      </Layout>,
  },
  {
    path: "/project/:id",
    element: <Layout>
      <ProjectDetail />
      </Layout>,
  },
];
