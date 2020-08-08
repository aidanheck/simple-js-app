var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
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
          item.types.push(" " + pokemonType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function (pokemonAbilities) {
          item.abilities.push(" " + pokemonAbilities.ability.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function addListItem(pokemon) {
    var container = $(".container");
    var unorderedList = $('<ul class="pokemon-list"></ul>');
    var listItem = $("<li></li>");
    var button = $(
      '<button class="button-style">' + pokemon.name + "</button>"
    );
    unorderedList.append(listItem);
    listItem.append(button);
    container.append(unorderedList);

    button.on("click", function (event) {
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
  var modalContainer = $("#modal-container");
  function showModal(pokemon) {
    // clear all existing modal content
    modalContainer.innerHTML = "";

    var modal = $('<div class="modal"></div>');

    // add the new modal content!
    var closeButtonElement = $(
      '<button class ="modal-close">' + "close" + "</button>"
    );
    closeButtonElement.on("click", hideModal);

    //pokemon name element
    // var nameElement = document.createElement("h1");
    // nameElement.innerText = pokemon.name;
    var nameElement = $("<h1>" + pokemon.name + "</h1>");
    //pokemon image element
    // var imageElement = document.createElement("img");
    // imageElement.classList.add("modal-img");
    // imageElement.setAttribute("src", pokemon.imageUrl);
    var imageElement = $('<img class="modal-image"/>');
    $(imageElement).attr("src", pokemon.imageUrl);
    //pokemon height element
    // var heightElement = document.createElement("p");
    // heightElement.innerText = "height: " + pokemon.height;
    var heightElement = $("<p>" + "height: " + pokemon.height + "</h1>");
    //pokemon weight element
    // var weightElement = document.createElement("p");
    // weightElement.innerText = "weight: " + pokemon.weight + " lbs";
    var weightElement = $(
      "<p>" + "weight: " + pokemon.weight + " lbs" + "</p>"
    );
    //pokemon types element
    // var typesElement = document.createElement("p");
    // typesElement.innerText = "types: " + pokemon.types;
    var typesElement = $("<p>" + "types: " + pokemon.types + "</p>");
    //pokemon abilities element
    // var abilitiesElement = document.createElement("p");
    // abilitiesElement.innerText = "abilities: " + pokemon.abilities;
    var abilitiesElement = $(
      "<p>" + "abilities: " + pokemon.abilities + "</p>"
    );

    //add modal content to page
    modal.append(closeButtonElement);
    modal.append(nameElement);
    modal.append(imageElement);
    modal.append(heightElement);
    modal.append(weightElement);
    modal.append(typesElement);
    modal.append(abilitiesElement);
    modalContainer.append(modal);

    //make the modal content visible
    modalContainer.addClass("is-visible");
  }

  function hideModal() {
    modalContainer.removeClass("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.on("click", (e) => {
    // since this is also triggered when clicking inside the modal container, we only want to close if the user clicks directly on the overlay
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
});
