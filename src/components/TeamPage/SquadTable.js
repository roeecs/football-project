import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const TableWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
`;

function SquadTable(props) {
  return (
    <div className="teams-page">
      <TableWrapper>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Age</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {props.data !== undefined
              ? props.data.map((object, i) => (
                  <tr key={i}>
                    <td>{object.player_name}</td>
                    <td>{object.position}</td>
                    <td>{object.age}</td>
                    <td>{object.nationality}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
}

export default SquadTable;
