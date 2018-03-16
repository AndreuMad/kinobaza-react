import React from 'react';

const GridItem = (props) => {
  const {
    children,
    ...other
  } = props;

  return (
    <div
      className="grid-item"
      {...other}
    >
      {children}
    </div>
  );
};

export default GridItem;
