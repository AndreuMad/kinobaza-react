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
                        <Link
                            className="card-regular-link"
                            to={`/posts/${id}`}
                        >
                            <figure className="card-regular-figure">
                                <img src={image.url}
                                     alt={image.description}
                                     title={image.description}
                                     className="card-regular-image"/>
                            </figure>
                        </Link>
                        <p className="card-regular-date">{date}</p>
                        <Link
                            className="card-regular-link"
                            to={`/posts/${id}`}
                        >
                            <h3 className="card-regular-title">{title}</h3>
                        </Link>
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
