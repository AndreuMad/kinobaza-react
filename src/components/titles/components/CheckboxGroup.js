import React, { Component } from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

class CheckboxGroupWrap extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(values) {
        let value = {};
        value[this.props.name] = values;

        return value;
    }

    render() {
        const { name, options, onFieldChange } = this.props;

        return (
            <CheckboxGroup
                name={name}
                onChange={(newData) => onFieldChange(newData, this.handleChange)}
            >
                {options.map((option, index) => (
                <div className="checkbox-item" key={`checkbox${index}`}>
                    <label className="checkbox-wrap">
                        <Checkbox
                            className="checkbox-input"
                            value={option.name}
                        />
                        <span className="checkbox-indicator" />
                        <span className="checkbox-name">{option.label}</span>
                    </label>
                </div>
                ))}
            </CheckboxGroup>
        );
    }
}

export default CheckboxGroupWrap;
