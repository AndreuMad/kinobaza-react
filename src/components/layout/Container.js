import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  fluid: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  children: null,
  className: '',
  fluid: false,
  tag: 'div'
};

export const Container = (props) => {
  const {
    children,
    className,
    fluid,
    tag: Tag,
    ...attributes
  } = props;

  return (
    <Tag
      className={classNames(
        { container: !fluid },
        { 'container-fluid': fluid },
        className
      )}
      {...attributes}
    >
      {children}
    </Tag>
  );
};

Container.propTypes = propTypes;

Container.defaultProps = defaultProps;

export default Container;
