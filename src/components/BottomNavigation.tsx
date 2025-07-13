'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      icon: '🏠',
      label: 'Főoldal',
      isActive: pathname === '/'
    },
    {
      href: '/search',
      icon: '🔍',
      label: 'Keresés',
      isActive: pathname === '/search'
    },
    {
      href: '/add-product',
      icon: '➕',
      label: 'Hirdetés',
      isActive: pathname === '/add-product',
      isPrimary: true
    },
    {
      href: '/feed',
      icon: '📢',
      label: 'Hírek',
      isActive: pathname === '/feed'
    },
    {
      href: '/profile',
      icon: '👤',
      label: 'Profil',
      isActive: pathname === '/profile'
    }
  ]

  return (
    <>
      {/* Spacer for fixed bottom nav */}
      <div style={{ height: '80px' }}></div>
      
      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        padding: '8px 0',
        display: 'block'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                background: item.isPrimary && item.isActive 
                  ? 'linear-gradient(135deg, #16a34a, #15803d)'
                  : item.isActive 
                    ? '#f0fdf4' 
                    : 'transparent',
                transform: item.isActive ? 'translateY(-2px)' : 'translateY(0)',
                minWidth: '60px'
              }}
              onMouseOver={(e) => {
                if (!item.isActive) {
                  e.currentTarget.style.background = '#f8fafc'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseOut={(e) => {
                if (!item.isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {/* Icon */}
              <div style={{
                fontSize: item.isPrimary ? '24px' : '20px',
                background: item.isPrimary && item.isActive
                  ? 'white'
                  : item.isPrimary
                    ? 'linear-gradient(135deg, #16a34a, #15803d)'
                    : 'transparent',
                color: item.isPrimary && item.isActive
                  ? '#16a34a'
                  : item.isPrimary
                    ? 'white'
                    : item.isActive
                      ? '#16a34a'
                      : '#6b7280',
                width: item.isPrimary ? '48px' : 'auto',
                height: item.isPrimary ? '48px' : 'auto',
                borderRadius: item.isPrimary ? '50%' : '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: item.isPrimary ? '0 4px 12px rgba(22, 163, 74, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}>
                {item.icon}
              </div>
              
              {/* Label */}
              <span style={{
                fontSize: '12px',
                fontWeight: item.isActive ? '600' : '500',
                color: item.isPrimary && item.isActive
                  ? '#16a34a'
                  : item.isActive
                    ? '#16a34a'
                    : '#6b7280',
                textAlign: 'center',
                lineHeight: '1'
              }}>
                {item.label}
              </span>
              
              {/* Active indicator */}
              {item.isActive && !item.isPrimary && (
                <div style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#16a34a',
                  marginTop: '2px'
                }}></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile-only CSS */}
      <style jsx>{`
        @media (min-width: 768px) {
          .bottom-nav {
            display: none;
          }
        }
      `}</style>
    </>
  )
}