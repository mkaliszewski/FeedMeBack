import React from 'react';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';

import Spinner from './spinner.component';

const renderSpinner = () => {
    const utils = render(<Spinner />);
    return { ...utils };
};

describe('Spinner', () => {
    it('renders without crashing', () => {
        const { unmount } = renderSpinner();

        unmount();
    });

    it('is displayed', () => {
        const { getByLabelText } = renderSpinner();
        const spinner = getByLabelText('loading spinner');

        expect(spinner).toBeInTheDocument();
    });
});
