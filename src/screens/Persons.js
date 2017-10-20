import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import ActorItem from 'Components/persons/ActorItem';
import ActorsForm from 'Components/persons/ActorsForm';

import {
    fetchActors,
    clearActors
} from 'Actions/actors-actions';

class PersonsPage extends Component {
    constructor(props) {
        super(props);

        this.handleActorsLoad = _.debounce(this.handleActorsLoad.bind(this));
        this.handleActorLike = this.handleActorLike.bind(this);

        this.state = {
            actorsCurrentCount: 0,
            shouldLoadActors: true
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleActorsLoad);
    }

    componentWillReceiveProps(nextProps) {
        const actorsCurrentCount = nextProps.actors.length;
        const { actorsTotalCount } = this.props;

        const actorsLoadStatus = actorsCurrentCount < actorsTotalCount;

        this.setState({
            actorsCurrentCount,
            shouldLoadActors: actorsLoadStatus
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleActorsLoad);
    }

    fetchUpActors() {
        this.props.fetchUpActors({
            ...this.props.actorsQuery,
            skip: this.state.actorsCurrentCount
        });
    }

    handleActorsLoad() {
        if(this.state.shouldLoadActors && this.props.fetchActorsStatus) {

            if(this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {
                this.fetchUpActors();
            }
        }
    }

    handleActorLike(actorId) {
        console.log(actorId);
    }

    render() {
        const { actors } = this.props;

        return (
            <article
                className="persons-page"
                ref={node => this.pageNode = node}
            >
                <div className="container">
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {actors.length ?
                                    actors.map((actor) => {
                                        const {
                                            _id,
                                            birthLocation,
                                            image,
                                            name,
                                            titles,
                                            dateOfBirth,
                                            titlesNumber,
                                            zodiacSign,
                                            likes
                                        } = actor;

                                        return (
                                            <ActorItem
                                                key={`actor${_id}`}
                                                _id={_id}
                                                image={image}
                                                name={name}
                                                dateOfBirth={dateOfBirth}
                                                zodiacSign={zodiacSign}
                                                titlesNumber={titlesNumber}
                                                birthLocation={birthLocation}
                                                titles={titles}
                                                likes={likes}
                                                handleActorLike={this.handleActorLike}
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
