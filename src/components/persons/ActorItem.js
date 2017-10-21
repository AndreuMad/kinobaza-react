import React from 'react';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

import ActorsTitle from 'Components/persons/ActorsTitle';

const ActorItem = ({
                       _id,
                       image,
                       name,
                       dateOfBirth,
                       zodiacSign,
                       titlesNumber,
                       birthLocation,
                       titles,
                       liked,
                       handleActorLike
}) => (
    <div
        className="person-item"
    >
        <div className="row">
            <div className="col m-4">
                <div className="col-inner">
                    <figure>
                        <img src={image.url} alt={name.ukr}/>
                    </figure>
                    <div className="btn-group">
                        <button
                            onClick={() => handleActorLike(_id)}
                        >
                            <i className="fa fa-heart" aria-hidden="true" />
                            <span>
                                {
                                    liked ? 'Видалити з улюблених' : 'Додати до улюблених'
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col m-8">
                <div className="col-inner">
                    <h2>{name.ukr}</h2>
                    <p>{name.en}</p>
                    <p>{moment(dateOfBirth).locale("ua").format("LL")}</p>
                    <p>{zodiacSign}</p>
                    <p>{birthLocation}</p>
                    <p>{titlesNumber}</p>
                        {
                            titles.length ?
                                <div className="titles-wrap">
                                    {titles.map((title) => {
                                        const { _id, image, name } = title;

                                        return (
                                            <ActorsTitle
                                                key={`actorsTitle${_id}`}
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
