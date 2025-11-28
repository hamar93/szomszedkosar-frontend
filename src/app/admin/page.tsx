'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/lib/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'reports' | 'payments' | 'settings'>('overview')
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    activeListings: 0,
    totalRevenue: 0,
    newUsersToday: 0,
    reportsToday: 0,
    pendingApprovals: 0,
    totalTransactions: 0,
    platformFee: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/admin/stats');
        setStats(res.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };
    fetchStats();
  }, []);

  const adminStats = stats;

  const recentUsers = [
    { id: '1', name: 'Kiss Margit', email: 'kiss.margit@email.com', type: 'producer', status: 'active', joined: '2024-06-20' },
    { id: '2', name: 'Nagy Péter', email: 'nagy.peter@email.com', type: 'casual_seller', status: 'pending', joined: '2024-06-21' },
    { id: '3', name: 'Szabó Anna', email: 'szabo.anna@email.com', type: 'buyer', status: 'active', joined: '2024-06-22' }
  ]

  const reportedContent = [
    { id: '1', type: 'product', title: 'Gyanús húskészítmény', reporter: 'user_123', reason: 'Egészségügyi aggály', status: 'pending' },
    { id: '2', type: 'user', title: 'Káromkodás üzenetekben', reporter: 'user_456', reason: 'Nem megfelelő viselkedés', status: 'investigating' },
    { id: '3', type: 'review', title: 'Hamis értékelés', reporter: 'user_789', reason: 'Spam/hamis tartalom', status: 'resolved' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white'
    }}>

      {/* Admin Header */}
      <header style={{
        background: 'rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ⚡
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: 0
              }}>
                SzomszédKosár Admin
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                margin: 0
              }}>
                Rendszergazda vezérlőpult
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #dc2626',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              🚨 {adminStats.reportsToday} új bejelentés
            </div>
            <Link href="/" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              🏠 Főoldal
            </Link>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '32px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '12px',
          padding: '8px'
        }}>
          {[
            { key: 'overview', label: '📊 Áttekintés', count: null },
            { key: 'users', label: '👥 Felhasználók', count: adminStats.totalUsers },
            { key: 'products', label: '📦 Termékek', count: adminStats.activeListings },
            { key: 'reports', label: '🚨 Bejelentések', count: adminStats.reportsToday },
            { key: 'payments', label: '💳 Fizetések', count: null },
            { key: 'settings', label: '⚙️ Beállítások', count: null }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                background: activeTab === tab.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {tab.label}
              {tab.count !== null && (
                <span style={{
                  background: activeTab === tab.key ? '#dc2626' : 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  padding: '2px 8px',
                  fontSize: '12px'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {[
                { title: 'Összes felhasználó', value: adminStats.totalUsers?.toLocaleString() || '0', change: '+12%', icon: '👥', color: '#3b82f6' },
                { title: 'Aktív hirdetések', value: adminStats.activeListings?.toLocaleString() || '0', change: '+8%', icon: '📦', color: '#16a34a' },
                { title: 'Platform bevétel', value: `${Math.round((adminStats.platformFee || 0) / 1000)}k Ft`, change: '+15%', icon: '💰', color: '#f59e0b' },
                { title: 'Mai új felhasználók', value: adminStats.newUsersToday?.toString() || '0', change: '+5%', icon: '🆕', color: '#8b5cf6' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      background: stat.color,
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {stat.icon}
                    </div>
                    <span style={{
                      background: 'rgba(34, 197, 94, 0.2)',
                      color: '#22c55e',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {stat.change}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '8px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#9ca3af'
                  }}>
                    {stat.title}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}>

              {/* Recent Users */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  👥 Legújabb felhasználók
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {recentUsers.map((user) => (
                    <div key={user.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px'
                    }}>
                      <div>
                        <div style={{
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          {user.name}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#9ca3af'
                        }}>
                          {user.email} • {user.type}
                        </div>
                      </div>
                      <span style={{
                        background: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: user.status === 'active' ? '#22c55e' : '#f59e0b',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {user.status === 'active' ? 'Aktív' : 'Függőben'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reports */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🚨 Legújabb bejelentések
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {reportedContent.map((report) => (
                    <div key={report.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px'
                    }}>
                      <div>
                        <div style={{
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          {report.title}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#9ca3af'
                        }}>
                          {report.reason}
                        </div>
                      </div>
                      <span style={{
                        background: report.status === 'resolved' ? 'rgba(34, 197, 94, 0.2)' :
                          report.status === 'investigating' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: report.status === 'resolved' ? '#22c55e' :
                          report.status === 'investigating' ? '#f59e0b' : '#ef4444',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {report.status === 'resolved' ? 'Megoldva' :
                          report.status === 'investigating' ? 'Vizsgálat' : 'Új'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                margin: 0
              }}>
                Felhasználó kezelés
              </h2>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <input
                  type="text"
                  placeholder="Keresés név, email alapján..."
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <select style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}>
                  <option value="all">Minden típus</option>
                  <option value="producer">Őstermelő</option>
                  <option value="casual_seller">Magánszemély</option>
                  <option value="buyer">Vásárló</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 200px 150px 120px 120px 150px',
                gap: '16px',
                padding: '16px 24px',
                background: 'rgba(0,0,0,0.3)',
                fontSize: '14px',
                fontWeight: '600',
                color: '#9ca3af'
              }}>
                <span>Felhasználó</span>
                <span>Email</span>
                <span>Típus</span>
                <span>Státusz</span>
                <span>Hirdetések</span>
                <span>Műveletek</span>
              </div>

              {[...recentUsers, ...recentUsers].map((user, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 200px 150px 120px 120px 150px',
                  gap: '16px',
                  padding: '16px 24px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>ID: {user.id}</div>
                  </div>
                  <span style={{ fontSize: '14px', color: '#9ca3af' }}>{user.email}</span>
                  <span style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {user.type}
                  </span>
                  <span style={{
                    background: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: user.status === 'active' ? '#22c55e' : '#f59e0b',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {user.status === 'active' ? 'Aktív' : 'Függőben'}
                  </span>
                  <span>3 aktív</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: '#60a5fa',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Megtekint
                    </button>
                    <button style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      color: '#f87171',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Felfüggeszt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '32px'
            }}>
              Rendszer beállítások
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }}>

              {/* Platform beállítások */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  🏛️ Platform beállítások
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Push értesítés ára (Ft)
                    </label>
                    <input
                      type="number"
                      defaultValue="500"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Alkalmi eladó havi limit
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Platform jutalék (%)
                    </label>
                    <input
                      type="number"
                      defaultValue="3"
                      step="0.1"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Email beállítások */}
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  📧 Email beállítások
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      SMTP szerver
                    </label>
                    <input
                      type="text"
                      defaultValue="smtp.gmail.com"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Admin email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@szomszedkosar.hu"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Support email
                    </label>
                    <input
                      type="email"
                      defaultValue="support@szomszedkosar.hu"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div style={{
              textAlign: 'center',
              marginTop: '32px'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)'
              }}>
                💾 Beállítások mentése
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}