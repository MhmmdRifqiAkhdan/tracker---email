import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'; 
import './App.css'; 

const supabaseUrl = 'https://duibuedlnhlhdauonjvo.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aWJ1ZWRsbmhsaGRhdW9uanZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1ODIzMTAsImV4cCI6MjA0NTE1ODMxMH0.RuhNzOFpnT1onRsZMAbgJPlk_9bTEMbgDRQ-7i6d1Ts'
; 
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, []);

  const handleLinkClick = async () => {
    try {
      const { data, error } = await supabase
        .from('table_email')
        .insert([{ email: email, created_at: new Date() }]); 

      if (error) {
        console.error('Gagal mencatat tracking:', error);
      } else {
        console.log('Tracking berhasil dicatat:', data);
        navigate(`/redirect?email=${email}`);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1>Terima kasih telah membuka link ini</h1>
        <p>Kami menghargai kunjungan Anda. Silakan klik tombol di bawah untuk melanjutkan.</p>
        <button onClick={handleLinkClick} className="visit-button">Kunjungi Website</button>
      </div>
    </div>
  );
}

function RedirectPage() {
  return (
    <div className="app-container">
      <div className="content">
        <h1>Terima kasih telah membuka link ini</h1>
        <p>Kami menghargai kunjungan Anda. Silakan klik tombol di bawah untuk kembali ke halaman sebelumnya.</p>
        <Link to="/" className="visit-button">
          Kembali ke Halaman Awal
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
