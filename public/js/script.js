(() => {
    'use strict';

    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', event => {

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');

        });
    });
})();


// if (document.getElementById("map")) {

//     const map = L.map("map", {
//         scrollWheelZoom: false
//     }).setView([22.5726, 88.3639], 10);

//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         maxZoom: 19,
//         attribution: "&copy; OpenStreetMap contributors"
//     }).addTo(map);

//     L.marker([22.5726, 88.3639])
//         .addTo(map)
//         .bindPopup("<b>Listing Location</b>")
//         .openPopup();
// }

