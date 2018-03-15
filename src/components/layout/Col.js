import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { trim } from 'lodash';

const flexValuesVariants = /^(row|column|row-reverse|column-reverse)$/;

const stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const columnProps = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.shape({
    size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    order: stringOrNumberProp,
    offset: stringOrNumberProp
  })
]);

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  flex: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.shape({
      direction: PropTypes.string,
      justifyContent: PropTypes.string,
      alignItems: PropTypes.string,
      alignContent: PropTypes.string,
      alignSelf: PropTypes.string,
      wrap: PropTypes.string
    })
  ]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps
};

const defaultProps = {
  children: null,
  className: '',
  flex: false,
  tag: 'div',
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: ''
};

const getSizeClasses = (initialResult, size, value) => {
  let result = initialResult;
  if (typeof value === 'object') {
    if (value.size) {
      result += size === 'xs' ? `col-${value.size} ` : `col-${size}-${value.size} `;
    }
    if (value.offset) {
      result += size === 'xs' ? `offset-${value.offset} ` : `${size}-offset-${value.offset} `;
    }
    if (value.order) {
      result += size === 'xs' ? `order-${value.order} ` : `${size}-order-${value.order} `;
    }
  } else if (typeof value === 'string' || typeof value === 'number') {
    result += size === 'xs' ? `col-${value} ` : `col-${size}-${value} `;
  }

  return result;
};

const getColumnClasses = (props) => {
  let result = '';
  Object.keys(props).forEach((size) => {
    if (props[size]) {
      result = getSizeClasses(result, size, props[size]);
    }
  });

  return trim(result);
};

const getFlexClassGroup = (props, size) => {
  let result = '';
  const suffix = size ? `-${size}` : '';
  const {
    direction,
    justifyContent,
    alignItems,
    alignContent,
    alignSelf,
    wrap
  } = props;

  if (direction) {
    result += ` flex${suffix}-${direction}`;
  }

  if (justifyContent) {
    result += ` justify-content${suffix}-${justifyContent}`;
  }

  if (alignItems) {
    result += ` align-items${suffix}-${alignItems}`;
  }

  if (alignContent) {
    result += ` align-content${suffix}-${alignContent}`;
  }

  if (alignSelf) {
    result += ` align-self${suffix}-${alignSelf}`;
  }

  if (wrap) {
    result += ` flex${suffix}-${wrap}`;
  }

  return result;
};

const getFlexClasses = (props) => {
  const {
    direction,
    justifyContent,
    alignItems,
    alignContent,
    alignSelf,
    wrap,
    sm,
    md,
    lg,
    xl
  } = props;

  let result = '';

  if (props === true) {
    result = 'd-flex';
  } else if (typeof props === 'string' && flexValuesVariants.test(props)) {
    result = `d-flex flex-${props}`;
  } else if (typeof props === 'object') {
    result += 'd-flex';
    result += getFlexClassGroup({
      direction,
      justifyContent,
      alignItems,
      alignContent,
      alignSelf,
      wrap
    });

    if (sm) {
      result += getFlexClassGroup(sm, 'sm');
    }

    if (md) {
      result += getFlexClassGroup(md, 'md');
    }

    if (lg) {
      result += getFlexClassGroup(lg, 'lg');
    }

    if (xl) {
      result += getFlexClassGroup(xl, 'xl');
    }
  }

  return result;
};

export const Col = (props) => {
  const {
    children,
    className,
    flex,
    tag: Tag,
    xs,
    sm,
    md,
    lg,
    xl,
    ...attributes
  } = props;

  return (
    <Tag
      className={classNames(
        'col',
        getColumnClasses({
          xs,
          sm,
          md,
          lg,
          xl
        }),
        getFlexClasses(flex),
        className
      )}
      {...attributes}
    >
      {children}
    </Tag>
  );
};

Col.propTypes = propTypes;

Col.defaultProps = defaultProps;

export default Col;
