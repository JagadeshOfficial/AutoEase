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

function showLoginModal(userType) {
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    document.getElementById('userType').value = userType;
    
    // Pre-fill credentials for demo
    if (userType === 'admin') {
        document.getElementById('loginEmail').value = DEMO_ACCOUNTS.admin.email;
        document.getElementById('loginPassword').value = DEMO_ACCOUNTS.admin.password;
    }
    
    modal.show();
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('userType').value;

    // Validate against demo accounts
    const account = DEMO_ACCOUNTS[userType];
    if (account && account.email === email && account.password === password) {
        // Store user info in localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userName', account.name);

        // Check if there's a redirect URL stored
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
            sessionStorage.removeItem('redirectAfterLogin'); // Clear the stored URL
            window.location.href = redirectUrl;
        } else {
            // Default redirects based on user type
            switch(userType) {
                case 'admin':
                    window.location.href = '/pages/admin/dashboard.html';
                    break;
                case 'resident':
                    window.location.href = '/pages/resident/dashboard.html';
                    break;
                case 'provider':
                    window.location.href = '/pages/provider/dashboard.html';
                    break;
            }
        }
        
        // Redirect based on user type
        switch(userType) {
            case 'admin':
                window.location.href = '/pages/admin/dashboard.html';
                break;
            case 'provider':
                window.location.href = '/pages/provider/dashboard.html';
                break;
            case 'resident':
                window.location.href = '/pages/resident/dashboard.html';
                break;
        }
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
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Here you would typically make an API call to your backend
    // For demonstration, we'll use local storage
    if (email && password) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', userType);
        
        // Redirect based on user type
        switch(userType) {
            case 'provider':
                window.location.href = '/pages/provider/dashboard.html';
                break;
            case 'resident':
                window.location.href = '/pages/resident/dashboard.html';
                break;
        }
    }
}
