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

const englishAlt = 'en flag icon';
const polishAlt = 'pl flag icon';
const germanyAlt = 'de flag icon';

const englishLabel = 'language (en)';
const polishLabel = 'language (pl)';
const inputRole = 'combobox';

describe('LanguageSelector', () => {
    it('renders without crashing', async () => {
        const { unmount } = renderLanguageSelector();

        unmount();
    });

    it('has label', () => {
        const { getByLabelText } = renderLanguageSelector();

        const label = getByLabelText('language (en)');

        expect(label).toBeInTheDocument();
    });

    it('has an input', () => {
        const { getByRole } = renderLanguageSelector();

        const selectInput = getByRole(inputRole);

        expect(selectInput).toBeInTheDocument();
    });

    it('has english option set by default', () => {
        const { getByLabelText } = renderLanguageSelector();

        const englishOption = getByLabelText(englishLabel);

        expect(englishOption).toBeInTheDocument();
    });

    it('opens dropdown with avaliable options after click on select input', async () => {
        const { getByRole, getByAltText, getAllByAltText } = renderLanguageSelector();

        const selectInput = getByRole(inputRole);

        fireEvent.mouseDown(selectInput);

        await waitFor(() => {
            const englishOption = getAllByAltText(englishAlt)[1];
            const polishOption = getByAltText(polishAlt);
            const germanyOption = getByAltText(germanyAlt);

            expect(englishOption).toBeInTheDocument();
            expect(polishOption).toBeInTheDocument();
            expect(germanyOption).toBeInTheDocument();
        });
    });

    it('sets active option after click on it', async () => {
        const { getByRole, getByAltText, getByLabelText } = renderLanguageSelector();
        let polishOption;
        const selectInput = getByRole(inputRole);

        fireEvent.mouseDown(selectInput);

        await waitFor(() => {
            polishOption = getByAltText(polishAlt);
        });

        fireEvent.click(polishOption);

        const activeOption = getByLabelText(polishLabel);

        expect(activeOption).toBeInTheDocument();
    });
});
