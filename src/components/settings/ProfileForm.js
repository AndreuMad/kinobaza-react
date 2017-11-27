import React from 'react';
import {reduxForm, Field} from 'redux-form';

import AuthController from 'Components/HOC/AuthController';
import ImageUpload from 'Components/formComponents/reduxForm/ImageUpload';
import InputField from 'Components/formComponents/reduxForm/InputField';
import DateField from 'Components/formComponents/reduxForm/DateField';

const ProfileForm = ({handleSubmit, handleUserEdit}) => (
    <form
        onSubmit={event => event.preventDefault()}
    >
        <h1>Редагувати профіль</h1>
        <hr/>
        <h3>Аватарка</h3>
        <Field
            component={ImageUpload}
            label="Завантажте аватарку"
            name="photo"
        />
        <hr/>
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

const Placeholder = () => (
    <span>Будь-ласка, залогіньтесь</span>
);

export default AuthController(reduxForm({form: 'profile'})(ProfileForm), Placeholder);
