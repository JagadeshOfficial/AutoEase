// Main JavaScript functions for AutoEase

// Service Booking Form Navigation
let currentStep = 1;
const totalSteps = 4;

// Simple function to load a component
function loadComponent(elementId, componentPath) {
    console.log(`Loading ${componentPath} into #${elementId}`);
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element #${elementId} not found`);
        return;
    }
    
    fetch(componentPath)
        .then(response => response.text())
        .then(data => {
            element.innerHTML = data;
            console.log(`Successfully loaded ${componentPath}`);
        })
        .catch(error => {
            console.error(`Error loading ${componentPath}:`, error);
            element.innerHTML = `<div class="alert alert-danger">Error loading component</div>`;
        });
}

// Initialize components and event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap components
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Initialize booking form if it exists
    if (document.getElementById('bookingForm')) {
        initializeBookingForm();
    }
});

// Initialize Booking Form
function initializeBookingForm() {
    showStep(1);
    setupServiceSelection();
    setupDateTimeConstraints();
    setupFormValidation();
}

// Form Navigation
function showStep(step) {
    document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`#step${step}`).classList.add('active');
    
    document.querySelectorAll('.step').forEach((s, index) => {
        if (index + 1 < step) {
            s.classList.add('completed');
            s.classList.remove('active');
        } else if (index + 1 === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('completed', 'active');
        }
    });

    currentStep = step;
    updateNavigationButtons();
}

function nextStep() {
    if (currentStep < totalSteps && validateStep(currentStep)) {
        if (currentStep === totalSteps - 1) {
            updateBookingSummary();
        }
        showStep(currentStep + 1);
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Service Selection
function setupServiceSelection() {
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            updatePriceEstimate();
        });
    });
}

// Date and Time Setup
function setupDateTimeConstraints() {
    const dateInput = document.getElementById('serviceDate');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = formatDate(tomorrow);
        
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        dateInput.max = formatDate(maxDate);
    }

    const timeInput = document.getElementById('serviceTime');
    if (timeInput) {
        timeInput.addEventListener('change', validateTimeSlot);
    }
}

// Helper Functions
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function formatTime(time) {
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Validation Functions
function validateStep(step) {
    switch(step) {
        case 1:
            return validateServiceSelection();
        case 2:
            return validateLocationDetails();
        case 3:
            return validateSchedule();
        default:
            return true;
    }
}

function validateServiceSelection() {
    const selectedService = document.querySelector('.service-option.selected');
    if (!selectedService) {
        showError('Please select a service type');
        return false;
    }
    return true;
}

function validateLocationDetails() {
    const requiredFields = ['communityBlock', 'parkingNumber', 'vehicleDetails'];
    for (const field of requiredFields) {
        const input = document.getElementById(field);
        if (!input || !input.value.trim()) {
            showError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            input?.focus();
            return false;
        }
    }
    return true;
}

function validateSchedule() {
    const date = document.getElementById('serviceDate')?.value;
    const time = document.getElementById('serviceTime')?.value;
    
    if (!date || !time) {
        showError('Please select both date and time');
        return false;
    }

    const selectedDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    if (selectedDateTime <= now) {
        showError('Please select a future date and time');
        return false;
    }

    return true;
}

function validateTimeSlot() {
    const timeInput = document.getElementById('serviceTime');
    const selectedTime = timeInput.value;
    
    // Check if selected time is within business hours (9 AM to 5 PM)
    const hour = parseInt(selectedTime.split(':')[0]);
    if (hour < 9 || hour >= 17) {
        showError('Please select a time between 9 AM and 5 PM');
        timeInput.value = '';
        return false;
    }
    
    return true;
}

// Price Calculation
function updatePriceEstimate() {
    const selectedService = document.querySelector('.service-option.selected');
    if (!selectedService) return;

    const serviceType = selectedService.dataset.service;
    const vehicleType = getVehicleType();
    const price = calculateServicePrice(serviceType, vehicleType);
    
    const priceDisplay = document.getElementById('estimatedPrice');
    if (priceDisplay) {
        priceDisplay.textContent = `$${price}`;
    }
}

function calculateServicePrice(service, vehicleType) {
    const pricing = {
        carWashing: {
            sedan: 30,
            suv: 40,
            luxury: 50
        },
        carServicing: {
            sedan: 100,
            suv: 120,
            luxury: 150
        },
        carRepair: {
            sedan: 80,
            suv: 100,
            luxury: 120
        }
    };

    return pricing[service]?.[vehicleType] || 0;
}

function getVehicleType() {
    const vehicleDetails = document.getElementById('vehicleDetails')?.value.toLowerCase() || '';
    if (vehicleDetails.includes('suv')) return 'suv';
    if (vehicleDetails.includes('luxury') || vehicleDetails.includes('premium')) return 'luxury';
    return 'sedan';
}

// UI Updates
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
    if (nextBtn) nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-block';
    if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';
}

function updateBookingSummary() {
    const selectedService = document.querySelector('.service-option.selected');
    const serviceType = selectedService?.dataset.service || '';
    const location = `${document.getElementById('communityBlock')?.value} - Parking ${document.getElementById('parkingNumber')?.value}`;
    const schedule = `${document.getElementById('serviceDate')?.value} at ${document.getElementById('serviceTime')?.value}`;
    const vehicle = document.getElementById('vehicleDetails')?.value;

    document.getElementById('summaryService').textContent = serviceType;
    document.getElementById('summaryLocation').textContent = location;
    document.getElementById('summarySchedule').textContent = schedule;
    document.getElementById('summaryVehicle').textContent = vehicle;

    const price = calculateServicePrice(serviceType, getVehicleType());
    document.getElementById('basePrice').textContent = `$${price}`;
    document.getElementById('totalPrice').textContent = `$${price}`;
}

// Error Handling
function showError(message) {
    // Replace with better UI notification
    alert(message);
}

// Setup Form Validation
function setupFormValidation() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateStep(currentStep)) {
                submitBooking();
            }
        });
    }
}
    }
}

// Validate form inputs
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast show bg-${type} text-white`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Notification</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Update user profile
function updateProfile(event) {
    event.preventDefault();
    
    const name = document.getElementById('profileName').value;
    const phone = document.getElementById('profilePhone').value;
    const address = document.getElementById('profileAddress').value;

    // Here you would typically make an API call to update the profile
    // For demonstration, we'll use local storage
    const userEmail = localStorage.getItem('userEmail');
    const userProfile = {
        email: userEmail,
        name,
        phone,
        address
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    showToast('Profile updated successfully');
}

// Load user profile
function loadProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (!userProfile) return;

    const fields = ['Name', 'Phone', 'Address'];
    fields.forEach(field => {
        const element = document.getElementById(`profile${field}`);
        if (element) {
            element.value = userProfile[field.toLowerCase()];
        }
    });
}
