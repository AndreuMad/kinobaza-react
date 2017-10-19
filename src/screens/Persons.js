import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActorItem from 'Components/persons/ActorItem';
import ActorsForm from 'Components/persons/ActorsForm';

import {
    fetchActors,
    clearActors
} from 'Actions/actors-actions';

class PersonsPage extends Component {

    render() {
        const { actors } = this.props;

        return (
            <article className="persons-page">
                <div className="container">
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {actors.length ?
                                    actors.map((actor) => {
                                        const {
                                            birthLocation,
                                            image,
                                            name,
                                            titles,
                                            dateOfBirth,
                                            titlesNumber,
                                            zodiacSign
                                        } = actor;

                                        return (
                                            <ActorItem
                                                image={image}
                                                name={name}
                                                dateOfBirth={dateOfBirth}
                                                zodiacSign={zodiacSign}
                                                titlesNumber={titlesNumber}
                                                birthLocation={birthLocation}
                                                titles={titles}
                                            />
                                        )
                                    }) : <span>Нічого не знайдено</span>
                                }
                            </div>
                        </div>
                        <div className="col m-4">
                            <div className="col-inner">
                                <ActorsForm />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

PersonsPage.propTypes = {
    actors: PropTypes.arrayOf(PropTypes.object),
    actorsTotalCount: PropTypes.number.isRequired,
    actorsQuery: PropTypes.object,
    fetchActorsStatus: PropTypes.bool.isRequired,
    fetchUpActors: PropTypes.func.isRequired,
    clearActors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const actorsState = state.actors;

    return {
        actors: actorsState.actors,
        actorsTotalCount: actorsState.actorsTotalCount,
        actorsQuery: actorsState.actorsQuery,
        fetchActorsStatus: actorsState.fetchActorsStatus
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchUpActors: (props) => dispatch(fetchActors(props, true)),
    clearActors: () => dispatch(clearActors())
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);
