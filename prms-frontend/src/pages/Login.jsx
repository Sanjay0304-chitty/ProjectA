import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Eye, LockKeyhole, LogIn, Mail } from 'lucide-react'
import { login } from "../services/api";
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSignIn() {
    try {
      const result = await login(email, password)
      console.log("Login Response:", result)
      
      if (!result.user) {
        throw new Error("Login failed")
      }
      
      switch (result.user.role) {
        case "Admin":
          navigate("/admin")
          break;
        case "Landlord":
          navigate("/landlord")
          break;
        case "Tenant":
          navigate("/tenant")
          break;
        default:
          navigate("/")
          break;
      }
    }
    catch (err) {
      console.error(err)
      setError('Wrong Email Or Password')
      setTimeout(
        () => {
          setError('')
        }, 3000)
    }
}
  return (
    <main className="login-page">
      <motion.section
        className="login-left"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <motion.div
          className="brand-small"
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <Building2 size={28} />
          <span>PRMS</span>
        </motion.div>

        <div className="login-hero-content">
          <motion.div
            className="purple-line"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 150, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.55, ease: 'easeOut' }}
          ></motion.div>

          <motion.h1
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.55 }}
          >
            Master Your Real Estate Ecosystem.
          </motion.h1>

          <motion.p
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            Join over 5,000 property managers and investors who trust PRMS for
            secure, automated, and high-yield property management across Southeast Asia.
          </motion.p>

          <motion.div
            className="trusted-card"
            initial={{ y: 32, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="avatar-group">
              <motion.div className="avatar" whileHover={{ y: -4 }}>
                JD
              </motion.div>
              <motion.div className="avatar" whileHover={{ y: -4 }}>
                MC
              </motion.div>
              <motion.div className="avatar" whileHover={{ y: -4 }}>
                SA
              </motion.div>
            </div>

            <span>Trusted by regional leaders</span>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="login-right"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <motion.div
          className="login-form-box"
          initial={{ y: 34, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.55, ease: 'easeOut' }}
        >
          <motion.h2
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.35 }}
          >
            Welcome Back
          </motion.h2>

          <motion.p
            className="form-subtitle"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.35 }}
          >
            Log in to manage your property portfolio.
          </motion.p>

          <form>
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.46, duration: 0.35 }}
            >
              <label>Email Address</label>
              <div className="input-box">
                <Mail size={22} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.54, duration: 0.35 }}
            >
              <label>Password</label>
              <div className="input-box">
                <LockKeyhole size={22} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Eye size={22} className="input-right-icon" />
              </div>
            </motion.div>

            <motion.div
              className="form-row"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.62, duration: 0.35 }}
            >
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">Forgot Password?</a>
            </motion.div>

            { error && (

              <motion.div className="toast-error" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              {error}
              </motion.div>
              )}
              
              <motion.button
  type="button"
  className="primary-btn"
  onClick={handleSignIn}
  initial={{ y: 18, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.7, duration: 0.35 }}
  whileHover={{ y: -2, scale: 1.01 }}
  whileTap={{ scale: 0.97 }}
>
  Sign In <LogIn size={20} />
</motion.button>

            <motion.div
              className="divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.35 }}
            >
              <span></span>
              <p>OR CONTINUE WITH</p>
              <span></span>
            </motion.div>

            <motion.div
              className="social-row"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.88, duration: 0.35 }}
            >
              <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                Google
              </motion.button>

              <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                Apple
              </motion.button>
            </motion.div>

            <motion.p
              className="signup-text"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.96, duration: 0.35 }}
            >
              Don&apos;t have an account? <Link to="/role">Sign up for free</Link>
            </motion.p>
          </form>
        </motion.div>
      </motion.section>
    </main>
  )
}

export default Login