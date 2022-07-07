import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import heroVideo from "./heroVideo.mp4";
import { Link } from "react-router-dom";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    paddingBottom: theme.spacing(4),
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ReactPlayer
        url={heroVideo}
        playing
        loop
        muted
        width="100%"
        height="100%"
      />
      <Div className={classes.overlay}>
        <div
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Typography
            variant="h3"
            component="h1"
            className={classes.title}
          ></Typography>
          <Link to="/homepage" style={{ textDecoration: "none" }}>
            <img src="/asset/logo/gasGuzzler2.PNG" />
          </Link>
        </div>
      </Div>
    </section>
  );
};

const Button = styled.button`
  border: none;
  border-radius: 5px;

  background: #92b5bf;
  color: #161b21;
  text-decoration: none;
  font-size: 1rem;
  height: 2.3rem;
  margin-right: 20px;
  margin-left: 20px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background-color: #ffffff;
    color: #00515c;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 45%;
`;

export default Hero;
