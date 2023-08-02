let gridSize = 20;
let Grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
let scl;

let CGrid;
let CWall;
let CM1;

let bob_img;
let target_img;

let BOB;

class Target{
    constructor(x,y){
        this.x = x
        this.y = y

        Grid[x][y] = this
    }

    move(x,y){
        if(Grid[x][y] != 0){
            return console.error("Invalid move");
        }
    }

    render(){
        image(
            target_img,
            this.x*scl,
            this.y*scl,
            scl,
            scl
        );
    }
}

class Character{ //character
    constructor(x,y,target_x,target_y){
        this.x = x
        this.y = y
        this.target_x = target_x
        this.target_y = target_y
        this.visited = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        this.Path = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        Grid[x][y] = this
        this.render()
    }

    move(x,y){
        if(Grid[x][y] == 0){
            this.clear()
            //fills in current squ
            Grid[this.x][this.y] = 0
            fill(CGrid)
            square(this.x*scl,this.y*scl,scl)
            this.x = x;
            this.y = y;
            //Spawns in new square
            Grid[this.x][this.y] = this
            this.render()
        }
    }

    render(){
        image(
            bob_img,
            this.x*scl,
            this.y*scl,
            scl,
            scl
        );
    }

    clear(){
        for(i = 0; i < gridSize;i++){
            for(j = 0; j < gridSize;j++){
                if(!(Grid[i][j] instanceof Character) && BOB.Path[i][j] == 1){
                    if(Grid[i][j] == 0){
                        fill(CGrid)
                    }else if(Grid[i][j] == 1){
                        fill(CWall)
                    }
                    
                    square(i*scl,j*scl,scl)
                }
            }        
        }
        this.visited = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
        this.Path = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    }

    solve_bfs(){
        var Queue = [[this.x,this.y]] //start off with current position
        while(Queue.length > 0){
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
        if(this.visited[Current[0]][Current[1]] != 0){
            while(true){
                if(Current[0] === this.x && Current[1] === this.y){
                    break
                }
                this.Path[Current[0]][Current[1]] = 1
                Current = this.visited[Current[0]][Current[1]]
            }
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
    bob_img = loadImage("bob.png");
    target_img = loadImage("target.png");
}

function setup() {//sets up canvas size and other desired content
    CGrid = color("#9e998a");
    CWall = color("#404040");
    CM1 = color("#639470");
    createCanvas(800, 800);
    scl = 800/gridSize;
    generateGrid();
    BOB = new Character(2,4,17,18)
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
char = 2
mode = -1 //no mode set

function draw(){//draw loop
    BOB.render()

    var gridX = Math.floor(mouseX/scl)
    var gridY = Math.floor(mouseY/scl)
    if(mouseIsPressed == true && (0 <= gridX) &&(gridX < 20) &&(0 <= gridY) && (gridY < 20)){
        if(mode == -1){
            mode = Grid[gridX][gridY]
            if(Grid[gridX][gridY] instanceof Character){
                mode=char
            }
        }
        if(Grid[gridX][gridY] == 0 || Grid[gridX][gridY] == 1){
            if(mode == Wall){
                Grid[gridX][gridY] = 1
                fill(CWall)
            }else if (mode == Path){
                Grid[gridX][gridY] = 0
                fill(CGrid)
            }   
            square(gridX*scl,gridY*scl,scl)
        }
        if(mode==char){
            BOB.move(gridX,gridY);
            BOB.solve_bfs();
        }
        
    }else{
        mode = -1
    }

    for(i = 0; i < gridSize;i++){
        for(j = 0; j < gridSize;j++){
            if(!(Grid[i][j] instanceof Character) && BOB.Path[i][j] == 1){
                fill(CM1)
                if(Grid[i][j] == 1){
                    fill(CWall)
                }
                square(i*scl,j*scl,scl)
            }
        }        
    }
    
}

