import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import MainLayout from './layout/MainLayout'
import routes from './routes';

const App = () => {
    return (
        <Routes>
            {/*<Route path="/auth/signin" element={<SignIn />} />*/}
            {/*<Route path="/auth/signup" element={<SignUp />} />*/}
            <Route element={<MainLayout />}>
                {routes.map((routes, index) => {
                    const { path, component: Component } = routes;
                    return (
                        <Route
                            key={index}
                            path={path}
                            element={
                                <Suspense fallback={<div>Loaduje se</div>}>
                                    <Component />
                                </Suspense>
                            }
                        />
                    );
                })}
            </Route>
        </Routes>
    );
};

export default App;
