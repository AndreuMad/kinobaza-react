import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

import ImageUpload from 'Components/formComponents/reduxForm/ImageUpload';
import InputField from 'Components/formComponents/reduxForm/InputField';
import DateField from 'Components/formComponents/reduxForm/DateField';

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
                handleSubmit
            }
        } = this;

        return (
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
                    onClick={handleSubmit(handleProfileSubmit)}
                >Send</button>
            </form>
        );
    }
}

export default reduxForm({form: 'profile'})(ProfileForm);
