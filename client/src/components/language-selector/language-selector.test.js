import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { render, fireEvent, within, waitFor, getByLabelText } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import '__test__/mocks/i18next-mock';
import LanguageSelector from './language-selector';

const renderLanguageSelector = (props) => {
    const utils = render(<LanguageSelector {...props} />);
    return { ...utils };
};

const englishText = 'EN';
const polishText = 'PL';
const germanyText = 'DE';

const englishAlt = 'en flag icon';
const polishAlt = 'pl flag icon';
const germanyAlt = 'de flag icon';

const englishLabel = 'language (en)';
const polishLabel = 'language (pl)';
const listBoxRole = 'listbox';

describe('LanguageSelector', () => {
    it('renders without crashing', async () => {
        const { unmount } = renderLanguageSelector();

        unmount();
    });

    it('has listbox', () => {
        const { getByRole } = renderLanguageSelector();

        const selectInput = getByRole(listBoxRole);

        expect(selectInput).toBeInTheDocument();
    });

    it('has english option set by default', () => {
        const { getByLabelText } = renderLanguageSelector();

        const englishOption = getByLabelText(englishLabel);

        expect(englishOption).toBeInTheDocument();
    });

    it('has all avaliable options', () => {
        const { getAllByRole, getByText, getAllByText } = renderLanguageSelector();

        const options = getAllByRole('option');

        const englishOption = getAllByText(englishText)[1];
        const polishOption = getByText(polishText);
        const germanyOption = getByText(germanyText);

        expect(englishOption).toBeInTheDocument();
        expect(polishOption).toBeInTheDocument();
        expect(germanyOption).toBeInTheDocument();
        expect(options).toHaveLength(3);
    });

    it('sets active option after click on it', async () => {
        const { getByText, getByLabelText } = renderLanguageSelector();

        const polishOption = getByText(polishText);

        fireEvent.click(polishOption);

        const activeOption = getByLabelText(polishLabel);

        expect(activeOption).toBeInTheDocument();
    });
});
