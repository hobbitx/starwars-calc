export default async function starShipControl() {
    let myRequest = new Request('https://swapi.dev/api/starships/');
    let starShips = [];
    let next = "";
    let response = await fetch(myRequest)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Ops! Houve um erro em nosso servidor.');
            }
        })
        .then(response => {
            response.results.forEach(element => {
                starShips.push(element)
            });
            next = response.next;
        }).catch(error => {
            console.error(error);
        });
        let page = 2;
    while (next != null) {
        myRequest = new Request("https://swapi.dev/api/starships/?page="+page);
        response = await fetch(myRequest)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Ops! Houve um erro em nosso servidor.');
                }
            })
            .then(response => {
                response.results.forEach(element => {
                    starShips.push(element)
                });
                next = response.next;
            }).catch(error => {
                console.error(error);
            });
            page = page +1;
    }
    let names = starShips.map((element)=>{
        return element.name;
    })
    console.log(names)
    return starShips;
}