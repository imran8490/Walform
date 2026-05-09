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
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">

      <div style={{position:"fixed", top:"-20%", left:"30%", width:"600px", height:"600px", background:"radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", pointerEvents:"none"}} />

      <nav style={{borderBottom:"1px solid rgba(139,92,246,0.3)", backdropFilter:"blur(10px)", position:"sticky", top:0, zIndex:50}} className="px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="https://www.walrus.xyz/images/walrus-logo.svg" alt="Walrus" style={{width:"28px", height:"28px"}} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <span className="text-xl font-bold" style={{background:"linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>WalForm</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/create" className="text-gray-400 hover:text-white text-sm">Create</a>
          <button style={{background:"linear-gradient(135deg, #7c3aed, #2563eb)", border:"none"}} className="px-4 py-2 rounded-lg text-sm font-medium">
            Connect Wallet
          </button>
        </div>
      </nav>

      <div style={{opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition:"all 0.8s ease"}} className="max-w-5xl mx-auto px-6 py-24 text-center">

        <div style={{display:"inline-block", background:"rgba(139,92,246,0.15)", border:"1px solid rgba(139,92,246,0.4)", borderRadius:"999px", padding:"6px 16px", marginBottom:"24px", fontSize:"13px", color:"#a78bfa"}}>
          🦭 Built for Walrus Sessions Round 2
        </div>

        <img
          src="https://docs.walrus.site/assets/walrus-logo.svg"
          alt="Walrus Logo"
          style={{width:"120px", height:"120px", margin:"0 auto 24px", display:"block", filter:"drop-shadow(0 0 20px rgba(139,92,246,0.5))"}}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        <h1 style={{fontSize:"clamp(2.5rem, 6vw, 4.5rem)", fontWeight:800, lineHeight:1.1, marginBottom:"24px"}}>
          <span style={{background:"linear-gradient(135deg, #ffffff, #a78bfa, #60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
            Decentralized Forms
          </span>
          <br />
          <span style={{background:"linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
            on Walrus
          </span>
        </h1>

        <p className="text-gray-400 text-xl mb-4 max-w-2xl mx-auto">
          Create forms, collect responses, store everything onchain.
        </p>
        <p className="text-gray-600 text-sm mb-12">
          Powered by Walrus decentralized storage on Sui blockchain
        </p>

        <div className="flex gap-4 justify-center mb-20">
          <a href="/create">
            <button style={{background:"linear-gradient(135deg, #7c3aed, #2563eb)", padding:"14px 32px", borderRadius:"12px", fontSize:"16px", fontWeight:600, border:"none", cursor:"pointer", boxShadow:"0 0 30px rgba(139,92,246,0.4)"}}>
[09/05/2026 18:47] Imrankhan 👾 BITS 🐦 SUI ♻️: Create Form
            </button>
          </a>
          <button style={{background:"transparent", padding:"14px 32px", borderRadius:"12px", fontSize:"16px", fontWeight:600, border:"1px solid rgba(139,92,246,0.4)", cursor:"pointer", color:"white"}}>
            View Demo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(139,92,246,0.2)", borderRadius:"16px", padding:"28px", transition:"all 0.3s"}}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(139,92,246,0.6)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(139,92,246,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(139,92,246,0.2)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{fontSize:"2.5rem", marginBottom:"12px"}}>{f.icon}</div>
              <h3 style={{fontWeight:700, marginBottom:"8px", fontSize:"16px"}}>{f.title}</h3>
              <p style={{color:"#6b7280", fontSize:"13px", lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-12 mt-16">
          {[["100%", "Decentralized"], ["0", "Servers"], ["∞", "Forms"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div style={{fontSize:"2rem", fontWeight:800, background:"linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>{val}</div>
              <div style={{color:"#6b7280", fontSize:"13px"}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}