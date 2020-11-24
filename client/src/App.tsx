import React, { FC, Suspense } from 'react';

import Spinner from 'components/shared/spinner/spinner.component';
import LanguageSelector from 'components/language-selector/language-selector';

const App: FC = () => {
    return (
        <div className="app">
            <Suspense fallback={<Spinner />}>hello</Suspense>
        </div>
    );
};

export default App;
