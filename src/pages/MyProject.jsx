import React, {useEffect, useState} from "react";
import styled from 'styled-components';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const AcceptOrReject = () => {
  return (
    <strong>
      <ButtonGroup variant="outlined" aria-label="outlined button group"></ButtonGroup>
        <Button color="success"><CheckIcon/></Button>
        <Button color="error"><CloseIcon/></Button>
    </strong>
  );
};

const MyProjectPage = () => {
  let currentUser;
  let userProjects;
  let savedProjects;
  let appliedProjects;
  let inProjects;
  const [newRows, setNewRows] = useState([]);
  const [isPartner, setIsPartner] = useState(false);
  
  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch('/api/UserInfo');
      const data = await response.json();
      currentUser = data;
      console.log('currentUser', currentUser);
      try {
        if (currentUser.role === 'IndustryPartner') {
          const response1 = await fetch(`/api/Partner/${currentUser.id}`);
          const data1 = await response1.json();
          userProjects = data1.projects;
          setIsPartner(true);
          await fillProjectInfo(userProjects);
        } else if (currentUser.role === 'AcademicSupervisor') {
          const response1 = await fetch(`/api/Supervisor/${currentUser.id}`);
          const data1 = await response1.json();
          userProjects = data1.projects;
          await fillProjectInfo(userProjects);
        } else if (currentUser.role === 'Student') {
          const response1 = await fetch(`/api/Student/${currentUser.id}`);
          const data1 = await response1.json();
          console.log('data1', data1);
          inProjects = data1.inProjects;
          appliedProjects = data1.appliedProjects;
          savedProjects = data1.savedProjects;
          await fillStudentProjectInfo(inProjects, appliedProjects, savedProjects);
        } else {
          console.log('Error: data is not valid');
        }
      } catch (error) {
        console.log(error);
      }
      return data;
    }
    fetchProjects();
  }, []);

  const fillProjectInfo = async (userProjects) => {
    try {
      for (let i = 0; i < userProjects.length; i++) {
        console.log('userProject###', userProjects[i]);
        let newRow = {
          id: null,
          projectId: null,
          Project: null,
          IndustryPartner: null,
          Supervisor: null,
          Student: null,
          ProjectStatus: null,
          MyState: null,
        }
        newRow.id = userProjects[i].id;
        newRow.projectId = userProjects[i].id;
        newRow.Project = userProjects[i].name;
        newRow.IndustryPartner = userProjects[i].industryPartnerId ? (await fetchUserFullName(userProjects[i].industryPartnerId)) : null;
        newRow.Supervisor = userProjects[i].academicSupervisorId ? (await fetchUserFullName(userProjects[i].academicSupervisorId)) : null;
        newRow.ProjectStatus = userProjects[i].status;
        newRow.MyState = currentUser.role === 'IndustryPartner' ? 'Created' : 'Supervised';
        let studentsGroup = await getStudentGroup(userProjects[i].id);
        if (studentsGroup.length === 0) {
          newRow.Student = null;
          setNewRows(current => [...current, newRow]);
        } else {
          for (let j = 0; j < studentsGroup.length; j++) {
            // newRow.id = userProjects[i].id
            newRow.Student = await fetchUserFullName(studentsGroup[j].studentId);
            setNewRows(current => [...current, newRow]);
          }
        }
      }
    } catch (error) {
      console.log(error);
  }
  return newRows;
  }

  const fillStudentProjectInfo = async (inProjects, appliedProjects, savedProjects) => {
    let studentsGroup;
    try {
      for (let i = 0; i < inProjects.length; i++) {
        let newRow = {
          id: null,
          projectId: null,
          Project: null,
          IndustryPartner: null,
          Supervisor: null,
          Student: null,
          ProjectStatus: null,
          MyState: null,
        }
        newRow.id = inProjects[i].id;
        newRow.projectId = inProjects[i].id;
        newRow.Project = inProjects[i].name;
        newRow.IndustryPartner = inProjects[i].industryPartnerId ? (await fetchUserFullName(inProjects[i].industryPartnerId)) : null;
        newRow.Supervisor = inProjects[i].academicSupervisorId ? (await fetchUserFullName(inProjects[i].academicSupervisorId)) : null;
        newRow.ProjectStatus = inProjects[i].status;
        newRow.MyState = 'In Project';
        studentsGroup = await getStudentGroup(inProjects[i].id);
        for (let j = 0; j < studentsGroup.length; j++) {
          newRow.Student = await fetchUserFullName(studentsGroup[j].studentId);
          setNewRows(current => [...current, newRow]);
        }
      }
      for (let i = 0; i < appliedProjects.length; i++) {
        let newRow = {
          id: null,
          projectId: null,
          Project: null,
          IndustryPartner: null,
          Supervisor: null,
          Student: null,
          ProjectStatus: null,
          MyState: null,
        }
        newRow.id = appliedProjects[i].id;
        newRow.projectId = appliedProjects[i].id;
        newRow.Project = appliedProjects[i].name;
        newRow.IndustryPartner = appliedProjects[i].industryPartnerId ? (await fetchUserFullName(appliedProjects[i].industryPartnerId)) : null;
        newRow.Supervisor = appliedProjects[i].academicSupervisorId ? (await fetchUserFullName(appliedProjects[i].academicSupervisorId)) : null;
        newRow.ProjectStatus = appliedProjects[i].status;
        newRow.MyState = 'Applied';
        studentsGroup = await getStudentGroup(appliedProjects[i].id);
        for (let j = 0; j < studentsGroup.length; j++) {
          newRow.Student = await fetchUserFullName(studentsGroup[j].studentId);
          setNewRows(current => [...current, newRow]);
        }
      }
      for (let i = 0; i < savedProjects.length; i++) {
        let newRow = {
          id: null,
          projectId: null,
          Project: null,
          IndustryPartner: null,
          Supervisor: null,
          Student: null,
          ProjectStatus: null,
          MyState: null,
        }
        newRow.id = savedProjects[i].id;
        newRow.projectId = savedProjects[i].id;
        newRow.Project = savedProjects[i].name;
        newRow.IndustryPartner = savedProjects[i].industryPartnerId ? (await fetchUserFullName(savedProjects[i].industryPartnerId)) : null;
        newRow.Supervisor = await fetchUserFullName(savedProjects[i].academicSupervisorId);
        newRow.ProjectStatus = savedProjects[i].status;
        newRow.MyState = 'Saved';
        studentsGroup = await getStudentGroup(savedProjects[i].id);
        for (let j = 0; j < studentsGroup.length; j++) {
          newRow.Student = await fetchUserFullName(studentsGroup[j].studentId);
          setNewRows(current => [...current, newRow]);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return newRows;
  }
        

  const fetchUserFullName = async (userId) => {
    try {
      const response = await fetch(`/api/UserInfo/${userId}`);
      const data = await response.json();
      return data.firstName + ' ' + data.lastName;
    } catch (error) {
      console.log(error); 
    }
    return null;
  }

  const getStudentGroup = async (projectId) => {
    const response = await fetch(`/api/Project/${projectId}`);
    const data = await response.json();
    return data.students;
  }

  const ShowGrid = () => {
    try {
      return (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={newRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            columnVisibilityModel={{Application: isPartner, id: false, MoreColumn: false,}}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      );
    } catch (error) {
      console.log(error);
    }
    return ;
  };

  useEffect(() => {
    ShowGrid();
  }, [newRows]);
  
  return (
    <div>
      <FilterBox>
        <Autocomplete
          id="tags-State"
          options={State}
          getOptionLabel={(option) => option.title}
          filterSelectedOptions
          sx={{ 
            width: 200,
            m: 5,
            mx: 5,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="My State"
            />
          )}
        />

        <Autocomplete
          id="tags-Status"
          options={Status}
          getOptionLabel={(option) => option.title}
          filterSelectedOptions
          sx={{ 
            width: 200,
            m: 5,
            mx: 5,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Project Status"
            />
          )}
        />
      </FilterBox>

      <ShowGrid/>
      {/*Hidden when role is not industry partner*/}
      <Fab id='addButton' color="primary" aria-label="add" href='NewProject' sx={{
        position: 'absolute',
        top: 120,
        right: 200,
        display: isPartner ? 'flex' : 'none',
      }}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default MyProjectPage;

const State = [
  { title: 'Saved'},
  { title: 'Applied'},
  { title: 'Created'},
  { title: 'Suerpvised'},
  { title: 'Rejected'},
];

const Status = [
  { title: 'Openned'},
  { title: 'Closed'},
  { title: 'In Progress'},
  { title: 'Completed'}
];
 
const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'Project',
    headerName: 'Project',
    width: 150,
    editable: false,
    renderCell: (newRows) => {
      return (
        <strong>
          <Link href={`UpdateProject/${newRows.row.projectId}`} underline="hover" color="inherit">
          {newRows.value}
          </Link>
        </strong>
      );
    },
  },
  {
    field: 'IndustryPartner',
    headerName: 'IndustryPartner',
    width: 150,
    editable: false,
    renderCell: (params) => {
      return (
        <strong>
          <Link href="ViewOtherProfile" underline="hover" color="inherit">
          {params.value}
          </Link>
        </strong>
      );
    },
  },
  {
    field: 'Supervisor',
    headerName: 'Supervisor',
    width: 150,
    editable: false,
    renderCell: (params) => {
      return (
        <strong>
          <Link href="ViewOtherProfile" underline="hover" color="inherit">
          {params.value}
          </Link>
        </strong>
      );
    },
  },
  {
    field: 'Student',
    headerName: 'Student',
    width: 150,
    editable: false,
    renderCell: (params) => {
      return (
        <strong>
          <Link href="ViewOtherProfile" underline="hover" color="inherit">
          {params.value}
          </Link>
        </strong>
      );
    },
  },
  {
    field: 'ProjectStatus',
    headerName: 'ProjectStatus',
    width: 150,
    editable: false,
  },
  {
    field: 'MyState',
    headerName: 'MyState',
    width: 100,
    editable: false,
  },
  {
    field: "Application",
    headerName: "Accept/Reject",
    width: 150,
    editable: false,
    hide: true,
    renderCell: AcceptOrReject,
  },
  {
    field: 'MoreColumn',
    headerName: 'MoreColumn',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0px;
`;