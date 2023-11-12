import React, {Component} from "react";
import authService from '../components/api-authorization/AuthorizeService';
import {ApplicationPaths} from '../components/api-authorization/ApiAuthorizationConstants';
import styled from 'styled-components';


import backgroundimage from '../img/background.png';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import DesignMockup from '../components/mockup';


class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      // userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated } = this.state;
    const loginPath = `${ApplicationPaths.Login}`;
    // const profilePath = `${ApplicationPaths.Profile}`;
    const searchProjectPath = `${ApplicationPaths.SearchProject}`;
    
    return (
        <Wrapper>
        <BackgroundContainer>
          <img src={backgroundimage} alt="background" />
          <SloganContainer>
          <Slogan>Work Closely with Industry<br></br>Solve Real-World Problems</Slogan>
          </SloganContainer>
          <StartButton>
            {isAuthenticated ? <Button variant="contained" size="large" href={searchProjectPath}>Get Started</Button> : <Button variant="contained" size="large" href={loginPath}>Get Started</Button>}
          </StartButton>
        </BackgroundContainer>
        

        <TitleContainer>
          <h2>Projects Suite You</h2>
        </TitleContainer>

        <ProjectContainer>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </ProjectContainer>
        

        <SearchContainer>
          <Button variant="contained" href={searchProjectPath}>Find a project</Button>
        </SearchContainer>

        <DesignMockup />
        

        <Footer />
      </Wrapper>
    )
  }
}

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  magin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
`;

const SloganContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  text-align: left;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
`;

const Slogan = styled.h1`
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  color: #FFFFFF;
  justify-content: center;
  overflow: hidden;
  color: #2F4F4F;
`;

const StartButton = styled.div`
  position: absolute;
  left: 100px;
  top: 200px;
`;

const TitleContainer = styled.div`
  margin: 20px auto;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
`;

const ProjectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
`;