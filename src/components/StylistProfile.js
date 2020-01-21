import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProfileInfo = styled.div`
  display: flex;
  flex-flow: row;
`;
const ProfileImage = styled.div`
  flex: 1;
`;
const ProfileList = styled.ul`
  flex: 2;
  color: #000;
`;

const StylistProfile = props => {
  const LOCAL_API_ENDPOINT = `http://localhost:3001/api/stylist/${props.profileId}`;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(LOCAL_API_ENDPOINT)
      .then(response => {
        return response.json();
      })
      .then(result => {
        let transformedData = [
          {
            label: "First Name",
            value: result.firstName
          },
          {
            label: "Last Name",
            value: result.lastName
          },
          {
            label: "Zip",
            value: result.zip
          },
          {
            label: "Region",
            value: result.region
          },
          {
            label: "Available Areas",
            value: result.specialty
          }
        ];
        setData(transformedData);
        console.log(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ProfileListItems = data.map(({ label, value }) => {
    if (Array.isArray(value)) {
      return (
        <li key={label}>
          <span>{label}: </span>
          {value.map((item, index, array) => {
            return `${item.value}${
              array.length > 0 && index < array.length - 1 ? ", " : ""
            }`;
          })}
        </li>
      );
    }

    return (
      <li key={label}>
        <span>{label}: </span>
        {value}
      </li>
    );
  });

  return (
    <ProfileInfo>
      <ProfileImage>
        <img src="/images/avatar@2x.png" alt="avatar" />
      </ProfileImage>
      <ProfileList>{ProfileListItems}</ProfileList>

      {/* <pre>
                    {console.log(this.state)}
                    <code>{JSON.stringify(this.state, null, 4)}</code>
                </pre> */}
    </ProfileInfo>
  );
};

export default StylistProfile;
