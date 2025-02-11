/**
 * Direction enum and utility class
 * Handles cardinal directions and their vector representations
 */
class Dir {
    // Private direction constants
    static #UP = 0
    static #RIGHT = 1
    static #DOWN = 2
    static #LEFT = 3

    // Public direction getters
    static get UP() { return this.#UP }
    static get RIGHT() { return this.#RIGHT }
    static get DOWN() { return this.#DOWN }
    static get LEFT() { return this.#LEFT }

    // Direction vector getters
    static get UP_VEC() { return new Vec(0, 0, -1) }
    static get RIGHT_VEC() { return new Vec(1, 0, 0) }
    static get DOWN_VEC() { return new Vec(0, 0, 1) }
    static get LEFT_VEC() { return new Vec(-1, 0, 0) }

    // Vector lookup table
    static #VECTORS = {
        [Dir.#UP]: Dir.UP_VEC,
        [Dir.#RIGHT]: Dir.RIGHT_VEC,
        [Dir.#DOWN]: Dir.DOWN_VEC,
        [Dir.#LEFT]: Dir.LEFT_VEC
    }

    /**
     * Convert a direction enum value to its vector representation
     * @param {number} dir - Direction enum value
     * @returns {Vec} Vector representing the direction
     */
    static AS_VEC(dir) {
        return Dir.#VECTORS[dir]
    }
} 