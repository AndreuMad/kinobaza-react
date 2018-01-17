import React, { Component } from 'react';
import { string, bool, func, arrayOf, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import AuthController from 'Components/hoc/AuthController';

import ActorItem from 'Components/persons/ActorItem';
import ActorsForm from 'Components/persons/ActorsForm';

import {
  callFetchActors,
  callLikeActor,
  callChangeActorsQuery,
  clearActors
} from 'Ducks/actors';

class PersonsPage extends Component {
  constructor(props) {
    super(props);

    this.handleActorsLoad = _.debounce(this.handleActorsLoad);

    this.state = {
      shouldLoadActors: true
    };
  }

  componentDidMount() {
    this.props.fetchActors();
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

  handleActorsLoad = () => {
    const {
      props: {
        fetchActorsStatus,
        fetchActors
      },
      state: {
        shouldLoadActors
      },
      pageNode
    } = this;

    if (shouldLoadActors && fetchActorsStatus) {
      if (pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {
        fetchActors(true);
      }
    }
  };

  handleQueryChange = (name, value) => {
    this.props.changeActorsQuery({ [name]: value });
  };

  handleActorLike = (actorId) => {
    const {
      likeActorStatus,
      likeActor
    } = this.props;

    if (likeActorStatus) {
      likeActor({ actorId });
    }
  };

  render() {
    const {
      handleActorLike,
      handleQueryChange
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
                <ActorsForm handleQueryChange={handleQueryChange} />
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
  fetchActors: func.isRequired,
  changeActorsQuery: func.isRequired,
  likeActor: func.isRequired,
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

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchActors: shouldAppend => callFetchActors(shouldAppend),
  changeActorsQuery: params => callChangeActorsQuery(params),
  likeActor: ({ userId, actorId }) => callLikeActor({ userId, actorId })
}, dispatch);

export default AuthController(connect(mapStateToProps, mapDispatchToProps)(PersonsPage), Loader);
