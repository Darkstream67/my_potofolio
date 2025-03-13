window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    function resizeCanvas() {
        const canvas = document.getElementById('canvas1');
        const div = document.querySelector('.ggg');
        
        if (canvas && div) {
            const rect = div.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    

    // Customizable settings
    const maxParticles = 100;
    const minSize = 2;
    const maxSize = 7;
    const gravity = 0;
    const bounciness = 1;
    const minSpeed = 0.5;
    const maxSpeed = 1;
    const mouseRadius = 60;
    const lineRadius = 80;
    let mouseAttract = false;

    const particleColor = 'rgb(255, 114, 114)';
    const lineColor = 'rgb(255, 114, 114)';

    const particlesArray = [];
    const mouse = { x: undefined, y: undefined };

    canvas.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (maxSize - minSize) + minSize;
            this.speedX = this.randomSpeed();
            this.speedY = this.randomSpeed();
        }

        randomSpeed() {
            return (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1);
        }

        clampSpeed() {
            const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            if (speed < minSpeed) {
                this.speedX *= minSpeed / speed;
                this.speedY *= minSpeed / speed;
            } else if (speed > maxSpeed) {
                this.speedX *= maxSpeed / speed;
                this.speedY *= maxSpeed / speed;
            }
        }

        update() {
            this.speedY += gravity;
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -bounciness;
            if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -bounciness;

            for (let i = 0; i < particlesArray.length; i++) {
                if (this === particlesArray[i]) continue;
                const dx = this.x - particlesArray[i].x;
                const dy = this.y - particlesArray[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + particlesArray[i].size) this.bounce(particlesArray[i]);
                if (distance < lineRadius) this.drawLine(particlesArray[i]);
            }

            if (mouse.x !== undefined && mouse.y !== undefined) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius) {
                    if (mouseAttract) {
                        this.speedX -= dx * 0.02;
                        this.speedY -= dy * 0.02;
                    } else {
                        this.speedX += dx * 0.05;
                        this.speedY += dy * 0.05;
                    }
                }
            }

            this.clampSpeed(); // Ensure speed stays within limits
        }

        bounce(otherParticle) {
            const angle = Math.atan2(otherParticle.y - this.y, otherParticle.x - this.x);
            const speed1 = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            const speed2 = Math.sqrt(otherParticle.speedX * otherParticle.speedX + otherParticle.speedY * otherParticle.speedY);

            const direction1 = Math.atan2(this.speedY, this.speedX);
            const direction2 = Math.atan2(otherParticle.speedY, otherParticle.speedX);

            const newSpeedX1 = speed1 * Math.cos(direction1 - angle);
            const newSpeedY1 = speed1 * Math.sin(direction1 - angle);
            const newSpeedX2 = speed2 * Math.cos(direction2 - angle);
            const newSpeedY2 = speed2 * Math.sin(direction2 - angle);

            this.speedX = newSpeedX2 * Math.cos(angle) + newSpeedY1 * Math.cos(angle + Math.PI / 2);
            this.speedY = newSpeedX2 * Math.sin(angle) + newSpeedY1 * Math.sin(angle + Math.PI / 2);
            otherParticle.speedX = newSpeedX1 * Math.cos(angle) + newSpeedY2 * Math.cos(angle + Math.PI / 2);
            otherParticle.speedY = newSpeedX1 * Math.sin(angle) + newSpeedY2 * Math.sin(angle + Math.PI / 2);

            this.speedX *= bounciness;
            this.speedY *= bounciness;
            otherParticle.speedX *= bounciness;
            otherParticle.speedY *= bounciness;

            this.clampSpeed();
            otherParticle.clampSpeed();
        }

        drawLine(otherParticle) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.closePath();
        }

        draw() {
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        if (particlesArray.length < maxParticles) particlesArray.push(new Particle());
    }

    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createParticles();
        handleParticles();
        requestAnimationFrame(animate);
    }

    animate();
};