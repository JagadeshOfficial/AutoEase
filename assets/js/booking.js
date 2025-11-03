// Booking System for Gated Community Car Services

// Service Pricing for Different Vehicle Types
const servicePricing = {
    carWashing: {
        sedan: 30,
        suv: 40,
        luxury: 50,
        additional: {
            waxing: 20,
            interiorDetail: 25,
            ceramicCoating: 150
        }
    },
    carServicing: {
        sedan: 100,
        suv: 120,
        luxury: 150,
        additional: {
            oilChange: 40,
            filterReplacement: 25,
            brakeService: 80
        }
    },
    carRepair: {
        diagnostic: 50,
        minorRepair: 100,
        majorRepair: 200
    }
};

function bookService(event) {
    event.preventDefault();
    
    const serviceType = document.getElementById('serviceType').value;
    const serviceDate = document.getElementById('serviceDate').value;
    const serviceTime = document.getElementById('serviceTime').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const vehicleDetails = document.getElementById('vehicleDetails').value;
    const communityBlock = document.getElementById('communityBlock').value;
    const parkingNumber = document.getElementById('parkingNumber').value;
    const additionalNotes = document.getElementById('additionalNotes').value;

    // Calculate service price based on vehicle type and service
    const basePrice = calculateServicePrice(serviceType, vehicleType);
    
    // Create booking object with community-specific details
    const booking = {
        id: Date.now(),
        serviceType,
        serviceDate,
        serviceTime,
        vehicleType,
        vehicleDetails,
        communityBlock,
        parkingNumber,
        additionalNotes,
        basePrice,
        status: 'pending',
        userEmail: localStorage.getItem('userEmail'),
        communityId: localStorage.getItem('communityId')
    };

    // Get existing bookings or initialize empty array
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Booking submitted successfully!');
    window.location.href = '/pages/resident/dashboard.html';
}

function getBookings(status = null) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');

    // Filter bookings based on user type and status
    return bookings.filter(booking => {
        if (userType === 'resident') {
            return booking.userEmail === userEmail && 
                   (status ? booking.status === status : true);
        } else if (userType === 'provider') {
            return status ? booking.status === status : true;
        }
        return true; // Admin sees all bookings
    });
}

function updateBookingStatus(bookingId, newStatus) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const index = bookings.findIndex(b => b.id === bookingId);
    
    if (index !== -1) {
        bookings[index].status = newStatus;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        location.reload(); // Refresh the page to show updated status
    }
}

function displayBookings(containerId, status = null) {
    const container = document.getElementById(containerId);
    const bookings = getBookings(status);

    if (bookings.length === 0) {
        container.innerHTML = '<p class="text-center">No bookings found.</p>';
        return;
    }

    const bookingsList = bookings.map(booking => `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Service Type: ${booking.serviceType}</h5>
                <p class="card-text">
                    <strong>Date:</strong> ${booking.serviceDate}<br>
                    <strong>Time:</strong> ${booking.serviceTime}<br>
                    <strong>Vehicle Details:</strong> ${booking.vehicleDetails}<br>
                    <strong>Status:</strong> <span class="badge bg-${getStatusBadgeColor(booking.status)}">${booking.status}</span>
                </p>
                ${getActionButtons(booking)}
            </div>
        </div>
    `).join('');

    container.innerHTML = bookingsList;
}

function getStatusBadgeColor(status) {
    switch(status) {
        case 'pending': return 'warning';
        case 'confirmed': return 'primary';
        case 'completed': return 'success';
        case 'cancelled': return 'danger';
        default: return 'secondary';
    }
}

function getActionButtons(booking) {
    const userType = localStorage.getItem('userType');
    
    if (userType === 'provider' && booking.status === 'pending') {
        return `
            <button onclick="updateBookingStatus(${booking.id}, 'confirmed')" class="btn btn-success btn-sm">Accept</button>
            <button onclick="updateBookingStatus(${booking.id}, 'cancelled')" class="btn btn-danger btn-sm">Decline</button>
        `;
    } else if (userType === 'resident' && booking.status === 'pending') {
        return `
            <button onclick="updateBookingStatus(${booking.id}, 'cancelled')" class="btn btn-danger btn-sm">Cancel</button>
        `;
    }
    return '';
}
