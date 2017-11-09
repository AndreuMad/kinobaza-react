import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { textareaComponent } from 'Components/formComponents/reduxForm/textareaComponent';

class PostCommentForm extends Component {
    handleSubmit(values) {
        console.log(values);
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

export default reduxForm({ form: 'postComment', validate })(PostCommentForm);
