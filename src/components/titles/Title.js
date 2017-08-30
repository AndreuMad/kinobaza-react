import React from 'react';

const Title = ({
                            id,
                            titleEn,
                            titleUkr,
                            imageUrl,
                            year,
                            averageScore,
                            imdbScore,
                            text }) => {
    return (
        <article key={`title${id}`}>
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
                        <div>
                            <h3>{titleUkr}</h3>
                            <span>{year}</span>
                        </div>
                        <h3>{titleEn}</h3>
                        <div>
                            <div>
                                <span>{averageScore}</span>
                                <span>Середня</span>
                            </div>
                            <div>
                                <span>{imdbScore}</span>
                                <span>iMDb</span>
                            </div>
                        </div>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Title;
