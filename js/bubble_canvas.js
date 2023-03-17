const projects = document.getElementById('projects')

const canvas2 = document.getElementById('bubble_canvas');
const ctx2 = canvas2.getContext('2d');
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

});

const mouse2 = {
    x: undefined,
    y: undefined,
};

projects.addEventListener('mousemove', function(event){
    mouse2.x = event.x;
    mouse2.y = event.y;
    for(let i = 0; i < 3; i++){
        particlesArray.push(new Particle());
    }
});

projects.addEventListener('mouseout', () => {
    mouse2.x = undefined,
    mouse2.y = undefined
  })


class Particle{
    constructor(){
        this.x =  mouse2.x + Math.random() *  10;
        this.y =  mouse2.y + Math.random() *  10;
        this.size = Math.random() * 7 + 3;
        this.speedX = Math.random() * 9 - 2;
        this.speedY = Math.random() * 7 - 5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
        this.alpha = Math.random() * (0.8 - 0.1) + 0.1
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2){
            this.size -= 0.15;
        }

        if (canvas2.width - this.x < this.size || this.x < this.size) {
            this.speedX = -this.speedX
          }
        if (canvas2.height - this.y < this.size || this.y < this.size) {
            this.speedY = -this.speedY
        }
    }
    draw(){
        ctx2.fillStyle = this.color;
        ctx2.globalAlpha = this.alpha
        ctx2.strokeStyle = 'white'
        ctx2.lineWidth = 2
        ctx2.beginPath()
        ctx2.arc(this.x, this.y, this.size*3, 0, Math.PI*2);
        ctx2.stroke()
        ctx2.fill();
    }
}


function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
       
        for(let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                ctx2.beginPath();
                ctx2.strokeStyle = particlesArray[i].color;
                ctx2.lineWidth = 0.05;
                ctx2.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx2.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx2.stroke();
            }
        }
        


        if(particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
    
}


function anim(){
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    handleParticles();
    hue += 2.5;
    requestAnimationFrame(anim);
}

anim();

