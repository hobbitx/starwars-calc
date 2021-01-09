import starShipControl from "../logic/StarshipsControl";
import Calculator from "../logic/Calculator";
import * as React from "react";
import Loading from "./Loading";
import ListShips from "./ListShips";

const myStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      starShips: [],
      value: null,
      loading: true,
      loadingScreen: "none",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log("will");
  }

  componentDidMount() {}

  Calculate = async () => {
    this.setState({
      loadingScreen: "block",
    });

    await this.LoadStartShips();
    await sleep(3000);
  };
  LoadStartShips = async () => {
    let starShipsAll = await starShipControl();
    let starShips = Calculator(this.state.value, starShipsAll);
    this.setState({
      starShips: starShips,
      loading: false,
      loadingScreen: "block",
    });
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    console.log(this.state.loading);
    if (this.state.loading) {
      if (this.state.loadingScreen == "none") {
        return (
          <React.Fragment>
            <div class="ui action input" style={myStyle}>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Input a distance in MGLT:"
              />
              <div
                class="ui button"
                onClick={() => {
                  this.Calculate();
                }}
              >
                Go
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {" "}
            <div
              style={{
                display: this.state.loadingScreen,
              }}
            >
              <Loading />
            </div>
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment>
          <ListShips
            distance={this.state.value}
            starShips={this.state.starShips}
          />
        </React.Fragment>
      );
    }
  }
}

export default Main;
