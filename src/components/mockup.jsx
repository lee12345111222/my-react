/* eslint-disable */
import React from "react";
import styled from 'styled-components';

const SectionDiv = styled.div`
    width: 100%;
    font-family: Arial, sans-serif;
    background-color: #EDEFFE;
    margin: 0;
    padding: 20px;
`;

const Container = styled.div`
    max-width: 1200px;
    width: 86%;
    margin: 0 auto;
    background-color: #D1D1F7;
    padding: 30px;
    border-radius: 20px;
`;

const Header = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Section = styled.div`
    background-color: ${props => props.dark ? '#333' : '#fff'};
    color: ${props => props.dark ? '#fff' : '#777'};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    width: 30%;
`;

const Right = styled.div`
    width: 68%;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
`;

const DesignMockup = () => {
    return (
        <SectionDiv>
            <Container>
                <Header>Never miss a message</Header>
                <Section>
                    <Left>
                        <h2>Keep it in one place</h2>
                        <p>text，texttext，text,text，text,text，text,text，text</p >
                    </Left>
                    <Right>
                        <ImageWrapper>
                            <StyledImage src="https://static.runoob.com/images/demo/demo2.jpg" alt="Demo" />
                        </ImageWrapper>
                    </Right>
                </Section>
                <Section dark>
                    <Right>
                        <ImageWrapper>
                            <StyledImage src="https://static.runoob.com/images/demo/demo2.jpg" alt="Demo" />
                        </ImageWrapper>
                    </Right>
                    <Left>
                        <h2>Know what's important</h2>
                        <p>text，texttext，text,text，text,text，text,text，text</p >
                    </Left>
                </Section>
                <Section>
                    <Left>
                        <h2>Skip the follow-up</h2>
                        <p>text，texttext，text,text，text,text，text,text，text</p >
                    </Left>
                    <Right>
                        <ImageWrapper>
                            <StyledImage src="https://static.runoob.com/images/demo/demo2.jpg" alt="Demo" />
                        </ImageWrapper>
                    </Right>
                </Section>
                <Section dark>
                    <Right>
                        <ImageWrapper>
                            <StyledImage src="https://static.runoob.com/images/demo/demo2.jpg" alt="Demo" />
                        </ImageWrapper>
                    </Right>
                    <Left>
                        <h2>Video Activity Features</h2>
                        <p>text，texttext，text,text，text,text，text,text，text</p >
                    </Left>
                </Section>
            </Container>
        </SectionDiv>
    );
}

export default DesignMockup;

