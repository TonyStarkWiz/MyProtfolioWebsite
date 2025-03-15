import React from 'react';
import { FaReact } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiNodedotjs } from 'react-icons/si';
import styled from 'styled-components';


const MERNWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  text-align: center;
  color: #8892b0;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
  font-size: 1.5rem;
  color: #8892b0;

  & > * {
    margin: 0 0.3rem;
  }
`;

const MERNIcons = () => (
  <MERNWrapper>
    <IconContainer>
      <SiMongodb />
      <SiExpress />
      <FaReact />
      <SiNodedotjs />
    </IconContainer>
    <p>Built by Anthony Espinoza using the MERN stack</p>
  </MERNWrapper>
);

export default MERNIcons;
