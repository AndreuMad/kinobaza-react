import React from 'react';
import {string, number, func} from 'prop-types';

import Rating from 'react-rating';

const Title = ({_id, titleEn, titleUkr, imageUrl, year, averageScore, imdbScore, text, userRating, handleTitleRate}) => (
    <article className="title-item" key={`title${_id}`}>
        <div className="row">
            <div className="col m-5">
                <div className="col-inner">
                    <figure>
                        <img src={imageUrl} alt={titleUkr} title={titleUkr}/>
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
                            initialRate={userRating}
                            onChange={(newRating) => handleTitleRate(_id, newRating)}
                        />
                    </div>
                    <p className="title-text">{text}</p>
                </div>
            </div>
        </div>
    </article>
);

Title.propTypes = {
    _id: string.isRequired,
    averageScore: number,
    handleTitleRate: func,
    imageUrl: string,
    imdbScore: number,
    text: string.isRequired,
    titleEn: string,
    titleUkr: string.isRequired,
    userRating: number,
    year: number,
};

export default Title;
