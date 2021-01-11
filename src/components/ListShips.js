import * as React from "react";
import ListItem from "./ListItem";
import { List } from "semantic-ui-react";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./css/ListShips.css";

const top = {
  top: "0%",
  left: "0%",
  margin: "5px",
};

class ListShips extends React.Component {
  constructor() {
    super();

    this.backPage = this.backPage.bind(this);
  }

  backPage() {
    window.location.reload();
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
        <div class="Title">Starship List </div>
        <div class="subTitle">To travel {this.props.distance} MegaLights</div>
        <List animated verticalAlign="middle" size="massive">
          {this.props.starShips.map((starShip,index) => (
            <ListItem starShip={starShip} show={index}/>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export default ListShips;
