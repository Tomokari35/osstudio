// BURGER MENU
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// SLIDER
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 4000);

// CONTACT FORM
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(name && email && message) {
        formMessage.textContent = `Merci ${name}, votre message a été envoyé !`;
        form.reset();
    } else {
        formMessage.textContent = "Veuillez remplir tous les champs.";
    }
});

// CANVAS ANIMÉ (futuriste, particules connectées)
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        if(this.x + this.size > canvas.width || this.x - this.size < 0){
            this.directionX = -this.directionX;
        }
        if(this.y + this.size > canvas.height || this.y - this.size < 0){
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 8000;
    for(let i=0; i<numberOfParticles; i++){
        let size = Math.random() * 3 + 1;
        let x = Math.random() * (canvas.width - size*2) + size;
        let y = Math.random() * (canvas.height - size*2) + size;
        let directionX = (Math.random() * 0.5) - 0.25;
        let directionY = (Math.random() * 0.5) - 0.25;
        let color = '#a259ff';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// DRAW LINES BETWEEN PARTICLES
function connect(){
    for(let a=0; a<particlesArray.length; a++){
        for(let b=a; b<particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x)**2 + (particlesArray[a].y - particlesArray[b].y)**2)**0.5;
            if(distance < 120){
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(162, 89, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// ANIMATE
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => particle.update());
    connect();
}

// RESIZE
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
