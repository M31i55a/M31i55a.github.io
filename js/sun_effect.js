const home = document.getElementById('home')
const sun_canvas = document.getElementById('sun_canvas');
const sun_ctx = sun_canvas.getContext('2d')

sun_canvas.width = innerWidth;
sun_canvas.height = innerHeight;


//Global
distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  let sun_mouse = {
    x: undefined,
    y: undefined,
  }

  //window events
  home.addEventListener('mousemove', (event) => {
    sun_mouse.x = event.x
    sun_mouse.y = event.y
  })

  window.addEventListener('resize', () => {
    sun_canvas.width = window.innerWidth
    sun_canvas.height = window.innerHeight

    init2()
  })

  home.addEventListener('mouseout', () => {
    sun_mouse.x = undefined,
    sun_mouse.y = undefined
  })

  //class particle
  class Sun_Particles {
    constructor(x, y, r, color, vx, vy) {
      this.x = x
      this.y = y
      this.r = r
      this.min_r = r
      this.color = color
      this.pColor = color
      this.opacity = 0.5
      this.vx = vx
      this.vy = vy
    }

    draw() {
      sun_ctx.beginPath()
      sun_ctx.save()
      sun_ctx.fillStyle = this.color
      sun_ctx.globalAlpha = this.opacity
      sun_ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true)
      sun_ctx.fill()
      sun_ctx.restore()
      sun_ctx.closePath()
    }

    update() {
      //border collision
      if (sun_canvas.width - this.x < this.r || this.x < this.r) {
        this.vx = -this.vx
      }
      if (sun_canvas.height - this.y < this.r || this.y < this.r) {
        this.vy = -this.vy
      }

      //manage sun_mouse neighborhood
      if (distance(sun_mouse.x, sun_mouse.y, this.x, this.y) < 200) {

        this.r += 0.12
        this.color = 'white'
        this.opacity = 1

        if(sun_mouse.x < this.x && this.x < sun_canvas.width - this.r * 10){
            this.x += 7
        }
        if(sun_mouse.x > this.x && this.x > this.r * 10){
            this.x -= 7
        }
        if(sun_mouse.y < this.y && this.y < sun_canvas.height - this.r * 10){
            this.x += 7
        }
        if(sun_mouse.x > this.y && this.y > this.r * 10){
            this.x -= 7
        }

      } 
      else{
        this.r -= 0.15
        this.color = this.pColor
        this.opacity = 0.5
      }
      if(this.r < this.min_r){
        this.r = this.min_r
      }
      
    }
  }

  //main

  let sun_particles_array

  function init2() {
    sun_particles_array = []

    for (i = 0; i < 137; i++) {
      let r0 = Math.random() * (4.5 - 1) + 2
      let x = Math.random() * (sun_canvas.width - 2 * r0) + r0
      let y = Math.random() * (sun_canvas.height - 2 * r0) + r0
      let color = 'rgb(255, 180, 80)'
      let vx = Math.random() * 3.5
      let vy = Math.random() * 3.5

      if (i !== 0) {
        for (j = 0; j < sun_particles_array.length; j++) {
          if (
            distance(x, y, sun_particles_array[j].x, sun_particles_array[j].y) <
            r0 + sun_particles_array[j].r
          ) {
            x = Math.random() * (sun_canvas.width - 2 * r0) + r0
            y = Math.random() * (sun_canvas.height - 2 * r0) + r0
            j = -1
          }
        }
      }
      sun_particles_array.push(new Sun_Particles(x, y, r0, color, vx, vy))
    }
  }

  function connect(){
    for(let i = 0; i < sun_particles_array.length; i++){
        for(let j = i; j < sun_particles_array.length; j++){
            if(distance(sun_particles_array[i].x, sun_particles_array[i].y, sun_particles_array[j].x, sun_particles_array[j].y) < 97){
                sun_ctx.beginPath()
                sun_ctx.strokeStyle = 'rgb(255, 180, 80)'
                sun_ctx.lineWidth = 0.5
                sun_ctx.moveTo(sun_particles_array[i].x, sun_particles_array[i].y)
                sun_ctx.lineTo(sun_particles_array[j].x, sun_particles_array[j].y)
                sun_ctx.stroke()
                sun_ctx.closePath()
            }
        }
    }
  }

  function animate2() {
    requestAnimationFrame(animate2)
    sun_ctx.clearRect(0, 0, sun_canvas.width, sun_canvas.height)

    sun_particles_array.forEach((element) => {
      element.draw()
      element.update()

      element.x += element.vx
      element.y += element.vy
    })

    connect()
  }



  init2()
  animate2()