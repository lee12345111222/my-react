import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import {fetchProject} from "../services/fetchProject";
import {fetchCurrentUser, fetchUserData} from "../services/fetchUserData";

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


const Test = () => {

    const { projectId } = useParams();
    const [project, setProject] = useState({});
    const [industryPartner, setIndustryPartner] = useState({});
    const [cur_user, setCurUser] = useState({});

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
    const navigate = useNavigate();
    
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
        <div>
            { cur_user.roles && project && industryPartner && (
                <div>
                    {project.industryPartnerId === cur_user.id && <ActionButtons actions={industryPartnerActions}/>}
                    {cur_user.roles[0] === "Student" && <ActionButtons actions={studentActions}/> }
                    {cur_user.roles[0] === "AcademicSupervisor" && <ActionButtons actions={academicSupervisorActions}/> }
                </div>
            )}
        </div>
    );
}

export default Test;


// {
//     project.industryPartnerId === cur_user.id && <ActionButtons actions={industryPartnerActions}/>
// }
//
//     const canUpdateDetails = cur_user.id === project?.industryPartnerId;
//
// // In your render logic:
//     {
//         canUpdateDetails && <ActionButtons actions={industryPartnerActions}/>
//     }