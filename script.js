document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display the user's IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            document.getElementById('ip-address').textContent = `IP: xxx.xx.xxx.xxx`;

            // Copy IP address to clipboard
            document.getElementById('copy-ip').addEventListener('click', () => {
                navigator.clipboard.writeText(ipAddress).then(() => {
                    alert('IP address copied to clipboard!');
                });
            });
        });

    // Toggle navigation menu
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Toggle light/dark mode
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Predict location based on IP
    document.getElementById('predict-location').addEventListener('click', () => {
        const ipInput = document.getElementById('ip-input').value;
        if (ipInput) {
            fetch(`https://ipapi.co/${ipInput}/json/`)
                .then(response => response.json())
                .then(data => {
                    const location = `${data.city}, ${data.region}, ${data.country_name}`;
                    document.getElementById('location-result').textContent = location;
                })
                .catch(() => {
                    document.getElementById('location-result').textContent = 'Unable to fetch location.';
                });
        } else {
            alert('Please enter an IP address.');
        }
    });
}); 