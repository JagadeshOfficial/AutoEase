// Authentication related functions

// Demo user accounts
const DEMO_ACCOUNTS = {
    admin: {
        email: 'admin@autoease.com',
        password: 'Admin@123',
        name: 'System Administrator'
    },
    resident: {
        email: 'user@autoease.com',
        password: 'User@123',
        name: 'John Doe'
    },
    provider: {
        email: 'provider@autoease.com',
        password: 'Provider@123',
        name: 'AutoCare Plus'
    }
};

// Show login modal with pre-filled demo credentials
function showLoginModal(userType = 'resident') {
    const loginModal = document.getElementById('loginModal');
    if (!loginModal) return;
    
    // Set the user type
    const userTypeInput = document.getElementById('userType');
    if (userTypeInput) userTypeInput.value = userType;
    
    // Pre-fill demo credentials if available
    const account = DEMO_ACCOUNTS[userType];
    if (account) {
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        if (emailInput) emailInput.value = account.email;
        if (passwordInput) passwordInput.value = account.password;
    }
    
    // Show the modal
    const modal = new bootstrap.Modal(loginModal);
    modal.show();
}

// Show registration modal
function showRegisterModal(userType = 'resident') {
    const registerModal = document.getElementById('registerModal');
    if (!registerModal) return;
    
    // Set the user type
    const userTypeInput = document.getElementById('registerUserType');
    if (userTypeInput) userTypeInput.value = userType;
    
    // Clear any existing form data
    const form = document.getElementById('registerForm');
    if (form) form.reset();
    
    // Show the modal
    const modal = new bootstrap.Modal(registerModal);
    modal.show();
}


function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    const userType = document.getElementById('userType')?.value;
    
    if (!email || !password || !userType) {
        alert('Please fill in all fields');
        return;
    }

    // Check demo accounts
    const account = DEMO_ACCOUNTS[userType];
    if (account && account.email === email && account.password === password) {
        // Store user info
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userName', account.name);
        
        // Hide modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (loginModal) loginModal.hide();
        
        // Check for redirect (only honor when the user is a resident)
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
            // Remove stored redirect regardless so it doesn't persist incorrectly
            sessionStorage.removeItem('redirectAfterLogin');
            // Only redirect to the saved URL if the logged-in user is a resident
            if (userType === 'resident') {
                window.location.href = redirectUrl;
                return;
            }
            // otherwise continue to role-based dashboard below
        }
        
        // Default redirects
        const dashboards = {
            admin: '/pages/admin/dashboard.html',
            provider: '/pages/provider/dashboard.html',
            resident: '/pages/resident/dashboard.html'
        };
        
        window.location.href = dashboards[userType] || '/index.html';
    } else {
        alert('Invalid credentials. Please use the demo account credentials.');
    }
}

function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    window.location.href = '/index.html';
}

function checkAuth() {
    const userEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');
    
    if (!userEmail || !userType) {
        window.location.href = '/index.html';
    }
    
    return { userEmail, userType };
}

// Register new user
function register(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('#registerName')?.value;
    const email = form.querySelector('#registerEmail')?.value;
    const password = form.querySelector('#registerPassword')?.value;
    const confirmPassword = form.querySelector('#confirmPassword')?.value;
    const userType = form.querySelector('#registerUserType')?.value;
    
    if (!name || !email || !password || !confirmPassword || !userType) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // In a real app, you'd make an API call here
    // For demo, we'll just store in localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userName', name);
    
    // Hide modal
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (registerModal) registerModal.hide();
    
    // Redirect to dashboard
    const dashboards = {
        provider: '/pages/provider/dashboard.html',
        resident: '/pages/resident/dashboard.html'
    };
    
    window.location.href = dashboards[userType] || '/index.html';
}
