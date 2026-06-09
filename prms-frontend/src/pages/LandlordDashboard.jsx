import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  Download,
  Plus,
  Users,
  WalletCards,
  Wrench,
} from 'lucide-react'
import './LandlordDashboard.css'

function LandlordDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('prmsDashboardPath', '/landlord')
  }, [])

  const approvals = [
    {
      name: 'Sarah Jenkins',
      unit: 'Unit 402 - The Azure Suites',
      time: '2h ago',
      initials: 'SJ',
    },
    {
      name: 'Michael Chen',
      unit: 'Ground Floor - Metro Hub',
      time: '5h ago',
      initials: 'MC',
    },
  ]

  const bars = [
    { label: 'Jan', height: 22, active: false },
    { label: 'Feb', height: 36, active: false },
    { label: 'Mar', height: 28, active: false },
    { label: 'Apr', height: 55, active: true },
    { label: 'May', height: 42, active: false },
    { label: 'Jun', height: 70, active: false },
    { label: 'Jul', height: 52, active: false },
    { label: 'Aug', height: 76, active: false },
    { label: 'Sep', height: 84, active: true },
  ]

  return (
    <>
      <div className="landlord-page-title-row">
        <div>
          <h1>Portfolio Overview</h1>
          <p>Welcome back, Alex. Here is what&apos;s happening with your properties today.</p>
        </div>

        <div className="landlord-page-actions">
          <button type="button" className="landlord-export-btn">
            <Download size={20} />
            Export Report
          </button>

          <button
            type="button"
            className="landlord-new-listing-btn"
            onClick={() => navigate('/landlord/properties')}
          >
            <Plus size={22} />
            New Listing
          </button>
        </div>
      </div>

      <section className="landlord-stats">
        <div className="landlord-stat-card">
          <div className="landlord-stat-icon purple-soft">
            <WalletCards size={28} />
          </div>

          <span className="growth-pill">↗ 12.5%</span>

          <p>Total Revenue</p>
          <h3>RM 142,850.00</h3>

          <div className="stat-line">
            <span></span>
          </div>
        </div>

        <div className="landlord-stat-card">
          <div className="landlord-stat-icon blue-soft">
            <Users size={28} />
          </div>

          <span className="growth-pill">↗ 2.1%</span>

          <p>Occupancy Rate</p>
          <h3>94.2%</h3>
          <small>42 of 45 units active</small>
        </div>

        <div className="landlord-stat-card">
          <div className="landlord-stat-icon blue-soft">
            <Bell size={28} />
          </div>

          <span className="action-pill">Action Required</span>

          <p>Pending Bookings</p>
          <h3>18</h3>
          <small>Waitlist: 4 tenants</small>
        </div>

        <div className="landlord-stat-card">
          <div className="landlord-stat-icon red-soft">
            <Wrench size={28} />
          </div>

          <span className="priority-pill">High Priority</span>

          <p>Open Tickets</p>
          <h3>7</h3>
          <small>3 urgent maintenance</small>
        </div>
      </section>

      <section className="landlord-grid">
        <div className="revenue-panel">
          <div className="panel-title">
            <div>
              <h3>Revenue Growth</h3>
              <p>Comparison of monthly and weekly performance</p>
            </div>

            <button type="button">Last 6 Months</button>
          </div>

          <div className="bar-chart">
            {bars.map((bar) => (
              <div className="bar-item" key={bar.label}>
                <div
                  className={bar.active ? 'bar active' : 'bar'}
                  style={{ height: `${bar.height}%` }}
                ></div>
                <span>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="approval-panel">
          <div className="approval-header">
            <h3>Pending Approvals</h3>
            <span>3 New</span>
          </div>

          <div className="approval-list">
            {approvals.map((approval) => (
              <div className="approval-card" key={approval.name}>
                <div className="approval-avatar">{approval.initials}</div>

                <div className="approval-info">
                  <div>
                    <h4>{approval.name}</h4>
                    <span>{approval.time}</span>
                  </div>

                  <p>{approval.unit}</p>

                  <div className="approval-actions">
                    <button type="button" className="approve-btn">
                      Approve
                    </button>

                    <button type="button" className="decline-btn">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="property-summary">
        <div className="summary-card">
          <div className="summary-image image-one"></div>
          <div>
            <h3>The Azure Suites</h3>
            <p>Kuala Lumpur · 18 active units</p>
          </div>
          <span>RM 58,400</span>
        </div>

        <div className="summary-card">
          <div className="summary-image image-two"></div>
          <div>
            <h3>Metro Hub</h3>
            <p>Petaling Jaya · 12 active units</p>
          </div>
          <span>RM 34,200</span>
        </div>

        <div className="summary-card">
          <div className="summary-image image-three"></div>
          <div>
            <h3>Green Valley Villas</h3>
            <p>Johor Bahru · 9 active units</p>
          </div>
          <span>RM 27,900</span>
        </div>
      </section>
    </>
  )
}

export default LandlordDashboard