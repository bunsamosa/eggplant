
AFRAME.registerComponent('clickhandler', {
    init: function () {
        this.el.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition((position) => {
                alert('Lat: ' + position.coords.latitude + ' Long: ' + position.coords.longitude);
            });
        });
    }
});
