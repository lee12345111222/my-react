import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Popper from '@mui/material/Popper';
import PopupState, {bindPopper, bindToggle} from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

import ProjectSample from '../img/project-sample.jpg';
import {useNavigate, useParams} from "react-router-dom";
import {fetchProject} from "../services/fetchProject";
import {fetchCurrentUser, fetchUserData} from "../services/fetchUserData";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ActionButtons({ actions }) {
  return (
      <div>
        {actions.map(action => (
            <Button key={action.label} variant="contained" size="large" onClick={action.onClick}>
              {action.label}
            </Button>
        ))}
      </div>
  );
}

const ProjectDetailPage = () => {

  const [savedProject, setSavedProject] = React.useState(false);
  const [ApplyStatus, setApplyStatus] = React.useState(false);
  const { projectId } = useParams()
  const [project, setProject] = useState({});
  const [industryPartner, setIndustryPartner] = useState({});
  const [cur_user, setCurUser] = useState({});
  const navigate = useNavigate();

  const Notify = (savedProject) => {
    if (!savedProject) {
      toast.success("Saved Successfully!", {
        icon: '🎉',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    } else {
      toast.error("Unsaved This Project", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
      });
    }
    setSavedProject(!savedProject);
  };

  useEffect(() => {
    const populateProject = async () => {
      console.log('projectId:', projectId)
        if (projectId) {
            const existingProject = await fetchProject(projectId);
            setProject(existingProject);
        }
    };
    populateProject();
}, [projectId]);

  useEffect(() => {
    const fetchIndustryPartner = async () => {
      if (project && project.industryPartnerId) {
        const data = await fetchUserData(project.industryPartnerId);
        setIndustryPartner(data);
      }
    };
    fetchIndustryPartner();
  }, [project]);

  useEffect(() => {
    const fetchCurUser = async () => {
      const data = await fetchCurrentUser();
      setCurUser(data);
    };
    fetchCurUser();
  }, []);

  const industryPartnerActions = [
    {
      label: "Update Details", onClick: () => {
        navigate(`/UpdateProject/${projectId}`)
      }
    },
  ];
  
  
  // TODO: onClick action await for database and api 
  const studentActions = [
    {
      label: "Apply", onClick: () => {
        alert("Apply")
      }
    },
    {
      label: "Save", onClick: () => {
        alert("Save")
      }
    },
  ];

  const academicSupervisorActions = [
    {
      label: "Supervise", onClick: () => {
        alert("Supervise")
      }
    },
  ];
  
  return (
  <ProjectContainer>
    <h1>{project.name} Project Name</h1>
    <Button variant="contained" size="large" sx={{m:1}}endIcon={savedProject? <GradeIcon /> : <GradeOutlinedIcon/>} onClick={()=>{Notify(savedProject);}}>
        {savedProject ? "Unsave" : "Save"}
    </Button>
    <ToastContainer />
    <img src={ProjectSample} alt="Project Sample" />
    <CompanyContainer>
      {/*show organization if not null*/}
      <h3>Posted By: {industryPartner.firstName + ' ' + industryPartner.lastName}
        {industryPartner.organization ? ' from ' + industryPartner.organization : ''}
        </h3>
    </CompanyContainer>
    <TimeContainer>
      <h3>Start Time: {project.startDate}</h3>
      <h3>End Time: {project.endDate}</h3>
    </TimeContainer>
    <DescriptionContainer>
      <h2>Description</h2>
      <p>{project.description}</p>
    </DescriptionContainer>
    <div>
      <h2>Capacity</h2>
      <p>{project.currentSize} / {project.capacity}</p>
    </div>

    <h2>Skills Required</h2>
    <SkillContainer>
      {project.skills && project.skills.map((skill, index) => (
          <Chip label={skill.name} color="success" variant="outlined" key={index} />
      ))}
    </SkillContainer>

    {/*               different actions for different roles
      - By default: can't see save nor apply nor supervise
      - Student
          - if cur_user && cur_project in Student-Project: update status (not implemented yet)
          - otherwise, able to see save and apply button
      - Industry Partner
          - if cur_user === industry partner id: able to update details
      - Academic Supervisor
          - if supervisor id is not null: able to supervise (not in api response yet)    */}
    <div>
      { cur_user.role && project && industryPartner && (
          <div>
            {project.industryPartnerId === cur_user.id && <ActionButtons actions={industryPartnerActions}/>}
            {cur_user.role === "Student" && <ActionButtons actions={studentActions}/> }
            {cur_user.role === "AcademicSupervisor" && <ActionButtons actions={academicSupervisorActions}/> }
          </div>
      )}
    </div>
    
    <div>
      <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button variant="contained" size="large" {...bindToggle(popupState)}>
            {ApplyStatus ? "Applied" : "Apply"}
          </Button>

          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper sx={{textAlign: 'center', width: 800,}}>
                  <Typography sx={{ p: 2 }}>Thanks for appling to this project. Would you like to give a brief intruoduction for your self?</Typography>
                  <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  sx={{ width: '80%' }}
                  />
                  <PopperButtonContainer>
                    <Button variant="contained" size="large" color="inherit" sx={{m:2, mx: 20}} {...bindToggle(popupState)}>
                      Cancel
                    </Button>
                    <Button variant="contained" size="large" color="success" sx={{m:2, mx: 20}} {...bindToggle(popupState)} onClick={()=>{setApplyStatus(true)}}>
                      Submit
                    </Button>
                  </PopperButtonContainer>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
    </div>
  </ProjectContainer>
  )
}

export default ProjectDetailPage;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 20px;
`;

const CompanyContainer = styled.div`
  text-align: right;
  width: 90%;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const DescriptionContainer = styled.div`
  width: 90%;
  text-align: left;
`;

const SkillContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const PopperButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
`;
