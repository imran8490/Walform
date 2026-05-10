"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const features = [
    { icon: "📝", title: "Build Forms", desc: "Rich text, dropdowns, checkboxes, file uploads" },
    { icon: "🦭", title: "Store on Walrus", desc: "Fully decentralized — no servers, no censorship" },
    { icon: "🔐", title: "Seal Encrypted", desc: "Private responses only form owners can see" },
  ];

  return (
    <main style={{minHeight:"100vh", background:"#050a14", color:"white", fontFamily:"sans-serif", overflowX:"hidden"}}>

      {/* Grid background */}
      <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", backgroundImage:"linear-gradient(rgba(77,216,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(77,216,232,0.03) 1px, transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none", zIndex:0}} />

      {/* Glow */}
      <div style={{position:"fixed", top:"-20%", left:"30%", width:"600px", height:"600px", background:"radial-gradient(circle, rgba(77,216,232,0.08) 0%, transparent 70%)", pointerEvents:"none", zIndex:0}} />

      {/* Nav */}
      <nav style={{position:"sticky", top:0, zIndex:100, padding:"16px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(5,10,20,0.8)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(77,216,232,0.2)"}}>
        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
          <div style={{width:"36px", height:"36px", borderRadius:"10px", background:"linear-gradient(135deg, #4dd8e8, #7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px"}}>🦭</div>
          <span style={{fontSize:"22px", fontWeight:800, background:"linear-gradient(90deg, #4dd8e8, #7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>WalForm</span>
        </div>
        <div style={{display:"flex", gap:"32px", alignItems:"center"}}>
          <a href="/create" style={{color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"14px"}}>Create</a>
          <button style={{background:"linear-gradient(135deg, #4dd8e8, #2563eb)", border:"none", color:"#050a14", fontWeight:700, padding:"10px 24px", borderRadius:"10px", cursor:"pointer", fontSize:"13px", boxShadow:"0 0 20px rgba(77,216,232,0.3)"}}>
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{position:"relative", zIndex:1, maxWidth:"1100px", margin:"0 auto", padding:"80px 48px 60px", textAlign:"center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition:"all 0.8s ease"}}>

        {/* Badge */}
        <div style={{display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(77,216,232,0.1)", border:"1px solid rgba(77,216,232,0.3)", borderRadius:"999px", padding:"8px 20px", fontSize:"12px", color:"#4dd8e8", marginBottom:"40px"}}>
          ⚡ Built for Walrus Sessions Round 2
        </div>

        {/* Walrus Image */}
        <div style={{position:"relative", width:"200px", height:"200px", margin:"0 auto 40px"}}>
          <div style={{position:"absolute", inset:"-20px", borderRadius:"50%", background:"radial-gradient(circle, rgba(77,216,232,0.2) 0%, transparent 70%)"}} />
          <div style={{fontSize:"120px", marginBottom:"24px", filter:"drop-shadow(0 0 30px rgba(77,216,232,0.5))"}}>
  🦭
</div>
        </div>
 {/* Title */}
        <h1 style={{fontSize:"clamp(3rem, 7vw, 5.5rem)", fontWeight:800, lineHeight:1.0, marginBottom:"24px"}}>
          <span style={{background:"linear-gradient(135deg, #ffffff, #4dd8e8, #7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
            Decentralized
          </span>
          <br />
          <span style={{background:"linear-gradient(135deg, #4dd8e8, #a5f3fc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
            Forms on Walrus
          </span>
        </h1>

        <p style={{color:"rgba(255,255,255,0.5)", fontSize:"18px", maxWidth:"600px", margin:"0 auto 8px", lineHeight:1.7}}>
          Create forms, collect responses, store everything onchain.
        </p>
        <p style={{color:"rgba(255,255,255,0.25)", fontSize:"13px", marginBottom:"48px"}}>
          Powered by Walrus decentralized storage on Sui blockchain
        </p>

        {/* CTA */}
        <div style={{display:"flex", gap:"16px", justifyContent:"center", marginBottom:"80px"}}>
          <a href="/create" style={{background:"linear-gradient(135deg, #4dd8e8, #2563eb)", color:"#050a14", fontWeight:700, padding:"16px 40px", borderRadius:"14px", fontSize:"16px", textDecoration:"none", boxShadow:"0 0 40px rgba(77,216,232,0.3)"}}>
            Create Form
          </a>
          <button style={{background:"transparent", color:"#4dd8e8", fontWeight:600, padding:"16px 40px", borderRadius:"14px", border:"1px solid rgba(77,216,232,0.4)", fontSize:"16px", cursor:"pointer"}}>
            View Demo
          </button>
        </div>

        {/* Feature Cards */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"20px", marginBottom:"60px"}}>
          {features.map((f, i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(77,216,232,0.2)", borderRadius:"20px", padding:"32px", textAlign:"left", transition:"all 0.3s"}}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(77,216,232,0.5)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(77,216,232,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(77,216,232,0.2)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{width:"48px", height:"48px", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", marginBottom:"16px", background:"rgba(77,216,232,0.1)", border:"1px solid rgba(77,216,232,0.2)"}}>{f.icon}</div>
              <h3 style={{fontSize:"17px", fontWeight:700, marginBottom:"8px"}}>{f.title}</h3>
              <p style={{fontSize:"13px", color:"rgba(255,255,255,0.4)", lineHeight:1.7}}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{display:"flex", justifyContent:"center", gap:"64px", padding:"40px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(77,216,232,0.2)", borderRadius:"24px"}}>
          {[["100%","Decentralized"],["0","Servers"],["∞","Forms"],["WAL","Powered"]].map(([val, label]) => (
            <div key={label} style={{textAlign:"center"}}>
              <div style={{fontSize:"2.5rem", fontWeight:800, background:"linear-gradient(135deg, #4dd8e8, #7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>{val}</div>
              <div style={{fontSize:"12px", color:"rgba(255,255,255,0.3)", marginTop:"4px", letterSpacing:"1px", textTransform:"uppercase"}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}