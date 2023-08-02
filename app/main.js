let gridSize = 20;
let Grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
let scl;

let CGrid;
let CWall;

let bob;
let sprite;

class Bob{ //character
    constructor(x,y,target_x,target_y){
        this.x = x
        this.y = y
        this.target_x = target_x
        this.target_y = target_y
        this.visited = []
        this.path = []
    }

    render(){
        image(
            bob,
            this.x*scl,
            this.y*scl,
            scl,
            scl
        );
    }

    solve_bfs(){
        
    }
}

function preload() { //load images etc
    bob = loadImage("bob.png");
}

function setup() {//sets up canvas size and other desired content
    CGrid = color("#9e998a")
    CWall = color("#404040")
    createCanvas(800, 800);
    scl = 800/gridSize;
    generateGrid();
}

function generateGrid(){
    stroke("#FFFFFF")
    for(i = 0; i < gridSize;i++){
        for(j = 0; j < gridSize;j++){
            fill(CGrid)
            square(i*scl,j*scl,scl)
        }        
    }
}

Wall = 0
Path = 1
mode = -1 //no mode set
function draw(){//draw loop
    var gridX = Math.floor(mouseX/scl)
    var gridY = Math.floor(mouseY/scl)
    if(mouseIsPressed == true && (gridX <= 20) && (gridY <= 20)){
        if(mode == -1){
            mode = Grid[gridX][gridY]
        }
        if(mode == Wall){
            Grid[gridX][gridY] = 1
            fill(CWall)
        }else if (mode == Path){
            Grid[gridX][gridY] = 0
            fill(CGrid)
        }       
        square(gridX*scl,gridY*scl,scl)
    }else{
        mode = -1
    }
}

