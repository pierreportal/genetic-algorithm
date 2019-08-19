
function setup() {
    //createCanvas(WIDTH, HEIGHT)
}
let population = new Population(target, mutationRate, populationSize)
let res = document.getElementById('result')
let generation = document.getElementById('generation-count')


let loop = true

const generate = e => {
    e.preventDefault()
    target = document.getElementById('target').value;
    mutationRate = Number(document.getElementById('mutation-rate').value);
    populationSize = parseInt(document.getElementById('population-size').value);
    population = new Population(target, mutationRate, populationSize)
    loop = true
}

function draw() {
    clear();
    if (loop) {
        population.selection();
        population.generate();
        population.getFitness();
        res.innerHTML = population.best
        generation.innerHTML = population.generation
        if (population.convergence) {
            loop = false;
            // noLoop();
        };
    }
}





