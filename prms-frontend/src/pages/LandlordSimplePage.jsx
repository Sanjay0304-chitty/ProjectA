import {
  Building2,
  CalendarDays,
  CircleHelp,
  MessageCircle,
  Search,
  Settings,
  WalletCards,
  Wrench,
} from 'lucide-react'
import './LandlordSimplePage.css'

const pageConfig = {
  properties: {
    title: 'My Properties',
    subtitle: 'Manage your listings, unit status, rental pricing, and approval progress.',
    icon: Building2,
    cards: [
      { label: 'Total Listings', value: '18' },
      { label: 'Occupied Units', value: '16' },
      { label: 'Vacant Units', value: '2' },
      { label: 'Pending Approval', value: '3' },
    ],
    columns: ['Property', 'Location', 'Monthly Rent', 'Status', 'Action'],
    rows: [
      ['The Azure Suites', 'Kuala Lumpur', 'RM 4,500', 'Active', 'View'],
      ['Metro Hub', 'Petaling Jaya', 'RM 3,200', 'Active', 'Edit'],
      ['Green Valley Villas', 'Johor Bahru', 'RM 2,900', 'Pending', 'Review'],
    ],
  },

  bookings: {
    title: 'Booking Requests',
    subtitle: 'Review tenant booking requests, approvals, scheduled viewings, and cancellations.',
    icon: CalendarDays,
    cards: [
      { label: 'Total Bookings', value: '42' },
      { label: 'Pending', value: '18' },
      { label: 'Approved', value: '21' },
      { label: 'Cancelled', value: '3' },
    ],
    columns: ['Tenant', 'Property', 'Date', 'Status', 'Action'],
    rows: [
      ['Sarah Jenkins', 'The Azure Suites', 'Today', 'Pending', 'Approve'],
      ['Michael Chen', 'Metro Hub', 'Tomorrow', 'Pending', 'Review'],
      ['Daniel Wong', 'Green Valley Villas', 'Friday', 'Approved', 'View'],
    ],
  },

  finance: {
    title: 'Finance',
    subtitle: 'Track rent income, monthly performance, deposits, and payment records.',
    icon: WalletCards,
    cards: [
      { label: 'Monthly Revenue', value: 'RM 58,400' },
      { label: 'Pending Rent', value: 'RM 8,200' },
      { label: 'Deposits', value: 'RM 22,000' },
      { label: 'Late Payments', value: '4' },
    ],
    columns: ['Transaction', 'Tenant', 'Amount', 'Status', 'Action'],
    rows: [
      ['RENT-8841', 'Sarah Jenkins', 'RM 4,500', 'Paid', 'View'],
      ['RENT-8842', 'Marcus Chen', 'RM 3,200', 'Pending', 'Remind'],
      ['DEP-2241', 'Daniel Wong', 'RM 6,000', 'Paid', 'View'],
    ],
  },

  maintenance: {
    title: 'Maintenance',
    subtitle: 'Manage maintenance tickets, urgent repairs, staff assignments, and tenant updates.',
    icon: Wrench,
    cards: [
      { label: 'Open Tickets', value: '7' },
      { label: 'High Priority', value: '3' },
      { label: 'In Progress', value: '4' },
      { label: 'Completed', value: '28' },
    ],
    columns: ['Ticket', 'Property', 'Issue', 'Priority', 'Action'],
    rows: [
      ['TCK-4421', 'The Azure Suites', 'Air-conditioning', 'High', 'Assign'],
      ['TCK-4422', 'Metro Hub', 'Water Pressure', 'Medium', 'View'],
      ['TCK-4423', 'Green Valley Villas', 'Electrical', 'High', 'Review'],
    ],
  },

  messages: {
    title: 'Messages',
    subtitle: 'Communicate with tenants, respond to booking questions, and manage support threads.',
    icon: MessageCircle,
    cards: [
      { label: 'Unread', value: '9' },
      { label: 'Tenant Chats', value: '14' },
      { label: 'Admin Messages', value: '3' },
      { label: 'Maintenance Threads', value: '5' },
    ],
    columns: ['Conversation', 'Related Property', 'Category', 'Status', 'Action'],
    rows: [
      ['Sarah Jenkins', 'The Azure Suites', 'Booking', 'Unread', 'Reply'],
      ['Marcus Chen', 'Metro Hub', 'Maintenance', 'Open', 'View'],
      ['Admin Support', 'Green Valley Villas', 'Approval', 'Pending', 'Reply'],
    ],
  },

  settings: {
    title: 'Settings',
    subtitle: 'Manage landlord account preferences, notifications, security, and profile details.',
    icon: Settings,
    cards: [
      { label: 'Profile', value: 'Active' },
      { label: 'Notifications', value: 'On' },
      { label: 'Security', value: 'Secure' },
      { label: 'Bank Account', value: 'Linked' },
    ],
    columns: ['Setting', 'Category', 'Status', 'Last Updated', 'Action'],
    rows: [
      ['Profile Details', 'Account', 'Active', 'Today', 'Manage'],
      ['Rent Alerts', 'Notification', 'Enabled', 'Today', 'Manage'],
      ['Bank Payout', 'Finance', 'Linked', 'Yesterday', 'Manage'],
    ],
  },

  help: {
    title: 'Help Center',
    subtitle: 'Find landlord guides, support cases, and troubleshooting help.',
    icon: CircleHelp,
    cards: [
      { label: 'Open Cases', value: '2' },
      { label: 'Guides', value: '12' },
      { label: 'Response SLA', value: '4h' },
      { label: 'Status', value: 'Online' },
    ],
    columns: ['Topic', 'Category', 'Priority', 'Status', 'Action'],
    rows: [
      ['How to approve tenant booking', 'Bookings', 'Low', 'Available', 'Open'],
      ['Payment not reflected', 'Finance', 'High', 'Open', 'View'],
      ['Listing verification issue', 'Properties', 'Medium', 'Open', 'Review'],
    ],
  },
}

function LandlordSimplePage({ type }) {
  const config = pageConfig[type] || pageConfig.properties
  const Icon = config.icon

  return (
    <>
      <section className="landlord-simple-hero">
        <div>
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>

        <button type="button" className="landlord-simple-primary-btn">
          Export
        </button>
      </section>

      <section className="landlord-simple-cards">
        {config.cards.map((card) => (
          <article className="landlord-simple-card" key={card.label}>
            <div className="landlord-simple-icon">
              <Icon size={26} />
            </div>

            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </section>

      <section className="landlord-simple-table-card">
        <div className="landlord-simple-table-header">
          <h2>{config.title} Records</h2>

          <div className="landlord-simple-search">
            <Search size={17} />
            <input type="text" placeholder="Search records..." />
          </div>
        </div>

        <div className="landlord-simple-table">
          <div
            className="landlord-simple-table-head"
            style={{ gridTemplateColumns: `repeat(${config.columns.length}, 1fr)` }}
          >
            {config.columns.map((column) => (
              <p key={column}>{column}</p>
            ))}
          </div>

          {config.rows.map((row) => (
            <div
              className="landlord-simple-table-row"
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

export default LandlordSimplePage