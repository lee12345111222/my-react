import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SelectSkills({ selectedSkills, onSkillsChange, style }) {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const response = await fetch('/api/Skill');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSkills(data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        }
        fetchSkills();
    }, []);

    const handleSkillChange = async (event, newValue) => {
        const newSkill = newValue.find(skill => typeof skill === 'string');
        console.log('newSkill:', newSkill);

        if (newSkill) {
            try {
                const response = await fetch('/api/Skill', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newSkill }),
                });

                if (response.ok) {
                    const newSkillId = await response.json();
                    console.log('newSkillId:', newSkillId);

                    const newSkillObject = { id: newSkillId, name: newSkill };
                    setSkills(prevSkills => [...prevSkills, newSkillObject]);
                    const updatedNewValue = newValue.map(skill =>
                        typeof skill === 'string' && skill === newSkill
                            ? newSkillObject
                            : skill
                    );

                    onSkillsChange(updatedNewValue.map(skill => skill.id));
                } else {
                    throw new Error('Error adding new skill.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            onSkillsChange(newValue.map(skill => skill.id));
        }
    };

    return (
        <Autocomplete
            multiple
            id="tags-skill"
            options={skills}
            value={skills.filter(skill => selectedSkills.includes(skill.id))}
            getOptionLabel={(option) => option.name || ''}
            onChange={handleSkillChange}
            filterSelectedOptions
            freeSolo 
            sx={{ ...style }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Skills"
                    placeholder="Multiple"
                />
            )}
        />
    );
}

export default SelectSkills;