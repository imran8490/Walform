 "use client";
import { useState, useEffect } from "react";

export default function FormPage({ params }: { params: Promise<{ id: string }> }) {
  const [form, setForm] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<any>({});

  useEffect(() => {
    params.then(({ id }) => {
      fetch("/api/walrus?blobId=" + id)
        .then((res) => res.json())
        .then((data) => { setForm(data); setLoading(false); })
        .catch(() => setLoading(false));
    });
  }, []);

  if (loading) return <div style={{minHeight:"100vh", background:"#050a14", color:"white", display:"flex", alignItems:"center", justifyContent:"center"}}>Loading...</div>;
  if (!form) return <div style={{minHeight:"100vh", background:"#050a14", color:"white", display:"flex", alignItems:"center", justifyContent:"center"}}>Form not found</div>;
  if (submitted) return (
    <div style={{minHeight:"100vh", background:"#050a14", color:"white", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px"}}>
      <div style={{fontSize:"60px"}}>✅</div>
      <h2 style={{fontSize:"24px", fontWeight:700}}>Submitted!</h2>
      <p style={{color:"rgba(255,255,255,0.5)"}}>Stored on Walrus</p>
    </div>
  );

  return (
    <main style={{minHeight:"100vh", background:"#050a14", color:"white", fontFamily:"sans-serif"}}>
      <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", backgroundImage:"linear-gradient(rgba(77,216,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(77,216,232,0.03) 1px, transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none"}} />

      <nav style={{position:"sticky", top:0, zIndex:100, padding:"16px 48px", background:"rgba(5,10,20,0.9)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(77,216,232,0.2)"}}>
        <a href="/" style={{fontSize:"20px", fontWeight:800, background:"linear-gradient(90deg, #4dd8e8, #7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", textDecoration:"none"}}>
          🦭 WalForm
        </a>
      </nav>

      <div style={{position:"relative", zIndex:1, maxWidth:"680px", margin:"0 auto", padding:"48px 24px"}}>
        <h2 style={{fontSize:"28px", fontWeight:800, marginBottom:"8px"}}>{form.title}</h2>
        {form.description && <p style={{color:"rgba(255,255,255,0.4)", marginBottom:"32px"}}>{form.description}</p>}

        <div style={{display:"flex", flexDirection:"column", gap:"20px", marginBottom:"32px"}}>
          {form.fields?.map((field: any) => (
            <div key={field.id} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(77,216,232,0.15)", borderRadius:"16px", padding:"20px"}}>
              <label style={{display:"block", fontSize:"14px", fontWeight:600, marginBottom:"12px", color:"white"}}>
                {field.label}
                {field.required && <span style={{color:"#ef4444", marginLeft:"4px"}}>*</span>}
              </label>

              {/* Text / Email / URL */}
              {(field.type === "text"  field.type === "email"  field.type === "url") && (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{width:"100%", background:"rgba(77,216,232,0.05)", border:"1px solid rgba(77,216,232,0.2)", borderRadius:"8px", padding:"12px", color:"white", outline:"none", fontSize:"14px"}}
                  onChange={(e) => setAnswers({...answers, [field.id]: e.target.value})}
                />
              )}

              {/* Textarea */}
              {field.type === "textarea" && (
                <textarea
                  placeholder={field.placeholder}
 rows={4}
                  style={{width:"100%", background:"rgba(77,216,232,0.05)", border:"1px solid rgba(77,216,232,0.2)", borderRadius:"8px", padding:"12px", color:"white", outline:"none", fontSize:"14px", resize:"vertical"}}
                  onChange={(e) => setAnswers({...answers, [field.id]: e.target.value})}
                />
              )}

              {/* Star Rating */}
              {field.type === "rating" && (
                <div style={{display:"flex", gap:"8px"}}>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star}
                      onClick={() => { setRating({...rating, [field.id]: star}); setAnswers({...answers, [field.id]: star}); }}
                      style={{fontSize:"32px", cursor:"pointer", opacity: (rating[field.id] || 0) >= star ? 1 : 0.3, transition:"all 0.2s"}}>
                      ⭐
                    </span>
                  ))}
                </div>
              )}

              {/* Checkbox */}
              {field.type === "checkbox" && field.options && (
                <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                  {field.options.map((opt: string, i: number) => (
                    <label key={i} style={{display:"flex", alignItems:"center", gap:"10px", cursor:"pointer"}}>
                      <input
                        type="checkbox"
                        style={{width:"18px", height:"18px", accentColor:"#4dd8e8"}}
                        onChange={(e) => {
                          const prev = answers[field.id] || [];
                          const updated = e.target.checked ? [...prev, opt] : prev.filter((o: string) => o !== opt);
                          setAnswers({...answers, [field.id]: updated});
                        }}
                      />
                      <span style={{fontSize:"14px"}}>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Dropdown */}
              {field.type === "dropdown" && field.options && (
                <select
                  style={{width:"100%", background:"rgba(77,216,232,0.05)", border:"1px solid rgba(77,216,232,0.2)", borderRadius:"8px", padding:"12px", color:"white", outline:"none", fontSize:"14px"}}
                  onChange={(e) => setAnswers({...answers, [field.id]: e.target.value})}
                >
                  <option value="" style={{background:"#050a14"}}>Select option...</option>
                  {field.options.map((opt: string, i: number) => (
                    <option key={i} value={opt} style={{background:"#050a14"}}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setSubmitted(true)}
          style={{background:"linear-gradient(135deg, #4dd8e8, #2563eb)", width:"100%", padding:"16px", borderRadius:"14px", fontSize:"16px", fontWeight:700, border:"none", cursor:"pointer", color:"#050a14", boxShadow:"0 0 30px rgba(77,216,232,0.3)"}}>
          Submit Response
        </button>
      </div>
    </main>
  );
}