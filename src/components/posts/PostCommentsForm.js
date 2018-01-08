import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import AuthController from 'Components/hoc/AuthController';

import { textareaComponent } from 'Components/formComponents/reduxForm/textareaComponent';

const PostCommentForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
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
};

PostCommentForm.propTypes = {
  handleSubmit: func.isRequired
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
