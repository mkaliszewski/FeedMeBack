import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';

import LanguageSelector from './language-selector';

const renderLanguageSelector = () => {
    const utils = render(<LanguageSelector />);
    return { ...utils };
};

const englishText = 'EN';
const polishText = 'PL';
const germanyText = 'DE';

const englishLabel = 'languageSelector.language (en)';
const polishLabel = 'languageSelector.language (pl)';
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
