import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Space } from 'antd';

import './language-selector.styles.scss';

const { Option } = Select;

type Language = 'en' | 'pl' | 'de';

const LANGUAGES = {
    ENGLISH: 'en',
    POLISH: 'pl',
    GERMAN: 'de',
};

const { ENGLISH, POLISH, GERMAN } = LANGUAGES;

const MENU_ITEMS = [
    {
        language: ENGLISH,
        iconPath: '/assets/images/icons/flags/united-kingdom.svg',
    },
    {
        language: POLISH,
        iconPath: '/assets/images/icons/flags/poland.svg',
    },
    {
        language: GERMAN,
        iconPath: '/assets/images/icons/flags/germany.svg',
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

    const handleChange = (language: string): void => {
        setAppLanguage(language as Language);
        localStorage.setItem('language', language);
        i18n.changeLanguage(language);
    };

    return (
        <Space>
            <label htmlFor="language-selector">{`${t('language')} (${appLanguage})`}</label>
            <Select id="language-selector" value={appLanguage} onChange={handleChange}>
                {MENU_ITEMS.map(({ language, iconPath }) => (
                    <Option align="center" value={language} key={language}>
                        <img src={iconPath} alt={`${language} flag icon`} className="language-selector__icon" />
                    </Option>
                ))}
            </Select>
        </Space>
    );
};

export default LanguageSelector;
