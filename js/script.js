//API Pull Function
var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    // if (
    //   typeof pokemon === "object" &&
    //   "name" in pokemon &&
    //   "height" in pokemon &&
    //   "types" in pokemon
    // ) {
    pokemonList.push(pokemon);
    // }
  }

  function loadList() {
    return (
      fetch(apiUrl)
        .then(function (response) {
          // JSON is used to exchange data with external servers
          return response.json();
        })
        // if the promise is resolved, .then is run
        .then(function (json) {
          json.results.forEach(function (item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        // if the promise is rejected, .catch is run
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  function addListItem(pokemon) {
    // var pokemonList = document.querySelector(".pokemon-list");
    var container = document.querySelector(".container");
    // var divContainer = document.createElement("div");
    // divContainer.classList.add("container");
    // var divTitle = document.createElement("div");
    // divTitle.classList.add("title");
    // var header = document.createElement("h1");
    var unorderedList = document.createElement("ul");
    unorderedList.classList.add("pokemon-list");
    var listItem = document.createElement("li");
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    // header.innerText = "Pokédex";
    button.classList.add("button-style");
    // container.appendChild(divTitle);
    // divTitle.appendChild(header);
    unorderedList.appendChild(listItem);
    listItem.appendChild(button);
    container.appendChild(unorderedList);
    // pokemonList.appendChild(listItem);
    // document.body.appendChild(unorderedList);
    document.body.appendChild(container);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  // this function loads details for each of the 150 pokemon
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types - details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // logs pokemon details in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.loadList().then(function () {
  //Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

  //IIFE forEach function

  // pokemonRepository.getAll().forEach(function (pokemon) {
  //   var size;
  //   if (pokemon.height < 3) {
  //     size = "it's a small pokemon!";
  //   } else if (pokemon.height >= 3 && pokemon.height < 5) {
  //     size = "it's a medium pokemon!";
  //   } else {
  //     size = "it's a large pokemon!";
  //   }

  //   var result;
  //   pokemon.types.forEach(function (typesItem) {
  //     if (typesItem == "bug") {
  //       result = '<span style="color:green;"> ';
  //     } else if (typesItem == "fairy") {
  //       result = '<span style="color:red;"> ';
  //     } else if (typesItem == "flying") {
  //       result = '<span style="color:yellow;"> ';
  //     } else if (typesItem == "poison") {
  //       result = '<span style="color:rgb(106, 42, 106);"> ';
  //     } else if (typesItem == "electric") {
  //       result = '<span style="color:orange;"> ';
  //     }
  //   });
});
