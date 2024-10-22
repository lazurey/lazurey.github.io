const EGG_SIZE = 50;
const CHICKEN_SIZE = 200;

let score = 0;

const random = (max) => {
    return Math.floor(Math.random() * max);
}

const genNextPos = (width, height) => {
    return {
        left: random(width) + "px",
        top: random(height) + "px",
    }
}

const createEasterEgg = () => {
    const r = random(9);
    const idx = (r > 8 || r < 1) ? 1 : r;
    return `easter-egg-${idx}.png`;
}

const randomEgg = () => {
    return random(9527) % 2 === 0 ? "egg.png" : createEasterEgg();
}

const appendEgg = (canvas, left, top) => {
    const img = document.createElement("img");
    img.src = "./assets/" + randomEgg();
    img.className = "egg";
    img.style.left = left;
    img.style.top = top;
    canvas.appendChild(img);
}

const updateScore = (el) => {
    score++;
    el.innerHTML = score;
}

const initGame = () => {
    const w = window.screen.availWidth - CHICKEN_SIZE;
    const h = window.screen.availHeight - CHICKEN_SIZE - 100;
    const canvas = document.getElementById("canvas");
    const chicken = document.getElementById("chicken");
    const scoreEl = document.getElementById("score");

    const initPos = genNextPos(w, h);
    chicken.style.left = initPos.left;
    chicken.style.top = initPos.top;

    chicken.addEventListener("click", () => {
        appendEgg(canvas, chicken.style.left, chicken.style.top);
        const { left, top } = genNextPos(w, h);
        chicken.style.left = left;
        chicken.style.top = top;
        updateScore(scoreEl);
    })
}


document.addEventListener("DOMContentLoaded", () => {
    initGame();
});
