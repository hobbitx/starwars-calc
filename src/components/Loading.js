import "./css/Loading.css";
import * as React from "react";
import Rocket from "./images/rocket.png";

class Loading extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img class="rocket launch" alt="Rocket" src={Rocket} />
      </React.Fragment>
    );
  }
}

export default Loading;
