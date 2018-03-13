import styled from 'styled-components';
const fitBackground = `
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const PostCard = styled.article`
  margin-bottom: 6.4rem;

  .illustration {
    width: 100%;
    ${fitBackground}
  }
`;

export default PostCard;
