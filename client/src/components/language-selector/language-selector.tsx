import React, { useState, FC, SyntheticEvent } from 'react';
import { Dropdown, Flag, DropdownProps } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import './language-selector.styles.scss';

type Language = 'en' | 'pl' | 'de';

const LANGUAGES = {
    ENGLISH: 'en',
    POLISH: 'pl',
    GERMAN: 'de',
};

const { ENGLISH, POLISH, GERMAN } = LANGUAGES;

const languageItems = [
    {
        key: ENGLISH,
        value: ENGLISH,
        text: (
            <span>
                <Flag name="gb" />
                EN
            </span>
        ),
    },
    {
        key: POLISH,
        value: POLISH,
        text: (
            <span>
                <Flag name="pl" />
                PL
            </span>
        ),
    },
    {
        key: GERMAN,
        value: GERMAN,
        text: (
            <span>
                <Flag name="de" />
                DE
            </span>
        ),
    },
];

/**
 * Component used as select options for prefered language
 *
 *
 * @return  {FC} LanguageSelector component
 *
 * @component
 * @example
 *
 * return (
 *    <LanguageSelector />
 * )
 *
 */

const LanguageSelector: FC = () => {
    const { t, i18n } = useTranslation();
    const localLanguage = localStorage.getItem('language');
    const defaultLanguage = localLanguage || ENGLISH;

    const [appLanguage, setAppLanguage] = useState<string>(defaultLanguage);

    const handleChange = (_event: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
        setAppLanguage(value as Language);
        localStorage.setItem('language', value as Language);
        i18n.changeLanguage(value as Language);
    };

    const labelText = `${t('languageSelector.language')} (${appLanguage})`;

    return (
        <div className="language-selector">
            <label className="language-selector__label" htmlFor="language-selector">
                {labelText}
            </label>
            <Dropdown
                id="language-selector"
                placeholder="Select language"
                fluid
                selection
                value={appLanguage}
                options={languageItems}
                onChange={handleChange}
                aria-label={labelText}
            />
        </div>
    );
};

export default LanguageSelector;
