import React from 'react';
import { string, number, func, shape } from 'prop-types';
import DatePicker from 'react-datepicker';

import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = ({ className, value, onClick }) => (
  <button
    className={className}
    onClick={onClick}
  >
    {value}
  </button>
);

CustomInput.propTypes = {
  className: string,
  value: string,
  onClick: func
};

CustomInput.defaultProps = {
  className: '',
  value: 'Вкажіть дату Вашого народження',
  onClick: () => false
};

const DateField = ({
  input: {
    onChange,
    value
  },
  className,
  labelClassName,
  inputClassName,
  placeholder
}) => (
  <label className={labelClassName}>
    <DatePicker
      customInput={<CustomInput />}
      onChange={({ _d }) => onChange(_d.getTime())}
      selected={moment(+value || Date.now())}
    />
  </label>
);

DateField.propTypes = {
  input: shape({
    onChange: func.isRequired,
    value: string
  }),
  className: string,
  labelClassName: string,
  inputClassName: string,
  placeholder: string
};

DateField.defaultProps = {
  input: {
    value: null
  },
  className: '',
  labelClassName: '',
  inputClassName: '',
  placeholder: ''
};

export default DateField;
