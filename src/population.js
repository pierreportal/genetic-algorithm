console.log('population loaded')

class Population {

    constructor(target, mutationRate, n) {
        this.matingPool = [];
        this.generation = 0;
        this.convergence = false;
        this.target = target;
        this.mutationRate = mutationRate;
        this.popSize = n
        this.best = '';
        this.population = []
        for (let i = 0; i < n; i++) {
            this.population.push(new Genetic(target));
        }
    }
    getFitness = () => {
        for (let i = 0; i < this.popSize; i++) {
            this.population[i].calcFitness()
        }
    }
    selection = () => {
        this.matingPool = this.population.map(x => new Array(Math.floor(x.fitness)).fill(x)).reduce((acc, val) => acc.concat(val), []);
        if (!this.matingPool.length) this.matingPool = [...this.population]
    }
    generate = () => {
        for (let i = 0; i < this.popSize; i++) {
            let a = Math.floor(Math.random() * this.matingPool.length)
            let b = Math.floor(Math.random() * this.matingPool.length)
            let parentA = this.matingPool[a];
            let parentB = this.matingPool[b];
            let child = parentA.crossover(parentB)
            child.mutate(this.mutationRate)
            this.population[i] = child
        }
        this.generation++
        let avgFitness = this.population.map(x => x.fitness).reduce((acc, val) => acc + val) / this.popSize
        let bestFitScore = Math.max(...this.population.map(x => x.fitness))
        let best = this.population.filter(x => x.fitness === bestFitScore)
        if (best[0].genes.join("") === this.target) this.convergence = true
        // console.clear()
        // console.log(`Generation : ${this.generation}`)
        // console.log(`Best solution : ${best[0].genes.join("")}`)
        this.best = best[0].genes.join("")
        // console.log(`Convergence : ${this.convergence}`)
    }
}



