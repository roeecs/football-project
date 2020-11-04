import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Table from "react-bootstrap/Table";

// smaller version of full img
const ClubLogo = styled.img`
  height: 40px;
  width: 40px;
`;

const clickableTr = styled.tr`
  cursor: pointer;
`;

function LeagueTable(props) {
  const history = useHistory();

  function handleClick(teamId) {
    history.push("/teams/".concat(teamId));
  }

  return (
    <div className="teams-table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>2019 Ranking</th>
            <th>Team</th>
            <th>Logo</th>
          </tr>
        </thead>
        <tbody>
          {props.teams !== undefined
            ? props.teams.map((object, i) => (
                <tr
                  key={i}
                  onClick={() => handleClick(object.team_id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>#{object.rank}</td>
                  <td>{object.teamName}</td>
                  <td>
                    <ClubLogo src={object.logo} alt={object.teamName} />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
}

export default LeagueTable;
