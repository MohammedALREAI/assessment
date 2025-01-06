import { Suspense, FC  } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouteObject,
} from "react-router-dom";
import { routes } from "./routes";
import { Loading } from "../components/loader";

const MainRoutes: FC = () => {


  return (
    <Router>
      <Suspense
        fallback={<Loading />}
      >
        <Routes>

          {renderRoutes(routes)}</Routes>
      </Suspense>
    </Router>
  );
};

const renderRoutes = (routes: RouteObject[]) =>
  routes.map((route, index) => {
    return <Route key={index} path={route.path} element={route.element} />;
  });

export default MainRoutes;
