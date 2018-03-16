import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.article`
  padding: 2.4rem 3.2rem;
  border-radius: .4rem;
  background-color: #fff;
`;

const InfoItem = () => {
  return (
    <Styled>
      Lorem ipsum
    </Styled>
  );
};

InfoItem.propTypes = {};
InfoItem.defaultProps = {};

export default InfoItem;
