import React from 'react';

const ActorItem = ({ image, name, dateOfBirth, zodiacSign, titlesNumber }) => (
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
                    <p>{titlesNumber}</p>
                </div>
            </div>
        </div>
    </div>
);

export default ActorItem;
