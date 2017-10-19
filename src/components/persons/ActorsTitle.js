import React from 'react';
import PropTypes from 'prop-types';

const ActorsTitle = ({ _id, image, name }) => {

    return (
        <div className="actors-title">
            <div>
                <img src={image.url} alt={name.ukr} />
            </div>
            <p>{name.ukr}</p>
            <p>{name.en}</p>
        </div>
    );
};

export default ActorsTitle;
