import React, {Component} from 'react';
import { string, bool, func, arrayOf, number, object } from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

import ActorItem from 'Components/persons/ActorItem';
import ActorsForm from 'Components/persons/ActorsForm';

import {
    fetchActors,
    clearActors,
    likeActor
} from 'Actions/actors-actions';

class PersonsPage extends Component {
    constructor(props) {
        super(props);

        this.handleActorsLoad = _.debounce(this.handleActorsLoad.bind(this));
        this.fetchUpActors = this.fetchUpActors.bind(this);
        this.handleActorLike = this.handleActorLike.bind(this);

        this.state = {
            actorsCurrentCount: 0,
            shouldLoadActors: true
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleActorsLoad);
    }

    componentWillReceiveProps({actors: nextActors}) {
        const {actorsTotalCount} = this.props;
        const actorsCurrentCount = nextActors.length;

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
        const {
            actorsQuery,
            userId,
            fetchUpActors
        } = this.props;

        const {
            actorsCurrentCount
        } = this.state;

        fetchUpActors({
            ...actorsQuery,
            userId,
            skip: actorsCurrentCount
        });
    }

    handleActorsLoad() {
        const {
            pageNode,
            fetchUpActors
        } = this;

        const {
            fetchActorsStatus
        } = this.props;

        const {
            shouldLoadActors
        } = this.state;

        if (shouldLoadActors && fetchActorsStatus) {

            if (pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {
                fetchUpActors();
            }
        }
    }

    handleActorLike(actorId) {
        const {
            likeActorStatus,
            userId,
            likeActor
        } = this.props;

        if (likeActorStatus) {
            likeActor(userId, actorId);
        }
    }

    render() {
        const {
            handleActorLike
        } = this;

        const {
            actors,
            actorsLikes
        } = this.props;

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
                                        } = actor;

                                        const liked = actorsLikes.indexOf(_id) !== -1;

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
                                                liked={liked}
                                                handleActorLike={handleActorLike}
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
    userId: string,
    actors: arrayOf(object),
    actorsTotalCount: number.isRequired,
    actorsQuery: object,
    fetchActorsStatus: bool.isRequired,
    fetchUpActors: func.isRequired,
    clearActors: func.isRequired,
    likeActor: func.isRequired,
    likeActorStatus: bool.isRequired
};

const mapStateToProps = ({
                             auth: {id: userId},
                             actors: {
                                 actors,
                                 actorsTotalCount,
                                 actorsLikes,
                                 actorsQuery,
                                 fetchActorsStatus,
                                 likeActorStatus
                             }
                         }) => ({
    userId,
    actors,
    actorsTotalCount,
    actorsLikes,
    actorsQuery,
    fetchActorsStatus,
    likeActorStatus
});

const mapDispatchToProps = (dispatch) => ({
    fetchUpActors: (props) => dispatch(fetchActors(props, true)),
    clearActors: () => dispatch(clearActors()),
    likeActor: (userId, actorId) => dispatch(likeActor({userId, actorId}))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsPage);
