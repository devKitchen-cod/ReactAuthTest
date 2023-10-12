import Layout from "./layout";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default AuthLayout;
