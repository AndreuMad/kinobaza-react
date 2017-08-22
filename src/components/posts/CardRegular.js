import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const CardRegular = ({ id, shared, image, date, title }) => {
    return (
        <article className="card-regular">
            <div className="row">
                <div className="col xs-2">
                    <div className="col-inner">

                    </div>
                </div>
                <div className="col xs-10">
                    <div className="col-inner">
                        <figure className="card-regular-figure">
                            <img src={image.src}
                                 alt={image.description}
                                 title={image.description}
                                 className="card-regular-image"/>
                        </figure>
                        <h3 className="card-regular-title">{title}</h3>
                    </div>
                </div>
            </div>
        </article>
    );
};

CardRegular.propTypes = {
    id: PropTypes.string.isRequired,
    shared: PropTypes.object,
    //image: PropTypes.object.isRequired,
    //date: PropTypes.string,
    title: PropTypes.string.isRequired
};

export default CardRegular;
