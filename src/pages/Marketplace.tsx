import React, { useEffect, useState } from 'react';
import { api, Ad } from '../lib/supabase';
import { FadeContent } from '../components/animations/FadeContent';
import { MapPin, Tag, Database, Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { MagnetButton } from '../components/animations/MagnetButton';

export const Marketplace = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user } = useAuth();
  const [seeding, setSeeding] = useState(false);

  const fetchAds = async () => {
    try {
      const data = await api.getAds(); // In real app, pass 'approved' here, but fetching all for demo
      setAds(data as Ad[]);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleSeed = async () => {
    if (!user) return alert("Must be logged in to seed");
    setSeeding(true);
    try {
      await api.seedDemoAds(user.id);
      await fetchAds();
    } catch (e) {
      console.error(e);
      alert("Failed to seed demo data. Have you created the 'ads' table in Supabase?");
    }
    setSeeding(false);
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ad.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <FadeContent direction="up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Marketplace</h1>
            <p style={{ color: 'var(--text-muted)' }}>Discover premium listings from around the world.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '250px' }}>
              <Input
                label="Search ads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search size={18} />}
                style={{ height: '48px', minHeight: '48px' }}
              />
            </div>
            
            <div className="input-container" style={{ padding: '0 16px', height: '48px', minHeight: '48px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
              <select 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', height: '100%', cursor: 'pointer', appearance: 'none', minWidth: '120px' }}
              >
                <option value="All">All Categories</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Electronics">Electronics</option>
                <option value="Services">Services</option>
                <option value="Jobs">Jobs</option>
              </select>
            </div>

            {user && (
              <MagnetButton onClick={handleSeed} disabled={seeding} style={{ background: 'var(--bg-tertiary)', color: '#fff', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Database size={18} /> {seeding ? 'Seeding...' : 'Seed Data'}
                </div>
              </MagnetButton>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="glass-card" style={{ height: '350px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '180px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', animation: 'pulse 2s infinite' }} />
                <div style={{ height: '24px', background: 'var(--bg-tertiary)', borderRadius: '4px', margin: '16px 0', width: '80%', animation: 'pulse 2s infinite' }} />
                <div style={{ height: '20px', background: 'var(--bg-tertiary)', borderRadius: '4px', width: '40%', animation: 'pulse 2s infinite' }} />
              </div>
            ))}
          </div>
        ) : filteredAds.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <Database size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3>No Ads Found</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
              {search ? 'Try a different search term.' : 'There are no listings yet. Seed some demo data or post an ad!'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredAds.map((ad) => (
              <div key={ad.id} className="glass-card ad-card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: ad.package === 'premium' ? 'url(--accent-primary)' : 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {ad.package === 'premium' ? '⭐ Premium' : ad.package}
                  </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', margin: 0, color: '#fff', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ad.title}</h3>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>${ad.price}</span>
                  </div>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {ad.city}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Tag size={14} /> {ad.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </FadeContent>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        .ad-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          border-color: var(--border-highlight);
        }
      `}</style>
    </div>
  );
};
