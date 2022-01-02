import { useCallback, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from './layout';
import { NotAuthenRouter } from './router-config';
import HomePage from './screens/HomePage';
import Login from './screens/Login';
import Device from "./screens/Device";
import CreateDevice from "./screens/Device/Create";

const AppRouter = () => {
  const [routerConfig, setRouterConfig] = useState([]);
  let isAuthenticated = false
  const getConfig = async () => setRouterConfig(isAuthenticated && NotAuthenRouter);
  const renderRouter = useCallback(() => {
    if (routerConfig.length === 0)
      return null;
    const ui = routerConfig.map((router, index) => {
      const { path, Component, fullLayout } = router;
      return <Route exact key={index} path={path}
        element={props => (
          <>
            {!isAuthenticated || fullLayout
              ? <Component {...props} />
              :
              <Layout>
                <Component {...props} />
              </Layout>
            }
          </>
        )
        }
      />
    })
    // ui.push(<Navigate to="/" />)
    return ui
  }, [routerConfig]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // Set the directory path if you are deploying in sub-folder
    <BrowserRouter>
      <Routes>
        {/* {renderRouter()} */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/device" element={<Device />} />
        <Route path="/device/create" element={<CreateDevice />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
