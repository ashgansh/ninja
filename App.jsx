import React from "react";
import Card from "./Card";
import styled from "styled-components";
import ClimberPic from "./transparentzuck.png";

// import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

// eHlrfPu0vdfk9UNd

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
const MainScore = ({score}) => {
  // add code to fetch score
  return (
    <div>
      <h1 style={{ fontFamily: "Gotham" }}>{score}</h1>
    </div>
  );
};

const Flag = ({ country }) => {
  console.log(country);
  return (
    <img
      src={`https://flagsapi.com/${country}/flat/64.png`}
      width="64"
      alt={country}
    />
  );
};

const PersonName = ({ name }) => {
  // add code to fetch name
  return (
    <div>
      <h2 style={{ fontFamily: "Gotham" }}>{name}</h2>
    </div>
  );
};

const StatItem = ({ value, label }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        fontFamily: "inder",
        justifyContent: "space-between",
        fontSize: "1.3rem",
        // capitalize
      }}
    >
      <div>{label}</div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <div
      className="bg-yellow"
      style={{
        // display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "50%" }}>
        <StatItem value="840" label="Ascents" />
        <StatItem value="1.4" label="s/f" />
        <StatItem value="v9" label="best" />

        <StatItem value="132" label="weight" />
        <StatItem value='5"7' label="height" />
        <StatItem value="+5" label="ape" />
      </div>
    </div>
  );
};

const PersonPicture = ({ url }) => {
  // add code to fetch picture
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ marginLeft: "auto", maxWidth: "70%" }}>
        <img src={url} alt="Person" width={"100%"} />
      </div>
    </div>
  );
};

const supabase = createClient(
  "https://ncsiofjokpjsiiseqmij.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jc2lvZmpva3Bqc2lpc2VxbWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5MTkzODUsImV4cCI6MjAwODQ5NTM4NX0.o6IOuErtY0_LijNRzpyEBaTdjAHC_IgrPKDa5pmSHbs"
);
function App() {
  const [session, setSession] = useState(null);

  const personId = window.location.pathname.split("/")[1];
  console.log(personId);

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const { data } = await supabase
      .from("profiles")
      .select()
      .eq("id", personId)
      .limit(1)
      .single();
    setProfile(data);
  }
  const { name, picture_url, score } = profile;

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
              <PersonName name={name} />
              <MainScore score={score} />
              <div style={{ width: "48px" }}>
                <Flag country={profile.country} />
              </div>
            </div>
            <PersonPicture url={picture_url} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          {/* <Stats /> */}
        </Card>
      </StyledDiv>
    </div>
  );
}

export default App;
