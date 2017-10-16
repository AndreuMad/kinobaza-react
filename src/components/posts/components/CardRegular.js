import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

const CardRegular = ({ id, image, title, date }) => {

    return (
        <article className="card-regular">
            <div className="flex-row">
                <div className="col xs-1 card-regular-share">
                    <div className="col-inner flex-column">
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
                <div className="col xs-11">
                    <div className="col-inner card-regular-content">
                        <Link
                            className="card-regular-link"
                            to={`/posts/${id}`}
                        >
                            <figure
                                className="card-regular-figure"
                                style={{
                                    backgroundImage: `url('${image.url}')`
                                }}
                            >
                            </figure>
                        </Link>
                        <p className="card-regular-date">{moment(date).locale("ua").format("LLL")}</p>
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
    image: PropTypes.shape({
        url: PropTypes.string.isRequired
    }),
    date: PropTypes.number,
    title: PropTypes.string.isRequired,
    important: PropTypes.bool
};

export default CardRegular;
