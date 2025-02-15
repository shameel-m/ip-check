document.addEventListener('DOMContentLoaded', () => {
    // Add dark mode class to body when page loads
    document.body.classList.add('dark-mode');

    // Fetch and display the user's IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            document.getElementById('ip-address').textContent = `IP: ${ipAddress}`;

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
        navLinks.classList.toggle('active'); // Show or hide nav links
    });

    // Toggle light/dark mode
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode'); // Switch theme
    });

    // Predict location based on IP
    const predictButton = document.getElementById('predict-location');
    const ipInput = document.getElementById('ip-input');
    const locationSection = document.getElementById('location-section');

    predictButton.addEventListener('click', () => {
        const ip = ipInput.value.trim();
        if (ip) {
            fetch(`http://ip-api.com/json/${ip}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        const locationInfo = `
                            <p>City: ${data.city}</p>
                            <p>Region: ${data.regionName} (${data.region})</p>
                            <p>Postal code: ${data.zip}</p>
                            <p>Country: ${data.country} (${data.countryCode})</p>
                        `;
                        locationSection.innerHTML += locationInfo; // Add location info
                    } else {
                        alert('Unable to fetch location data. Please check the IP address.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching location data:', error);
                    alert('An error occurred while fetching location data.');
                });
        } else {
            alert('Please enter a valid IP address.');
        }
    });
});

let lastScrollTop = 0;

document.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    // Detect scroll direction
    if (scrollPosition > lastScrollTop) {
        // Scrolling down
        nav.style.top = '-100px'; // Hide the nav
    } else {
        // Scrolling up
        nav.style.top = '0'; // Show the nav
    }
    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // For Mobile or negative scrolling

    // Show footer only at the bottom
    if (scrollPosition + windowHeight >= documentHeight) {
        footer.style.bottom = '0'; // Show the footer
    } else {
        footer.style.bottom = '-100px'; // Hide the footer
    }
}); 