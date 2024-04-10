

// import styled from 'styled-components'
import styled, { keyframes } from 'styled-components';

export const PricingMainContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding:20px;
`;

export const PricingCard = styled.div`
  border-radius: 10px;
  text-align:center;
  margin-left: 10px;
  margin-bottom: 10px;
  min-width: 200px;
  max-height: 120px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); 
    border-color:blue;
    border-style:solid;
    border-width;0.5px
  }
`;
export const StarIcon = styled.span`
color: #ffc107; 
`;


export const ServiceName=styled.p`
font-size:10px;
color:blue;
font-weight:800
`