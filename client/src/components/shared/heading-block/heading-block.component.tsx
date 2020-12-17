import React, { FC } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import './heading-block.styles.scss';

type IconName = 'signup' | 'sign-in';
interface Props {
    iconName: IconName;
    text: string;
}

/**
 * Component used as heading block with icon and text
 *
 * @param   {string} iconName icon name compatible wit Semanticu UI
 * @param   {string} text text displayed as heading
 * @return  {FC} HeadingBlock component
 *
 * @component
 * @example
 *
 * return (
 *    <HeadingBlock iconName="signup" text="Some test heading" />
 * )
 *
 */

const HeadingBlock: FC<Props> = ({ iconName, text }) => (
    <Header className="heading-block" as="h2" icon block>
        <Icon name={iconName} className="heading-block__icon" fitted role="presentation" />
        <Header.Subheader>{text}</Header.Subheader>
    </Header>
);

export default HeadingBlock;
