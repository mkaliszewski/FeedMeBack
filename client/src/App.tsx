import React, { FC, Suspense, lazy } from 'react';

import { Switch, Route } from 'react-router-dom';

import Spinner from 'components/shared/spinner/spinner.component';
import Header from 'components/header/header.component';
import RegistrationPage from 'pages/registration/registration.page';
import LanguageSelector from 'components/language-selector/language-selector';

import routes from 'routeConstants';
import './App.scss';

const { main, about, login, registration } = routes;

// const RegistrationPage = lazy(() => import('pages/registration/registration.page'));
const LoginPage = lazy(() => import('pages/login/login.page'));

const App: FC = () => {
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
