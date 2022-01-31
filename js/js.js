window.addEventListener('DOMContentLoaded',function(){
    
    var canvas = document.getElementById("canvas");
    var contex = canvas.getContext("2d");

    //Условие начала игры

  
    document.getElementById('btn').onclick = draw;





    




    //Если ширина экрана меньше 1024px, то после начала игры появляются кнопки упраления
    
    document.getElementById('btnright').style.display='none';
        document.getElementById('btnleft').style.display='none';
        document.getElementById('btntop').style.display='none';
        document.getElementById('btnbottom').style.display='none';

        if(window.innerWidth <= 1024)
    {
        document.getElementById('btnright').onclick = moveLeft;
        document.getElementById('btnleft').onclick = moveRight;
        document.getElementById('btntop').onclick = moveDown;
        document.getElementById('btnbottom').onclick = moveUp;
    }
    else {
        document.getElementById('btnright').style.display='none';
        document.getElementById('btnleft').style.display='none';
        document.getElementById('btntop').style.display='none';
        document.getElementById('btnbottom').style.display='none';
    }



    //Подключение и присваивание переменным изображений

    var car = new Image();
    var bg = new Image();
    var carRed = new Image();
    var pipeLeft = new Image();
    var pipeRight = new Image();
    var tree = new Image();

    car.src = "img/carBlue.png";
    bg.src = "img/bg.png";
    carRed.src = "img/carRed.png";
    pipeLeft.src = "img/pipe.png";
    pipeRight.src = "img/pipe.png";
    tree.src = "img/tree.png";

    
    //Нажатие клавиш

    function moveUp() {
        yPos -=7;
    }
    function moveLeft() {
        xPos -= 15;
    }
    function moveRight() {
        xPos += 15;
    }
    function moveDown() {
        yPos+=7;
    }  



/* 
var player = {x:200, y:200, el:document.getElementById('player')};
player.el.style.left = '' + Math.round(player.x) + 'px';
player.el.style.top  = '' + Math.round(player.y) + 'px';

var delta = {x:0, y:0};

document.addEventListener('keydown', function(e){
  if(     e.key == 'ArrowRight') delta.x = 1;
  else if(e.key == 'ArrowLeft')  delta.x = -1;
  else if(e.key == 'ArrowUp')    delta.y = -1;
  else if(e.key == 'ArrowDown')  delta.y = 1;
});

document.addEventListener('keyup', function(e){
  if(     e.key == 'ArrowRight') delta.x = 0;
  else if(e.key == 'ArrowLeft')  delta.x = 0;
  else if(e.key == 'ArrowUp')    delta.y = 0;
  else if(e.key == 'ArrowDown')  delta.y = 0;
});

var ts = null;
function step(timestamp) {
  if(!ts) ts = timestamp;
  var passed = timestamp - ts;
  //if(passed < 200) return window.requestAnimationFrame(step);
  ts = timestamp;
  if(delta.x || delta.y) {
    player.x += delta.x * passed / 10;
    player.y += delta.y * passed / 10;
    player.el.style.left = '' + Math.round(player.x) + 'px';
    player.el.style.top  = '' + Math.round(player.y) + 'px';
  };
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
    
 */


    
    

    document.onkeydown = function(e) {
        var event = window.event ? window.event : e;
    
        if (e.keyCode == '37') {
            moveRight();
        }
        else if (e.keyCode == '39') {
            moveLeft();
        }
        else if (e.keyCode == '38') {
            moveDown();
        }
        else if (e.keyCode == '40') {
            moveUp();
        }
    }


// Создание движущихся объектов

var pipe = [];
var bgrn = [];
var treeLeft = [];
var treeRight = [];


pipe[0] = {
    x : 600,
    y : canvas.height
} 

bgrn[0] = {
    x : 0,
    y : 60
}

treeLeft[0] = {
    x : 600,
    y : canvas.height
}

treeRight[0] = {
    x : -400,
    y : canvas.height
} 

//Диапазон появления объектов по оси X
    minCar = Math.ceil(500);
    maxCar = Math.floor(1000);

    minTreeLeft = Math.ceil(1000);
    maxTreeLeft = Math.floor(600);

    minTreeRight = Math.ceil(-600);
    maxTreeRight = Math.floor(-300);

    //Позиция машинки

    var xPos = 750;
    var yPos = 100;
    
    //Функция появления объектов
        function draw() {

            document.getElementById('btnright').style.display='block';
            document.getElementById('btnleft').style.display='block';
            document.getElementById('btntop').style.display='block';
            document.getElementById('btnbottom').style.display='block';

            
            //После начала игры скрывается кнопка начала игры
            document.getElementById('btn').style.display='none'
        
        //Движение фона
        for(var i = 0; i < bgrn.length; i++) {
            contex.drawImage(bg, 0, bgrn[i].y, 1600, 2500);
            bgrn[i].y--;
            bgrn[i].y--;
            bgrn[i].y--;
            bgrn[i].y--;
            if(bgrn[i].y == 0) {
                bgrn.push({
                    x : 0,
                    y : canvas.height
                })    
            };
        };

        //Появление и движение деревьев слева от дороги
        for(var i = 0; i < treeLeft.length; i++) {
            contex.drawImage(tree, treeLeft[i].x, treeLeft[i].y, 800, 800);
            treeLeft[i].y--;
            treeLeft[i].y--;
            treeLeft[i].y--;
            treeLeft[i].y--;
            if(treeLeft[i].y == 200) {
                treeLeft.push({
                    x : Math.floor(Math.floor(Math.random() * (maxTreeLeft - minTreeLeft)) + minTreeLeft),
                    y : canvas.height
                })    
            };
        };

        //Появление и движение деревьев справа от дороги
        for(var i = 0; i < treeRight.length; i++) {
            contex.drawImage(tree, treeRight[i].x, treeRight[i].y, 800, 800);
            treeRight[i].y--;
            treeRight[i].y--;
            treeRight[i].y--;
            treeRight[i].y--;
            if(treeRight[i].y == 0) {
                treeRight.push({
                    x : Math.floor(Math.floor(Math.random() * (maxTreeRight - minTreeRight)) + minTreeRight),
                    y : canvas.height
                })    
            };
        };

        //Появление обочины у дороги слева
        contex.drawImage(pipeLeft, -600, 0);
        //Появление обочины у дороги справа
        contex.drawImage(pipeRight, 20, 0);
        //Начальная позиция первой красной машинки
        contex.drawImage(car, xPos, yPos, 100, 200);

        //Появление и движение красных машинок
        for(var i = 0; i < pipe.length; i++) {
            contex.drawImage(carRed, pipe[i].x, pipe[i].y, 100, 200);
            pipe[i].y--;
            pipe[i].y--;
            pipe[i].y--;
            pipe[i].y--;
            pipe[i].y--;
            pipe[i].y--;
            if(pipe[i].y == 150) {
                pipe.push({
                    x : Math.floor(Math.floor(Math.random() * (maxCar - minCar)) + minCar),
                    y : canvas.height
                })
        };

            //Ограничение области движения синей машинки
            if(xPos >= 1050) {
                moveLeft();
            }
            if(xPos <= 440) {
                moveRight();
            }
            if(yPos <= 0) {
                moveDown();
            }
            if(yPos >= 580) {
                moveUp();
            }
            
            //Условие столкновения машинок
            if((yPos + car.height) < (pipe[i].y) || (yPos > (pipe[i].y + carRed.height)) 
            || ((xPos + car.width) < pipe[i].x) || (xPos > (pipe[i].x + carRed.width)))
            {
        
            } else {
                alert("Вы проиграли!");
                location.reload();
                return;
            }; 

        }; 
        
        
        requestAnimationFrame(draw);
        };
        
            
});  
    
    