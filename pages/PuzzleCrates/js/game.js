// Game state variables
let level = 0
let won = false
let frames = 0
let world
let loader
let foregroundCtx
var keys = {} // keys
var keysR = {} // keys that have been released on that frame

$("html").on("keydown", k => {
    keys[k.key.toString().toLowerCase()] = true
    keys[k.keyCode] = true
    k.preventDefault()
}) // add key listeners
$("html").on("keyup", k => {
    delete keys[k.key.toString().toLowerCase()]
    delete keys[k.keyCode]
    keysR[k.key.toString().toLowerCase()] = true
    keysR[k.keyCode] = true
}) // add key listeners

// Constants
const keyword = "socks"

/**
 * Sprite loader class for managing pixel art assets
 */
class PixelArtLoader {
    #completed = false
    #index = 0
    #calledCallback = false

    constructor(src, target) {
        this.src = src
        this.target = target
    }

    load(onComplete, onDone, onProgress) {
        const keys = Object.keys(this.src)
        const values = Object.values(this.src)
        
        if (this.#index >= keys.length) {
            if (!this.#calledCallback) {
                onComplete()
                this.#calledCallback = true
            }
            onDone()
            return
        }

        // Create and process sprite
        const data = values[this.#index]
        const obj = createGraphics(RESOLUTION * data[0].length, RESOLUTION * data.length, P2D)
        
        obj.noStroke()
        obj.background(255, 255, 255, 0)
        
        // Draw pixel art
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] in PALETTE) {
                    obj.fill(PALETTE[data[i][j]])
                    obj.rect(j * RESOLUTION, i * RESOLUTION, RESOLUTION, RESOLUTION)
                }
            }
        }
        
        this.target[keys[this.#index]] = obj.get()
        obj.remove()
        
        this.#index++
        onProgress()
    }

    get completed() {
        return this.#completed
    }

    get index() {
        return this.#index
    }
}

/**
 * Renders the win scene with particles and text
 */
const winScene = ctx => {
    frames++
    
    ctx.reset()
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    
    // Create particles every 40 frames
    if (frames % 40 === 0) {
        const seedPos = new Vec(50 + Math.random() * (window.innerWidth-100), 50 + Math.random() * (window.innerHeight-100))
        for (let i = 0; i < 50; i += Math.random() * 5) {
            Particle.add(new Particle(
                seedPos.clone(),
                new Vec(Math.random() * 5, Math.random() * 5).rotate2D(Math.random() * Math.PI * 2),
                "red orange yellow green blue purple".split(" ")[Math.floor(Math.random() * 6)]
            ))
        }
    }
    
    Particle.update(ctx)
    
    // Draw win text
    ctx.fillStyle = "black"
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.font = "50px arial"
    ctx.textAlign = "center"
    ctx.strokeText(`YOU WIN!`, window.innerWidth/2, 200)
    ctx.fillText(`YOU WIN!`, window.innerWidth/2, 200)
    ctx.font = "20px arial"
    ctx.strokeText(`Mention the keyword, "${keyword}", in the T&T to let us know!`, window.innerWidth/2, 250)
    ctx.strokeText(`(And find a way to be sneaky about it!)`, window.innerWidth/2, 275)
    ctx.fillText(`Mention the keyword, "${keyword}", in the T&T to let us know!`, window.innerWidth/2, 250)
    ctx.fillText(`(And find a way to be sneaky about it!)`, window.innerWidth/2, 275)
}

/**
 * Initialize game setup
 */
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('canvasContainer');
    setAttributes({ antialias: false });
    
    let foregroundCanvas = $("#foregroundCanvas")[0];
    foregroundCtx = foregroundCanvas.getContext("2d");
    foregroundCanvas.width = window.innerWidth;
    foregroundCanvas.height = window.innerHeight;
    
    frameRate(300);
    loader = new PixelArtLoader(window.src, window.images);
    levels[level].createWorld();
}

/**
 * Main game loop
 */
function draw() {
    loader.load(
        // On complete
        () => {
            frameRate(60)
            $("#loadText").fadeOut()
        },
        // On done
        () => {
            if (won) {
                winScene(foregroundCtx)
            } else {
                rotateX(-Math.PI/2 + 0.5)
                translate(world.player.vPos.clone().invert().asP5())
                background(200)
                runGame()
                
                // Draw level text if not won
                if (!won) {
                    foregroundCtx.reset()
                    foregroundCtx.fillStyle = "black"
                    foregroundCtx.strokeStyle = "white"
                    foregroundCtx.lineWidth = 2
                    foregroundCtx.font = "20px arial"
                    foregroundCtx.textAlign = "center"
                    foregroundCtx.strokeText(`Level ${level + 1}: ${levels[level].name}`, window.innerWidth/2, 50)
                    foregroundCtx.fillText(`Level ${level + 1}: ${levels[level].name}`, window.innerWidth/2, 50)
                }
            }
        },
        // On progress
        () => {
            $("#loadNumber").text(`${loader.index}/${Object.keys(src).length}`)
        }
    )
    
    keysR = {}
}

/**
 * Update and render game world
 */
function runGame() {
    world.update()
    
    // Draw floor tiles
    for (let x = 0; x < world.width; x++) {
        for (let y = 0; y < world.height; y++) {
            noStroke()
            push()
            translate(Vec.mult(new Vec(x, 0, y), BLOCK_SIZE).add(new Vec(0, BLOCK_SIZE * 3/2)).asP5())
            rotateX(Math.PI/2)
            texture(images.basic)
            plane(BLOCK_SIZE)
            pop()
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Export functions that need to be globally accessible
window.setup = setup
window.draw = draw 