AFRAME .registerComponent("shooting", {
    schema : {

    },

    init : function() {
        this.shoot();
    },

    shoot : function() {

        window.addEventListener("keydown", (e)=>{
            if(e.key === "z") {

                var paintBall = document.createElement("a-entity")

                paintBall.setAttribute("geometry", {primitive: "sphere", radius: 0.25})
                
                var cam = document.querySelector("#camera-rig")
                var pos = cam.getAttribute("position");
                paintBall.setAttribute("position", {x: pos.x, y: pos.y+1, z: pos.z-0.5})

                var camera = document.querySelector("#camera").object3D;

                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)

                paintBall.setAttribute("velocity", direction.multiplyScalar(-20))

                var scene = document.querySelector("#scene")

                paintBall.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "0"
                });

                paintBall.addEventListener("collide", this.addCollision);
                scene.appendChild(paintBall)

                this.shootingSound();
            }
        })
    },

    addCollision : function(e) {
        var element = e.detail.target.el;

        var elementHit = e.detail.body.el;
            console.log(elementHit)

            var pos = element.getAttribute("position");
            var rot = elementHit.getAttribute("rotation")

            var randNum = parseInt(Math.random() * 8 + 1)

            var paintImage = document.createElement("a-entity");
            paintImage.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z})
            paintImage.setAttribute("rotation", {x: rot.x, y: rot.y, z: rot.z});
            paintImage.setAttribute("scale", {x: 2, y: 2, z: 2});
            paintImage.setAttribute("geometry", {primitive: "plane",width: 0.5,height: 0.5});
            paintImage.setAttribute("material", {src: "./images/paint splash-0"+randNum+".png", transparent: true})

            var scene = document.querySelector("#scene")
            scene.appendChild(paintImage);

            element.removeEventListener("collide", this.addCollision)
            scene.removeChild(element);
    },
    
    shootingSound : function () {
        var sound = document.querySelector("#sound1");
        sound.components.sound.playSound();
    }
})