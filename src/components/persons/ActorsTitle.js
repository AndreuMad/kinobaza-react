import React from 'react';
import {string, number, shape} from 'prop-types';

const ActorsTitle = ({ _id, image: { url: imageUrl }, name: { ukr: nameUkr, en: nameEn } }) => (
    <div className="actors-title">
        <div>
            <img src={imageUrl} alt={nameUkr} />
        </div>
        <p>{nameUkr}</p>
        <p>{nameEn}</p>
    </div>
);

ActorsTitle.propTypes = {
    _id: string,
    image: shape({
        url: string
    }),
    name: shape({
        en: string,
        ukr: string
    }),
    year: number
};

export default ActorsTitle;
