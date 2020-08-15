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
    var unorderedList = $(".pokemon-list");
    var listItem = $("<li></li>");
    var button = $(
      '<button type="button" class="btn btn-danger col-4" data toggle="modal" data-target="#pokeButtons">' + pokemon.name + "</button>" + "<div class='col-4'></div>"
    );
    unorderedList.append(listItem);
    listItem.append(button);

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
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
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

  function showModal(specimen) {
    var modalBody = $(".modal-body");
    var modalTitle = $(".modal-title");
    modalBody.empty();
    modalTitle.empty();

    var nameElement = $("<h1>" + specimen.name + "</h1>");
    var imageElement = $('<img>').attr('src', pokemon.imageUrl);
    var heightElement = $("<p>" + "height: " + specimen.height + "</h1>");
    var weightElement = $(
      "<p>" + "weight: " + specimen.weight + " lbs" + "</p>"
    );
    var typesElement = $("<p>" + "types: " + specimen.types + "</p>");
    var abilitiesElement = $(
      "<p>" + "abilities: " + specimen.abilities + "</p>"
      // var closeButtonElement = $(
      //     '<button class ="modal-close">' + "close" + "</button>"
      //   );
      //   closeButtonElement.on("click", hideModal);
    );

    //add modal content to page
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    //make the modal content visible
    modalContainer.addClass("is-visible");
  }

  function hideModal() {
    modalContainer.removeClass("is-visible");
    $("modal-container").html("");
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

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});
