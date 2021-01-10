import Backup from "./StartShips_backup";

export default async function starShipControl(backup) {
  let myRequest = new Request("https://swapi.dev/api/starships/");
  let starShips = [];
  let next = "";
  await fetch(myRequest)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return "error";
      }
    })
    .then((response) => {
      if (starShips !== "error") {
        response.results.forEach((element) => {
          starShips.push(element);
        });
        next = response.next;
      }
    })
    .catch((error) => {
      console.error(error);
      starShips = "error";
      next = null;
    });
  let page = 2;
  while (next != null) {
    myRequest = new Request("https://swapi.dev/api/starships/?page=" + page);
    await fetch(myRequest)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return "error";
        }
      })
      .then((response) => {
        if (starShips !== "error") {
          response.results.forEach((element) => {
            starShips.push(element);
          });
          next = response.next;
        }
      })
      .catch((error) => {
        starShips = "error";
        console.error(error);
      });
    page = page + 1;
  }
  if (backup && starShips === "error") {
    starShips = Backup();
  }
  return starShips;
}
