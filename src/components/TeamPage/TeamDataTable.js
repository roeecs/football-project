import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  font-weight: bold;
`;

const TableWrapper = styled.div`
  margin: 0 auto;
  width: 50%;
`;

function TeamDataTable(props) {
  return (
    <div className="team-data-table">
      <Title>{props.data.name}</Title>
      <TableWrapper>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Logo</td>
              <td>
                <img src={props.data.logo} alt={props.data.name} />
              </td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{props.data.country}</td>
            </tr>
            <tr>
              <td>Founded</td>
              <td>{props.data.founded}</td>
            </tr>
            <tr>
              <td>Stadium</td>
              <td>
                {props.data.venue_name}, {props.data.venue_city}
              </td>
            </tr>
            <tr>
              <td>Stadium Capacity</td>
              <td>{props.data.venue_capacity}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={"http://www.".concat(
                    props.data.name
                      .replace(/\s/g, "")
                      .toLowerCase()
                      .concat(".com")
                  )}
                >
                  {props.data.name
                    .replace(/\s/g, "")
                    .toLowerCase()
                    .concat(".com")}
                </a>
              </td>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
}

export default TeamDataTable;
