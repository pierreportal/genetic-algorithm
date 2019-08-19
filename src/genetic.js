console.log('genetic loaded')

const Gene = () => {
    let rand = 31 + (Math.floor(Math.random() * 95))
    return String.fromCharCode(rand)
}

class Genetic {
    constructor(target) {
        this.target = target
        this.genes = new Array(target.length).fill(String.fromCharCode(32 + (Math.floor(Math.random() * 95))));
        this.fitness = 0;
        this.calcFitness();
    }
    calcFitness = () => {
        let score = this.target.split("").filter((x, i) => x === this.genes[i]).length
        this.fitness = ((score / this.target.length) * 100)
    }
    crossover = partner => {
        let child = new Genetic(this.target);
        let crossOverPoint = Math.floor(Math.random() * this.genes.length)
        for (let i = 0; i < this.genes.length; i++) {
            if (i > crossOverPoint) child.genes[i] = this.genes[i]
            else child.genes[i] = partner.genes[i];
        };
        return child
    }
    mutate = rate => {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() < rate) this.genes[i] = Gene()
        }
    }
}