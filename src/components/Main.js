import starShipControl from "../logic/StarshipsControl";
import Calculator from "../logic/Calculator";
import * as React from "react";
import Loading from "./Loading";
import ListShips from "./ListShips";
import Error from "./Error";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./css/Main.css"

const options = {
  autoClose: 6000,
  type: toast.TYPE.DARK,
  position: toast.POSITION.BOTTOM_LEFT,
  hideProgressBar: true,
};

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
      error: false,
      loading: true,
      loadingScreen: "none",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  Calculate = async () => {
    if (isNaN(this.state.value)) {
      toast.error(
        "Enter a distance in MegaLights (numbers only)",
        options
      );
    } else {
      this.setState({
        loadingScreen: "block",
      });
      await this.LoadStartShips();
      await sleep(3000);
    }
  };
  LoadStartShips = async () => {
    let starShipsAll = await starShipControl();
    if (starShipsAll == "error") {
      this.setState({
        error: true,
      });
    } else {
      let starShips = Calculator(this.state.value, starShipsAll);
      this.setState({
        starShips: starShips,
        loading: false,
        loadingScreen: "block",
      });
    }
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    console.log(this.state.loading);
    if (this.state.error) {
      return (
        <React.Fragment>
          <Error />
        </React.Fragment>
      );
    } else if (this.state.loading) {
      if (this.state.loadingScreen == "none") {
        return (
          <React.Fragment>
            <div class="ui action input" style={myStyle}>
              <input
                type="text"
                class="inputMglt"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Distance in MGLT (ex: 1000000)"
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
            <ToastContainer />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
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
