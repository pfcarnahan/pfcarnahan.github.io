/**
 * Base class for all game entities
 */
class Entity {
    constructor(pos) {
        this.pos = pos;
        this.vPos = pos.clone().mult(BLOCK_SIZE);
        this.size = BLOCK_SIZE;
        this.image = images.basic;
    }

    render() {
        // Default render implementation
    }

    onCollide() {
        return true;
    }

    update() {
        this.vPos.lerp(Vec.mult(this.pos, BLOCK_SIZE), 0.15);
        this.pos.round();
        this.render();
    }
}

/**
 * Player entity that can be controlled with WASD/arrow keys
 */
class Player extends Entity {
    constructor(pos) {
        super(pos);
        this.moving = false;
    }

    render() {
        noStroke();
        push();
        translate(this.vPos.clone().add(new Vec(0, PLAYER_SIZE/8, 0)).asP5());
        texture(images.player);
        box(PLAYER_SIZE);
        pop();
    }

    doKeys() {
        const tryMove = (key, arrowKey, direction) => {
            if ((keysR[key] || keysR[arrowKey]) && !this.moving) {
                const dirVec = Dir.AS_VEC(direction);
                const pos = world.getEntityAtPos(Vec.add(this.pos, dirVec)) ?? 
                           world.getBlockAtPos(Vec.add(this.pos, dirVec));
                const col = pos?.onCollide(direction);
                
                if (!((pos ?? false) && !col)) {
                    if (col instanceof Vec) {
                        this.pos.set(col);
                    } else {
                        this.pos.add(dirVec);
                    }
                    this.moving = true;
                }
            }
        };

        tryMove('w', 38, Dir.UP);
        tryMove('d', 39, Dir.RIGHT);
        tryMove('s', 40, Dir.DOWN);
        tryMove('a', 37, Dir.LEFT);

        if (keysR.r) {
            levels[level].createWorld();
        }
    }

    update() {
        this.doKeys();
        this.vPos.lerp(Vec.mult(this.pos, BLOCK_SIZE), 0.15);
        if (Vec.round(this.vPos).div(BLOCK_SIZE).round().isEqual(this.pos)) {
            this.moving = false;
        }
        this.pos.round();
        this.render();
    }

    onCollide() {
        return false;
    }
}

class Box extends Entity {
    static isEntity = true

    render() {
        this.vPos.lerp(Vec.mult(this.pos, BLOCK_SIZE), 0.15);
        this.pos.round();
        
        noStroke();
        push();
        translate(this.vPos.clone().add(new Vec(0, PLAYER_SIZE/8, 0)).asP5());
        texture(images.box);
        box(PLAYER_SIZE);
        pop();
    }

    onCollide(dir) {
        const canMove = world.getEntityAtPos(Vec.add(this.pos, Dir.AS_VEC(dir))) ?? 
                       world.getBlockAtPos(Vec.add(this.pos, Dir.AS_VEC(dir)));
        const col = canMove?.onCollide(dir);
        
        if (!((canMove ?? false) && !col)) {
            if (col instanceof Vec) {
                this.pos.set(col);
            } else {
                this.pos.add(Dir.AS_VEC(dir));
            }
            return true;
        }
        return false;
    }
}

class Gate extends Entity {
    static isGate = true
    static textures = ["Pink", "Yellow", "Green", "Red"].map(e => `locked${e}Gate`)

    constructor(id, pos) {
        super(pos);
        this.id = id;
        this.animY = 0;
        this.open = false;
    }

    render() {
        if (!world.getEntityAtPos(this.pos)) {
            this.animY = lerp(this.animY, this.open ? 100 : 0, 0.2);
        }
        
        noStroke();
        push();
        translate(Vec.mult(this.pos, BLOCK_SIZE).add(new Vec(0, this.animY)).asP5());
        texture(images[Gate.textures[this.id-1]]);
        box(PLAYER_SIZE);
        pop();
        
        this.open = world.buttons.some(button => button.id === this.id && button.pushed);
    }

    onCollide() {
        return this.open;
    }
}

class Button extends Entity {
    static isButton = true
    static textures = ["pink", "yellow", "green", "red"].map(e => `${e}Button`)

    constructor(id, pos) {
        super(pos);
        this.id = id;
        this.pushed = false;
        this.animY = 40;
    }

    render() {
        this.animY = lerp(this.animY, this.pushed ? 60 : 40, 0.2);
        
        noStroke();
        push();
        translate(Vec.mult(this.pos, BLOCK_SIZE).add(new Vec(0, this.animY)).asP5());
        texture(images[Button.textures[this.id-1]]);
        box(60);
        pop();
        
        this.pushed = !!world.getEntityAtPos(this.pos);
    }

    onCollide() {
        return true;
    }
}

class Portal extends Entity {
    static isPortal = true
    static textures = ["pink", "yellow", "green", "red"].map(e => `${e}Portal`)

    constructor(id, pos) {
        super(pos);
        this.id = id;
    }

    onCollide(dir) {
        const otherPortal = world[`portals${"22221111"[this.id-1]}`].find(portal => portal.id % 4 === this.id % 4);

        const dirVec = Dir.AS_VEC(dir);
        const blockAtDest = world.getEntityAtPos(Vec.add(otherPortal.pos, dirVec)) ?? 
                           world.getBlockAtPos(Vec.add(otherPortal.pos, dirVec));
        
        if (blockAtDest) {
            const canCollide = blockAtDest.onCollide(dir);
            if (canCollide) {
                return canCollide instanceof Vec ? canCollide : Vec.add(otherPortal.pos, dirVec);
            }
            return false;
        }
        return Vec.add(otherPortal.pos, dirVec);
    }

    render() {
        noStroke();
        push();
        translate(Vec.mult(this.pos, BLOCK_SIZE).asP5());
        texture(images[Portal.textures[this.id%4-1]]);
        box(BLOCK_SIZE);
        pop();
    }
}

class UnGate extends Entity {
    static isGate = true
    static textures = ["pink", "yellow", "green", "red"].map(e => `${e}UnGate`)

    constructor(id, pos) {
        super(pos);
        this.id = id;
        this.animY = 0;
        this.open = false;
    }

    render() {
        if (!world.getEntityAtPos(this.pos)) {
            this.animY = lerp(this.animY, this.open ? -100 : 0, 0.2);
        }
        
        noStroke();
        push();
        translate(Vec.mult(this.pos, BLOCK_SIZE).add(new Vec(0, this.animY)).asP5());
        texture(images[UnGate.textures[this.id-1]]);
        box(PLAYER_SIZE);
        pop();
        
        this.open = !world.buttons.some(button => button.id === this.id && button.pushed);
    }

    onCollide() {
        return this.open;
    }
}

class Exit extends Entity {
    render() {
        if (Vec.round(world.player.pos).isEqual(this.pos)) {
            level++;
            if (level >= levels.length) {
                won = true;
            } else {
                levels[level].createWorld();
            }
        }
        
        noStroke();
        push();
        translate(Vec.mult(this.pos, BLOCK_SIZE).asP5());
        texture(images.exit);
        box(BLOCK_SIZE);
        pop();
    }

    onCollide() {
        return true;
    }
}

class Particle {
    static #particles = [];

    constructor(pos, vel, col) {
        this.pos = pos;
        this.vel = vel;
        this.col = col;
        this.life = 500;
    }

    draw(ctx) {
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, 4, 4, 0, 0, Math.PI*2);
        ctx.fill();
    }

    update(ctx) {
        this.pos.add(this.vel);
        this.vel.add(new Vec(0, 0.1));
        this.life--;
        this.draw(ctx);
    }

    static add(particle) {
        Particle.#particles.push(particle);
    }

    static update(ctx) {
        for (let i = Particle.#particles.length-1; i >= 0; i--) {
            if (Particle.#particles[i]) {
                Particle.#particles[i].update(ctx);
                if (Particle.#particles[i].life <= 0) {
                    Particle.#particles.splice(i, 1);
                }
            }
        }
    }
}

// ... other entity classes 