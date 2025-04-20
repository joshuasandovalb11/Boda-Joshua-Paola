// Countdown Timer Function
function updateCountdown() {
    const weddingDate = new Date('July 25, 2025 18:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Add animation to changing values
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    Object.entries(elements).forEach(([key, element]) => {
        if (element) {
            const currentValue = element.textContent;
            const newValue = key === 'days' ? days : 
                            key === 'hours' ? hours.toString().padStart(2, '0') : 
                            key === 'minutes' ? minutes.toString().padStart(2, '0') : 
                            seconds.toString().padStart(2, '0');
            
            if (currentValue !== newValue) {
                element.classList.add('animate');
                element.textContent = newValue;
                
                setTimeout(() => {
                    element.classList.remove('animate');
                }, 500);
            }
        }
    });
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
        function() {
            // Success callback - show feedback to user
            const copyFeedback = document.getElementById('copyFeedback');
            copyFeedback.classList.remove('opacity-0');
            copyFeedback.classList.add('opacity-100');
            
            // Hide feedback after 2 seconds
            setTimeout(() => {
                copyFeedback.classList.remove('opacity-100');
                copyFeedback.classList.add('opacity-0');
            }, 2000);
        },
        function() {
            // Error callback
            console.error('No se pudo copiar al portapapeles');
        }
    );
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// AOS Initialization
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: false
    });
    
    // Bank details modal functionality
    const modal = document.getElementById('bankDetailsModal');
    const showModalBtn = document.getElementById('showBankDetails');
    const closeModalBtn = document.getElementById('closeModal');
    
    if (showModalBtn && modal && closeModalBtn) {
        // Find all the divs within the space-y-4 container
        const accountSections = modal.querySelector('.space-y-4').children;
        
        // Find the one with "Cuenta:" label
        for (let i = 0; i < accountSections.length; i++) {
            const section = accountSections[i];
            const label = section.querySelector('p.text-sm');
            
            if (label && label.textContent === 'Cuenta:') {
                // Found the account number section
                const accountNumberElement = section.querySelector('p.font-medium');
                if (accountNumberElement) {
                    const accountNumber = accountNumberElement.textContent.trim();
                    
                    // Create a container for the account number and copy button
                    const container = document.createElement('div');
                    container.className = 'flex items-center justify-between mt-1';
                    
                    // Keep the account number
                    const numberSpan = document.createElement('span');
                    numberSpan.className = 'font-medium';
                    numberSpan.textContent = accountNumber;
                    
                    // Create copy button
                    const copyButton = document.createElement('button');
                    copyButton.className = 'bg-wedding-gold text-white text-sm py-1 px-3 rounded hover:bg-wedding-gold/80 transition-colors duration-300 flex items-center';
                    copyButton.innerHTML = '<i class="fas fa-copy mr-1"></i> Copiar';
                    copyButton.addEventListener('click', () => copyToClipboard(accountNumber));
                    
                    // Append elements
                    container.appendChild(numberSpan);
                    container.appendChild(copyButton);
                    
                    // Replace the original account number with our new container
                    accountNumberElement.parentNode.replaceChild(container, accountNumberElement);
                    
                    // Create feedback element
                    const feedbackElement = document.createElement('div');
                    feedbackElement.id = 'copyFeedback';
                    feedbackElement.className = 'mt-2 text-green-600 text-sm text-center opacity-0 transition-opacity duration-300';
                    feedbackElement.textContent = '¡Número de cuenta copiado!';
                    section.appendChild(feedbackElement);
                    
                    break; // Exit the loop once we've found and modified the account section
                }
            }
        }
        
        showModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
        
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    // Make map container clickable to open Google Maps
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.style.cursor = 'pointer';
        mapContainer.addEventListener('click', () => {
            // Update this URL to the exact location of your venue
            window.open('https://maps.app.goo.gl/VgWevh1E6f6USGNq6', '_blank');
        });
        
        // Add an overlay to make it clear the map is clickable
        const overlay = document.createElement('div');
        overlay.classList.add('map-overlay');
        overlay.innerHTML = '<div class="overlay-content"><i class="fas fa-external-link-alt"></i><span>Haz clic para ver en Google Maps</span></div>';
        mapContainer.appendChild(overlay);
        
        // Add styles for the overlay
        const style = document.createElement('style');
        style.textContent = `
            .map-container {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            
            .map-container iframe {
                width: 100%;
                height: 100%;
                border: 0;
            }
            
            .map-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .map-container:hover .map-overlay {
                opacity: 1;
            }
            
            .overlay-content {
                background-color: rgba(255, 255, 255, 0.9);
                padding: 10px 16px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: #444;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .overlay-content i {
                color: #d4af37;
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});