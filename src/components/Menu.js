import React, { useState } from 'react';
import styled from 'styled-components';
import MenuButton from '../svgs/MenuButton';

const Nav = styled.nav`
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MenuArrowSVG = styled.svg`
    position: absolute;
    top: -16px;
    left: 15px;
    fill: #fff;
    background: #fff;
    z-index: 1;
`;

const List = styled.section`
    margin: 0;
    padding: 0;
    position: absolute;
    top: 4.2em;
    left: .4em;
    right: .4em;
    color: #000;    
    background: #fff;
    border: solid 1px #ddd;    
    border-radius: 8px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, .2);    
`;

const ListItems = styled.ul`
    list-style: none;

    &.li {
        
    }
`;

const Title = styled.h2`
    color: #000;
    font-family: Futura;    
`;

const CartButton = styled.section`
    margin: .9em .9em 0 auto;    
`;

function Menu() {
    let [menuVisible, setMenuState] = useState(false);

    const menuDisplay = () => {        
        if(menuVisible) {
            return (
                <List>
                    <MenuArrowSVG version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20">
                        <path fill="#ddd" d="M0 15c0 0.128 0.049 0.256 0.146 0.354 0.195 0.195 0.512 0.195 0.707 0l8.646-8.646 8.646 8.646c0.195 0.195 0.512 0.195 0.707 0s0.195-0.512 0-0.707l-9-9c-0.195-0.195-0.512-0.195-0.707 0l-9 9c-0.098 0.098-0.146 0.226-0.146 0.354z"></path>
                    </MenuArrowSVG>                    
                    <ListItems>
                        <li>Home</li>
                        <li>Appointments</li>
                        <li>Logout</li>
                    </ListItems>
                </List>
            )
        }    
    }
    
    const setMenuDisplay = () => {
        setMenuState(!menuVisible);
    }

    return (              
        <Nav>
            <MenuButton setMenuDisplay={setMenuDisplay} />
            {menuDisplay()}
            <Title>Hair Care App</Title>
            <CartButton>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 16 16">
                    <path fill="#000000" d="M6 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
                    <path fill="#000000" d="M16 14.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z"></path>
                    <path fill="#000000" d="M16 8v-6h-12c0-0.552-0.448-1-1-1h-3v1h2l0.751 6.438c-0.458 0.367-0.751 0.93-0.751 1.562 0 1.105 0.895 2 2 2h12v-1h-12c-0.552 0-1-0.448-1-1 0-0.003 0-0.007 0-0.010l13-1.99z"></path>
                </svg>                
            </CartButton>                      
        </Nav>        
    )
}

export default Menu;