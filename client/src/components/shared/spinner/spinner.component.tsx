import React, { FC } from 'react';
import './spinner.styles.scss';

/**
 * Component used as spinner to show waiting for loading to finish
 *
 * @return  {FC} Spinner component
 *
 * @component
 * @example
 *
 * return (
 *    <Spinner />
 * )
 *
 */

const Spinner: FC = () => (
    <div className="spinner" aria-label="loading spinner">
        <div className="spinner__container" />
    </div>
);

export default Spinner;
