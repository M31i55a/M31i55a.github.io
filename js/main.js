//reveal animation
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

const toggle = document.querySelector('.nav__toggle__label__span');
let showMenu = false;

const toggleMenu = () =>{
    if(!showMenu){
        toggle.classList.add('open')
        showMenu = true;
    }
    else{
        toggle.classList.remove('open')
        showMenu = false;
    }
}

toggle.addEventListener('click', toggleMenu)

//click button
const clickHere = document.querySelector('.arrow')
const welcome = document.querySelector('.welcome-screen')

const toggleHome = () => {
  welcome.style.display = 'none'
}

clickHere.addEventListener('click', toggleHome)

//Glassmorphism
VanillaTilt.init(document.querySelectorAll('.about__body__description'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 1,
})

//manage languages
const chosen = false;

const langlist = document.querySelector('.lang-list__title')
const francais = document.querySelector('.fr')
const english = document.querySelector('.en')
const _home = document.querySelector('.nav__list a[href="#home"]')
const about_me = document.querySelector('.nav__list a[href="#about"]')
const skill = document.querySelector('.nav__list a[href="#skills"]')
const _projects = document.querySelector('.nav__list a[href="#projects"]')
const hi = document.querySelector('.hi')
const my_name = document.querySelector('.name')
const hi_sub = document.querySelector('.description')
const about_title = document.querySelector('.title-section h1')
const about_desc_1 = document.querySelector('.section1')
const about_desc_2 = document.querySelector('.section2')
const about_hobby = document.querySelector('.hobby')
const about_cube_desc = document.querySelector('.about__body__images p')
const skills_title = document.querySelector('.skills__title h1')
const skills_txt = document.querySelector('.skills__body__section2 p')
const projects_title = document.querySelector('.projects__title h1')
const projects_desc = document.querySelector('.projects__body__section1 p')


french_language = () =>{

    langlist.innerHTML = 'Choisissez une langue'
    _home.innerHTML = 'Accueil'
    about_me.innerHTML = 'A propos'
    skill.innerHTML = 'Compétences'
    _projects.innerHTML = 'Projets'
    hi.innerHTML = 'Salut, j\'suis'
    my_name.innerHTML = 'Gioda'
    hi_sub.innerHTML = 'Développeur Web Freelance'
    about_title.innerHTML = 'Bienvenue Dans Mon Univers'
    about_desc_1.innerHTML = 'Je me forme en programmation web depuis plus de 3 ans maintenant.'
    about_desc_2.innerHTML = 'Je m\'exprime parfaitement en Français, Anglais, et le Japonais conversationnel'
    about_hobby.innerHTML = 'Dessiner est mon passe-temps, haha...'
    about_cube_desc.innerHTML = 'Cliquez le cube pour voir certaines de mes oeuvres digitales'
    skills_title.innerHTML = 'Que sais-je faire ?'
    skills_title.style.marginLeft = '-15%'
    skills_txt.innerHTML = 'Je suis dans les nouvelles technologies, notamment des librairies Front-end.'
    projects_title.innerHTML = 'Plongeons dans mes Projects!'
    projects_desc.innerHTML = 'Ils sont en cours d\'achèvement. </br>Je les mettrai sur GitHub dès que possible. </br><br> <br> Ce site a été réalisé avec: HTML, Sass, Vanilla javascript et Inkscape(pour les dessins) <br><br><br>Merci et à bientôt'

}

english_language = () => {
  langlist.innerHTML = 'Choose a language'
  _home.innerHTML = 'Home'
  about_me.innerHTML = 'About Me'
  skill.innerHTML = 'Skills'
  hi.innerHTML = 'Hiii, I\'m'
  my_name.innerHTML = 'M. Gioda'
  hi_sub.innerHTML = 'A Freelance Front-end Web Developer'
  about_title.innerHTML = 'Welcome In My Universe'
  about_desc_1.innerHTML = 'I\'m studying mathematics and computer science in university. I\'ve been studying web development for 3 years now.'
  about_desc_2.innerHTML = 'I can speak English, French and conversationnal Japanese.'
  about_hobby.innerHTML = 'My hobby is Drawing'
  about_cube_desc.innerHTML = 'Click the cube to see my digital art work'
  skills_title.innerHTML = 'My Skills'
  skills_txt.innerHTML = 'I\'m also into new technologies, frameworks and many Front-end libraries'
  projects_title.innerHTML = 'Let\'s Dive Into My Projects'
  projects_desc.innerHTML = 'I\'m working on some personnal projects.<br />I\'ll add them on my Github when they\'ll be ready. <br><br><br>For this Website, i used : HTML, Sass, Vanilla Javascript and Inkscape(for the drawings)<br><br><br> Thanks for your visit</p>'
}

francais.addEventListener('click', french_language)
english.addEventListener('click', english_language)


//type writter
const TypeWriter = function (txtElement, words, wait = 4000) {
    this.txtElement = txtElement
    this.words = words
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(wait, 10)
    this.type()
    this.isDeleting = false
  }

  TypeWriter.prototype.type = function () {
    const current = this.wordIndex % this.words.length
    const fulltxt = this.words[current]

    if (this.isDeleting) {
      this.txt = fulltxt.substring(0, this.txt.length - 1)
    } else {
      this.txt = fulltxt.substring(0, this.txt.length + 1)
    }

    this.txtElement.innerHTML = `<span class = "txt">${this.txt}</span>`
    let typeSpeed = 300

    if (this.isDeleting) {
      typeSpeed /= 2
    }
    if (!this.isDeleting && this.txt === fulltxt) {
      typeSpeed = this.wait
      this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      this.wordIndex++
      typeSpeed = 500
    }
    

    setTimeout(() => this.type(), typeSpeed)
  }

  document.addEventListener('DOMContentLoaded', init)

  function init() {
    const txtElement = document.querySelector('.txt-type')
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait')
    new TypeWriter(txtElement, words, wait)
  }


  //my canvas eyes
  const canvas = document.getElementById('canvas_eyes')
  const ctx = canvas.getContext('2d')

  let eyes = []
  let theta

  const mouse = {
    x: undefined,
    y: undefined
  }

  window.addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    animate()
  })

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
  })

  class Eye{
    constructor(x, y, radius){
      this.x = x
      this.y = y 
      this.radius = radius
    }

    draw(){
      //eyes
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()

      //angle
      let iris_dx = mouse.x - this.x
      let iris_dy = mouse.y - this.y
      theta = Math.atan2(iris_dy, iris_dx)

      //iris
      let iris_x = this.x + (Math.cos(theta) * this.radius) / 10
      let iris_y = this.y + (Math.sin(theta) * this.radius) / 10
      let irisRadius = this.radius / 1.2
      ctx.beginPath()
      ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true)
      ctx.fillStyle = 'white'
      ctx.fill()
      ctx.closePath()

      //pupil
      let pupil_dx = mouse.x - this.x
      let pupil_dy = mouse.y - this.y
      theta = Math.atan2(pupil_dy, pupil_dx)
      let pupilRadius = this.radius / 2.5
      let pupil_x = this.x + (Math.cos(theta) * this.radius) / 1.9
      let pupil_y = this.y + (Math.sin(theta) * this.radius) / 1.9
      ctx.beginPath()
      ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true)
      ctx.fillStyle = 'black'
      ctx.fill()
      ctx.closePath()

      //pupil reflection
      ctx.beginPath()
      ctx.arc(
        pupil_x - pupilRadius / 3,
        pupil_y - pupilRadius / 3,
        pupilRadius / 2,
        0,
        Math.PI * 2,
        true,
      )
      ctx.fillStyle = 'rgba(255, 255, 255, .1'
      ctx.fill()
      ctx.closePath()
    }

  }

  let eye1 = new Eye(20, 400, 15)
  let eye2 = new Eye(40, 440, 15)

  function animate(){
    eye1.draw()
    eye2.draw()
    requestAnimationFrame(animate)
  }

  animate()


  //cube-images-list appearance
  const cube = document.querySelector('.cube')
  const imageContainer = document.querySelector('.images-list-container')
  const backBtn = document.querySelector('.back')

  cube.addEventListener('click', () => {
    imageContainer.style.transform = 'translateY(0%)'
    imageContainer.style.zIndex = '100'
  })

  backBtn.addEventListener('click', () => {
    imageContainer.style.transform = 'translateY(100%)'
    imageContainer.style.zIndex = '0'
  })


