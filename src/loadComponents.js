document.addEventListener('DOMContentLoaded', function() {
    const components = [
        { id: 'header-container', file: '/components/header.html' },
        { id: 'sidebar-container', file: '/components/sidebar.html' },
        { id: 'footer-container', file: '/components/footer.html' }
    ];

    let loadedComponents = 0;

    components.forEach(component => {
        fetch(component.file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(component.id).innerHTML = data;
                loadedComponents++;
                
                // After all components are loaded, initialize your scripts
                if (loadedComponents === components.length) {
                    // Last modified date
                    let text = document.lastModified;
                    document.getElementById("date").innerHTML += text;

                    // Visitor counter
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            var site_data = JSON.parse(this.responseText);
                            var num_arr = site_data.info.views.toString().split("");
                            var num_str = "";
                            for (i = 0; i < num_arr.length; i++) {
                                num_str += num_arr[i];
                                if ( (num_arr.length-1 - i) % 3 == 0 && (num_arr.length-1 - i) != 0 ) {
                                    num_str += ",";
                                }
                                var date_str = site_data.info.last_updated;
                                var date_obj = new Date(site_data.info.last_updated)
                            }
                            document.getElementById("hitcount").innerHTML = num_str;
                        } else {
                            console.log("failed connection didnt work");
                        }
                    };

                    xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=3maqi", true);
                    xhttp.send();
                }
            })
            .catch(error => console.error(`Error loading ${component.file}:`, error));
    });
});
