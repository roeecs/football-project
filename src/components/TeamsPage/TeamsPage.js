import React, { useState, useRef, useEffect, useContext} from "react";
import LeagueSelection from "./LeagueSelection";
import LeagueTable from "./LeagueTable";
import styled from "styled-components";
import { ApiContext } from "../App";

const LeagueTableDiv = styled.div`
  margin: auto;
`;

function TeamsPage(props) {
  const [countries, setCountries] = useState([]);
  const [gotCountries, setGotCountries] = useState(false);
  const [league, setLeague] = useState({});
  const [gotLeague, setGotLeague] = useState(false);
  const [teams, setTeams] = useState([]);
  const isInitialMount = useRef(true);
  const ApiParams = useContext(ApiContext);

  // triggered on first mount, retrives and sets all possible countries 
  useEffect(() => {
    fetch("https://rapidapi.p.rapidapi.com/v2/countries", ApiParams)
      .then((response) => response.json())
      .then((response) => {
        setCountries(response.api.countries);
        setGotCountries(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // triggered after leage choose, retrives and sets leage's teams 
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let fetchURL = "https://rapidapi.p.rapidapi.com/v2/leagueTable/".concat(
        league.league_id
      );
      fetch(fetchURL, ApiParams)
        .then((response) => response.json())
        .then((response) => {
          setTeams(response.api.standings[0]);
          setGotLeague(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [league]);

  function handleLeagueChoose(evt, league) {
    setLeague(league);
  }

  return (
    <div className="teams-page">
      {gotCountries ? (
        <LeagueSelection
          countriesList={countries}
          onLeagueChoose={handleLeagueChoose}
        />
      ) : null}
      <LeagueTableDiv>
        {gotLeague ? <LeagueTable teams={teams} /> : null}
      </LeagueTableDiv>
    </div>
  );
}

export default TeamsPage;
