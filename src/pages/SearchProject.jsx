import React, { useState, useEffect  } from "react";
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import ProjectCard from "../components/ProjectCard";
import SelectSkills  from "../components/SelectSkills";
import Fab from '@mui/material/Fab';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import {fetchCurrentUser} from "../services/fetchUserData";
import Button from "@mui/material/Button";
const SearchProject = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [queryData, setQueryData] = useState({
        SkillIds: [],
    });

    useEffect(() => {
        fetchCurrentUser().then(user => {
            setCurrentUser(user);
            console.log("Current user set:", user);
        }).catch(error => {
            console.error('Error fetching current user:', error);
        });
    }, []);
    
    useEffect(() => {
        const fetchStudentData = async () => {
            if (currentUser && currentUser.id) {
                let url = '';
                if (currentUser.role === "Student") {
                    url = `/api/Student/${currentUser.id}`;
                } else if (currentUser.role === "AcademicSupervisor") {
                    url = `/api/Supervisor/${currentUser.id}`;
                }
                console.log('currentUser.id:', currentUser.id);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQueryData(prev => ({
                    ...prev,
                    SkillIds: data.skills.map(skill => skill.id)
                }));
            }
        };
        fetchStudentData();
    }, [currentUser]);
    
    const saveSkills = async () => {
        let url = '';
        if (currentUser.role === "Student") {
            url = `/api/Student/skills`;
        } else if (currentUser.role === "AcademicSupervisor") {
            url = `/api/Supervisor/skills`;
        }
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ skillIds: queryData.SkillIds }),
        });
        if (!response.ok) {
            throw new Error('save skills failed', response.status);
        } else {
            console.log('Skills saved', queryData.SkillIds);
        }
    };
            
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
        
  return (
    <Box>
      <SearchContainer>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={searchRecommend.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="Seach Your Future" />}
        />
      </SearchContainer>
      <FilterBox>
          <SelectSkills
              selectedSkills={queryData.SkillIds}
              onSkillsChange={selectedSkillIds => setQueryData(prev => ({
                  ...prev,
                  SkillIds: selectedSkillIds
              }))}
              style={{width: 200,
                      m: 10,
                      mx: 10, }}
          />
          
          <Button
                variant="contained"
                onClick={saveSkills}
                style = {{ margin: 50 }}
            >
              Save Skills
            </Button>

          <Autocomplete
            id="tags-status"
            options={Status}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            sx={{ 
              width: 200,
              m: 10,
              mx: 10,
             }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Status"
                placeholder="Multiple Fields"
              />
            )}
          />
      </FilterBox>

      <ProjectBox>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </ProjectBox>

      <Fab color="primary" aria-label="add" onClick={scrollToTop} sx={{
        position: 'fixed',
        bottom: 100,
        right: 100,}}>
        <VerticalAlignTopIcon />
      </Fab>
    </Box>
  );
}

export default SearchProject;



const searchRecommend = [
  { title: 'computer science' },
  { title: 'business'},
  { title: 'engineer'},
  { title: 'science'},
  { title: 'medicine'},
  { title: "law" },
  { title: 'arts'},
  { title: 'design'},
  { title: 'Python'},
  { title: 'C#'},
  { title: 'UI Design'},
  { title: 'Openned'},
];

const Status = [
  { title: 'open'},
  { title: 'closed'},
  { title: 'in progress'},
];

const SearchContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin: 50px 20% 0 20%;
`;


const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0px;
`;

const ProjectBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0px;
`;