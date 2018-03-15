import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  noGutters: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  children: null,
  className: '',
  noGutters: false,
  tag: 'div'
};

export const Row = (props) => {
  const {
    children,
    className,
    noGutters,
    tag: Tag,
    ...attributes
  } = props;

  return (
    <Tag
      className={classNames(
        'row',
        { 'no-gutters': noGutters },
        className
      )}
      {...attributes}
    >
      {children}
    </Tag>
  );
};

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
