import React from 'react';

const mockI18Next = jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
}));

export default mockI18Next;
