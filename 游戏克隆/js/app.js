//常量申明
var ENEMYnumber= 6,ENEMYx=-30,ENNEMYy=70,ROW=101,COL=83;var count=0;
// 这是我们的玩家要躲避的敌人
var Enemy = function(y,speed) {
    this.x=ENEMYx*Math.floor(Math.random()*10*speed);
    this.y=y;
    this.speed=Math.ceil(Math.random()*10*speed+120);
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    if(this.x<=550){
        this.x += dt*this.speed; // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    }else{                     // 都是以同样的速度运行的
        this.x=0;
    }
//console.log(this.x ,  this.y);
};






// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
var Player=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/char-boy.png';
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update=function(dt){
    if(this.y === -13){
    count++;
    if(count==66){
        this.x = ROW*2;
        this.y = COL*4+ENNEMYy;
    }
        console.log(count);
    }
    if(this.x == ROW*2&&this.y == COL*4+ENNEMYy){
        count=0;
    }
    //console.log(this.x,this.y)
};
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput=function(movement){
        switch (movement){
            case'left':
                if(this.x>0){
                    this.x -=ROW ;
                }break;

            case'right':
                if(this.x<ROW*4){
                    this.x +=ROW ;
                }break;

            case'up':
                if(this.y>0){
                    if(this.y==-95){
                        this.y=320;
                    }else{
                        this.y -=COL;
                    }
                }break;

            case'down':
                if(this.y<355){
                    this.y +=COL;
                }break;

        }

};
//此为游戏的碰撞检测
Player.prototype.checkCollisions= function(){
    for( var i=0;i<allEnemies.length;i++){
        if(this.y==allEnemies[i].y){
            if(Math.abs(this.x-allEnemies[i].x)<40){

                this.x = ROW*2;
                this.y = COL*4+ENNEMYy;
            }
        }
    }

};

// 现在实例化你的所有对象
var allEnemies=[];
for(var i=0;i<ENEMYnumber;i++){
   var a= new Enemy(COL* Math.floor(Math.random()*4)+ ENNEMYy, i);
    allEnemies.push(a);
}
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var player=new Player(ROW*2, COL*4+ENNEMYy);// 把玩家对象放进一个叫 player 的变量里面

//83 * 3+55







// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



