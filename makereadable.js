/*
 * So what's the goal of this project? I want to take a text file, read it, and process it. When the robot reads on iphone, if there isn't this convention: punctuation, space, capitalized letter, the robot does not treat it as the end of the sentence, and thus there is no pause.
 * Since one of my former writing style conventions was to never capitalize, these are uncomfortably read. Since we can manipulate strings easily, how could we create a new file with these conventions?
 * First thing we would do is try to understand how the data would come in. It would likely be a big mush of data, and there is likely to be more than just periods as punctuation. There is likely to be exclamation points, ellipsis (knowing myself -- most certainly), question marks. That probably covers it. Also we are likely dealing with a LOT of text, and some random stars due to how org mode would be formatted.
 * Do we treat this as one long string?
 * How about we take it as one long string, break it on a regexp that would be our specified punctuation, a space, and a letter,... Well actually that doesn't make sense, since we need to retain that letter. How about a punctuation and a space? And then the next thing would just be, capitalize char 1 of each broken thing.
 * OK. Easy. Let's start developing the code.
 * */

// This is not going to be fancy right now. I'm going to have it read one file, process it as a text string, and append the cleaned file to the end of the text. and it's going to be called the same thing.
const fs = require('fs'); //this adds the file system module.
const exampleString = "* so what's the goal of this project? i want to take a text file, read it, and process it. when the robot reads on iphone, if there isn't this convention: punctuation, space, capitalized letter, the robot does not treat it as the end of the sentence, and thus there is no pause. since one of my writing conventions was to never capitalize, i was a tortured goth. goth, i say! i frankly never capitalized, and never will. take that. ok?"

//This uses the file system module to use a function called readFile, which will take the filename, the format(optional), and the function we want to do. in this case we should just be logging the data out. let's just see what comes out.
//
//
//let fileGuts = "";
let fileGuts;
fileGuts = fs.readFileSync('/home/kristen/Documents/readndestroy.txt','utf8');
/* this was the callback function from the asynchronous (or, just runs when the file is loaded) readFile.
, (err, data) => {
    console.log('the function ran');
    if(err){
        return console.log(err);
    } else {
    fileGuts = data;
    }
});
*/

// trying out the regex. not totally sure how to represent ellipsis. more notes in the notes file.
const punctAndSpace = /([.?!] )/;
const cleanUp = (longAssString) => {
    return longAssString.split(punctAndSpace).map(sentence => {
        return sentence[0].toUpperCase() + sentence.slice(1);
    }).join("");
};

const cleanedFile = "\p HERE IS THE CLEANED UP FILE: \p" + cleanUp(fileGuts);
fs.appendFile('/home/kristen/Documents/readndestroy_cleaned.txt',cleanedFile, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("The cleaned file is called readndestroy_cleaned.txt");
    }
});


//console.log("natty old sentence: \p" + exampleString);
//console.log(cleanUp(exampleString));
// this code below was just a test -- regex and quoted chars act differently -- quoted chars are the same and disappear. regexes are added to the array
// console.log("Get. rid. of. these. spaces".split(punctAndSpace));
