import React, { useEffect, useState, useRef, useContext } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ApiContext } from "../App";

// taken from react-bootstrap api - https://react-bootstrap.github.io/components/dropdowns/
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// taken from react-bootstrap api - https://react-bootstrap.github.io/components/dropdowns/
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const CountryDropDiv = styled.div`
  float: left;
  margin-left: 10%;
`;

const LeagueDropDiv = styled.div`
  float: right;
  margin-right: 10%;
`;

function LeagueSelection(props) {
  const [leagues, setLeagues] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [gotCountry, setGotCounrty] = useState(false);
  const isInitialMount = useRef(true);
  const ApiParams = useContext(ApiContext);

  // triggered after country select, retrives and sets all country's football leauges 
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      let fetchURL = "https://rapidapi.p.rapidapi.com/v2/leagues/type/league/".concat(
        selectedCountry.country,
        "/2019"
      );
      fetch(fetchURL, ApiParams)
        .then((response) => response.json())
        .then((response) => {
          setLeagues(response.api.leagues);
          setGotCounrty(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedCountry]);

  return (
    <div className="dropdown">
      <CountryDropDiv>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Pick a Country
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu}>
            {props.countriesList.map((object, i) => (
              <Dropdown.Item key={i} onClick={() => setSelectedCountry(object)}>
                {object.country}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </CountryDropDiv>
      <LeagueDropDiv>
        {gotCountry ? (
          <DropdownButton id="dropdown-basic-button" title="Pick a League">
            {leagues.map((object, i) => (
              <Dropdown.Item
                key={i}
                onClick={(evt) => props.onLeagueChoose(evt, object)}
              >
                {selectedCountry.country.concat(" - ".concat(object.name))}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        ) : (
          <Button disabled variant="primary">
            Pick a League
          </Button>
        )}
      </LeagueDropDiv>
    </div>
  );
}

export default LeagueSelection;
