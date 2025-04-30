document.addEventListener('DOMContentLoaded', function() {
    const components = [
        { id: 'header-container', file: '/components/header.html' },
        { id: 'sidebar-container', file: '/components/sidebar.html' },
        { id: 'footer-container', file: '/components/footer.html' }
    ];

    // Keep track of loaded components
    let loadedComponents = 0;

    components.forEach(component => {
        fetch(component.file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(component.id).innerHTML = data;
                loadedComponents++;
                
                // After all components are loaded, initialize your other scripts
                if (loadedComponents === components.length) {
                    // Load your original script
                    const script = document.createElement('script');
                    script.src = '3maqiscript.js';
                    document.body.appendChild(script);
                }
            })
            .catch(error => console.error(`Error loading ${component.file}:`, error));
    });
});
