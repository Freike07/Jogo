let log = new Log(document.querySelector('.log'))
let char = new guerreiro('Alexandre');
let monster = new goblins();

const stage = new Stage (
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)

stage.start();
