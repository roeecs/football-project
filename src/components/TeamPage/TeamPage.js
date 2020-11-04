import React, { useEffect, useState, useContext } from "react";
import TeamDataTable from "./TeamDataTable";
import SquadTable from "./SquadTable";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiContext } from "../App";


function TeamPage(props) {
  const [teamData, setTeamData] = useState();
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [squadData, setSquadData] = useState();
  const [squadIsLoaded, setSquadIsLoaded] = useState(false);
  const ApiParams = useContext(ApiContext);

  useEffect(() => {
    // triggered on first mount, retrives and sets team's data
    const fetchUrl = "https://rapidapi.p.rapidapi.com/v2/teams/team/".concat(
      props.teamId.toString()
    );
    fetch(fetchUrl, ApiParams)
      .then((response) => response.json())
      .then((response) => {
        setTeamData(response.api.teams[0]);
        setDataIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // triggered on first mount, retrives and sets team's squad
    const fetchUrl = "https://rapidapi.p.rapidapi.com/v2/players/squad/".concat(
      props.teamId.toString().concat("/2019")
    );
    fetch(fetchUrl, ApiParams)
      .then((response) => response.json())
      .then((response) => {
        setSquadData(response.api.players);
        setSquadIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Link to={"/teams"}>
        <Button variant="primary">Back</Button>
      </Link>
      {dataIsLoaded ? <TeamDataTable data={teamData} /> : null}
      {squadIsLoaded ? <SquadTable data={squadData} /> : null}
      <Link to={"/teams"}>
        <Button variant="primary">Back</Button>
      </Link>
    </div>
  );
}

export default TeamPage;
