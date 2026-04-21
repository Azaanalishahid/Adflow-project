import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { MagnetButton } from '../components/animations/MagnetButton';
import { FadeContent } from '../components/animations/FadeContent';
import { Mail, Lock, LogIn } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/marketplace');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <FadeContent direction="up">
        <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2>Welcome Back</h2>
            <p style={{ color: 'var(--text-muted)' }}>Login to post and manage your ads</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              leftIcon={<Mail size={20} />}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              leftIcon={<Lock size={20} />}
            />
            
            {error && <div className="error-message" style={{ textAlign: 'center' }}>{error}</div>}

            <MagnetButton type="submit" disabled={loading} style={{ width: '100%', marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                <LogIn size={20} /> {loading ? 'Authenticating...' : 'Sign In'}
              </div>
            </MagnetButton>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </FadeContent>
    </div>
  );
};
