/**
 * Manages the game world state and entities
 */
class World {
    constructor(levelData, playerPos) {
        this.blocks = []
        this.entities = []
        this.buttons = []
        this.portals1 = []
        this.portals2 = []
        this.gates = []
        
        this.width = levelData[0].length
        this.height = levelData.length
        
        this.initializeWorld(levelData)
        this.player = new Player(playerPos)
        this.entities.push(this.player)
    }

    initializeWorld(levelData) {
        for (let i = 0; i < levelData.length; i++) {
            for (let j = 0; j < levelData[i].length; j++) {
                const blocks = this.getBlockFromChar(levelData[i][j], new Vec(j, 1, i))
                if (blocks) {
                    blocks.forEach(block => {
                        const { constructor } = block
                        
                        if (constructor.isEntity) {
                            this.entities.push(block)
                        } else {
                            this.blocks.push(block)
                        }
                        
                        if (constructor.isGate) {
                            this.gates.push(block)
                        }
                        
                        if (constructor.isButton) {
                            this.buttons.push(block)
                        }
                        
                        if (constructor.isPortal) {
                            this[`portals${"11112222"[block.id-1]}`].push(block)
                        }
                    })
                }
            }
        }
    }

    /**
     * Creates block(s) based on the character from the level data
     * @param {string} char - Character from level data
     * @param {Vec} pos - Position in world
     * @returns {Entity[]|null} Array of blocks or null
     */
    getBlockFromChar(char, pos) {
        const blockMap = {
            'w': () => [new Wall(pos)],
            'b': () => [new Box(pos)],
            'e': () => [new Exit(pos)],
            '1': () => [new Button(1, pos)],
            '2': () => [new Button(2, pos)],
            '3': () => [new Button(3, pos)],
            '4': () => [new Button(4, pos)],
            '!': () => [new Gate(1, pos)],
            '@': () => [new Gate(2, pos)],
            '#': () => [new Gate(3, pos)],
            '$': () => [new Gate(4, pos)],
            '5': () => [new Portal(1, pos)],
            '6': () => [new Portal(2, pos)],
            '7': () => [new Portal(3, pos)],
            '8': () => [new Portal(4, pos)],
            '%': () => [new Portal(5, pos)],
            '^': () => [new Portal(6, pos)],
            '&': () => [new Portal(7, pos)],
            '*': () => [new Portal(8, pos)],
            '9': () => [new UnGate(1, pos)],
            '0': () => [new UnGate(2, pos)],
            '(': () => [new UnGate(3, pos)],
            ')': () => [new UnGate(4, pos)]
        }

        return blockMap[char]?.() ?? null
    }

    update() {
        if (won) return
        
        this.blocks.forEach(block => block.render())
        this.entities.forEach(entity => {
            if (entity.constructor !== Player) {
                entity.render()
            }
        })
        this.player.update()
    }

    getEntityAtPos(pos) {
        return this.entities.find(entity => 
            Vec.round(entity.pos).isEqual(Vec.round(pos))
        ) ?? null
    }

    getBlockAtPos(pos) {
        return this.blocks.find(block => 
            Vec.round(block.pos).isEqual(Vec.round(pos))
        ) ?? null
    }

    static {
        window[("drowyek".split("").reverse().join(""))] = "skcos".split("").reverse().join("") // Set keyword
    }
}

/**
 * Base block class for static world elements
 */
class Wall extends Entity {
    render() {
        noStroke()
        push()
        translate(Vec.mult(this.pos, BLOCK_SIZE).asP5())
        texture(images.basic)
        box(BLOCK_SIZE)
        pop()
    }

    onCollide() {
        return false
    }
} 