// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import styled from 'styled-components';


import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Avatar from '../img/avatar.jpeg'
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import {fetchUserData} from "../services/fetchUserData";
import {useParams} from "react-router-dom";

const ViewOtherProfilePage = () => {
  const { userId } = useParams();
  const OverallRating = 2.5;
  const [rating, setRating] = React.useState(2);
  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    const fetchProfileUser = async () => {
      const data = await fetchUserData(userId);
      setProfileUser(data);
    };
    fetchProfileUser();
  }, [userId]);
  
  
  return (
    <Wrap>
      <ProfileBox>
        <BackBox>
          <Button variant="text" sx={{m:2}} href='MyProject'><CloseIcon/></Button>
        </BackBox>
        <NameBox>
        <h1>{profileUser.firstName} {profileUser.lastName}</h1>
        </NameBox>
        <ImageBox>
        <img src={Avatar} alt="profile pic" />
        </ImageBox>
        <RoleBox>
          <h2>Role: {profileUser.role}</h2>
        </RoleBox>
        <OrgBox>
          <h2>{profileUser.organization ? 'Organization: ' + profileUser.organization : ''}</h2>
        </OrgBox>
        
        <SkillBox>
          <h2>skills: </h2>
          {skills.map((skill, index) => (
            <Chip label={skill} key={index} sx={{m:2, mx:3}}/>
          ))}
        </SkillBox>
        <RatingBox>
        <h2>Rate: </h2>
          <Rating
            name="Rating From Industry Partner"
            readOnly
            value={OverallRating}
            precision={0.5}
          />
          </RatingBox>
        <TextField fullWidth label="Leave an message" id="fullWidth" multiline rows={3}
        sx={{
          my: 3,
          mx: 3,
        }}/>
        <DownloadBox>
          <Button variant="contained" endIcon={<DownloadIcon />}>Download Resume</Button>
        </DownloadBox>
        <RatingBox>
          <h2>My Rating: </h2>
          <Rating
            name="Rating From Industry Partner"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          </RatingBox>
      </ProfileBox>
    </Wrap>
  );
};

export default ViewOtherProfilePage;

const Wrap = styled.div`
    font-family: 'Roboto', sans-serif;
    background-color: white;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    transition: all 0.3s;
    background-position: center center;
`;

const BackBox = styled.div`
    display: flex;
    justify-content: right;
`;   

const ProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    width: 40%;
    max-width: 800px;
    transition: all 0.3s;
    &:hover {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    }

`;

const NameBox = styled.div`
  margin = 2px;
  text-align: center;
  color: #000000;
  letter-spacing: 0.00938em;
  font-style:itelic;
`;

const ImageBox = styled.div`
  margin = 20px;
  text-align: center;
  color: #000000;
  letter-spacing: 0.00938em;
  width: 50%;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #000000;
  img {
    width: 100%;
    height: 100%;
  }
`;

const RoleBox = styled.div`
  margin = 20px;
  text-align: center;
  color: #000000;
  letter-spacing: 0.00938em;
`;

const OrgBox = styled.div`
  margin = 50px;
  text-align: center;
  color: #000000;
  letter-spacing: 0.00938em;
`;

const SkillBox = styled.div`
  margin = 50px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const DownloadBox = styled.div`
  margin = 70px;
  text-align: center;
  color: #000000;
  letter-spacing: 0.00938em;
`;

const RatingBox = styled.div`
  margin-top: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const skills = ['Python', 'C#', 'Java'];
