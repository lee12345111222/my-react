import React from "react";
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
        <FooterContainer>
          <h5>University</h5>
          <FooterLink><Text href="#">About Us</Text></FooterLink>
          <FooterLink><Text href="#">Career</Text></FooterLink>    
        </FooterContainer>

        <FooterContainer>
          <h5>Support</h5>
          <FooterLink><Text href="#">Contact Us</Text></FooterLink>
          <FooterLink><Text href="#">FAQ</Text></FooterLink>    
        </FooterContainer>

        <FooterContainer>
          <h5>For Students</h5>
          <FooterLink><Text href="#">All Projects</Text></FooterLink>
          <FooterLink><Text href="#">Search Projects</Text></FooterLink>    
        </FooterContainer>
    </Wrapper>
  )
}

export default Footer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  height: 150px;
  width: 100%;
  margin: 50px 0 0 0;
  padding: 0;
  border-top: 5px solid #E5E5E5;
`;
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 10px 50px 10px 50px;
  overflow: hidden;
`;

const FooterLink = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  text-decoration: none;
`;

const Text = styled.a`
  color: #000000;
  text-decoration: none;
  &:hover {
    color: #FF6B00;
  }
`;