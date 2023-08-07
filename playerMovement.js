AFRAME.registerComponent("player-movement", {
    update : function () {
        this.move();
    },

    move : function () {
        window.addEventListener("keydown", (e)=>{
            if(e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d"){
                var sound = document.querySelector("#sound2");
                sound.components.sound.playSound();
            }
        })
    }
})