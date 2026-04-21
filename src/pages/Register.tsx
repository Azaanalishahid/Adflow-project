import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { MagnetButton } from '../components/animations/MagnetButton';
import { FadeContent } from '../components/animations/FadeContent';
import { Mail, Lock, UserPlus, User } from 'lucide-react';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { data: { name } }
    });
    
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Attempt to insert into users table
    if (authData.user) {
      const { error: dbError } = await supabase.from('users').insert({
        id: authData.user.id,
        name,
        email,
        role: 'user'
      });
      // If it fails because table doesn't exist yet, we still let them proceed for demo purposes
      console.warn("User table insert status:", dbError);
    }
    
    navigate('/marketplace');
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <FadeContent direction="up">
        <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2>Create Account</h2>
            <p style={{ color: 'var(--text-muted)' }}>Join AdFlow Pro today</p>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              leftIcon={<User size={20} />}
            />
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
                <UserPlus size={20} /> {loading ? 'Registering...' : 'Sign Up'}
              </div>
            </MagnetButton>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Log in</Link>
          </p>
        </div>
      </FadeContent>
    </div>
  );
};
