import React from 'react';
import DatePicker from 'react-datepicker';

import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = ({ className, value, onClick }) => (
  <button
    className={className}
    onClick={onClick}
  >
    {value || 'Вкажіть дату Вашого народження'}
  </button>
);

const DateField = ({
  input: {
    onChange,
    value
  },
  className,
  labelClassName,
  inputClassName,
  placeholder,
  initialValue
}) => (
  <label className={labelClassName}>
    <DatePicker
      customInput={<CustomInput />}
      onChange={({ _d }) => onChange(_d.getTime())}
      selected={moment(value)}
    />
  </label>
);

export default DateField;
