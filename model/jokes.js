var jokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
];

var randomJoke = function()
{
    var nr = Math.floor((Math.random() * jokes.length));
    return jokes[nr];
};

var postJoke = function(jokeInput)
{
    if(typeof jokeInput === 'string')
    {
        jokes.push(jokeInput);
    }
}


console.log(randomJoke());

module.exports =
{
    allJokes: jokes,
    getRandomJoke : randomJoke(),
    addJoke : function(jokeInput)
    {
        if(typeof jokeInput === 'string')
        {
            jokes.push(jokeInput);
        }
    }
};


