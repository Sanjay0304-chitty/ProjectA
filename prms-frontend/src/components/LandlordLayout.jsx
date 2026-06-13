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
import './LandlordLayout.css'

function LandlordLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/landlord' },
    { key: 'properties', label: 'Properties', icon: Building2, path: '/landlord/properties' },
    { key: 'bookings', label: 'Bookings', icon: CalendarDays, path: '/landlord/bookings' },
    { key: 'finance', label: 'Finance', icon: WalletCards, path: '/landlord/finance' },
    { key: 'maintenance', label: 'Maintenance', icon: Wrench, path: '/landlord/maintenance' },
    { key: 'messages', label: 'Messages', icon: MessageCircle, path: '/landlord/messages' },
    { key: 'settings', label: 'Settings', icon: Settings, path: '/landlord/settings' },
  ]

  function safeNavigate(path) {
    if (location.pathname !== path) navigate(path)
  }

  function handleLogout() {
    logout(navigate)
  }

  function getActivePage() {
    if (location.pathname === '/landlord') return 'dashboard'
    if (location.pathname.includes('/landlord/properties')) return 'properties'
    if (location.pathname.includes('/landlord/bookings')) return 'bookings'
    if (location.pathname.includes('/landlord/finance')) return 'finance'
    if (location.pathname.includes('/landlord/maintenance')) return 'maintenance'
    if (location.pathname.includes('/landlord/messages')) return 'messages'
    if (location.pathname.includes('/landlord/settings')) return 'settings'
    if (location.pathname.includes('/landlord/help')) return 'help'
    return 'dashboard'
  }

  const activePage = getActivePage()

  const initials = user
    ? `${(user.firstName || user.name || '?')[0]}${(user.lastName || '')[0] || ''}`.toUpperCase()
    : 'AS'

  const displayName = user?.firstName || user?.name || 'Alex Sterling'

  return (
    <main className="landlord-layout-shell">
      <aside className="landlord-layout-sidebar">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.key
          return (
            <motion.button
              type="button"
              key={item.key}
              className={`landlord-layout-side-btn ${isActive ? 'active' : ''}`}
              onClick={() => safeNavigate(item.path)}
              title={item.label}
              whileTap={{ scale: 0.96 }}
            >
              <Icon size={25} />
              <span>{item.label}</span>
            </motion.button>
          )
        })}

        <div className="landlord-layout-side-spacer"></div>

        <motion.button
          type="button"
          className={`landlord-layout-side-btn ${activePage === 'help' ? 'active' : ''}`}
          onClick={() => safeNavigate('/landlord/help')}
          title="Help"
          whileTap={{ scale: 0.96 }}
        >
          <CircleHelp size={24} />
          <span>Help</span>
        </motion.button>

        <motion.button
          type="button"
          className="landlord-layout-side-btn logout"
          onClick={handleLogout}
          title="Logout"
          whileTap={{ scale: 0.96 }}
        >
          <LogOut size={24} />
          <span>Logout</span>
        </motion.button>
      </aside>

      <section className="landlord-layout-main">
        <header className="landlord-layout-topbar">
          <div className="landlord-layout-brand" onClick={() => safeNavigate('/landlord')}>
            <h2>PRMS</h2>
            <span></span>
            <p>Portfolio Manager</p>
          </div>

          <div className="landlord-layout-search">
            <Search size={22} />
            <input type="text" placeholder="Search portfolios..." />
          </div>

          <div className="landlord-layout-actions">
            <motion.button
              type="button"
              className="landlord-layout-icon-btn"
              title="Notifications"
              whileHover={{ scale: 1.1, rotate: -6 }}
              whileTap={{ scale: 0.92 }}
            >
              <Bell size={22} />
            </motion.button>

            <motion.div className="landlord-layout-profile" whileHover={{ scale: 1.02 }}>
              <div>
                <h3>{displayName}</h3>
                <p>Landlord</p>
              </div>

              <div className="landlord-layout-avatar">{initials}</div>
            </motion.div>
          </div>
        </header>

        <div className="landlord-layout-content">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </section>
    </main>
  )
}

export default LandlordLayout
