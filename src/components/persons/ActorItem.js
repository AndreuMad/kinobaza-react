import React from 'react';

import ActorsTitle from 'Components/persons/ActorsTitle';

const ActorItem = ({ image, name, dateOfBirth, zodiacSign, titlesNumber, birthLocation, titles }) => (
    <div className="person-item">
        <div className="row">
            <div className="col m-4">
                <div className="col-inner">
                    <figure>
                        <img src={image.url} alt={name.ukr}/>
                    </figure>
                    <div className="btn-group">
                        <button>
                            <i className="fa fa-heart" aria-hidden="true" />
                            <span>Додати до улюблених</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col m-8">
                <div className="col-inner">
                    <h2>{name.ukr}</h2>
                    <p>{name.en}</p>
                    <p>{dateOfBirth}</p>
                    <p>{zodiacSign}</p>
                    <p>{birthLocation}</p>
                    <p>{titlesNumber}</p>
                        {
                            titles.length ?

                                <div className="titles-wrap">
                                    {titles.map((title) => {
                                        const { image, name } = title;

                                        return (
                                            <ActorsTitle
                                                image={image}
                                                name={name}
                                            />
                                        );
                                    })}
                                </div> : null
                        }
                </div>
            </div>
        </div>
    </div>
);

export default ActorItem;
