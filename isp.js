var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var correctAnswer = "NYMPH"
var correctArr = correctAnswer.split('')
var score = 0
var grid = []

var size = 75
var squareDim = 75
var padding = squareDim/5
var gridRow = 6
var gridColumn = 5
var cookieValueFindPlayed
var cookieValueFindWin
var cookieValueFindScore

if (document.cookie == null || document.cookie == ''){
    cookieValueFindPlayed = false
    cookieValueFindWin = false
    cookieValueFindScore = false
}
else {
cookieValueFindPlayed = document.cookie
    .split('; ')
    .find(row => row.startsWith('played='))
    .split('=')[1];
cookieValueFindWin = document.cookie
    .split('; ')
    .find(row => row.startsWith('win='))
    .split('=')[1];
cookieValueFindScore = document.cookie
    .split('; ')
    .find(row => row.startsWith('score='))
    .split('=')[1];
}
class Square {
    constructor(x,y,sqLetter){
        this.x = x
        this.y = y
        this.colour
        this.letter = sqLetter
    }

    drawSquare(){
        ctx.beginPath()
        ctx.rect(this.x,this.y,squareDim,squareDim)
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }

    setColour(lett){
        switch(lett){
            case "Y":
                this.colour = "#6aaa64"
                break;
            case "C":
                this.colour = "#c9b458"
                break;
            default:
                this.colour = "#787c7e"
                break;
        }
    }
    
    drawLetter(letter){
        ctx.font = `${size}px Arial`
        ctx.fillStyle = "#00FF00"
        ctx.fillText(letter, this.x+padding, this.y-padding)
    }
}

function initialiseSquares(){
    for (var c = 0; c<gridColumn; c++){
        grid[c] = []
        for (var r = 0; r<gridRow; r++){
            let gridX = (c*(squareDim+padding));
            let gridY = (r*(squareDim+padding))
            grid[c][r] = new Square(gridX, gridY)
            grid[c][r].drawSquare();
        }
    }
}

function getCookie() {
    if (cookieValueFindPlayed == "true"){
        switch (cookieValueFindWin){
        case "true":
            alert(`You already played today! The correct answer was ${correctAnswer}. You got this after ${cookieValueFindScore} guesses. `)
            hideButton()
            break;
        case "false":
            alert(`You already played today! The correct answer was ${correctAnswer}. You didn't get the word today.`)
            hideButton()
            break;
        }
    }
}

function guessCheck(){
    var input = document.getElementById("input").value.toUpperCase();
    inputarr = input.split('')
    for (i=0;i<correctAnswer.length;i++){
        foobar = grid[i][score]
        if (inputarr[i] == correctArr[i]){
            foobar.setColour("Y")
            foobar.drawLetter(inputarr[i])
            foobar.drawSquare();
        } else if (correctArr.includes(inputarr[i]) && inputarr[i] != correctArr[i]){
            foobar.setColour("C")
            foobar.drawLetter(inputarr[i])
            foobar.drawSquare();
        } else {
            foobar.setColour("N")
            foobar.drawLetter(inputarr[i])
            foobar.drawSquare();
        }
    }
    if (input == correctAnswer){
        hideButton()
        alert("Congrats!")
        document.cookie = "played=true; max-age=86400*1000; path=/;"
        document.cookie = "win=true; max-age=86400*1000; path=/;"
        document.cookie = `score=${score}; max-age=86400*1000; path=/;`
    }
}

function answer(){
    alert(correctAnswer)
}

function submit(){
    guessCheck()
    score++
    if (score == gridRow){
        hideButton()
        setTimeout(alert("Bad luck! The word was "+correctAnswer+". Try again tomorrow!"),500)
        document.cookie = "played=true; max-age=86400*1000; path=/;"
        document.cookie = "win=false; max-age=86400*1000; path=/;"
        document.cookie = `score=${score}; max-age=86400*1000; path=/;`
    }
}

function hideButton(){
    var element = document.getElementById("but");
    var child = document.getElementById("submitput");
    element.removeChild(child);
    console.log("Submit removed")
}

function cookieFoo(){
    alert(document.cookie)
}

document.onload = getCookie()
console.warn("Load successful - game ready.")
