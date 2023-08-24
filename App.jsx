import React from "react";
import Card from "./Card";
import styled from "styled-components";
import ClimberPic from "./transparentzuck.png";

const StyledDiv = styled.div`
  margin: 0 auto;

  display: flex;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;

  @media (min-width: 640px) {
    border: 1px solid black;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 375px;
    height: 700px;

    /* Add styles for bigger screens */
    /* alignItems: "center" */
  }
`;
const MainScore = () => {
  // add code to fetch score
  return (
    <div>
      <h1 style={{ fontFamily: "Gotham" }}>88</h1>
    </div>
  );
};

const Flag = () => {
  // add code to fetch flag
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
      alt="French Flag"
      style={{ maxWidth: "100%" }}
    />
  );
};

const PersonName = () => {
  // add code to fetch name
  return (
    <div>
      <h2 style={{ fontFamily: "Gotham" }}>Zuck</h2>
    </div>
  );
};

const StatItem = ({ value, label }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        fontFamily: "inder",
        justifyContent: "space-between",
        fontSize: "1.3rem",
        // capitalize
      }}
    >
      <div style={{ fontWeight: 800 }}>{value}</div>
      <div>{label}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <div
      className="bg-yellow"
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fex: 1 }}>
        <StatItem value="840" label="Ascents" />
        <StatItem value="1.4" label="s/f" />
        <StatItem value="v9" label="best" />
      </div>

      <div style={{ flex: 1, paddingLeft: "1rem" }}>
        <StatItem value="132" label="weight" />
        <StatItem value='5"7' label="height" />
        <StatItem value="+5" label="ape" />
      </div>
    </div>
  );
};

const PersonPicture = () => {
  // add code to fetch picture
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ marginLeft: "auto", maxWidth: "70%" }}>
        <img src={ClimberPic} alt="Person" width={"100%"} />
      </div>
    </div>
  );
};

function App() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <StyledDiv>
        <Card>
          <div style={{ display: "flex" }}>
            <div>
              <MainScore />
              <div style={{ width: "48px" }}>
                <Flag />
              </div>
            </div>
            <PersonPicture />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PersonName />
          </div>
          <Stats />
        </Card>
      </StyledDiv>
    </div>
  );
}

export default App;
