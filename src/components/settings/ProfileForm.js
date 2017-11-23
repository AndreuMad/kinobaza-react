import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import ImageUpload from 'Components/formComponents/ImageUpload';

class ProfileForm extends Component {

    handleProfileSubmit(values) {
        console.log(values);
    }

    render() {
        const {
            handleProfileSubmit,
            props: {
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
                <p></p>
                <button>Send</button>
            </form>
        );
    }
}

export default reduxForm({ form: 'profile' })(ProfileForm);
