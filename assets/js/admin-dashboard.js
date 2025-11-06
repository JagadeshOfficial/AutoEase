/*
  Admin dashboard behaviours:
  - sidebar show/hide sections (hash + click)
  - table initialization (DataTables)
  - mock data population and charts (ApexCharts)
*/

(function(){
  // Safe check for external auth helper
  function getAuth() {
    try { return typeof checkAuth === 'function' ? checkAuth() : { userType: 'admin', userEmail: 'admin@autoease.com' }; }
    catch(e){ return { userType:'admin', userEmail:'admin@autoease.com' }; }
  }

  function el(sel){ return document.querySelector(sel); }
  function els(sel){ return Array.from(document.querySelectorAll(sel)); }

  function setActiveSidebar(id){
    els('.sidebar-link').forEach(a => a.classList.toggle('active', (a.getAttribute('data-section')===id)));
  }

  function showSection(id){
    if(!id) id='dashboard';
    els('.admin-section').forEach(s => {
      if(s.id===id){ s.style.display=''; s.classList.add('section-active'); }
      else { s.style.display='none'; s.classList.remove('section-active'); }
    });
    setActiveSidebar(id);
    try { window.location.hash = id; } catch(e){}
    // refresh content
    initTables();
    loadSectionData(id);
  }

  // Sidebar click + hash handling
  document.addEventListener('DOMContentLoaded', function(){
    const auth = getAuth();
    if(auth.userType !== 'admin'){ try{ window.location.href = '/index.html'; } catch(e){} }

    const adminEmailEl = document.getElementById('adminEmail');
    if(adminEmailEl) adminEmailEl.textContent = auth.userEmail || '';

    els('.sidebar-link').forEach(a=>{
      a.addEventListener('click', function(e){
        e.preventDefault();
        const id = this.getAttribute('data-section') || (this.getAttribute('href')||'').replace('#','');
        showSection(id);
        window.scrollTo(0,0);
      });
    });

    window.addEventListener('hashchange', function(){
      const id = (window.location.hash||'#dashboard').replace('#','');
      showSection(id);
    });

    // initial
    const start = (window.location.hash || '#dashboard').replace('#','');
    showSection(start);
    initCharts();
    populateMockData();
  });

  // Tables
  let tables = {};
  function initTables(){
    try{
      // destroy if exists
      ['#usersTable','#providersTable','#bookingsTable'].forEach(selector=>{
        if($.fn.dataTable && $.fn.dataTable.isDataTable(selector)){
          $(selector).DataTable().destroy();
        }
      });
      // init with minimal options
      tables.users = $('#usersTable').DataTable({ pageLength:5, lengthChange:false, searching:true });
      tables.providers = $('#providersTable').DataTable({ pageLength:5, lengthChange:false, searching:true });
      tables.bookings = $('#bookingsTable').DataTable({ pageLength:8, lengthChange:false, searching:true });
    }catch(e){
      console.warn('DataTables init skipped', e);
    }
  }

  // Mock data + rendering
  const MOCK = {
    users: [
      {name:'Alice Johnson', type:'User', joined:'2025-01-10', status:'Active'},
      {name:'Bob Martin', type:'User', joined:'2025-02-05', status:'Suspended'},
      {name:'Charlie Ray', type:'Admin', joined:'2024-11-20', status:'Active'}
    ],
    providers: [
      {name:'Speedy Auto', services:'Oil Change, Brakes', rating:4.8, status:'Active'},
      {name:'Pro Mechanics', services:'AC Service', rating:4.5, status:'Active'}
    ],
    bookings: [
      {id:'BKG-1001', user:'Alice Johnson', provider:'Speedy Auto', service:'Oil Change', date:'2025-11-01', status:'Confirmed'},
      {id:'BKG-1002', user:'Bob Martin', provider:'Pro Mechanics', service:'AC Service', date:'2025-11-03', status:'Pending'}
    ],
    activity:[
      'User Alice Johnson updated profile.',
      'Provider Speedy Auto added new service.',
      'Booking BKG-1002 created.'
    ]
  };

  function populateMockData(){
    // stats
    const statsRow = document.getElementById('statsRow');
    if(statsRow){
      statsRow.innerHTML = `
        <div class="col-md-3"><div class="stat-card dashboard-card bg-primary text-white"><div>Total Users<div class="h4" id="totalUsers">${MOCK.users.length}</div></div></div></div>
        <div class="col-md-3"><div class="stat-card dashboard-card" style="background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff"><div>Active Providers<div class="h4" id="activeProviders">${MOCK.providers.length}</div></div></div></div>
        <div class="col-md-3"><div class="stat-card dashboard-card" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff"><div>Total Bookings<div class="h4" id="totalBookings">${MOCK.bookings.length}</div></div></div></div>
        <div class="col-md-3"><div class="stat-card dashboard-card" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff"><div>Total Revenue<div class="h4" id="totalRevenue">$${(MOCK.bookings.length*120).toFixed(0)}</div></div></div></div>
      `;
    }

    // users table
    const usersTbody = document.getElementById('recentUsersList');
    if(usersTbody){
      usersTbody.innerHTML = MOCK.users.map(u=>`
        <tr>
          <td>${u.name}</td><td>${u.type}</td><td>${u.joined}</td><td>${u.status}</td>
          <td><button class="btn btn-sm btn-outline-primary">View</button></td>
        </tr>
      `).join('');
    }

    // providers table
    const provTbody = document.getElementById('activeProvidersList');
    if(provTbody){
      provTbody.innerHTML = MOCK.providers.map(p=>`
        <tr>
          <td>${p.name}</td><td>${p.services}</td><td>${p.rating}</td><td>${p.status}</td>
          <td><button class="btn btn-sm btn-outline-primary">View</button></td>
        </tr>
      `).join('');
    }

    // bookings
    const bookingsTbody = document.getElementById('bookingsList');
    if(bookingsTbody){
      bookingsTbody.innerHTML = MOCK.bookings.map(b=>`
        <tr>
          <td>${b.id}</td><td>${b.user}</td><td>${b.provider}</td><td>${b.service}</td><td>${b.date}</td><td>${b.status}</td>
          <td><button class="btn btn-sm btn-outline-primary">Details</button></td>
        </tr>
      `).join('');
    }

    // messages
    const messagesList = document.getElementById('messagesList');
    if(messagesList){
      messagesList.innerHTML = `<div class="list-group">${MOCK.activity.map(m=>`<div class="list-group-item">${m}</div>`).join('')}</div>`;
    }

    // activity feed
    const feed = document.getElementById('activityFeed');
    if(feed){ feed.innerHTML = MOCK.activity.map(a=>`<div class="mb-2 small text-muted">• ${a}</div>`).join(''); }

    // re-init tables after DOM update
    setTimeout(initTables, 50);
  }

  // charts
  let revenueChart, categoriesChart;
  function initCharts(){
    try{
      const revenueEl = document.getElementById('revenueChart');
      if(revenueEl){
        const options = {
          series:[{name:'Revenue', data:[3000,4200,3500,5000,4800,6200,7000,6500,7200,8000,7600,9000]}],
          chart:{type:'area', height:260, toolbar:{show:false}},
          stroke:{curve:'smooth'},
          xaxis:{categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']},
          colors:[ '#2563eb' ]
        };
        revenueChart = new ApexCharts(revenueEl, options);
        revenueChart.render();
      }

      const categoriesEl = document.getElementById('serviceCategories');
      if(categoriesEl){
        const opt = {
          series:[44,55,13,43],
          chart:{type:'donut', height:240},
          labels:['Oil Change','Brake Repair','AC Service','Diagnostics'],
          colors:['#3b82f6','#06b6d4','#f59e0b','#10b981']
        };
        categoriesChart = new ApexCharts(categoriesEl, opt);
        categoriesChart.render();
      }
    }catch(e){ console.warn('charts init', e); }
  }

  // called when switching section (optional)
  function loadSectionData(id){
    // placeholder: in future load via API per section
    // currently mock data already present
  }

  // export stub
  window.exportData = function(format){
    alert('Export '+format+' is not implemented in demo.');
  };

  // expose minimal API
  window.loadSectionData = loadSectionData;
  window.populateMockData = populateMockData;
})();