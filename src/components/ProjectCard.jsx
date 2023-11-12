import React from "react";
import styled from 'styled-components';
import ProjectSample from '../img/project-sample.jpg';
import { useNavigate } from "react-router-dom";

const ProjectCard = () => {
  const navigate = useNavigate();
  return (
    <ProjectContainer onClick={() => navigate('/ProjectDetail')}>
      <ProjectSampleImage src={ProjectSample} alt="Project Sample" />
      <h5>Project Title</h5>
      <h6>Company</h6>
      <StatusContainer>Status</StatusContainer>
    </ProjectContainer>
  )
}

export default ProjectCard;

const ProjectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${props => BoxColors[props.index]};
  margin-right: 20px
`; 

const BoxColors = [
  '#A8D5E2', '#8171D1', '#D1C081', '#E2958C', '#A7D897', '#8C97E2'
];

const ProjectSampleImage = styled.img`
  height: 150px;
  padding: 0px 0px 5px 0px;
`;

const StatusContainer = styled.div`
  text-align: right;
  margin: 0 5px;
`;
 