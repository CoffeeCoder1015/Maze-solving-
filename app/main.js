let gridSize = 20;
let Grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
let scl;

let CGrid;
let CWall;
let CM1;

let bob;
let sprite;

let BOB;
class Bob{ //character
    constructor(x,y,target_x,target_y){
        this.x = x
        this.y = y
        this.target_x = target_x
        this.target_y = target_y
        this.visited = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        this.Path = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        Grid[x][y] = this
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
    clear(){
        for(i = 0; i < gridSize;i++){
            for(j = 0; j < gridSize;j++){
                if(!(Grid[i][j] instanceof Bob) && BOB.Path[i][j] == 1){
                    fill(CGrid)
                    square(i*scl,j*scl,scl)
                }
            }        
        }
        this.visited = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        this.Path = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    }
    solve_bfs(){
        var Queue = [[this.x,this.y]] //start off with current position
        while(queueMicrotask.length != 0){
            var current = Queue.shift()
            if(current[0] == this.target_x && current[1] == this.target_y){
                break;
            }
            var neighbors = this.getNeighbors(current)
            neighbors.forEach(pos => {
                var x = pos[0]
                var y = pos[1]
                if(this.visited[x][y] == 0){//not visited   
                    this.visited[x][y] = current
                    Queue.push(pos)
                }
            });
        }

        var Current = [this.target_x,this.target_y]
        console.log(Current[0] != this.x && Current[1] != this.y);
        while(true){
            if(Current[0] === this.x && Current[1] === this.y){
                break
            }
            console.log(Current,this.visited[Current[0]][Current[1]])
            this.Path[Current[0]][Current[1]] = 1
            Current = this.visited[Current[0]][Current[1]]
        }
    }

    getNeighbors(pos){
        var x = pos[0]
        var y = pos[1]
        var possible  = [
            [x+1,y],
            [x-1,y],
            [x,y+1],
            [x,y-1]
        ]
        var neighbors = []
        for(i = 0; i < 4;i++){
            var vec = possible[i];
            if(0 <= vec[0] && vec[0] < gridSize && 0 <= vec[1] && vec[1] < gridSize && Grid[vec[0]][vec[1]] == 0){
                neighbors.push(vec);
            }
        }
        return neighbors;
    }
}

function preload() { //load images etc
    bob = loadImage("bob.png");
}

function setup() {//sets up canvas size and other desired content
    CGrid = color("#9e998a");
    CWall = color("#404040");
    CM1 = color("#639470");
    createCanvas(800, 800);
    scl = 800/gridSize;
    generateGrid();
    BOB = new Bob(2,4,17,18)
    BOB.render()
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
    BOB.render()

    var gridX = Math.floor(mouseX/scl)
    var gridY = Math.floor(mouseY/scl)
    if(mouseIsPressed == true && (gridX <= 20) && (gridY <= 20)){
        if(mode == -1){
            mode = Grid[gridX][gridY]
        }
        if(Grid[gridX][gridY] == 0 || Grid[gridX][gridY] == 1){
            if(mode == Wall){
                Grid[gridX][gridY] = 1
                fill(CWall)
            }else if (mode == Path){
                Grid[gridX][gridY] = 0
                fill(CGrid)
            }   
        }
        square(gridX*scl,gridY*scl,scl)
    }else{
        mode = -1
    }

    for(i = 0; i < gridSize;i++){
        for(j = 0; j < gridSize;j++){
            if(!(Grid[i][j] instanceof Bob) && BOB.Path[i][j] == 1){
                fill(CM1)
                square(i*scl,j*scl,scl)
            }
        }        
    }
    
}

