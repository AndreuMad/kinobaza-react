import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PersonsPage extends Component {

    render() {
        return (
            <article className="persons-page">
                <div className="container">
                    Persons Page
                </div>
            </article>
        )
    }
}

export default PersonsPage;
