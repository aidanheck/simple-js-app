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
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function (pokemonType) {
          item.types.push(pokemonType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function (pokemonAbilities) {
          item.abilities.push(pokemonAbilities.ability.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
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

  // logs pokemon details in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }
  var modalContainer = document.querySelector("#modal-container");
  function showModal(pokemon) {
    // clear all existing modal content
    modalContainer.innerHTML = "";

    var modal = document.createElement("div");
    modal.classList.add("modal");

    // add the new modal content!
    var closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "close";
    closeButtonElement.addEventListener("click", hideModal);

    //pokemon name element
    var nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;
    //pokemon image element
    var imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.setAttribute("src", pokemon.imageUrl);
    //pokemon height element
    var heightElement = document.createElement("p");
    heightElement.innerText = "height: " + pokemon.height;
    //pokemon weight element
    var weightElement = document.createElement("p");
    weightElement.innerText = "weight: " + pokemon.weight + " lbs";
    //pokemon types element
    var typesElement = document.createElement("p");
    typesElement.innerText = "types: " + pokemon.types;
    //pokemon abilities element
    var abilitiesElement = document.createElement("p");
    abilitiesElement.innerText = "abilities: " + pokemon.abilities;

    //add modal content to page
    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typesElement);
    modal.appendChild(abilitiesElement);
    modalContainer.appendChild(modal);

    //make the modal content visible
    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    // since this is also triggered when clicking inside the modal container, we only want to close if the suer clicks directly on the overlay
    var target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

// console.log(pokemonRepository.getAll());
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
