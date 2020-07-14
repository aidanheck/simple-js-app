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

var pokemonList = [
    {
        name: 'Chatot',
        height: 2,
        types: ['flying', 'normal']
    },
    {
        name: 'Aromatisse',
        height: 3,
        types: ['fairy']
    },
    {
        name: 'Scolipede',
        height: 8,
        types: ['bug', 'poison']
    },
];

pokemonList.forEach(function (pokemon) {
    console.log(pokemon.name + "<p>" + pokemon.types + "<p>" + pokemon.height)
}
)