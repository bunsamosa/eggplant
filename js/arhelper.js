// add click handler on AR camera
AFRAME.registerComponent('clickhandler', {
    init: function () {
        this.el.addEventListener('click', () => {
            console.log("clicked");
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
        });
    }
});
