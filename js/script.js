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
for (var i = 0; i < pokemonList.length; i++) {
    document.write('<h6>' + pokemonList[i].name + '</h6>' + ' Height: ' + pokemonList[i].height)
    if (pokemonList[i].height > 5) {
        document.write(' - Wow, that\'s big!')
    }
}