var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    var pokeButtons = $(".pokemon-list");
    var button = $(
      '<button type="button" class="btn btn-danger col-12 button-class" data toggle="modal" data-target="#exampleModal">' + pokemon.name + "</button>" + "<div class='col-1'></div>"
    );
    var listItem = $("<li></li>");
    listItem.append(button);
    pokeButtons.append(listItem);
    button.on("click", function () {
      showDetails(pokemon);
    });
  }

  //Load the details from each pokemon into the modal when called

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }


  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // this function loads details for each of the 150 pokemon
  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return $.ajax(url)
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = [];
        details.types.forEach(function (pokemonType) {
          pokemon.types.push(" " + pokemonType.type.name);
        });
        pokemon.abilities = [];
        details.abilities.forEach(function (pokemonAbilities) {
          pokemon.abilities.push(" " + pokemonAbilities.ability.name);
        })
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //this pulls all pokemon data
  function getAll() {
    return pokemonList;
  }

  function showModal(pokemon) {
    var modalBody = $(".modal-body");
    var modalTitle = $(".modal-title");
    modalBody.empty();
    modalTitle.empty();
    var nameElement = $("<h1>" + pokemon.name + "</h1>");
    var imageElement = $('<img>').attr('src', pokemon.imageUrl);
    var heightElement = $("<p>" + "height: " + pokemon.height + "</h1>");
    var weightElement = $(
      "<p>" + "weight: " + pokemon.weight + " lbs" + "</p>"
    );
    var typesElement = $("<p>" + "types: " + pokemon.types + "</p>");
    var abilitiesElement = $(
      "<p>" + "abilities: " + pokemon.abilities + "</p>");
    //add modal content to page
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

