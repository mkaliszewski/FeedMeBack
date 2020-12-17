import React, { FC, useEffect, Suspense, lazy } from 'react';

import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchUserAsync } from 'redux/user/user.actions';

import Spinner from 'components/shared/spinner/spinner.component';
import Header from 'components/header/header.component';
import LanguageSelector from 'components/language-selector/language-selector';

import routes from 'routeConstants';
import './App.scss';

const { main, about, login, registration } = routes;

const RegistrationPage = lazy(() => import('pages/registration/registration.page'));
const LoginPage = lazy(() => import('pages/login/login.page'));

const App: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAsync());
    });

    return (
        <div className="app">
            <Suspense fallback={<Spinner />}>
                <Header />
                <Switch>
                    <Route path={registration.route} exact component={RegistrationPage} />
                    <Route path={login.route} component={LoginPage} />
                </Switch>
                <LanguageSelector />
            </Suspense>
        </div>
    );
};

export default App;
