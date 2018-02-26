var cellHeight = 20;
var cellWidth = 20;
var prevCells = [];
var cells = [];
var rows;
var cols;
var unpopNum = 2; //Less than this will cause underpopulation
var ovpopNum = 3; //More than this will cause overpopulation
var repoNum = 3; //Equal to this will cause reproduction
var paused = false;
var refreshRate = 1000/1; //FPms
var refersh;

function setup(){
  createCanvas(500,500);
  refersh = setInterval(interation,refreshRate);
  initCells();
}

function initCells(){
  cols = width/cellWidth;
  rows = height/cellHeight;
  for(var x=0;x<cols;x++){
    var row = []
    for(var y=0;y<rows;y++){
      row.push(0);
    }
    cells.push(row);
  }
}

function draw(){
  for(var x=0;x<cols;x++){
    for(var y=0;y<rows;y++){
      stroke(0);
      fill(255);
      if(cells[x][y] == 1){
        fill(0);
      }
      rect(x*cellWidth,y*cellHeight,cellWidth,cellHeight);
    }
  }
  noFill();
  stroke(0);
  rect(0,0,cellWidth*cols-1,cellHeight*rows-1);
}

function pausePlay(){
  paused = !paused;
  if(paused){
    document.getElementById("playPauseBtn").value = "Play";
    clearInterval(refersh);
  } else {
    document.getElementById("playPauseBtn").value = "Pause";
    refersh = setInterval(interation,refreshRate);
  }
}

function mouseDragged(){
  var x = Math.floor(mouseX/cellWidth);
  var y = Math.floor(mouseY/cellHeight);
  if(cells[x] !== undefined && cells[x][y] !== undefined){
    cells[x][y] = 1;
  }
}

function mousePressed(){
  var x = Math.floor(mouseX/cellWidth);
  var y = Math.floor(mouseY/cellHeight);
  if(cells[x] !== undefined && cells[x][y] !== undefined){
    cells[x][y] = 1;
  }
}

function updateSpeed(){
  refreshRate = document.getElementById("speedSlider").value;
  document.getElementById("speedSliderOutput").value = refreshRate;
  refreshRate = 1000/refreshRate;
  if(!paused){
    clearInterval(refersh);
    refersh = setInterval(interation,refreshRate);
  }
}

function clearCells(){
  cells = [];
  cols = width/cellWidth;
  rows = height/cellHeight;
  for(var x=0;x<cols;x++){
    var row = []
    for(var y=0;y<rows;y++){
      row.push(0);
    }
    cells.push(row);
  }
}

function checkNeighbours(x,y){
  var nCount = 0;
  var left = (x-1<0)?0:x-1;
  var right = (x+1>=cols)?cols-1:x+1;
  var up = (y-1<0)?0:y-1;
  var down = (y+1>=rows)?rows-1:y+1;
  console.log(up+":"+down+":"+left+":"+right)
  //North West
  if(cells[left][up] == 1){
    nCount++;
  }
  //North
  if(cells[x][up] == 1){
    nCount++;
  }
  //North east
  if(cells[right][up] == 1){
    nCount++;
  }
  //West
  if(cells[left][y] == 1){
    nCount++;
  }
  //East
  if(cells[right][y] == 1){
    nCount++;
  }
  //South west
  if(cells[left][down] == 1){
    nCount++;
  }
  //South
  if(cells[x][down] == 1){
    nCount++;
  }
  //South east
  if(cells[right][down] == 1){
    nCount++;
  }
  return nCount;
}

function interation(){
  var nextCells = [];
  for(var x=0;x<cols;x++){
    var row = [];
    for(var y=0;y<rows;y++){
      var neighbours = checkNeighbours(x,y);
      var state = cells[x][y];
      if (state == 1) {
        if(neighbours<unpopNum){
          state = 0;
        } else if(neighbours>ovpopNum){
          state = 0;
        }
      } else {
        if(neighbours == repoNum){
          state = 1;
        }
      }
      row.push(state);
    }
    nextCells.push(row);
  }
  cells = nextCells;
}
