import * as React from "react";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const myStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  color: "white",
  transform: "translate(-50%, -50%)",
};
const top = {
  position: "fixed",
  top: "0%",
  left: "0%",
  margin: "5px",
};

class Error extends React.Component {
  constructor() {
    super();
    this.backPage = this.backPage.bind(this);
  }
  backPage() {
    window.location.reload();
  }
  getRandom(max) {
    let min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getPhrase() {
    let phrases = [
      "It seems that the droid that was doing the calculations was hit by a blaster.",
      "The calculating droid is undergoing an update to its processing unit.",
    ];

    let pos = this.getRandom(phrases.length - 1);
    console.log("Pos:" + pos);
    return phrases[pos];
  }
  render() {
    return (
      <React.Fragment>
        <div style={top}>
          <Fab
            variant="extended"
            size="small"
            color="black"
            aria-label="back"
            onClick={this.backPage}
          >
            <ArrowBackIcon />
            BACK
          </Fab>
        </div>
        <div style={myStyle}>
          <h1>Ops :(</h1>
          {this.getPhrase()}
          <h5>Don't worry, it's the Jedi 's fault!</h5>
        </div>
      </React.Fragment>
    );
  }
}
export default Error;
