import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const citySelectOptions = [
    { value: 'new york', label: 'New York' },
    { value: 'atlanta', label: 'Atlanta' },
    { value: 'la', label: 'Los Angeles' }
];

const specialtySelectOptions = [
    { value: 'locs', label: 'locs' },
    { value: 'weave', label: 'weave' },
    { value: 'crochet', label: 'crochet' }
];

const Input = styled.input`
    height: 2em;
    margin: .4em;
    font-size: 28px;
    padding-left: 1.8em;
    border: solid 1px #ddd;
    outline: 0;
    background: #fff;
    border-radius: 16px;
    color: #888;
    display: block;
`;

const customStyles = {
    input: styles => ({ ...styles, borderRadius: 16 })
};

const Region = () => (
    <Select options={citySelectOptions}
            isMulti={true}
            styles={customStyles} />
);

const Specialty = () => (
    <Select options={specialtySelectOptions}
            isMulti={true}
            styles={customStyles} />
); 

function StylistsProfile() {
    return (
        <div>
            <form action="/create">
                <h5>Register as a Snatched Stylist in 3 easy steps:</h5>
                <span>Step 1: Enter your personal information</span>
                <Input type="text" placeholder="first name" />
                <Input type="text" placeholder="last name" />                
                <Input type="text" placeholder="your home zip code" />
                <span>Step 2: What cities would you like to set appointments in?</span>
                <Region />
                <span>Step 3: What hair styles do you specialize in?</span>
                <Specialty />
                <button>Create my Stylist Profile</button>                
            </form>
        </div>

        )
}

export default StylistsProfile;