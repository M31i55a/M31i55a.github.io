const canvas0 = document.getElementById('canvas')
const canvas_ctx = canvas0.getContext('2d')
const title_section = document.getElementsByClassName("title-section")

canvas0.width = window.innerWidth
canvas0.height = window.innerHeight

      const mouse0 = {
        x: innerWidth / 2,
        y: innerHeight / 2,
      }

      let myMouse = {
        x: undefined,
        y: undefined
      }

      const colors = ['#2185c5', '#7ecefd', '#fff6e5', '#ffff00']

      let mousedown = false
      window.addEventListener('mousedown', () => {
        mousedown = true
      })
      window.addEventListener('mouseup', () => {
        mousedown = false
      })
      window.addEventListener('resize', () => {
        canvas0.width = innerWidth
        canvas0.height = innerHeight

        init1()
      })

      let about = document.getElementById("about");

      about.addEventListener('mousemove', (e) => {
        myMouse.x = e.x;
        myMouse.y = e.y;
      })

      class Particles {
        constructor(x, y, radius, color) {
          this.x = x
          this.y = y
          this.radius = radius
          this.color = color
        }

        draw1() {
          canvas_ctx.beginPath()
          canvas_ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
          canvas_ctx.fillStyle = this.color
          canvas_ctx.shadowColor = this.color
          canvas_ctx.shadowBlur = 20
          canvas_ctx.fill()
          canvas_ctx.closePath()
        }

        update() {
          this.draw1()

        }
      }

      let particles

      function init1() {
        particles = []

        for (let i = 0; i < 1000; i++) {
          const canvasWidth = canvas0.width * 2
          const canvasHeight = canvas0.height * 2
          const x = Math.random() * canvasWidth - canvasWidth / 2
          const y = Math.random() * canvasHeight - canvasHeight / 2
          const radius = Math.random() * 2

          const color = colors[Math.floor(Math.random() * colors.length)]

          particles.push(new Particles(x, y, radius, color))

      
        }
      }

      let radians = 0
      let alpha = 1

      function animate1() {
        requestAnimationFrame(animate1)
        canvas_ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`
        canvas_ctx.fillRect(0, 0, canvas0.width, canvas0.height)

        canvas_ctx.save()
        canvas_ctx.translate(canvas0.width / 2, canvas0.height / 2)
        canvas_ctx.rotate(radians)

        particles.forEach((particle) => {
          particle.update()
        })

        canvas_ctx.restore()

       radians += 0.001

        if (mousedown && alpha >= 0.1) {
          alpha -= 0.05
          radians += 0.015
        } else if (!mousedown && alpha < 1) {
          alpha += 0.01
        }

        
      }

      init1()
      animate1()

      window.addEventListener("scroll", function(){
          canvas0.style.position = "fixed"

      })