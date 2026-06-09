import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Bell,
  Building2,
  CalendarDays,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  Users,
  WalletCards,
  Wrench,
} from 'lucide-react'
import PageTransition from './PageTransition'
import './AdminLayout.css'

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
    },
    {
      key: 'users',
      label: 'Users',
      icon: Users,
      path: '/admin/users',
    },
    {
      key: 'properties',
      label: 'Properties',
      icon: Building2,
      path: '/admin/properties',
    },
    {
      key: 'bookings',
      label: 'Bookings',
      icon: CalendarDays,
      path: '/admin/bookings',
    },
    {
      key: 'finance',
      label: 'Finance',
      icon: WalletCards,
      path: '/admin/finance',
    },
    {
      key: 'maintenance',
      label: 'Maintenance',
      icon: Wrench,
      path: '/admin/maintenance',
    },
    {
      key: 'messages',
      label: 'Messages',
      icon: MessageCircle,
      path: '/admin/messages',
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: FileText,
      path: '/admin/reports',
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ]

  function safeNavigate(path) {
    if (location.pathname !== path) {
      navigate(path)
    }
  }

  function getActivePage() {
    if (location.pathname === '/admin') return 'dashboard'
    if (location.pathname.includes('/admin/users')) return 'users'
    if (location.pathname.includes('/admin/properties')) return 'properties'
    if (location.pathname.includes('/admin/bookings')) return 'bookings'
    if (location.pathname.includes('/admin/finance')) return 'finance'
    if (location.pathname.includes('/admin/maintenance')) return 'maintenance'
    if (location.pathname.includes('/admin/messages')) return 'messages'
    if (location.pathname.includes('/admin/reports')) return 'reports'
    if (location.pathname.includes('/admin/settings')) return 'settings'
    if (location.pathname.includes('/admin/help')) return 'help'
    return 'dashboard'
  }

  function getTopbarTitle() {
    const active = getActivePage()

    const titles = {
      dashboard: 'Admin Dashboard',
      users: 'User Management',
      properties: 'Property Management',
      bookings: 'Booking Management',
      finance: 'Finance Console',
      maintenance: 'Maintenance Center',
      messages: 'Admin Messages',
      reports: 'Reports & Audit',
      settings: 'Admin Settings',
      help: 'Admin Help Center',
    }

    return titles[active]
  }

  const activePage = getActivePage()

  return (
    <main className="admin-layout-shell">
      <aside className="admin-layout-sidebar">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.key

          return (
            <motion.button
              type="button"
              key={item.key}
              className={`admin-layout-side-btn ${isActive ? 'active' : ''}`}
              onClick={() => safeNavigate(item.path)}
              title={item.label}
              whileTap={{ scale: 0.96 }}
            >
              <Icon size={25} />
              <span>{item.label}</span>
            </motion.button>
          )
        })}

        <div className="admin-layout-side-spacer"></div>

        <motion.button
          type="button"
          className={`admin-layout-side-btn ${activePage === 'help' ? 'active' : ''}`}
          onClick={() => safeNavigate('/admin/help')}
          title="Help"
          whileTap={{ scale: 0.96 }}
        >
          <CircleHelp size={24} />
          <span>Help</span>
        </motion.button>

        <motion.button
          type="button"
          className="admin-layout-side-btn logout"
          onClick={() => safeNavigate('/login')}
          title="Logout"
          whileTap={{ scale: 0.96 }}
        >
          <LogOut size={24} />
          <span>Logout</span>
        </motion.button>
      </aside>

      <section className="admin-layout-main">
        <header className="admin-layout-topbar">
          <div className="admin-layout-brand" onClick={() => safeNavigate('/admin')}>
            <h2>PRMS</h2>
            <span></span>
            <p>{getTopbarTitle()}</p>
          </div>

          <div className="admin-layout-top-actions">
            <motion.button
              type="button"
              className="admin-layout-icon-btn"
              title="Notifications"
              whileHover={{ scale: 1.1, rotate: -6 }}
              whileTap={{ scale: 0.92 }}
            >
              <Bell size={22} />
            </motion.button>

            <motion.div className="admin-layout-avatar" whileHover={{ scale: 1.08 }}>
              AS
            </motion.div>
          </div>
        </header>

        <div className="admin-layout-content">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </section>
    </main>
  )
}

export default AdminLayout