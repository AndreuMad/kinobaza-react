import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import sliceString from '../../utilites/sliceString';

const CardBig = ({ id, image, title, date, text, shared }) => {
    return (
        <article className="card-big">
            <div className="row">
                <div className="col xs-1">
                    <div className="col-inner">

                    </div>
                </div>
                <div className="col xs-5">
                    <div className="col-inner">
                        <figure className="card-big-figure">
                            <img
                                className="card-big-image"
                                src={image.url}
                                alt={title}
                                title={title} />
                        </figure>
                    </div>
                </div>
                <div className="col xs-6">
                    <div className="col-inner">
                        <Link to={`/posts/${id}`}>
                            <h2 className="card-big-title">{title}</h2>
                        </Link>
                        <p className="card-big-date">{date}</p>
                        <p className="card-big-text">{sliceString(text, 256)}</p>
                        <div className="btn-group align-right">
                            <Link to={`/posts/${id}`}
                                className="card-big-link">Читати</Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

CardBig.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.object,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    text: PropTypes.string.isRequired,
    shared: PropTypes.object
};

export default CardBig;
