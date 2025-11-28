'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Search,
  Newspaper,
  Plus,
  Briefcase,
  Bell,
  Star,
  MessageCircle,
  User,
  LogIn,
  UserPlus,
  HelpCircle,
  Settings,
  Mail,
  Info,
  FileText,
  Lock,
  ShoppingBasket
} from 'lucide-react'

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { href: '/', icon: Home, label: 'Főoldal' },
    { href: '/search', icon: Search, label: 'Keresés' },
    { href: '/feed', icon: Newspaper, label: 'Hírfolyam' },
    { href: '/add-product', icon: Plus, label: 'Új termék' },
    { href: '/upgrade', icon: Briefcase, label: 'Előfizetés' },
    { href: '/notifications', icon: Bell, label: 'Értesítések' },
    { href: '/favorites', icon: Star, label: 'Kedvencek' },
    { href: '/messages', icon: MessageCircle, label: 'Üzenetek' },
    { href: '/profile', icon: User, label: 'Profil' },
    { href: '/login', icon: LogIn, label: 'Bejelentkezés' },
    { href: '/register', icon: UserPlus, label: 'Regisztráció' }
  ]

  const secondaryItems = [
    { href: '/help', icon: HelpCircle, label: 'Súgó' },
    { href: '/settings', icon: Settings, label: 'Beállítások' },
    { href: '/contact', icon: Mail, label: 'Kapcsolat' },
    { href: '/about', icon: Info, label: 'Rólunk' },
    { href: '/terms', icon: FileText, label: 'ÁSZF' },
    { href: '/privacy', icon: Lock, label: 'Adatvédelem' }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        style={{
          display: 'none', // Initially hidden, shown on mobile via CSS
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1100,
          background: 'white',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        className="mobile-menu-button"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          width: '20px',
          height: '16px'
        }}>
          <span style={{
            width: '100%',
            height: '2px',
            background: '#374151',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'
          }}></span>
          <span style={{
            width: '100%',
            height: '2px',
            background: '#374151',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            opacity: isOpen ? 0 : 1
          }}></span>
          <span style={{
            width: '100%',
            height: '2px',
            background: '#374151',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'
          }}></span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Slide-out Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '300px',
        maxWidth: '85vw',
        background: 'white',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1060,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        overflowY: 'auto'
      }}>

        {/* Header */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid #e5e7eb',
          background: 'linear-gradient(135deg, #f0fdf4, #fefcf3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <ShoppingBasket size={24} />
            </div>
            <div>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                SzomszédKosár
              </h2>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>
                Helyi termékek piactere
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div style={{ padding: '20px 0' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            margin: '0 20px 16px',
            padding: 0
          }}>
            Navigáció
          </h3>

          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  textDecoration: 'none',
                  color: isActive ? '#16a34a' : '#374151',
                  background: isActive ? '#f0fdf4' : 'transparent',
                  borderRight: isActive ? '4px solid #16a34a' : '4px solid transparent',
                  transition: 'all 0.2s ease',
                  fontSize: '16px',
                  fontWeight: isActive ? '600' : '500'
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f8fafc'
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span style={{
                  width: '24px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <item.icon size={20} />
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '12px',
                    color: '#16a34a'
                  }}>
                    ●
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: '#e5e7eb',
          margin: '0 20px'
        }}></div>

        {/* Secondary Navigation */}
        <div style={{ padding: '20px 0' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            margin: '0 20px 16px',
            padding: 0
          }}>
            Információk
          </h3>

          {secondaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                textDecoration: 'none',
                color: '#6b7280',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f8fafc'
                e.currentTarget.style.color = '#374151'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#6b7280'
              }}
            >
              <span style={{
                width: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <item.icon size={18} />
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e5e7eb',
          marginTop: 'auto',
          background: '#f9fafb'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            textAlign: 'center',
            margin: 0,
            lineHeight: '1.5'
          }}>
            © 2025 SzomszédKosár
            <br />
            Helyi termékek piactere
          </p>
        </div>
      </div>

      {/* Mobile-specific CSS */}
      <style jsx>{`
        @media (max-width: 767px) {
          .mobile-menu-button {
            display: block !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}