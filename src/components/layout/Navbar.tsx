import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MagnetButton } from '../animations/MagnetButton';
import { LogOut, PlusSquare, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 40px',
      background: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/marketplace" style={{ textDecoration: 'none', color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
        AdFlow <span style={{ color: 'var(--accent-primary)' }}>Pro</span>
      </Link>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/marketplace" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LayoutDashboard size={18} /> Marketplace
            </Link>
            <MagnetButton onClick={() => navigate('/create')} style={{ padding: '8px 16px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <PlusSquare size={18} /> Post Ad
              </div>
            </MagnetButton>
            <button 
              onClick={handleSignOut} 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }}>Login</Link>
            <MagnetButton onClick={() => navigate('/register')} style={{ padding: '8px 16px' }}>
              Sign Up
            </MagnetButton>
          </>
        )}
      </div>
    </nav>
  );
};
