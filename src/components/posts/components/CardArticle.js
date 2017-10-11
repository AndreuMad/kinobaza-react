import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sliceString from 'Utilities/sliceString';

const CardArticle = ({ id, image, title, text }) => {
    return (
        <article className="card-big">
            <div className="row">
                <div className="col xs-1">
                    <div className="col-inner flex-column end-xs">
                        <a href="#" className="share-block">
                            <p className="share-number facebook">500</p>
                        </a>
                        <a href="#" className="share-block">
                            <p className="share-number twitter">234</p>
                        </a>
                        <a href="#" className="share-block">
                            <p className="share-number youtube">120</p>
                        </a>
                    </div>
                </div>
                <div className="col xs-5">
                    <figure
                        className="card-big-figure"
                        style={{
                            backgroundImage: `url('${image.url}')`
                        }}
                    >
                    </figure>
                </div>
                <div className="col xs-6">
                    <div className="col-inner">
                        <Link to={`/posts/${id}`}>
                            <h2 className="card-big-title">{title}</h2>
                        </Link>
                        <p className="card-big-date">03.08.2017</p>
                        <p className="card-big-text">{sliceString(text, 192)}</p>
                        <div className="btn-group align-right">
                            <Link to={`/posts/${id}`}
                                className="btn card-big-link">Читати</Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

CardArticle.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.shape({
        url: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    text: PropTypes.string.isRequired,
    shared: PropTypes.object
};

export default CardArticle;
