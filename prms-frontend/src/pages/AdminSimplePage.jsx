import {
  Building2,
  CalendarDays,
  CircleHelp,
  FileText,
  MessageCircle,
  Search,
  ShieldCheck,
  Users,
  WalletCards,
  Wrench,
} from 'lucide-react'
import './AdminSimplePage.css'

const pageConfig = {
  users: {
    title: 'User Management',
    subtitle: 'Manage tenants, landlords, admins, account status, and KYC verification.',
    icon: Users,
    cards: [
      { label: 'Total Users', value: '12,482' },
      { label: 'Tenants', value: '8,940' },
      { label: 'Landlords', value: '3,214' },
      { label: 'Pending KYC', value: '328' },
    ],
    columns: ['User', 'Role', 'KYC Status', 'Account Status', 'Action'],
    rows: [
      ['Julianna DeWitt', 'Landlord', 'Verified', 'Active', 'View'],
      ['Marcus Chen', 'Tenant', 'Pending', 'Active', 'Verify'],
      ['Sarah Al-Zaid', 'Admin', 'Verified', 'Active', 'View'],
    ],
  },

  properties: {
    title: 'Property Management',
    subtitle: 'Review listings, approve properties, monitor flagged units, and manage visibility.',
    icon: Building2,
    cards: [
      { label: 'Total Properties', value: '186' },
      { label: 'Active Listings', value: '142' },
      { label: 'Pending Approval', value: '31' },
      { label: 'Flagged', value: '13' },
    ],
    columns: ['Property', 'Owner', 'Location', 'Rent', 'Action'],
    rows: [
      ['The Pavilion Residences', 'Alex Sterling', 'Bukit Bintang', 'RM 4,500', 'Review'],
      ['Mont Kiara Luxury Suites', 'Sarah Jenkins', 'Mont Kiara', 'RM 3,200', 'Approve'],
      ['Green Valley Villas', 'Michael Chen', 'Johor Bahru', 'RM 2,900', 'View'],
    ],
  },

  bookings: {
    title: 'Booking Management',
    subtitle: 'Monitor rental bookings, approvals, cancellations, and disputes.',
    icon: CalendarDays,
    cards: [
      { label: 'Total Bookings', value: '1,284' },
      { label: 'Pending', value: '86' },
      { label: 'Approved', value: '1,102' },
      { label: 'Disputed', value: '12' },
    ],
    columns: ['Tenant', 'Property', 'Landlord', 'Status', 'Action'],
    rows: [
      ['Marcus Chen', 'The Azure Suites', 'Alex Sterling', 'Pending', 'Review'],
      ['Sarah Jenkins', 'Metro Hub', 'Michael Chen', 'Approved', 'View'],
      ['Daniel Wong', 'Green Valley Villas', 'Alex Sterling', 'Disputed', 'Resolve'],
    ],
  },

  finance: {
    title: 'Finance Console',
    subtitle: 'Track platform revenue, payment activity, refunds, and failed transactions.',
    icon: WalletCards,
    cards: [
      { label: 'Transaction Volume', value: 'RM 4.2M' },
      { label: 'Platform Revenue', value: 'RM 168K' },
      { label: 'Pending Payments', value: '42' },
      { label: 'Failed Payments', value: '9' },
    ],
    columns: ['Transaction ID', 'User', 'Amount', 'Status', 'Action'],
    rows: [
      ['TXN-8892', 'Marcus Chen', 'RM 2,500', 'Completed', 'View'],
      ['TXN-8893', 'Sarah Jenkins', 'RM 4,500', 'Pending', 'Review'],
      ['TXN-8894', 'Daniel Wong', 'RM 350', 'Failed', 'Resolve'],
    ],
  },

  maintenance: {
    title: 'Maintenance Center',
    subtitle: 'Track maintenance tickets, priorities, progress, and assigned staff.',
    icon: Wrench,
    cards: [
      { label: 'Open Tickets', value: '72' },
      { label: 'High Priority', value: '7' },
      { label: 'In Progress', value: '31' },
      { label: 'Completed', value: '214' },
    ],
    columns: ['Ticket', 'Property', 'Issue', 'Priority', 'Action'],
    rows: [
      ['TCK-4421', 'The Azure Suites', 'Air-conditioning', 'High', 'Assign'],
      ['TCK-4422', 'Metro Hub', 'Water Pressure', 'Medium', 'View'],
      ['TCK-4423', 'Green Valley Villas', 'Electrical', 'High', 'Review'],
    ],
  },

  messages: {
    title: 'Admin Messages',
    subtitle: 'Monitor support messages, disputes, reports, and system announcements.',
    icon: MessageCircle,
    cards: [
      { label: 'Unread Messages', value: '24' },
      { label: 'Open Disputes', value: '6' },
      { label: 'Support Threads', value: '18' },
      { label: 'Announcements', value: '3' },
    ],
    columns: ['Conversation', 'Participants', 'Category', 'Status', 'Action'],
    rows: [
      ['Payment dispute for TXN-8893', 'Tenant / Landlord', 'Dispute', 'Open', 'Review'],
      ['Property approval question', 'Landlord / Admin', 'Support', 'Pending', 'Reply'],
      ['Maintenance complaint escalation', 'Tenant / Admin', 'Issue', 'Open', 'View'],
    ],
  },

  reports: {
    title: 'Reports & Audit',
    subtitle: 'Review security logs, user activity, transaction reports, and audit events.',
    icon: FileText,
    cards: [
      { label: 'Audit Events', value: '9,842' },
      { label: 'Security Alerts', value: '2' },
      { label: 'Exports', value: '37' },
      { label: 'Login Events', value: '1,209' },
    ],
    columns: ['Time', 'Event', 'User', 'Risk Level', 'Action'],
    rows: [
      ['14:22:01', 'USER_LOGIN_SUCCESS', 'Julianna DeWitt', 'Low', 'View'],
      ['14:21:45', 'AUTH_FAILURE_RESTRICTED', 'Unknown', 'High', 'Investigate'],
      ['14:20:12', 'TRANSACTION_CLEARED', 'Marcus Chen', 'Low', 'View'],
    ],
  },

  settings: {
    title: 'Admin Settings',
    subtitle: 'Manage admin account preferences, notifications, security, and system preferences.',
    icon: ShieldCheck,
    cards: [
      { label: 'Security Level', value: 'Secure' },
      { label: 'Notifications', value: 'Enabled' },
      { label: 'Theme', value: 'Default' },
      { label: 'Sessions', value: '3' },
    ],
    columns: ['Setting', 'Category', 'Status', 'Last Updated', 'Action'],
    rows: [
      ['Account Profile', 'Account', 'Active', 'Today', 'Manage'],
      ['Login Verification', 'Security', 'Enabled', 'Yesterday', 'Manage'],
      ['System Theme', 'Preference', 'Default', 'Today', 'Manage'],
    ],
  },

  help: {
    title: 'Admin Help Center',
    subtitle: 'Find support resources, guides, escalation contacts, and troubleshooting steps.',
    icon: CircleHelp,
    cards: [
      { label: 'Open Support Cases', value: '4' },
      { label: 'Guides', value: '18' },
      { label: 'Response SLA', value: '2h' },
      { label: 'System Status', value: 'Online' },
    ],
    columns: ['Topic', 'Category', 'Priority', 'Status', 'Action'],
    rows: [
      ['User verification issue', 'KYC', 'Medium', 'Open', 'View'],
      ['Payment dispute flow', 'Finance', 'High', 'Open', 'Review'],
      ['Property approval guide', 'Properties', 'Low', 'Available', 'Open'],
    ],
  },
}

function AdminSimplePage({ type }) {
  const config = pageConfig[type] || pageConfig.users
  const Icon = config.icon

  return (
    <>
      <section className="admin-simple-hero">
        <div>
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>

        <button type="button" className="admin-simple-primary-btn">
          Export
        </button>
      </section>

      <section className="admin-simple-cards">
        {config.cards.map((card) => (
          <article className="admin-simple-card" key={card.label}>
            <div className="admin-simple-icon">
              <Icon size={26} />
            </div>

            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </section>

      <section className="admin-simple-table-card">
        <div className="admin-simple-table-header">
          <h2>{config.title} Records</h2>

          <div className="admin-simple-search">
            <Search size={17} />
            <input type="text" placeholder="Search records..." />
          </div>
        </div>

        <div className="admin-simple-table">
          <div
            className="admin-simple-table-head"
            style={{ gridTemplateColumns: `repeat(${config.columns.length}, 1fr)` }}
          >
            {config.columns.map((column) => (
              <p key={column}>{column}</p>
            ))}
          </div>

          {config.rows.map((row) => (
            <div
              className="admin-simple-table-row"
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

export default AdminSimplePage