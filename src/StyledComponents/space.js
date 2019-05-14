import styled from 'styled-components';

export default styled.div`
    background-color: ${props => props.cleared ? '#cccdce' : '#7e7f82'};
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-size: 1em;
    color: ${props => props.cleared ? 'black' : 'transparent'};
    &:hover {
        cursor: ${props => !props.cleared ? 'pointer' : 'auto'};        
    }
    border: 1px solid black;
`