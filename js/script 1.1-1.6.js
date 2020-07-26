/*
Loop for task 1.3
function printArrayDetails(list) {
    for (var i = 0; i < list.length; i++) {
        document.write('<p>' + list[i].name + '</p>' + ' Height: ' + list[i].height)
        if (list[i].height > 5) {
            document.write(' - Wow, that\'s big!')
        }
    }
    // execute the function using ‘pokemonList‘ as its input
printArrayDetails(pokemonList);
}*/

/*
forEach function for Task 1.4
pokemonList.forEach(function (pokemon) {
    // console.log(pokemon.name + "<p>" + pokemon.types + "<p>" + pokemon.height);
    var size;

    if (pokemon.height < 3) {
        size = "it's a small pokemon!";
    }
    else if (pokemon.height >= 3 && pokemon.height < 5) {
        size = "it's a medium pokemon!";
    }
    else {
        size = "it's a large pokemon!";
    };

    var result;

    pokemon.types.forEach(function (typesItem) {

        if (typesItem == "bug") { result = '<span style="color:green;"> '; }
        else if (typesItem == "fairy") { result = '<span style="color:red;"> '; }
        else if (typesItem == "flying") { result = '<span style="color:yellow;"> '; }
        else if (typesItem == "poison") { result = '<span style="color:rgb(106, 42, 106);"> '; }
        else if (typesItem == "psychic") { result = '<span style="color:orange;"> '; }
    });
    document.write(result + "name: " + pokemon.name + " (height: " + pokemon.height + " ft)" + " " + size + "<br>" + "types: " + pokemon.types + "<br>");
}
)
*/
//IIFE Function
var pokemonRepository = (function () {
  var pokemonList = [
    {
      name: "Chatot",
      height: 2,
      types: ["flying", " normal"],
    },
    {
      name: "Aromatisse",
      height: 3,
      types: ["fairy"],
    },
    {
      name: "Scolipede",
      height: 8,
      types: ["bug", " poison"],
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
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
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", height: 1, types: ["electric"] });
// pokemonRepository.add({ height: 4, types: ['flying'] });
console.log(pokemonRepository.getAll());

//IIFE forEach function

pokemonRepository.getAll().forEach(function (pokemon) {
  var size;
  if (pokemon.height < 3) {
    size = "it's a small pokemon!";
  } else if (pokemon.height >= 3 && pokemon.height < 5) {
    size = "it's a medium pokemon!";
  } else {
    size = "it's a large pokemon!";
  }

  var result;
  pokemon.types.forEach(function (typesItem) {
    if (typesItem == "bug") {
      result = '<span style="color:green;"> ';
    } else if (typesItem == "fairy") {
      result = '<span style="color:red;"> ';
    } else if (typesItem == "flying") {
      result = '<span style="color:yellow;"> ';
    } else if (typesItem == "poison") {
      result = '<span style="color:rgb(106, 42, 106);"> ';
    } else if (typesItem == "electric") {
      result = '<span style="color:orange;"> ';
    }
  });

  // document.write(
  //   result +
  //     "name: " +
  //     pokemon.name +
  //     " (height: " +
  //     pokemon.height +
  //     " ft)" +
  //     " " +
  //     size +
  //     "<br>" +
  //     "types: " +
  //     pokemon.types +
  //     "<br>"
  // );

  pokemonRepository.addListItem(pokemon);
});
