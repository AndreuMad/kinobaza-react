import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';

import { textareaComponent } from 'Components/formComponents/reduxForm/textareaComponent';

import { postComment } from 'Actions/comments-actions';

class PostCommentForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({ comment: text }) {
        const {
            postId,
            userId,
            postComment
        } = this.props;

        postComment({ userId, postId, text });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <Field
                    name="comment"
                    component={textareaComponent}
                    placeholder="Залиште свій коментар"
                />
                <div className="btn-group">
                    <button>Коментувати</button>
                </div>
            </form>
        );
    }
}

const validate = ({ comment }) => {
    const errors = {};

    if(!comment) {
        errors.comment = 'Будь-ласка, введіть не менше 2 символів';
    }

    return errors;
};



const mapDispatchToProps = null;

export default reduxForm({ form: 'postComment', validate })(PostCommentForm);