import React from 'react';
import PropTypes from 'prop-types';

import Rating from 'react-rating';

const Title = ({ id, titleEn, titleUkr, imageUrl, year, averageScore, imdbScore, text }) => {
    return (
        <article className="title-item" key={`title${id}`}>
            <div className="row">
                <div className="col m-5">
                    <div className="col-inner">
                        <figure>
                            <img src={imageUrl} alt={titleUkr} title={titleUkr} />
                        </figure>
                    </div>
                </div>
                <div className="col m-7">
                    <div className="col-inner">
                        <div className="title-item-head">
                            <h3 className="title-name">{titleUkr}</h3>
                            <p className="title-year">{year}</p>
                        </div>
                        <h3 className="title-name-en">{titleEn}</h3>
                        <div className="title-score">
                            <div className="title-score-item">
                                <span className="score-number average">{averageScore}</span>
                                <span className="score-description">Середня</span>
                            </div>
                            <div className="title-score-item">
                                <span className="score-number imdb">{imdbScore}</span>
                                <span className="score-description">iMDb</span>
                            </div>
                        </div>
                        <div className="title-set-score">
                            <Rating
                                start={0}
                                stop={10}
                                initialRate={3}
                            />
                        </div>
                        <p className="title-text">{text}</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

Title.propTypes = {
    id: PropTypes.string.isRequired,
    titleEn: PropTypes.string,
    titleUkr: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    year: PropTypes.number,
    averageScore: PropTypes.number,
    imdbScore: PropTypes.number,
    text: PropTypes.string.isRequired
};

export default Title;
