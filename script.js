// ========================================
// PAGE NAVIGATION
// ========================================

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

}

// ========================================
// MUSIC
// ========================================

const music = document.getElementById("music");

music.volume = 0.5;

// ========================================
// LOADING
// ========================================

const progress = document.getElementById("progress");

let width = 0;

const loading = setInterval(() => {

    width += 2;

    progress.style.width = width + "%";

    if (width >= 100) {

        clearInterval(loading);

        showScreen("welcome");

    }

}, 60);

// ========================================
// START
// ========================================

document.getElementById("startBtn").onclick = () => {

    showScreen("story");

    music.play().catch(() => {});

};

// ========================================
// STORY
// ========================================

const story = [

"I still remember the first time we started talking.",

"I never expected someone could make my days brighter just by simply being there.",

"Somehow... you became my favorite notification.",

"Every moment with you became something I'll always treasure.",

"And without even realizing it... you slowly became my favorite person."

];

let storyIndex = 0;

const storyText = document.getElementById("storyText");

storyText.innerHTML = story[0];

document.getElementById("storyNext").onclick = () => {

    storyIndex++;

    if(storyIndex < story.length){

        storyText.innerHTML = story[storyIndex];

    }else{

        showScreen("gallery");

    }

};

// ========================================
// FLOATING HEARTS
// ========================================

const heartContainer = document.getElementById("hearts-container");

function createBackgroundHeart(){

    const heart = document.createElement("div");

    heart.className = "bg-heart";

    const hearts = ["❤️","💖","💕","💗","💓","💞"];

    heart.innerHTML = hearts[Math.floor(Math.random()*hearts.length)];

    heart.style.left = Math.random()*100 + "vw";

    heart.style.fontSize = (15 + Math.random()*25) + "px";

    heart.style.animationDuration = (6 + Math.random()*6) + "s";

    heart.style.opacity = (0.15 + Math.random()*0.2);

    heartContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },12000);

}

setInterval(createBackgroundHeart,350);

// ========================================
// MEMORY GALLERY
// ========================================

const memoryButtons = document.querySelectorAll(".memoryBtn");
const memoryImage = document.getElementById("memoryImage");
const memoryText = document.getElementById("memoryText");

memoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        memoryImage.src = button.dataset.img;
        memoryImage.style.display = "block";

        memoryText.innerHTML = button.dataset.text;

    });

});

// Continue to Quick Question

document.getElementById("galleryNext").addEventListener("click", () => {

    showScreen("quiz");

});


// ========================================
// QUICK QUESTION
// ========================================

const quizYes = document.getElementById("quizYes");
const quizNo = document.getElementById("quizNo");

quizYes.addEventListener("click", () => {

    showScreen("countdown");

    startCountdown();

});

quizNo.addEventListener("click", () => {

    showScreen("countdown");

    startCountdown();

});


// ========================================
// COUNTDOWN
// ========================================

function startCountdown(){

    let count = 3;

    const timer = document.getElementById("timer");

    timer.innerHTML = count;

    const interval = setInterval(() => {

        count--;

        timer.innerHTML = count;

        if(count <= 0){

            clearInterval(interval);

            showScreen("question");

            startTypewriter();

        }

    },1000);

}

// ========================================
// TYPEWRITER
// ========================================

const loveText = "Baby... Do you love me? ❤️";

function startTypewriter(){

    const text = document.getElementById("typewriter");

    text.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        text.innerHTML += loveText.charAt(i);

        i++;

        if(i >= loveText.length){

            clearInterval(typing);

        }

    },80);

}


// ========================================
// BIG QUESTION
// ========================================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesScale = 1;
let noScale = 1;

noBtn.addEventListener("click", () => {

    yesScale += 0.15;

    yesBtn.style.transform = `scale(${yesScale})`;

    noScale -= 0.15;

    if(noScale > 0.2){

        noBtn.style.transform = `scale(${noScale})`;

    }else{

        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";

    }

});

yesBtn.addEventListener("click", () => {

    heartExplosion();

    if(typeof confetti === "function"){

        confetti({

            particleCount:180,
            spread:120,
            origin:{y:.6}

        });

    }

    setTimeout(() => {

        showScreen("celebration");

    },2200);

});


// ========================================
// HEART EXPLOSION
// ========================================

function heartExplosion(){

    const big = document.createElement("div");

    big.className = "explode-heart";

    big.innerHTML = "❤️";

    document.body.appendChild(big);

    const emojis = ["❤️","💖","💕","💗","💓","💞"];

    for(let i=0;i<60;i++){

        const heart = document.createElement("div");

        heart.className = "explosion-heart";

        heart.innerHTML =
            emojis[Math.floor(Math.random()*emojis.length)];

        heart.style.setProperty(
            "--x",
            `${Math.random()*700-350}px`
        );

        heart.style.setProperty(
            "--y",
            `${Math.random()*700-350}px`
        );

        heart.style.fontSize =
            (18+Math.random()*25)+"px";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },2500);

    }

    setTimeout(()=>{

        big.remove();

    },1200);

}


// ========================================
// CELEBRATION
// ========================================

document.getElementById("celebrateNext").addEventListener("click",()=>{

    showScreen("date");

});


// ========================================
// DATE
// ========================================

document.getElementById("dateNext").addEventListener("click",()=>{

    showScreen("ending");

});


// ========================================
// REPLAY
// ========================================

document.getElementById("replay").addEventListener("click",()=>{

    location.reload();

});