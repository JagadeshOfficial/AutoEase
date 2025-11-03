// Admin Dashboard JavaScript
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

// Mock Data Loading Function
function loadMockData() {
    // Update Statistics
    document.getElementById('totalUsers').textContent = '2,547';
    document.getElementById('activeProviders').textContent = '156';
    document.getElementById('totalBookings').textContent = '12,845';
    document.getElementById('totalRevenue').textContent = '$543,290';
    document.getElementById('adminEmail').textContent = 'admin@autoease.com';

    // Load Recent Users
    const recentUsers = [
        { name: 'John Doe', type: 'Resident', joined: '2023-12-01', status: 'Active' },
        { name: 'Jane Smith', type: 'Provider', joined: '2023-11-28', status: 'Active' },
        { name: 'Mike Johnson', type: 'Resident', joined: '2023-11-25', status: 'Pending' },
        { name: 'Sarah Wilson', type: 'Provider', joined: '2023-11-22', status: 'Active' },
        { name: 'Tom Brown', type: 'Resident', joined: '2023-11-20', status: 'Inactive' }
    ];

    const usersList = document.getElementById('recentUsersList');
    usersList.innerHTML = recentUsers.map(user => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random" 
                         class="rounded-circle me-2" style="width: 32px; height: 32px;">
                    <div>
                        <h6 class="mb-0">${user.name}</h6>
                        <small class="text-muted">ID: #${Math.floor(Math.random() * 10000)}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-primary">${user.type}</span></td>
            <td>${user.joined}</td>
            <td>
                <span class="badge bg-${user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'danger'}">
                    ${user.status}
                </span>
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary">Edit</button>
                    <button class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    // Load Active Providers
    const activeProviders = [
        { name: 'AutoCare Plus', services: ['Oil Change', 'Brake Service'], rating: 4.8, status: 'Active' },
        { name: 'Quick Fix Auto', services: ['Tire Service', 'AC Service'], rating: 4.5, status: 'Active' },
        { name: 'Elite Motors', services: ['Engine Repair', 'Diagnostics'], rating: 4.9, status: 'Active' },
        { name: 'City Garage', services: ['Body Work', 'Painting'], rating: 4.3, status: 'Pending' },
        { name: 'Pro Mechanics', services: ['General Service', 'Inspection'], rating: 4.7, status: 'Active' }
    ];

    const providersList = document.getElementById('activeProvidersList');
    providersList.innerHTML = activeProviders.map(provider => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${provider.name.replace(' ', '+')}&background=random" 
                         class="rounded-circle me-2" style="width: 32px; height: 32px;">
                    <div>
                        <h6 class="mb-0">${provider.name}</h6>
                        <small class="text-muted">ID: #${Math.floor(Math.random() * 10000)}</small>
                    </div>
                </div>
            </td>
            <td>
                ${provider.services.map(service => 
                    `<span class="badge bg-info me-1">${service}</span>`
                ).join('')}
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <span class="me-2">${provider.rating}</span>
                    <div class="text-warning">
                        ${'★'.repeat(Math.floor(provider.rating))}${'☆'.repeat(5-Math.floor(provider.rating))}
                    </div>
                </div>
            </td>
            <td>
                <span class="badge bg-${provider.status === 'Active' ? 'success' : 'warning'}">
                    ${provider.status}
                </span>
            </td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary">View</button>
                    <button class="btn btn-sm btn-outline-danger">Suspend</button>
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
    activityFeed.innerHTML = activities.map(activity => `
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