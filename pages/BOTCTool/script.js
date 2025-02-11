class Person {
    constructor() {
        this.main = $("<div>")
        this.main.appendTo($("#peopleArea"))
        this.main.css("border","1px solid black")
        this.main.css("display","flex")
        this.main.css("flexDirection","column")
        this.main.css("marginBottom","10px")
        
        this.addAttr = $("<button>")
        this.addAttr.text("Add attribute")
        var owner = this
        this.addAttr.on("click",()=>{
            owner.addAttribute("")
        })
        this.addAttr.appendTo(this.main)
        
        this.attrs = []
        this.addAttribute("Name",1)
        this.addAttribute("Character",3)
        this.addAttribute("Alignment",2)
        this.addAttribute("Alive/Dead",4)
    }
    
    // ... rest of Person class methods ...
}

class ApplyToPerson {
    constructor(char,align,other) {
        this.char = char
        this.align = align
        this.other = other || (person => {})
    }
    
    apply(person) {
        person.readyForNewGame()
        person.attrs[1].text.html(roleOptionsHTML.join(""))
        person.attrs[1].text.val(this.char)
        person.attrs[2].text.val(this.align)
        person.attrs[3].text.val("alive")
        this.other(person)
    }
}

var allRoles = [], toRoles = [], ouRoles = [], miRoles = [], deRoles = [];
var people = []
var loaded = false

var allToRoles = ["artist","chambermaid","chef","clockmaker","courtier","dreamer","empath","exorcist","flowergirl","fool","fortune_teller","gambler","gossip","grandmother","innkeeper","investigator","juggler","librarian","mathematician","mayor","minstrel","monk","oracle","pacifist","philosopher","professor","ravenkeeper","sage","sailor","savant","seamstress","slayer","snake_charmer","soldier","tea_lady","town_crier","undertaker","virgin","washerwoman"]
var allOuRoles = ["barber","butler","drunk","goon","klutz","lunatic","moonchild","recluse","mutant","saint","sweetheart","tinker"]
var allMiRoles = ["witch","spy","scarlet_woman","poisoner","pit-hag","mastermind","godfather","evil_twin","devils_advocate","cerenovus","baron","assassin"]
var allDeRoles = ["fang_gu","imp","no_dashii","po","pukka","shabaloth","vigormortis","vortox","zombuul"]

var grimRoles = []
var demonBluffs = []
var roleOptions = []

// ... rest of JavaScript functions ...

// Event Handlers
$(document).ready(function() {
    $("#JSONFile").on("change",()=>{
        $("#JSONFile")[0].files[0].text().then(text=>{
            $("#JSONIn").val(text);
        })
    })

    $("#loadJSON").on("click",()=>{
        // ... existing loadJSON handler ...
    })

    $("#gameSize").on("change",()=>{
        $("#sizeNum").text($("#gameSize").val())
    })

    $("#generateButton").on("click",()=>{
        // ... existing generateButton handler ...
    })
}) 