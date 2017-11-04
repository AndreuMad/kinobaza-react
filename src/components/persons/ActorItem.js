import React from 'react';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

import ActorsTitle from 'Components/persons/ActorsTitle';

const ActorItem = ({
   _id,
   image: { url: imageUrl },
   name: { ukr: nameUkr, en: nameEn },
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
                        <img src={imageUrl} alt={nameEn}/>
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
                    <h2>{nameUkr}</h2>
                    <p>{nameEn}</p>
                    <p>{moment(dateOfBirth).locale("ua").format("LL")}</p>
                    <p>{zodiacSign}</p>
                    <p>{birthLocation}</p>
                    <p>{titlesNumber}</p>
                        {
                            titles.length ?
                                <div className="titles-wrap">
                                    {titles.map(({ _id, image, name }) => (
                                            <ActorsTitle
                                                key={`actorsTitle${_id}`}
                                                image={image}
                                                name={name}
                                            />
                                        )
                                    )}
                                </div> : null
                        }
                </div>
            </div>
        </div>
    </div>
);

export default ActorItem;
