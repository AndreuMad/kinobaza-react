import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import AuthController from 'Components/hoc/AuthController';

import { textareaComponent } from 'Components/formComponents/reduxForm/textareaComponent';

import { postComment } from 'Actions/comments-actions';

class PostCommentForm extends Component {
  handleSubmit = ({ comment: text }) => {
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

PostCommentForm.propTypes = {
  postId: string,
  userId: string,
  handleSubmit: func
};

const Placeholder = () => (
  <span>Увійдіть на сайт, щоб залишати коментарі</span>
);

const validate = ({ comment }) => {
  const errors = {};

  if (!comment) {
    errors.comment = 'Будь-ласка, введіть не менше 2 символів';
  }

  return errors;
};

export default AuthController(reduxForm({ form: 'postComment', validate })(PostCommentForm), Placeholder);
