import React from 'react';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';

import HeadingBlock from './heading-block.component';

const defaultProps = {
    iconName: 'signup',
    text: 'Heading block test text',
};

const renderHeadingBlock = (props = defaultProps) => {
    const utils = render(<HeadingBlock {...props} />);

    return { ...utils };
};

describe('HeadingBlock', () => {
    it('renders without crashing', () => {
        const { unmount } = renderHeadingBlock();

        unmount();
    });

    it('renders given text', () => {
        const { getByText } = renderHeadingBlock();
        const headingText = getByText(defaultProps.text);

        expect(headingText).toBeInTheDocument();
    });

    it('renders icon based on given icon name', () => {
        const { getByRole } = renderHeadingBlock();
        const heading = getByRole('heading');
        const icon = heading.firstChild;

        expect(icon).toHaveClass(defaultProps.iconName);
    });
});
