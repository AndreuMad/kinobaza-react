import React, { Component } from 'react';
import { string, bool, func, arrayOf, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import AuthController from 'Components/hoc/AuthController';

import ActorItem from 'Components/persons/ActorItem';
import ActorsForm from 'Components/persons/ActorsForm';

import {
  callFetchActors,
  callLikeActor,
  callChangeActorsQuery,
  clearActors
} from 'Actions/actors-actions';

class PersonsPage extends Component {
  constructor(props) {
    super(props);

    this.handleActorsLoad = _.debounce(this.handleActorsLoad.bind(this));
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleActorLike = this.handleActorLike.bind(this);

    this.state = {
      shouldLoadActors: true
    };
  }

  componentDidMount() {
    this.props.callFetchActors();
    window.addEventListener('scroll', this.handleActorsLoad);
  }

  componentWillReceiveProps({ actors: nextActors }) {
    const { actorsTotalCount } = this.props;
    const actorsCurrentCount = nextActors.length;

    this.setState({
      shouldLoadActors: actorsCurrentCount < actorsTotalCount
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleActorsLoad);
  }

  handleActorsLoad() {
    const {
      props: {
        fetchActorsStatus,
        callFetchActors
      },
      state: {
        shouldLoadActors
      },
      pageNode
    } = this;

    if (shouldLoadActors && fetchActorsStatus) {
      if (pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {
        callFetchActors(true);
      }
    }
  }

  handleQueryChange(name, payload) {
    this.props.callChangeActorsQuery({ [name]: payload });
  }

  handleActorLike(actorId) {
    const {
      likeActorStatus,
      callLikeActor
    } = this.props;

    if (likeActorStatus) {
      callLikeActor({ actorId });
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
                      zodiacSign
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
                    );
                  }) : <span>Нічого не знайдено</span>
                }
              </div>
            </div>
            <div className="col m-4">
              <div className="col-inner">
                <ActorsForm handleQueryChange={this.handleQueryChange} />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

const Loader = () => (
  <span>Перевірка даних...</span>
);

PersonsPage.propTypes = {
  actors: arrayOf(shape({
    _id: string,
    birthLocation: string,
    dateOfBirth: number,
    image: shape({
      url: string
    }),
    likes: arrayOf(string),
    name: shape({
      en: string,
      ukr: string
    }),
    titles: arrayOf(shape({
      _id: string,
      image: shape({
        url: string
      }),
      name: shape({
        en: string,
        ukr: string
      }),
      year: number
    })),
    titlesNumber: number,
    total: number,
    zodiacSign: string
  })),
  actorsTotalCount: number.isRequired,
  fetchActorsStatus: bool.isRequired,
  callFetchActors: func.isRequired,
  callChangeActorsQuery: func.isRequired,
  callLikeActor: func.isRequired,
  likeActorStatus: bool.isRequired
};

const mapStateToProps = ({
  actors: {
    actors,
    actorsTotalCount,
    actorsLikes,
    fetchActorsStatus,
    likeActorStatus
  }
}) => ({
  actors,
  actorsTotalCount,
  actorsLikes,
  fetchActorsStatus,
  likeActorStatus
});

const mapDispatchToProps = dispatch => ({
  callFetchActors: shouldAppend => dispatch(callFetchActors(shouldAppend)),
  callChangeActorsQuery: params => dispatch(callChangeActorsQuery(params)),
  callLikeActor: ({ userId, actorId }) => dispatch(callLikeActor({ userId, actorId }))
});

export default AuthController(connect(mapStateToProps, mapDispatchToProps)(PersonsPage), Loader);
