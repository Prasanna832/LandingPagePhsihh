import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const channels = ['alerts', 'incidents', 'actions', 'audit']

const glass = 'rounded-2xl border border-cyan-400/30 bg-slate-900/55 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.25)]'
const sevColor = { Low: '#22c55e', Medium: '#f59e0b', High: '#f97316', Critical: '#ef4444' }
const sampleAlerts = [
  { source: 'MockSIEM', event_type: 'failed_login', message: 'Many failed login attempts from suspicious host', ip: '185.220.101.1', user: 'jdoe', metadata: { attempts: 17 } },
  { source: 'MockSIEM', event_type: 'data_exfiltration', message: 'Unusual outbound transfer detected to unknown destination', ip: '45.83.64.2', user: 'svc-backup', metadata: { bytes: 88221122 } },
]

async function api(path, token, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) throw new Error((await res.json()).detail || 'Request failed')
  return res.json()
}

function TypingText({ text }) {
  const [out, setOut] = useState('')
  useEffect(() => {
    setOut('')
    let i = 0
    const t = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [text])
  return <p className="text-cyan-100/90 text-sm leading-relaxed">{out}</p>
}

function Shell({ token, role, onLogout, children, realtime }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.3),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(34,197,94,0.22),transparent_40%)] animate-pulse" />
      <header className="sticky top-0 z-20 border-b border-cyan-400/20 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold tracking-widest text-cyan-300">AGENTIC SOC COMMAND</div>
          <nav className="flex items-center gap-2 text-sm">
            {['dashboard', 'incidents', 'response', 'audit'].map((p) => (
              <Link key={p} to={`/${p}`} className="rounded-lg border border-cyan-400/20 px-3 py-1 text-cyan-100/80 transition hover:border-cyan-300/60 hover:text-white">
                {p.toUpperCase()}
              </Link>
            ))}
            <span className="ml-3 rounded-md bg-cyan-500/20 px-2 py-1 text-xs">{role}</span>
            <button onClick={onLogout} className="ml-2 rounded-lg border border-red-400/40 px-3 py-1 text-red-200 hover:bg-red-500/20">Logout</button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4 md:p-6">
        <div className="mb-4 text-xs text-cyan-300/80">Realtime channels: {realtime || 'waiting for events...'}</div>
        {children}
      </main>
    </div>
  )
}

function LoginPage({ setAuth }) {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'Analyst' })
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      if (isSignup) {
        await api('/api/auth/signup', null, { method: 'POST', body: JSON.stringify(form) })
      }
      const login = await api('/api/auth/login', null, { method: 'POST', body: JSON.stringify({ username: form.username, password: form.password }) })
      setAuth({ token: login.access_token, role: login.role || form.role })
      navigate('/dashboard')
    } catch (error) {
      setErr(error.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className={`${glass} w-full max-w-md p-6`}>
        <h1 className="mb-5 text-2xl font-semibold text-cyan-300">{isSignup ? 'Create SOC Account' : 'SOC Secure Login'}</h1>
        <div className="space-y-3">
          <input className="w-full rounded-lg border border-cyan-400/30 bg-slate-900/70 p-2" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          {isSignup && <input className="w-full rounded-lg border border-cyan-400/30 bg-slate-900/70 p-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />}
          <input className="w-full rounded-lg border border-cyan-400/30 bg-slate-900/70 p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {isSignup && (
            <select className="w-full rounded-lg border border-cyan-400/30 bg-slate-900/70 p-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option>Admin</option><option>Analyst</option><option>Viewer</option>
            </select>
          )}
        </div>
        {err && <p className="mt-3 text-sm text-red-300">{err}</p>}
        <button className="mt-5 w-full rounded-lg bg-cyan-500/80 px-4 py-2 font-medium text-slate-900 hover:bg-cyan-400">{isSignup ? 'Signup + Login' : 'Login'}</button>
        <button type="button" className="mt-3 text-sm text-cyan-300/90" onClick={() => setIsSignup((v) => !v)}>
          {isSignup ? 'Already have an account? Login' : 'Need an account? Signup'}
        </button>
      </motion.form>
    </div>
  )
}

function Dashboard({ alerts, ingestRandom, loading }) {
  const chartData = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0, Critical: 0 }
    alerts.forEach((a) => { counts[a.severity] = (counts[a.severity] || 0) + 1 })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [alerts])

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${glass} p-4 md:col-span-2`}>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-cyan-300">Real-Time Alerts</h2><button onClick={ingestRandom} className="rounded-md bg-violet-500/70 px-3 py-1 text-xs">Ingest Sample Alert</button></div>
        {loading ? <div className="h-48 animate-pulse rounded-lg bg-slate-800/70" /> : (
          <div className="max-h-96 space-y-2 overflow-auto pr-1">
            {alerts.map((a) => (
              <motion.div key={a.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                <div className="flex items-center justify-between"><span>{a.category}</span><span style={{ color: sevColor[a.severity] }}>{a.severity}</span></div>
                <p className="text-xs text-slate-300/80">Source: {a.source}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <div className={`${glass} p-4`}>
        <h2 className="mb-3 text-cyan-300">Severity Chart</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs><linearGradient id="sev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} /><stop offset="95%" stopColor="#22d3ee" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" allowDecimals={false} /><Tooltip />
              <Area type="monotone" dataKey="count" stroke="#22d3ee" fill="url(#sev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function IncidentsPage({ incidents, loading }) {
  const selected = incidents[0]
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className={`${glass} p-4`}>
        <h2 className="mb-3 text-cyan-300">Incident Timeline</h2>
        {loading ? <div className="h-64 animate-pulse rounded-lg bg-slate-800/70" /> : (
          <div className="space-y-3">
            {(selected?.timeline || []).map((t, idx) => (
              <div key={idx} className="rounded-lg border border-cyan-400/20 bg-slate-900/70 p-3">
                <p className="text-xs text-cyan-200/70">{new Date(t.time).toLocaleString()}</p>
                <p>{t.event}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`${glass} p-4`}>
        <h2 className="mb-3 text-cyan-300">Agent Decision Feed</h2>
        <TypingText text={selected?.summary || 'Awaiting triage and investigation output...'} />
        <pre className="mt-4 overflow-auto rounded-lg border border-slate-700 bg-slate-900/80 p-3 text-xs text-slate-300">{JSON.stringify(selected?.threat_context || {}, null, 2)}</pre>
      </div>
    </div>
  )
}

function ResponsePage({ actions, onDecision, role }) {
  return (
    <div className={`${glass} p-4`}>
      <h2 className="mb-3 text-cyan-300">Response Approval Panel</h2>
      <div className="space-y-3">
        {actions.map((a) => (
          <div key={a.id} className="flex flex-col gap-2 rounded-lg border border-cyan-400/20 bg-slate-900/70 p-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium">{a.action_type}</p>
              <p className="text-xs text-slate-300/80">{a.description}</p>
              <p className="text-xs text-cyan-300/70">Status: {a.status} {a.requires_approval ? '(approval required)' : ''}</p>
            </div>
            <div className="flex gap-2">
              <button disabled={a.requires_approval && role !== 'Admin'} onClick={() => onDecision(a.id, true)} className="rounded-md bg-emerald-500/70 px-3 py-1 text-sm disabled:opacity-50">Approve</button>
              <button disabled={a.requires_approval && role !== 'Admin'} onClick={() => onDecision(a.id, false)} className="rounded-md bg-rose-500/70 px-3 py-1 text-sm disabled:opacity-50">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AuditPage({ audit }) {
  return (
    <div className={`${glass} p-4`}>
      <h2 className="mb-3 text-cyan-300">Governance Audit Logs</h2>
      <div className="max-h-[70vh] space-y-2 overflow-auto">
        {audit.map((row) => (
          <div key={row.id} className="rounded-md border border-slate-700 bg-slate-900/70 p-3">
            <div className="flex items-center justify-between text-xs"><span>{row.actor}</span><span>{new Date(row.created_at).toLocaleString()}</span></div>
            <p className="text-cyan-200/85">{row.event_type}</p>
            <pre className="overflow-auto text-[11px] text-slate-300">{JSON.stringify(row.details, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}

function SocApp() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('soc_token') || '')
  const [role, setRole] = useState(localStorage.getItem('soc_role') || 'Viewer')
  const [alerts, setAlerts] = useState([])
  const [incidents, setIncidents] = useState([])
  const [actions, setActions] = useState([])
  const [audit, setAudit] = useState([])
  const [loading, setLoading] = useState(false)
  const [realtime, setRealtime] = useState('')

  const setAuth = ({ token: tk, role: rl }) => {
    localStorage.setItem('soc_token', tk)
    localStorage.setItem('soc_role', rl)
    setToken(tk)
    setRole(rl)
  }

  const onLogout = () => {
    localStorage.clear()
    setToken('')
    setRole('Viewer')
    navigate('/')
  }

  const loadData = async () => {
    if (!token) return
    setLoading(true)
    try {
      const [a, i, ac, au] = await Promise.all([
        api('/api/alerts', token),
        api('/api/incidents', token),
        api('/api/actions', token),
        api('/api/audit', token),
      ])
      setAlerts(a)
      setIncidents(i)
      setActions(ac)
      setAudit(au)
    } finally {
      setLoading(false)
    }
  }

  const ingestRandom = async () => {
    const random = sampleAlerts[Math.floor(Math.random() * sampleAlerts.length)]
    await api('/api/alerts/ingest', token, { method: 'POST', body: JSON.stringify(random) })
    await loadData()
  }

  const onDecision = async (id, approved) => {
    await api(`/api/actions/${id}/decision`, token, { method: 'POST', body: JSON.stringify({ approved }) })
    await loadData()
  }

  useEffect(() => {
    loadData()
  }, [token])

  useEffect(() => {
    if (!token) return
    const sockets = channels.map((ch) => {
      const ws = new WebSocket(`${API.replace('http', 'ws')}/ws/${ch}`)
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data)
        setRealtime(`${ch}: ${msg.type}`)
        loadData()
      }
      return ws
    })
    return () => sockets.forEach((s) => s.close())
  }, [token])

  if (!token) {
    return <Routes><Route path="*" element={<LoginPage setAuth={setAuth} />} /></Routes>
  }

  return (
    <Shell token={token} role={role} onLogout={onLogout} realtime={realtime}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard alerts={alerts} ingestRandom={ingestRandom} loading={loading} />} />
        <Route path="/incidents" element={<IncidentsPage incidents={incidents} loading={loading} />} />
        <Route path="/response" element={<ResponsePage actions={actions} onDecision={onDecision} role={role} />} />
        <Route path="/audit" element={<AuditPage audit={audit} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Shell>
  )
}

export default function App() {
  return <BrowserRouter><SocApp /></BrowserRouter>
}
