//Guerreiro ou arqueiro

class character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class guerreiro extends character {
    constructor (name) {
        super(name)
        this.life = 100;
        this.attack = 10
        this.defense = 8
        this.maxLife = this.life; 
    }
}
class arqueiro extends character {
    constructor (name) {
        super(name)
        this.life = 100;
        this.attack = 12;
        this.defense = 4;
        this.maxLife = this.life; 
    }
}
class goblins extends character {
    constructor () {
        super('Goblin');
        this.life = 100;
        this.attack = 10;
        this.defense = 4;
        this.maxLife = this.life; 
    }
}
class kingGoblin extends character {
    constructor () {
        super('king Goblin');
        this.life = 150;
        this.attack = 10;
        this.defense = 5;
        this.maxLife = this.life; 
    }
}


//__________________________________________Senario __________________________________________________

class Stage{
    constructor (fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.logObject = logObject
    }
    //start
    start() {
        this.update();

        this.fighter1El.querySelector('.botaoAttack').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.botaoAttack').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
    }

    //update da tela
    update () {
        //fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)}`; 
        let pctF1 = (this.fighter1.life / this.fighter1.maxLife) *100;
        this.fighter1El.querySelector('.bar').style.width = `${pctF1}%`;

        //fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)}`;
        let pctF2 = (this.fighter2.life / this.fighter2.maxLife) *100;
        this.fighter2El.querySelector('.bar').style.width = `${pctF2}%`; 
    }

    
    doAttack(attacking,attacked) {
        if (attacked.life <= 0) {
            this.logObject.addMessage ('ja virou presunto!')
            return
        } else if (attacking.life <= 0) {
            this.logObject.addMessage('Você é um presunto!')
            return
        }
        //comando de ataques
        let randAttack = (Math.random() *2).toFixed(2);
        let newAttack = attacking.attack * randAttack
        let defenseRand = (Math.random() *2).toFixed(2);
        let newdefense = attacked.defense *defenseRand
        
        if (newAttack > newdefense) {
            attacked.life = attacked.life - newAttack
            this.logObject.addMessage(`${attacking.name} atacou ${attacked.name} e causou ${newAttack.toFixed(1)}`); 
        } else {
            this.logObject.addMessage (`${attacked.name} conseguio se defender`);
        }
        this.update()
    }

}

class Log {
    list = [];

    constructor (listEl){
        this.listEl=listEl;
    }
    
    addMessage(msg){
        this.list.push(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML= '';
        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
            
        }
    }
}