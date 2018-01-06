import React from 'react';
import { func } from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import InputField from 'Components/formComponents/reduxForm/InputField';
import DateField from 'Components/formComponents/reduxForm/DateField';

const ProfileForm = ({ handleSubmit, handleUserEdit }) => (
  <form onSubmit={event => event.preventDefault()}>
    <h3>Ім'я профілю</h3>
    <Field
      component={InputField}
      type="text"
      name="name"
    />
    <Field
      component={DateField}
      name="dateOfBirth"
    />
    <button
      onClick={handleSubmit(handleUserEdit)}
    >Send
    </button>
  </form>
);

ProfileForm.propTypes = {
  handleSubmit: func,
  handleUserEdit: func
};

export default reduxForm({ form: 'userProfile' })(ProfileForm);
