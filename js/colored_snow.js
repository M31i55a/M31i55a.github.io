const skills = document.getElementById('skills')

//snow canvas
const snow_canvas = document.getElementById('skills_canvas');
const snow_ctx = snow_canvas.getContext('2d')

snow_canvas.width = innerWidth;
snow_canvas.height = innerHeight;

//Global
distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  let snow_mouse = {
    x: undefined,
    y: undefined,
  }

  //window events
  skills.addEventListener('mousemove', (event) => {
    snow_mouse.x = event.x
    snow_mouse.y = event.y
  })

  window.addEventListener('resize', () => {
    snow_canvas.width = window.innerWidth
    snow_canvas.height = window.innerHeight

    init()
  })

  skills.addEventListener('mouseout', () => {
    snow_mouse.x = undefined,
    snow_mouse.y = undefined
  })

  //class particle
  class Snow_Particles {
    constructor(x, y, r, color, vx, vy) {
      this.x = x
      this.y = y
      this.r = r
      this.min_r = r
      this.max_r = 57
      this.color = color
      this.pColor = color
      this.opacity = 1
      this.vx = vx
      this.vy = vy
    }

    draw() {
      snow_ctx.beginPath()
      snow_ctx.fillStyle = this.color
      snow_ctx.globalAlpha = this.opacity
      snow_ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true)
      snow_ctx.fill()
      snow_ctx.closePath()
    }

    update() {
      //border collision
      if (snow_canvas.width - this.x < this.r || this.x < this.r) {
        this.vx = -this.vx
      }
      if (snow_canvas.height - this.y < this.r || this.y < this.r) {
        this.vy = -this.vy
      }

      //manage snow_mouse neighborhood
      if (distance(snow_mouse.x, snow_mouse.y, this.x, this.y) < 170) {
        this.opacity = 1
        this.r += 0.7

      } else if (this.r > this.min_r) {
        this.r -= 0.9
      }

      //set the max radius
      if (this.r > this.max_r) {
        this.r = this.max_r
      }
    }
  }

  //main

  let particles_array

  function init() {
    particles_array = []

    for (i = 0; i < 1000; i++) {
      let r0 = Math.random() * (4 - 1.5) + 1.5
      let x = Math.random() * (snow_canvas.width - 2 * r0) + r0
      let y = Math.random() * (snow_canvas.height - 2 * r0) + r0
      let color = `white`
      let vx = Math.random() * 1
      let vy = Math.random() * 1

      if (i !== 0) {
        for (j = 0; j < particles_array.length; j++) {
          if (
            distance(x, y, particles_array[j].x, particles_array[j].y) <
            r0 + particles_array[j].r
          ) {
            x = Math.random() * (snow_canvas.width - 2 * r0) + r0
            y = Math.random() * (snow_canvas.height - 2 * r0) + r0
            j = -1
          }
        }
      }
      particles_array.push(new Snow_Particles(x, y, r0, color, vx, vy))
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    snow_ctx.clearRect(0, 0, snow_canvas.width, snow_canvas.height)

    particles_array.forEach((element) => {
      element.draw()
      element.update()

      element.x += element.vx
      element.y += element.vy
    })
  }



  init()
  animate()

