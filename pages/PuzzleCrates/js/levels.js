/**
 * Level class for creating game worlds from ASCII maps
 */
class Level {
    constructor(levelData, playerPos, name) {
        this.levelData = levelData
        this.playerPos = playerPos
        this.name = name
    }

    createWorld() {
        world = new World(this.levelData, this.playerPos.clone())
    }
}

/**
 * Level symbols:
 * w = wall
 *   = blank
 * e = exit
 * 1234 = buttons
 * !@#$ = gates
 * 90() = ungates
 * b = box
 * 5678%^&* = portals (need pairs of number + shifted symbol)
 */
const levels = [
    new Level([
        "wwwwwww",
        "wwwewww", 
        "www!www",
        "w     w",
        "w 1 b w",
        "w     w",
        "wwwwwww",
    ], new Vec(3, 1, 3), "First"),

    new Level([
        "wwwwwwwwwwww",
        "wwww   w   w",
        "wwww 3 @   w",
        "we#@ b w b w",
        "wwww 2 #   w",
        "wwww   w   w",
        "wwwwwwwwwwww",
    ], new Vec(4, 1, 3), "Double Door"),

    new Level([
        "wwwwwww",
        "www2www",
        "www1www",
        "wwwbwww",
        "w     w",
        "w!w#w@w",
        "wbw$wbw",
        "w3wew4w",
        "wwwwwww",
    ], new Vec(3, 1, 4), "Lock Pick"),

    new Level([
        "wwwwwwwwwwww",
        "w   w   w  w",
        "w     w w ww",
        "w   www w  w",
        "ww ww w ww w",
        "w   w      w",
        "w w wwwwww w",
        "w w w      w",
        "w w w ww www",
        "www www   ww",
        "we! w1b w  w",
        "wwwwwwwwwwww",
    ], new Vec(2, 1, 2), "A-Maze-Ing"),

    new Level([
        "wwwwwwwww",
        "www@@@www",
        "www@b@www",
        "www   www",
        "we# 3 www",
        "www   $ w",
        "www w@w w",
        "www 2b4 w",
        "wwwwwwwww",
    ], new Vec(4, 1, 4), "Boxed In"),

    new Level([
        "wwwwwwww",
        "w 1 !  w",
        "w   !  w",
        "w  b!  w",
        "w   !e w",
        "wwwwwwww",
    ], new Vec(1, 1, 3), "Holding the Door Open"),

    new Level([
        "wwwwwww",
        "wwew2ww",
        "ww9wbww",
        "ww   ww",
        "ww!w@ww",
        "w     w",
        "w 1 b w",
        "wwwwwww",
    ], new Vec(3, 1, 6), "Un-Gates"),

    new Level([
        "wwwwwwwwwwww",
        "w   b  1wwew",
        "ww www www w",
        "w   !   9  w",
        "wb  !   9  w",
        "w1  !   9  w",
        "w   !   9  w",
        "wwwwwwwwwwww",
    ], new Vec(2, 1, 2), "ON-OFF SWITCH"),

    new Level([
        "wwwww",
        "wweww",
        "w222w",
        "w222w",
        "w000w",
        "w022w",
        "w000w",
        "w220w",
        "w000w",
        "w202w",
        "w000w",
        "w020w",
        "w000w",
        "w   w",
        "wwwww",
    ], new Vec(2, 1, 13), "Careful Where You Step"),

    new Level([
        "wwwwwwwwwwwww",
        "w   w   (   w",
        "w b     (   w",
        "w   w   (   w",
        "ww www www#ww",
        "w   w   w   w",
        "w b   3 w e w",
        "w   w   w   w",
        "wwwwwwwwwwwww",
    ], new Vec(6, 1, 2), "Holding the Door Open 2"),

    new Level([
        "wwwwwwwwwww",
        "w5w^w   w&w",
        "w w w w w w",
        "w w w w w w",
        "w w w w w w",
        "w w7w6w%wew",
        "wwwwwwwwwww",
    ], new Vec(1, 1, 5), "Teleporters"),

    new Level([
        "wwwwwwww",
        "w      w",
        "w      w",
        "w  w b w",
        "w  5   w",
        "wwwwwwww",
        "we! % 1w",
        "wwwwwwww",
    ], new Vec(4, 1, 2), "Interdimensional Box"),

    new Level([
        "wwwwwwww",
        "ww     w",
        "ww 5   w",
        "wwwwwwww",
        "w3 %#eww",
        "w bwwwww",
        "w  wwwww",
        "wwwwwwww",
    ], new Vec(2, 1, 2), "Clog"),

    new Level([
        "wwwwwwwww",
        "w   @wwww",
        "w   5# ew",
        "w    wwww",
        "wwwwwwwww",
        "wwwwwwwww",
        "wwww3wwww",
        "ww4b b  w",
        "wwww ww w",
        "wwww ww w",
        "w^  % 0 w",
        "wwww ww$w",
        "wwww wwbw",
        "wwww 6w2w",
        "wwwwwwwww",
    ], new Vec(1, 1, 1), "Four-Way Split"),

    new Level([
        "wwwwwwwwwwwww",
        "w$$$$wwwwwwww",
        "w$w4      ^ww",
        "w$wwwwwwwwwww",
        "w$w6 0@#!b  w",
        "w$wwwwwwwww w",
        "w$w         w",
        "w$w b123  $$w",
        "w$w wwwww $ew",
        "w$w  123b $$w",
        "w$$         w",
        "wwwwwwwwwwwww",
    ], new Vec(4, 1, 6), "The Control Room"),

    new Level([
        "wwwwwwwwwwwwwwwwwwwwwww",
        "w     w6  7w      wwwww",
        "w b   wwwwww   2w wwwww",
        "w b  4$  5w&   1w !@#ew",
        "w b   wwwwww   3w wwwww",
        "w     w%  ^w      wwwww",
        "wwwwwwwwwwwwwwwwwwwwwww",
    ], new Vec(1, 1, 3), "Heavy Loads"),

    new Level([
        "wwwwwwwwww",
        "w    wwwww",
        "w b  b( 3w",
        "w    wwwww",
        "ww#wwwwwww",
        "w    9 b1w",
        "w    wwwww",
        "w b   0b2w",
        "w     ww w",
        "w        w",
        "ww!wwwwwww",
        "wwewwwwwww",
        "wwwwwwwwww",
    ], new Vec(1, 1, 1), "The Box Trap"),

    new Level([
        "wwwwwwwwwwwwwwwwwww",
        "w5   4wwwwwwwwwwwww",
        "www wwwwwwwwwwwwwww",
        "w   b#5wwwwwwwwwwww",
        "w   wwwwwwwwwwwwwww",
        "w   wwwwwwwwwwwwwww",
        "w 3 $ e   w   w  %w",
        "w   wwwww   w   www",
        "wwwwwwwwwwwwwwwwwww",
    ], new Vec(2, 1, 4), "Red Herring"),

    new Level([
        "wwwwwww",
        "wewww3w",
        "w#www w",
        "w     w",
        "w     w",
        "w00000w",
        "w22220w",
        "w00000w",
        "w0220 w",
        "w00000w",
        "w00220w",
        "w00000w",
        "w20200w",
        "w00000w",
        "w00202w",
        "w00000w",
        "w20200w",
        "w00000w",
        "w     w",
        "w  b  w",
        "w     w",
        "wwwwwww",
    ], new Vec(3, 1, 20), "Careful Where You Step 2"),

    new Level([
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        "w!! @@wwwwwwwwwww   wwwwwwwwwwwwwwwwwwwwwwwwwwww#ww#wwwwwwwwww    @wwww",
        "w!   @w9900(())w     wwwwwwwwwwwwwwwwwwwwwwwwwww#ww#wwwwwwwwww    !wwww",
        "w      11223344   5  wwwwwwwwwwwwwwwwwwwwwwwww#wwwwww#wwwwwwww %  ewwww",
        "w$   #w9900(())w     wwwwwwwwwwwwwwwwwwwwwwwww#wwwwww#wwwwwwww    $wwww",
        "w$$ ##wwwwwwwwwww   wwwwwwwwwwwwwwwwwwwwwwwwww########wwwwwwww    #wwww",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    ], new Vec(3, 1, 3), "Finale")
]