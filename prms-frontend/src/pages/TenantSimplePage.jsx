import {
  CalendarDays,
  CircleHelp,
  MessageCircle,
  Search,
  Settings,
  WalletCards,
  Wrench,
} from 'lucide-react'
import './TenantSimplePage.css'

const pageConfig = {
  bookings: {
    title: 'My Bookings',
    subtitle: 'Track viewing appointments, rental applications, approvals, and cancellations.',
    icon: CalendarDays,
    cards: [
      { label: 'Total Bookings', value: '8' },
      { label: 'Pending', value: '3' },
      { label: 'Approved', value: '4' },
      { label: 'Cancelled', value: '1' },
    ],
    columns: ['Property', 'Landlord', 'Viewing Date', 'Status', 'Action'],
    rows: [
      ['The Grand Atrium', 'Alex Sterling', 'Tomorrow', 'Pending', 'View'],
      ['Azure Heights', 'Michael Chen', 'Friday', 'Approved', 'Reschedule'],
      ['Green Valley Villas', 'Sarah Lim', 'Next Week', 'Pending', 'Cancel'],
    ],
  },

  payments: {
    title: 'Payments',
    subtitle: 'Manage rent payments, deposits, outstanding balances, and receipts.',
    icon: WalletCards,
    cards: [
      { label: 'Next Rent Due', value: 'RM 2,500' },
      { label: 'Paid This Month', value: 'RM 2,500' },
      { label: 'Outstanding', value: 'RM 0' },
      { label: 'Deposit Balance', value: 'RM 5,000' },
    ],
    columns: ['Payment ID', 'Property', 'Amount', 'Status', 'Action'],
    rows: [
      ['PAY-8841', 'Skyline Tower', 'RM 2,500', 'Due Soon', 'Pay Now'],
      ['PAY-8840', 'Skyline Tower', 'RM 2,500', 'Paid', 'Receipt'],
      ['DEP-2241', 'Skyline Tower', 'RM 5,000', 'Held', 'View'],
    ],
  },

  maintenance: {
    title: 'Maintenance Requests',
    subtitle: 'Submit issues, track repair progress, and communicate with landlords.',
    icon: Wrench,
    cards: [
      { label: 'Open Requests', value: '3' },
      { label: 'In Progress', value: '2' },
      { label: 'Completed', value: '8' },
      { label: 'Urgent', value: '1' },
    ],
    columns: ['Ticket ID', 'Property', 'Issue', 'Status', 'Action'],
    rows: [
      ['TCK-4421', 'Skyline Tower', 'Air-conditioning', 'In Progress', 'View'],
      ['TCK-4422', 'Skyline Tower', 'Water Pressure', 'Approved', 'Update'],
      ['TCK-4423', 'Green Valley Villas', 'Door Lock', 'Open', 'Message'],
    ],
  },

  messages: {
    title: 'Messages',
    subtitle: 'Chat with landlords, admin support, and maintenance contacts.',
    icon: MessageCircle,
    cards: [
      { label: 'Unread', value: '6' },
      { label: 'Landlord Chats', value: '4' },
      { label: 'Admin Support', value: '2' },
      { label: 'Maintenance Threads', value: '3' },
    ],
    columns: ['Conversation', 'Related Property', 'Category', 'Status', 'Action'],
    rows: [
      ['Alex Sterling', 'Skyline Tower', 'Rent Question', 'Unread', 'Reply'],
      ['Admin Support', 'Account Verification', 'Support', 'Pending', 'View'],
      ['Maintenance Team', 'Air-conditioning', 'Repair', 'Open', 'Reply'],
    ],
  },

  settings: {
    title: 'Settings',
    subtitle: 'Manage tenant profile, notifications, security, and payment methods.',
    icon: Settings,
    cards: [
      { label: 'Profile', value: 'Active' },
      { label: 'Notifications', value: 'On' },
      { label: 'Security', value: 'Secure' },
      { label: 'Payment Method', value: 'Linked' },
    ],
    columns: ['Setting', 'Category', 'Status', 'Last Updated', 'Action'],
    rows: [
      ['Profile Details', 'Account', 'Active', 'Today', 'Manage'],
      ['Payment Method', 'Payments', 'Linked', 'Yesterday', 'Manage'],
      ['Login Verification', 'Security', 'Enabled', 'Today', 'Manage'],
    ],
  },

  help: {
    title: 'Help Center',
    subtitle: 'Find tenant guides, support cases, and troubleshooting help.',
    icon: CircleHelp,
    cards: [
      { label: 'Open Cases', value: '1' },
      { label: 'Help Guides', value: '16' },
      { label: 'Response SLA', value: '4h' },
      { label: 'System Status', value: 'Online' },
    ],
    columns: ['Topic', 'Category', 'Priority', 'Status', 'Action'],
    rows: [
      ['How to pay rent', 'Payments', 'Low', 'Available', 'Open'],
      ['Booking cancellation guide', 'Bookings', 'Low', 'Available', 'Open'],
      ['Maintenance request issue', 'Maintenance', 'Medium', 'Open', 'View'],
    ],
  },
}

function TenantSimplePage({ type }) {
  const config = pageConfig[type] || pageConfig.bookings
  const Icon = config.icon

  return (
    <>
      <section className="tenant-simple-hero">
        <div>
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>

        <button type="button" className="tenant-simple-primary-btn">
          New Request
        </button>
      </section>

      <section className="tenant-simple-cards">
        {config.cards.map((card) => (
          <article className="tenant-simple-card" key={card.label}>
            <div className="tenant-simple-icon">
              <Icon size={26} />
            </div>

            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </section>

      <section className="tenant-simple-table-card">
        <div className="tenant-simple-table-header">
          <h2>{config.title} Records</h2>

          <div className="tenant-simple-search">
            <Search size={17} />
            <input type="text" placeholder="Search records..." />
          </div>
        </div>

        <div className="tenant-simple-table">
          <div
            className="tenant-simple-table-head"
            style={{ gridTemplateColumns: `repeat(${config.columns.length}, 1fr)` }}
          >
            {config.columns.map((column) => (
              <p key={column}>{column}</p>
            ))}
          </div>

          {config.rows.map((row) => (
            <div
              className="tenant-simple-table-row"
              style={{ gridTemplateColumns: `repeat(${config.columns.length}, 1fr)` }}
              key={row.join('-')}
            >
              {row.map((cell, index) => (
                <div key={`${cell}-${index}`}>
                  {index === row.length - 1 ? (
                    <button type="button">{cell}</button>
                  ) : (
                    <span>{cell}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default TenantSimplePage