import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import SelectSkills from '../components/SelectSkills';
import { fetchProject} from "../services/fetchProject";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ProjectFormPage() {

    const { projectId } = useParams(); 
    const isUpdate = !!projectId;  
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({
        Name: '',
        Description: '',
        Capacity: null,
        SkillIds: [],
        startDate: '',
        endDate: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const populateProject = async () => {
            if (isUpdate) {
                const existingProject = await fetchProject(projectId);
                const mappedData = {
                    Name: existingProject.name,
                    Description: existingProject.description,
                    Capacity: existingProject.capacity,
                    SkillIds: existingProject.skills.map(skill => skill.id),
                    startDate: existingProject.startDate, 
                    endDate: existingProject.endDate
                };
                setProjectData(mappedData); 
            }
        };
        populateProject();
    }, [isUpdate, projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        let errorMsg = '';
        if (name === "Capacity" && (value < 0 || value > 10)) {
            errorMsg = "Capacity should be between 1 and 10!";
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMsg
        }));

        // only update the project data if there's no error for this input
        if (!errorMsg) {
            setProjectData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isUpdate ? `/api/Project/${projectId}` : '/api/Project';
            const method = isUpdate ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                alert(isUpdate ? "Project successfully updated!" : "Project successfully posted!");

                if (!isUpdate) {
                    const data = await response.json();
                    if (typeof data === 'number' && Number.isInteger(data)) {
                        navigate(`/ProjectDetails/${data}`);
                    }
                } else {
                    navigate(`/ProjectDetails/${projectId}`);
                }
            } else {
                const errorData = await response.json();
                console.error('Response not ok:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
                {isUpdate ? "Update Project" : "New Project"}
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    
                <TextField
                    label="Name"
                    variant="outlined"
                    name="Name"
                    value={projectData.Name}
                    onChange={handleChange}
                    fullWidth
                />
    
                <TextField
                    label="Description"
                    variant="outlined"
                    name="Description"
                    value={projectData.Description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                />
    
                <TextField
                    label="Capacity"
                    variant="outlined"
                    name="Capacity"
                    type="number"
                    value={projectData.Capacity || ''}
                    onChange={handleChange}
                    inputProps={{
                        min: "1",
                        max: "10"
                    }}
                    helperText={errors.Capacity}
                    error={!!errors.Capacity}
                    fullWidth
                />
    
                <SelectSkills
                    selectedSkills={projectData.SkillIds}
                    onSkillsChange={selectedSkills => setProjectData(prev => ({
                        ...prev,
                        SkillIds: selectedSkills
                    }))}
                    // style={{ width: 400, m: 3 }}
                    fullWidth
                />
    
                <TextField
                    label="Start Date"
                    variant="outlined"
                    name="startDate"
                    type="date"
                    value={projectData.startDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <TextField
                    label="End Date"
                    variant="outlined"
                    name="endDate"
                    type="date"
                    value={projectData.endDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary">
                    {isUpdate ? "Update" : "Publish"}
                </Button>

            </form>
        </div>
    );
}


export default ProjectFormPage;
