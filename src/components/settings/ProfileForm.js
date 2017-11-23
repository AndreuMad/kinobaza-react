import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import AuthInfo from 'Components/HOC/AuthInfo';
import ImageUpload from 'Components/formComponents/reduxForm/ImageUpload';
import InputField from 'Components/formComponents/reduxForm/InputField';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
    }

    handleProfileSubmit(values) {
        console.log(values);
    }

    render() {
        const {
            handleProfileSubmit,
            props: {
                userName,
                handleSubmit
            }
        } = this;

        return (
            <form
                onSubmit={handleSubmit(handleProfileSubmit)}
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
                    defaultValue={userName}
                />
                <button>Send</button>
            </form>
        );
    }
}

export default reduxForm({ form: 'profile' })(ProfileForm);
