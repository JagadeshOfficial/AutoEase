// Admin Dashboard JavaScript
// Define demo data
const demoData = {
    users: {
        residents: [
            { 
                name: 'Emma Thompson',
                email: 'emma.t@example.com',
                type: 'Resident',
                joined: '2025-11-01',
                status: 'Active',
                location: 'New York, USA',
                vehicles: 2,
                bookings: 8,
                lastBooking: '2025-10-28'
            },
            { 
                name: 'Sofia Rodriguez',
                email: 'sofia.r@example.com',
                type: 'Resident',
                joined: '2025-10-25',
                status: 'Pending',
                location: 'Miami, USA',
                vehicles: 1,
                bookings: 3,
                lastBooking: '2025-10-15'
            },
            { 
                name: 'Maria Garcia',
                email: 'maria.g@example.com',
                type: 'Resident',
                joined: '2025-10-20',
                status: 'Active',
                location: 'Houston, USA',
                vehicles: 3,
                bookings: 12,
                lastBooking: '2025-11-01'
            },
            {
                name: 'John Smith',
                email: 'john.s@example.com',
                type: 'Resident',
                joined: '2025-10-15',
                status: 'Active',
                location: 'Boston, USA',
                vehicles: 1,
                bookings: 5,
                lastBooking: '2025-10-30'
            },
            {
                name: 'Lisa Wong',
                email: 'lisa.w@example.com',
                type: 'Resident',
                joined: '2025-10-10',
                status: 'Inactive',
                location: 'San Francisco, USA',
                vehicles: 2,
                bookings: 0,
                lastBooking: null
            }
        ],
        providers: [
            { 
                name: 'James Chen Auto',
                email: 'james.c@example.com',
                type: 'Provider',
                joined: '2025-10-28',
                status: 'Active',
                location: 'Los Angeles, USA',
                specialties: ['Electric Vehicles', 'Diagnostics'],
                rating: 4.9,
                completedJobs: 156
            },
            { 
                name: 'David Kim Motors',
                email: 'david.k@example.com',
                type: 'Provider',
                joined: '2025-10-22',
                status: 'Active',
                location: 'Chicago, USA',
                specialties: ['Engine Repair', 'Transmission'],
                rating: 4.8,
                completedJobs: 203
            }
        ]
    },
    providers: [
        {
            name: 'AutoCare Plus',
            services: ['Oil Change', 'Brake Service', 'Engine Diagnostics'],
            rating: 4.8,
            status: 'Active',
            location: 'Manhattan, NY',
            completedJobs: 234,
            responseTime: '< 30 mins',
            yearEstablished: 2020,
            certifications: ['ASE Certified', 'EPA Certified'],
            email: 'contact@autocare.plus'
        },
        {
            name: 'Quick Fix Auto',
            services: ['Tire Service', 'AC Service', 'Battery Replacement'],
            rating: 4.5,
            status: 'Active',
            location: 'Brooklyn, NY',
            completedJobs: 189,
            responseTime: '< 1 hour',
            yearEstablished: 2021,
            certifications: ['ASE Certified'],
            email: 'service@quickfix.auto'
        },
        {
            name: 'Elite Motors',
            services: ['Engine Repair', 'Diagnostics', 'Performance Tuning'],
            rating: 4.9,
            status: 'Active',
            location: 'Queens, NY',
            completedJobs: 312,
            responseTime: '< 15 mins',
            yearEstablished: 2019,
            certifications: ['ASE Certified', 'BMW Certified', 'Mercedes Certified'],
            email: 'info@elitemotors.com'
        },
        {
            name: 'City Garage',
            services: ['Body Work', 'Painting', 'Collision Repair'],
            rating: 4.3,
            status: 'Pending',
            location: 'Bronx, NY',
            completedJobs: 156,
            responseTime: '< 45 mins',
            yearEstablished: 2022,
            certifications: ['I-CAR Certified'],
            email: 'service@citygarage.com'
        },
        {
            name: 'Pro Mechanics',
            services: ['General Service', 'Inspection', 'Electrical Systems'],
            rating: 4.7,
            status: 'Active',
            location: 'Staten Island, NY',
            completedJobs: 278,
            responseTime: '< 20 mins',
            yearEstablished: 2020,
            certifications: ['ASE Certified', 'Hybrid Repair Certified'],
            email: 'contact@promechanics.com'
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize ApexCharts
    const revenueChartOptions = {
        series: [{
            name: 'Revenue',
            data: [30000, 40000, 35000, 50000, 49000, 60000, 70000, 91000, 85000, 95000, 98000, 110000]
        }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#3b82f6'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
            labels: {
                formatter: function(val) {
                    return '$' + val.toLocaleString();
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return '$' + val.toLocaleString();
                }
            }
        }
    };

    const serviceCategoriesOptions = {
        series: [44, 55, 13, 43, 22],
        chart: {
            type: 'donut',
            height: 250
        },
        labels: ['Oil Change', 'Brake Service', 'AC Service', 'Tire Service', 'Other'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        legend: {
            position: 'bottom'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const revenueChart = new ApexCharts(document.querySelector("#revenueChart"), revenueChartOptions);
    const serviceCategories = new ApexCharts(document.querySelector("#serviceCategories"), serviceCategoriesOptions);

    revenueChart.render();
    serviceCategories.render();

    // Initialize DateRangePicker for Report Modal
    $('#reportDateRange').daterangepicker({
        startDate: moment().subtract(29, 'days'),
        endDate: moment(),
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    });

    // Initialize DataTables
    $('#usersTable, #providersTable').DataTable({
        pageLength: 5,
        lengthChange: false,
        searching: false,
        info: false
    });

    // Load Mock Data
    loadMockData();
});

// Load section data
function loadSectionData(section) {
    switch(section) {
        case 'users':
            renderUsersSection();
            break;
        case 'providers':
            renderProvidersSection();
            break;
        case 'bookings':
            renderBookingsSection();
            break;
        case 'messages':
            renderMessagesSection();
            break;
        case 'dashboard':
            loadDashboardStats();
            break;
    }
}

// Demo bookings and messages
const demoBookings = [
    { id: 1234, userEmail: 'emma.t@example.com', provider: 'AutoCare Plus', service: 'Oil Change', serviceDate: '2025-11-03', status: 'pending', price: '79.99' },
    { id: 1235, userEmail: 'john.s@example.com', provider: 'Quick Fix Auto', service: 'Brake Service', serviceDate: '2025-11-04', status: 'confirmed', price: '149.00' },
    { id: 1236, userEmail: 'maria.g@example.com', provider: 'Elite Motors', service: 'Engine Diagnostics', serviceDate: '2025-11-02', status: 'completed', price: '199.00' }
];

const demoMessages = [
    { from: 'emma.t@example.com', subject: 'Change appointment', message: 'Can I move my appointment to Friday?', date: '2025-11-02' },
    { from: 'provider@autocare.plus', subject: 'Service update', message: 'Your vehicle is ready for pickup.', date: '2025-10-30' },
    { from: 'james.c@example.com', subject: 'Question about service', message: 'Do you offer mobile service?', date: '2025-10-28' }
];

// Render Bookings Section
function renderBookingsSection(filter) {
    const list = document.getElementById('bookingsList');
    if (!list) return;
    const items = filter ? demoBookings.filter(b => b.status === filter) : demoBookings;
    list.innerHTML = items.map(b => `
        <tr>
            <td>#${b.id}</td>
            <td>${b.userEmail}</td>
            <td>${b.provider}</td>
            <td>${b.service}</td>
            <td>${b.serviceDate}</td>
            <td><span class="badge bg-${b.status === 'completed' ? 'success' : b.status === 'confirmed' ? 'primary' : 'warning'}">${b.status}</span></td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="viewBooking(${b.id})"><i class="bx bx-show"></i></button>
                    <button class="btn btn-outline-success" onclick="updateBookingStatus(${b.id}, 'confirmed')"><i class="bx bx-check"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render Messages Section
function renderMessagesSection() {
    const el = document.getElementById('messagesList');
    if (!el) return;
    el.innerHTML = demoMessages.map(m => `
        <div class="d-flex justify-content-between align-items-start border-bottom py-2">
            <div>
                <h6 class="mb-0">${m.subject}</h6>
                <small class="text-muted">From: ${m.from} · ${m.date}</small>
                <p class="mb-0 mt-1 text-truncate">${m.message}</p>
            </div>
            <div class="ms-3">
                <button class="btn btn-sm btn-outline-primary" onclick="replyMessage('${m.from}')"><i class="bx bx-reply"></i></button>
            </div>
        </div>
    `).join('');
}

function viewBooking(id) { alert('View booking ' + id); }
function updateBookingStatus(id, status) { alert('Update ' + id + ' -> ' + status); }
function replyMessage(to) { const body = prompt('Reply to ' + to + ':'); if (body) alert('Message sent (demo)'); }

// Render Users Section
function renderUsersSection() {
    const usersList = document.getElementById('recentUsersList');
    if (!usersList) return;

    const allUsers = [...demoData.users.residents, ...demoData.users.providers];
    usersList.innerHTML = allUsers.map(user => `
        <tr class="align-middle">
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar-wrapper me-3">
                        <img src="https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random" 
                             class="rounded-circle user-avatar" alt="${user.name}">
                        <span class="status-indicator ${user.status.toLowerCase()}"></span>
                    </div>
                    <div>
                        <h6 class="mb-0 fw-semibold">${user.name}</h6>
                        <div class="d-flex align-items-center">
                            <small class="text-muted me-2">${user.email}</small>
                            <i class="bx bx-map-pin fs-sm text-muted me-1"></i>
                            <small class="text-muted">${user.location}</small>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge user-type-badge ${user.type.toLowerCase()}-badge">
                    <i class="bx ${user.type === 'Resident' ? 'bx-user' : 'bx-store-alt'} me-1"></i>
                    ${user.type}
                </span>
                <div class="mt-1">
                    ${user.type === 'Resident' ? 
                        `<small class="text-muted">
                            <i class="bx bx-car me-1"></i>${user.vehicles} vehicles · ${user.bookings} bookings
                        </small>` :
                        `<small class="text-muted">
                            <i class="bx bx-star me-1"></i>${user.rating} rating · ${user.completedJobs} jobs
                        </small>`
                    }
                </div>
            </td>
            <td>
                <div class="d-flex flex-column">
                    <div class="mb-1">${formatDate(user.joined)}</div>
                    <small class="text-muted">
                        ${user.type === 'Resident' && user.lastBooking ? 
                            `Last booking: ${formatDate(user.lastBooking)}` :
                            user.type === 'Provider' ? 
                            `Specialties: ${user.specialties.join(', ')}` : 
                            'No bookings yet'
                        }
                    </small>
                </div>
            </td>
            <td>
                <span class="status-pill ${user.status.toLowerCase()}-status">
                    <i class="bx ${
                        user.status === 'Active' ? 'bx-check' : 
                        user.status === 'Pending' ? 'bx-time' : 'bx-x'
                    }"></i>
                    ${user.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-icon btn-sm btn-hover-primary" title="View Profile">
                        <i class="bx bx-user"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-success" title="Message">
                        <i class="bx bx-message-rounded"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-danger" title="Remove">
                        <i class="bx bx-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    initializeDataTable('#usersTable');
}

// Render Providers Section
function renderProvidersSection() {
    const providersList = document.getElementById('activeProvidersList');
    if (!providersList) return;

    providersList.innerHTML = demoData.providers.map(provider => `
        <tr class="align-middle provider-row">
            <td>
                <div class="d-flex align-items-center">
                    <div class="provider-avatar-wrapper me-3">
                        <img src="https://ui-avatars.com/api/?name=${provider.name.replace(' ', '+')}&background=random" 
                             class="rounded provider-avatar" alt="${provider.name}">
                        <span class="status-indicator ${provider.status.toLowerCase()}"></span>
                    </div>
                    <div>
                        <div class="d-flex align-items-center mb-1">
                            <h6 class="mb-0 fw-semibold me-2">${provider.name}</h6>
                            ${provider.certifications.map(cert => 
                                `<span class="certification-badge" title="${cert}">
                                    <i class="bx bx-check-shield"></i>
                                </span>`
                            ).join('')}
                        </div>
                        <div class="d-flex align-items-center text-muted small">
                            <i class="bx bx-map-pin me-1"></i>${provider.location}
                            <span class="mx-2">•</span>
                            <i class="bx bx-calendar me-1"></i>Since ${provider.yearEstablished}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div class="provider-services">
                    ${provider.services.map(service => 
                        `<span class="service-badge">${service}</span>`
                    ).join('')}
                </div>
                <div class="mt-2 text-muted small">
                    <i class="bx bx-time me-1"></i>Response time: ${provider.responseTime}
                </div>
            </td>
            <td>
                <div class="rating-container">
                    <div class="rating-stars">
                        <div class="rating-stars-filled" style="width: ${(provider.rating/5)*100}%"></div>
                    </div>
                    <div class="rating-info">
                        <span class="rating-value">${provider.rating}</span>
                        <span class="text-muted small">
                            <i class="bx bx-check-circle me-1"></i>${provider.completedJobs} jobs
                        </span>
                    </div>
                </div>
            </td>
            <td>
                <span class="status-pill ${provider.status.toLowerCase()}-status">
                    <i class="bx ${provider.status === 'Active' ? 'bx-check' : 'bx-time'}"></i>
                    ${provider.status}
                </span>
            </td>
            <td>
                <div class="provider-actions">
                    <button class="btn btn-icon btn-sm btn-hover-primary" title="View Details">
                        <i class="bx bx-show"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-warning" title="Edit">
                        <i class="bx bx-edit"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-${provider.status === 'Active' ? 'danger' : 'success'}" 
                            title="${provider.status === 'Active' ? 'Suspend' : 'Activate'}">
                        <i class="bx ${provider.status === 'Active' ? 'bx-pause' : 'bx-play'}"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    initializeDataTable('#providersTable');
}

// Initialize DataTable
function initializeDataTable(tableId) {
    if ($.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable().destroy();
    }
    
    $(tableId).DataTable({
        pageLength: 10,
        order: [[2, 'desc']], // Sort by joined/date column
        language: {
            search: '',
            searchPlaceholder: 'Search...',
            paginate: {
                previous: '<i class="bx bx-chevron-left"></i>',
                next: '<i class="bx bx-chevron-right"></i>'
            }
        }
    });
}

// Helper function to format dates
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Load Dashboard Stats
function loadDashboardStats() {
    const stats = {
        totalUsers: { el: 'totalUsers', value: demoData.users.residents.length + demoData.users.providers.length, prefix: '' },
        activeProviders: { el: 'activeProviders', value: demoData.providers.filter(p => p.status === 'Active').length, prefix: '' },
        totalBookings: { el: 'totalBookings', value: 12845, prefix: '' },
        totalRevenue: { el: 'totalRevenue', value: 543290, prefix: '$' }
    };

    Object.entries(stats).forEach(([key, { el, value, prefix }]) => {
        const element = document.getElementById(el);
        if (!element) return;
        
        const duration = 1500;
        const steps = 20;
        const increment = value / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.floor(increment * step), value);
            element.textContent = `${prefix}${current.toLocaleString()}`;
            
            if (step >= steps) {
                clearInterval(timer);
                element.textContent = `${prefix}${value.toLocaleString()}`;
            }
        }, duration / steps);
    });

    document.getElementById('adminEmail').textContent = 'admin@autoease.com';

    // Load Recent Users with rich data
    const recentUsers = [
        { 
            name: 'Emma Thompson',
            type: 'Resident',
            joined: '2025-11-01',
            status: 'Active',
            location: 'New York, USA',
            vehicles: 2,
            bookings: 8
        },
        { 
            name: 'James Chen',
            type: 'Provider',
            joined: '2025-10-28',
            status: 'Active',
            location: 'Los Angeles, USA',
            specialties: ['Electric Vehicles', 'Diagnostics'],
            rating: 4.9
        },
        { 
            name: 'Sofia Rodriguez',
            type: 'Resident',
            joined: '2025-10-25',
            status: 'Pending',
            location: 'Miami, USA',
            vehicles: 1,
            bookings: 3
        },
        { 
            name: 'David Kim',
            type: 'Provider',
            joined: '2025-10-22',
            status: 'Active',
            location: 'Chicago, USA',
            specialties: ['Engine Repair', 'Transmission'],
            rating: 4.8
        },
        { 
            name: 'Maria Garcia',
            type: 'Resident',
            joined: '2025-10-20',
            status: 'Active',
            location: 'Houston, USA',
            vehicles: 3,
            bookings: 12
        }
    ];

    const usersList = document.getElementById('recentUsersList');
    usersList.innerHTML = recentUsers.map(user => `
        <tr class="align-middle">
            <td>
                <div class="d-flex align-items-center">
                    <div class="user-avatar-wrapper me-3">
                        <img src="https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random" 
                             class="rounded-circle user-avatar" alt="${user.name}">
                        <span class="status-indicator ${user.status.toLowerCase()}"></span>
                    </div>
                    <div>
                        <h6 class="mb-0 fw-semibold">${user.name}</h6>
                        <div class="d-flex align-items-center">
                            <i class="bx bx-map-pin fs-sm text-muted me-1"></i>
                            <small class="text-muted">${user.location}</small>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge user-type-badge ${user.type.toLowerCase()}-badge">
                    <i class="bx ${user.type === 'Resident' ? 'bx-user' : 'bx-store-alt'} me-1"></i>
                    ${user.type}
                </span>
                ${user.type === 'Resident' ? 
                    `<div class="mt-1">
                        <small class="text-muted">
                            <i class="bx bx-car me-1"></i>${user.vehicles} vehicles
                        </small>
                    </div>` :
                    `<div class="mt-1">
                        <small class="text-muted">
                            <i class="bx bx-star me-1"></i>${user.rating} rating
                        </small>
                    </div>`
                }
            </td>
            <td>
                <div class="d-flex flex-column">
                    <div class="mb-1">${new Date(user.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <small class="text-muted">
                        ${user.type === 'Resident' ? 
                            `<i class="bx bx-bookmark me-1"></i>${user.bookings} bookings` :
                            `<i class="bx bx-certification me-1"></i>${user.specialties ? user.specialties.length : 0} specialties`
                        }
                    </small>
                </div>
            </td>
            <td>
                <span class="badge status-badge ${user.status.toLowerCase()}-badge">
                    ${user.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-icon btn-sm btn-hover-primary" title="View Profile">
                        <i class="bx bx-user"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-success" title="Message">
                        <i class="bx bx-message-rounded"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-danger" title="Remove">
                        <i class="bx bx-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    // Load Active Providers with detailed info
    const activeProviders = [
        {
            name: 'AutoCare Plus',
            services: ['Oil Change', 'Brake Service', 'Engine Diagnostics'],
            rating: 4.8,
            status: 'Active',
            location: 'Manhattan, NY',
            completedJobs: 234,
            responseTime: '< 30 mins',
            yearEstablished: 2020,
            certifications: ['ASE Certified', 'EPA Certified']
        },
        {
            name: 'Quick Fix Auto',
            services: ['Tire Service', 'AC Service', 'Battery Replacement'],
            rating: 4.5,
            status: 'Active',
            location: 'Brooklyn, NY',
            completedJobs: 189,
            responseTime: '< 1 hour',
            yearEstablished: 2021,
            certifications: ['ASE Certified']
        },
        {
            name: 'Elite Motors',
            services: ['Engine Repair', 'Diagnostics', 'Performance Tuning'],
            rating: 4.9,
            status: 'Active',
            location: 'Queens, NY',
            completedJobs: 312,
            responseTime: '< 15 mins',
            yearEstablished: 2019,
            certifications: ['ASE Certified', 'BMW Certified', 'Mercedes Certified']
        },
        {
            name: 'City Garage',
            services: ['Body Work', 'Painting', 'Collision Repair'],
            rating: 4.3,
            status: 'Pending',
            location: 'Bronx, NY',
            completedJobs: 156,
            responseTime: '< 45 mins',
            yearEstablished: 2022,
            certifications: ['I-CAR Certified']
        },
        {
            name: 'Pro Mechanics',
            services: ['General Service', 'Inspection', 'Electrical Systems'],
            rating: 4.7,
            status: 'Active',
            location: 'Staten Island, NY',
            completedJobs: 278,
            responseTime: '< 20 mins',
            yearEstablished: 2020,
            certifications: ['ASE Certified', 'Hybrid Repair Certified']
        }
    ];

    const providersList = document.getElementById('activeProvidersList');
    providersList.innerHTML = activeProviders.map(provider => `
        <tr class="align-middle provider-row">
            <td>
                <div class="d-flex align-items-center">
                    <div class="provider-avatar-wrapper me-3">
                        <img src="https://ui-avatars.com/api/?name=${provider.name.replace(' ', '+')}&background=random" 
                             class="rounded provider-avatar" alt="${provider.name}">
                        <span class="status-indicator ${provider.status.toLowerCase()}"></span>
                    </div>
                    <div>
                        <div class="d-flex align-items-center mb-1">
                            <h6 class="mb-0 fw-semibold me-2">${provider.name}</h6>
                            ${provider.certifications.map(cert => 
                                `<span class="certification-badge" title="${cert}">
                                    <i class="bx bx-check-shield"></i>
                                </span>`
                            ).join('')}
                        </div>
                        <div class="d-flex align-items-center text-muted small">
                            <i class="bx bx-map-pin me-1"></i>${provider.location}
                            <span class="mx-2">•</span>
                            <i class="bx bx-calendar me-1"></i>Since ${provider.yearEstablished}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div class="provider-services">
                    ${provider.services.map(service => 
                        `<span class="service-badge">${service}</span>`
                    ).join('')}
                </div>
                <div class="mt-2 text-muted small">
                    <i class="bx bx-time me-1"></i>Response time: ${provider.responseTime}
                </div>
            </td>
            <td>
                <div class="rating-container">
                    <div class="rating-stars">
                        <div class="rating-stars-filled" style="width: ${(provider.rating/5)*100}%"></div>
                    </div>
                    <div class="rating-info">
                        <span class="rating-value">${provider.rating}</span>
                        <span class="text-muted small">
                            <i class="bx bx-check-circle me-1"></i>${provider.completedJobs} jobs
                        </span>
                    </div>
                </div>
            </td>
            <td>
                <span class="status-pill ${provider.status.toLowerCase()}-status">
                    <i class="bx ${provider.status === 'Active' ? 'bx-check' : 'bx-time'}"></i>
                    ${provider.status}
                </span>
            </td>
            <td>
                <div class="provider-actions">
                    <button class="btn btn-icon btn-sm btn-hover-primary" title="View Details">
                        <i class="bx bx-show"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-warning" title="Edit">
                        <i class="bx bx-edit"></i>
                    </button>
                    <button class="btn btn-icon btn-sm btn-hover-${provider.status === 'Active' ? 'danger' : 'success'}" 
                            title="${provider.status === 'Active' ? 'Suspend' : 'Activate'}">
                        <i class="bx ${provider.status === 'Active' ? 'bx-pause' : 'bx-play'}"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    // Load Activity Feed
    const activities = [
        { type: 'user', action: 'New user registered', time: '5 minutes ago' },
        { type: 'booking', action: 'New booking #1234 created', time: '10 minutes ago' },
        { type: 'provider', action: 'Provider Elite Motors completed service #5678', time: '15 minutes ago' },
        { type: 'system', action: 'System backup completed', time: '30 minutes ago' },
        { type: 'booking', action: 'Booking #4321 cancelled', time: '1 hour ago' }
    ];

    const activityFeed = document.getElementById('activityFeed');
    activities.map(activity => `
        <div class="d-flex align-items-center mb-3">
            <div class="activity-icon me-3">
                <i class="bx ${
                    activity.type === 'user' ? 'bxs-user text-primary' :
                    activity.type === 'booking' ? 'bxs-calendar-check text-success' :
                    activity.type === 'provider' ? 'bxs-car-mechanic text-warning' :
                    'bxs-cog text-info'
                } fs-4"></i>
            </div>
            <div>
                <p class="mb-0">${activity.action}</p>
                <small class="text-muted">${activity.time}</small>
            </div>
        </div>
    `).join('');

    // After loading mock data, initialize section
    if (typeof loadSectionData === 'function') {
        const currentSection = window.location.hash.replace('#', '') || 'dashboard';
        loadSectionData(currentSection);
    }
}

// Helper Functions
function initializeTables() {
    const tableIds = ['#usersTable', '#providersTable'];
    tableIds.forEach(tableId => {
        const table = $(tableId);
        if (table.length) {
            if ($.fn.DataTable.isDataTable(tableId)) {
                table.DataTable().destroy();
            }
            table.DataTable({
                pageLength: 10,
                lengthChange: false,
                dom: '<"top"f>rt<"bottom"p><"clear">',
                language: {
                    search: '',
                    searchPlaceholder: 'Search...'
                }
            });
        }
    });
}

// Export Data Function
function exportData(format) {
    // Implement export functionality
    alert(`Exporting data in ${format.toUpperCase()} format...`);
}

// Handle Report Form Submission
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const reportData = Object.fromEntries(formData.entries());
    
    // Implement report generation
    alert('Generating report with the following parameters:\n' + JSON.stringify(reportData, null, 2));
    
    // Close modal after submission
    const modal = bootstrap.Modal.getInstance(document.getElementById('generateReportModal'));
    modal.hide();
});

// Wire booking filters and compose
document.addEventListener('DOMContentLoaded', function() {
    const allBtn = document.getElementById('filterAllBookings');
    const pendingBtn = document.getElementById('filterPendingBookings');
    const confirmedBtn = document.getElementById('filterConfirmedBookings');
    const composeBtn = document.getElementById('composeMessageBtn');

    if (allBtn) allBtn.addEventListener('click', function() { renderBookingsSection(); });
    if (pendingBtn) pendingBtn.addEventListener('click', function() { renderBookingsSection('pending'); });
    if (confirmedBtn) confirmedBtn.addEventListener('click', function() { renderBookingsSection('confirmed'); });
    if (composeBtn) composeBtn.addEventListener('click', function() {
        const to = prompt('Send message to (email):');
        const subject = prompt('Subject:');
        const body = prompt('Message:');
        if (to && subject && body) alert('Message sent (demo)');
    });
});