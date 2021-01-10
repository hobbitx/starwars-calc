import * as React from "react";

const myStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  color: "white",
  transform: "translate(-50%, -50%)",
};

class Error extends React.Component {
  constructor() {
    super();
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
   
    let pos = this.getRandom(phrases.length-1);
    console.log("Pos:" + pos);
    return phrases[pos];
  }
  render() {
    return (
      <React.Fragment>
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
