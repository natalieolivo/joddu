import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const LOCAL_API_ENDPOINT = "http://localhost:3001/api/stylist";
const DEV_API_ENDPOINT = "https://joddu-api.herokuapp.com/api/stylist";

const citySelectOptions = [
    { value: 'new york', label: 'New York' },
    { value: 'atlanta', label: 'Atlanta' },
    { value: 'la', label: 'Los Angeles' }
];

const specialtySelectOptions = [
    { value: 'locs', label: 'Locs' },
    { value: 'weave', label: 'Weave' },
    { value: 'crochet', label: 'Crochet' }
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

let postData = {};

function StylistsProfile() {
    
    const [stylist, setStylist] = useState([]);
    
    const handleFormSubmit = event => {
        event.preventDefault();

        fetch(DEV_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(stylist)
        })
        .then(response => response.json())
        .then(json => console.log(json));
    };
    
    const setStylistPostData = (obj, attrs) => {
        console.log(obj);
        console.log(attrs);

        let value = obj.target ? obj.target.value : obj;
        let key = obj.target ? obj.target.name : attrs.name;

        postData[key] = value;     
        
        setStylist(prevState => {
            return {...prevState, ...postData};
        });
                
        console.log("state", stylist);
        console.log("post data", postData);
    };

    const Region = () => (
        <Select name="region"
                options={citySelectOptions}
                isMulti={true}
                styles={customStyles}
                value={stylist.region}
                onChange={ (value) => { setStylistPostData(value, { name: "region" }); } } />
    );
    
    const Specialty = () => (
        <Select name="specialty"
                options={specialtySelectOptions}
                isMulti={true}
                styles={customStyles}
                value={stylist.specialty}
                onChange={ (value) => setStylistPostData(value, { name: "specialty" }) } />
    ); 

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h5>Register as a Snatched Stylist in 3 easy steps:</h5>
                <span>Step 1: Enter your personal information</span>
                <Input type="text" name="firstName" placeholder="first name" onChange={ setStylistPostData } value={stylist.firstName || ''} />
                <Input type="text" name="lastName" placeholder="last name" onChange={ setStylistPostData } value={stylist.lastName || ''} />                
                <Input type="text" name="zip" placeholder="your home zip code" onChange={ setStylistPostData } value={stylist.zip || '' } />
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