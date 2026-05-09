{/* Feature Cards */}
        <div className="grid grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(139,92,246,0.2)", borderRadius:"16px", padding:"28px", transition:"all 0.3s", cursor:"default"}}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(139,92,246,0.6)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(139,92,246,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(139,92,246,0.2)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div style={{fontSize:"2.5rem", marginBottom:"12px"}}>{f.icon}</div>
              <h3 style={{fontWeight:700, marginBottom:"8px", fontSize:"16px"}}>{f.title}</h3>
              <p style={{color:"#6b7280", fontSize:"13px", lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
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