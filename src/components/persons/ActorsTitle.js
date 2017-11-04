import React from 'react';
import PropTypes from 'prop-types';

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
    _id: PropTypes.string,
    image: PropTypes.shape({
        url: PropTypes.string
    }),
    name: PropTypes.shape({
        en: PropTypes.string,
        ukr: PropTypes.string
    })
};

export default ActorsTitle;
