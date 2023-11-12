import React from 'react';
import styled from 'styled-components';

const Tabs = styled.div`
    width: 100%;
`;

const Area = styled.div`
    width: 1200px;
    max-width: 86%;
    margin: 0 auto;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    width: 100%;
`;

const BoxColors = [
    '#A8D5E2', '#8171D1', '#D1C081', '#E2958C', '#A7D897', '#8C97E2'
];

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: ${props => BoxColors[props.index]};
`;

const Image = styled.img`
    width: 70%;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
`;

const LoomHQ = () => {
    const boxes = ['Shoutouts', 'Regular readouts', 'Training videos', 'New hire intros', 'Informal brainstorming', 'Executive updates'];

    return (
        <Tabs>
            <Area>
                <Title>Ways to leverage Loom HQ</Title>
                <Container>
                    {boxes.map((box, index) => (
                        <Box key={index} index={index}>
                            <Image 
                                src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg" 
                                alt={`${box} Image`} 
                            />
                            <span>{box}</span>
                        </Box>
                    ))}
                </Container>
            </Area>
        </Tabs>
    );
}

export default LoomHQ;