import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Bell,
  Building2,
  CalendarDays,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  WalletCards,
  Wrench,
} from 'lucide-react'
import PageTransition from './PageTransition'
import { useAuth } from '../contexts/AuthContext'
import './TenantLayout.css'

function TenantLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/tenant' },
    { key: 'properties', label: 'Properties', icon: Building2, path: '/tenant/properties' },
    { key: 'bookings', label: 'Bookings', icon: CalendarDays, path: '/tenant/bookings' },
    { key: 'payments', label: 'Payments', icon: WalletCards, path: '/tenant/payments' },
    { key: 'maintenance', label: 'Maintenance', icon: Wrench, path: '/tenant/maintenance' },
    { key: 'messages', label: 'Messages', icon: MessageCircle, path: '/tenant/messages' },
    { key: 'settings', label: 'Settings', icon: Settings, path: '/tenant/settings' },
  ]

  function safeNavigate(path) {
    if (location.pathname !== path) navigate(path)
  }

  function handleLogout() {
    logout(navigate)
  }

  function getActivePage() {
    if (location.pathname === '/tenant') return 'dashboard'
    if (location.pathname.includes('/tenant/properties')) return 'properties'
    if (location.pathname.includes('/tenant/bookings')) return 'bookings'
    if (location.pathname.includes('/tenant/payments')) return 'payments'
    if (location.pathname.includes('/tenant/maintenance')) return 'maintenance'
    if (location.pathname.includes('/tenant/messages')) return 'messages'
    if (location.pathname.includes('/tenant/settings')) return 'settings'
    if (location.pathname.includes('/tenant/help')) return 'help'
    return 'dashboard'
  }

  const activePage = getActivePage()

  const initials = user
    ? `${(user.firstName || user.name || '?')[0]}${(user.lastName || '')[0] || ''}`.toUpperCase()
    : 'AT'

  const displayName = user?.firstName || user?.name || 'Alex Tan'

  return (
    <main className="tenant-layout-shell">
      <aside className="tenant-layout-sidebar">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.key
          return (
            <motion.button
              type="button"
              key={item.key}
              className={`tenant-layout-side-btn ${isActive ? 'active' : ''}`}
              onClick={() => safeNavigate(item.path)}
              title={item.label}
              whileTap={{ scale: 0.96 }}
            >
              <Icon size={25} />
              <span>{item.label}</span>
            </motion.button>
          )
        })}

        <div className="tenant-layout-side-spacer"></div>

        <motion.button
          type="button"
          className={`tenant-layout-side-btn ${activePage === 'help' ? 'active' : ''}`}
          onClick={() => safeNavigate('/tenant/help')}
          title="Help"
          whileTap={{ scale: 0.96 }}
        >
          <CircleHelp size={24} />
          <span>Help</span>
        </motion.button>

        <motion.button
          type="button"
          className="tenant-layout-side-btn logout"
          onClick={handleLogout}
          title="Logout"
          whileTap={{ scale: 0.96 }}
        >
          <LogOut size={24} />
          <span>Logout</span>
        </motion.button>
      </aside>

      <section className="tenant-layout-main">
        <header className="tenant-layout-topbar">
          <div className="tenant-layout-brand" onClick={() => safeNavigate('/tenant')}>
            <h2>PRMS</h2>
            <span></span>
            <p>Tenant Portal</p>
          </div>

          <div className="tenant-layout-search">
            <Search size={22} />
            <input type="text" placeholder="Search activities..." />
          </div>

          <div className="tenant-layout-actions">
            <motion.button
              type="button"
              className="tenant-layout-icon-btn"
              title="Notifications"
              whileHover={{ scale: 1.1, rotate: -6 }}
              whileTap={{ scale: 0.92 }}
            >
              <Bell size={22} />
            </motion.button>

            <motion.div className="tenant-layout-profile" whileHover={{ scale: 1.02 }}>
              <div>
                <h3>{displayName}</h3>
                <p>Tenant</p>
              </div>

              <div className="tenant-layout-avatar">{initials}</div>
            </motion.div>
          </div>
        </header>

        <div className="tenant-layout-content">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </section>
    </main>
  )
}

export default TenantLayout
