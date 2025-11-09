'use client';
import { useState } from 'react';

export default function Home() {
  const [msgs, setMsgs] = useState([{role:'assistant', content:'¡Hola! Soy tu vendedor virtual. Preguntame precio o stock 🤖'}]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    const content = q.trim(); if (!content) return;
    setQ('');
    const history = [...msgs, {role:'user', content}];
    setMsgs(history); setLoading(true);
    const r = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({messages: history}) });
    const data = await r.json();
    setMsgs(m => [...m, {role:'assistant', content: data.answer}]);
    setLoading(false);
  }

  return (
    <main style={{maxWidth:680,margin:'40px auto',fontFamily:'system-ui'}}>
      <h1>Bot vendedor – Demo (EasyPanel)</h1>
      <p style={{color:'#666',marginTop:-8}}>MVP sin base de datos ni pagos. Solo para comprobar despliegue.</p>
      <div style={{border:'1px solid #ddd',borderRadius:12,padding:12,minHeight:280}}>
        {msgs.map((m,i)=> (
          <div key={i} style={{margin:'8px 0',textAlign: m.role==='user'?'right':'left'}}>
            <div style={{display:'inline-block',background:m.role==='user'?'#111':'#f5f5f5',color:m.role==='user'?'#fff':'#111',padding:'8px 12px',borderRadius:10}}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div>Escribiendo…</div>}
      </div>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Escribí tu mensaje…" style={{flex:1,padding:10,border:'1px solid #ddd',borderRadius:8}}/>
        <button onClick={send}>Enviar</button>
      </div>
    </main>
  );
}
