"use client";
import { useState } from "react";
import { uploadToWalrus } from "../walrus";

interface Field {
  id: number;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
  options?: string[];
}

export default function CreateForm() {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, type: "text", label: "Your Name", required: true, placeholder: "Enter your name" },
  ]);
  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [blobId, setBlobId] = useState("");

  const fieldTypes = [
    { type: "text", label: "Text", icon: "📝" },
    { type: "email", label: "Email", icon: "📧" },
    { type: "textarea", label: "Long Text", icon: "📄" },
    { type: "rating", label: "Star Rating", icon: "⭐" },
    { type: "checkbox", label: "Checkbox", icon: "☑️" },
    { type: "dropdown", label: "Dropdown", icon: "🔽" },
    { type: "url", label: "URL", icon: "🔗" },
  ];

  const addField = (type: string) => {
    const defaults: Record<string, Partial<Field>> = {
      text: { label: "Short Answer", placeholder: "Type here..." },
      email: { label: "Email Address", placeholder: "example@email.com" },
      textarea: { label: "Long Answer", placeholder: "Write your answer..." },
      rating: { label: "Rate your experience", placeholder: "" },
      checkbox: { label: "Select options", placeholder: "", options: ["Option 1", "Option 2"] },
      dropdown: { label: "Choose one", placeholder: "Select...", options: ["Option 1", "Option 2"] },
      url: { label: "Website URL", placeholder: "https://" },
    };
    setFields([...fields, { id: Date.now(), type, required: false, ...defaults[type] }]);
  };

  const updateField = (id: number, key: string, value: string | string[]) => {
    setFields(fields.map((f) => f.id === id ? { ...f, [key]: value } : f));
  };

  const removeField = (id: number) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const publishForm = async () => {
    setPublishing(true);
    try {
      const formData = { title, description, fields, createdAt: Date.now() };
      const id = await uploadToWalrus(formData);
      setBlobId(id);
    } catch (err) {
      alert("Upload failed");
    }
    setPublishing(false);
  };

  const showPlaceholder = (type: string) => {
    return type === "text" || type === "email" || type === "url" || type === "textarea";
  };

  const showOptions = (type: string) => {
    return type === "checkbox" || type === "dropdown";
  };

  return (
    <main style={{minHeight:"100vh", background:"#050a14", color:"white", fontFamily:"sans-serif"}}>

      <div style={{position:"fixed", top:0, left:0, width:"100%", height:"100%", backgroundImage:"linear-gradient(rgba(77,216,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(77,216,232,0.03) 1px, transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none", zIndex:0}} />

      <nav style={{position:"sticky", top:0, zIndex:100, padding:"16px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(5,10,20,0.9)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(77,216,232,0.2)"}}>
        <a href="/" style={{fontSize:"20px", fontWeight:800, background:"linear-gradient(90deg, #4dd8e8, #7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", textDecoration:"none"}}>
          🦭 WalForm
        </a>
        <button style={{background:"linear-gradient(135deg, #4dd8e8, #2563eb)", border:"none", color:"#050a14", fontWeight:700, padding:"10px 24px", borderRadius:"10px", cursor:"pointer", fontSize:"13px"}}>
          Connect Wallet
        </button>
      </nav>

      <div style={{position:"relative", zIndex:1, maxWidth:"760px", margin:"0 auto", padding:"48px 24px"}}>
 <div style={{marginBottom:"32px"}}>
          <div style={{display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(77,216,232,0.1)", border:"1px solid rgba(77,216,232,0.3)", borderRadius:"999px", padding:"6px 16px", fontSize:"12px", color:"#4dd8e8", marginBottom:"20px"}}>
            ⚡ Create New Form
          </div>
          <h1 style={{fontSize:"28px", fontWeight:800, marginBottom:"4px"}}>Build Your Form</h1>
          <p style={{color:"rgba(255,255,255,0.4)", fontSize:"14px"}}>Publish to Walrus decentralized storage</p>
        </div>

        <div style={{background:"rgba(77,216,232,0.05)", border:"1px solid rgba(77,216,232,0.25)", borderRadius:"20px", padding:"28px", marginBottom:"16px"}}>
          <input
            style={{width:"100%", background:"transparent", border:"none", outline:"none", fontSize:"24px", fontWeight:700, color:"white", marginBottom:"16px"}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Form Title"
          />
          <div style={{height:"1px", background:"rgba(77,216,232,0.2)", marginBottom:"16px"}} />
          <input
            style={{width:"100%", background:"transparent", border:"none", outline:"none", fontSize:"14px", color:"rgba(255,255,255,0.4)"}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Form description (optional)"
          />
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:"12px", marginBottom:"20px"}}>
          {fields.map((field) => (
            <div key={field.id} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(77,216,232,0.15)", borderRadius:"16px", padding:"20px"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px"}}>
                <span style={{fontSize:"10px", color:"#4dd8e8", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase"}}>
                  {field.type} field
                </span>
                {fields.length > 1 && (
                  <button onClick={() => removeField(field.id)} style={{background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", color:"#ef4444", borderRadius:"6px", width:"28px", height:"28px", cursor:"pointer", fontSize:"16px"}}>
                    x
                  </button>
                )}
              </div>

              <input
                style={{width:"100%", background:"transparent", border:"none", borderBottom:"1px solid rgba(77,216,232,0.2)", outline:"none", fontSize:"16px", fontWeight:600, color:"white", paddingBottom:"8px", marginBottom:"12px"}}
                value={field.label}
                onChange={(e) => updateField(field.id, "label", e.target.value)}
                placeholder="Question label"
              />

              {field.type === "rating" && (
                <div style={{display:"flex", gap:"8px", marginTop:"8px"}}>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} style={{fontSize:"24px", cursor:"pointer"}}>⭐</span>
                  ))}
                </div>
              )}

              {showOptions(field.type) && field.options && (
                <div style={{marginTop:"8px"}}>
                  {field.options.map((opt, i) => (
                    <div key={i} style={{display:"flex", gap:"8px", marginBottom:"6px", alignItems:"center"}}>
                      <input
                        style={{background:"transparent", border:"1px solid rgba(77,216,232,0.3)", borderRadius:"6px", padding:"4px 8px", color:"white", outline:"none", fontSize:"13px", flex:1}}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...(field.options || [])];
 newOpts[i] = e.target.value;
                          updateField(field.id, "options", newOpts);
                        }}
                      />
                      <button onClick={() => {
                        const newOpts = (field.options || []).filter((_, idx) => idx !== i);
                        updateField(field.id, "options", newOpts);
                      }} style={{background:"none", border:"none", color:"rgba(239,68,68,0.7)", cursor:"pointer", fontSize:"16px"}}>x</button>
                    </div>
                  ))}
                  <button onClick={() => updateField(field.id, "options", [...(field.options || []), "New Option"])}
                    style={{background:"rgba(77,216,232,0.08)", border:"1px dashed rgba(77,216,232,0.3)", borderRadius:"8px", padding:"6px 16px", color:"#4dd8e8", cursor:"pointer", fontSize:"12px", marginTop:"4px"}}>
                    + Add Option
                  </button>
                </div>
              )}

              {showPlaceholder(field.type) && (
                <input
                  style={{width:"100%", background:"transparent", border:"none", outline:"none", fontSize:"13px", color:"rgba(255,255,255,0.3)", marginTop:"4px"}}
                  value={field.placeholder}
                  onChange={(e) => updateField(field.id, "placeholder", e.target.value)}
                  placeholder="Placeholder text"
                />
              )}
            </div>
          ))}
        </div>

        <div style={{display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"28px"}}>
          {fieldTypes.map(({type, label, icon}) => (
            <button key={type} onClick={() => addField(type)}
              style={{background:"rgba(77,216,232,0.08)", border:"1px solid rgba(77,216,232,0.25)", borderRadius:"10px", padding:"8px 16px", color:"#4dd8e8", cursor:"pointer", fontSize:"13px", fontWeight:600}}>
              {icon} {label}
            </button>
          ))}
        </div>

        {blobId && (
          <div style={{background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:"14px", padding:"20px", marginBottom:"16px"}}>
            <p style={{color:"#4ade80", fontSize:"13px", fontWeight:600, marginBottom:"8px"}}>Published on Walrus!</p>
            <p style={{color:"rgba(255,255,255,0.6)", fontSize:"12px", wordBreak:"break-all"}}>
              walform-tau.vercel.app/form/{blobId}
            </p>
          </div>
        )}

        <button
          onClick={publishForm}
          disabled={publishing}
          style={{background:"linear-gradient(135deg, #4dd8e8, #2563eb)", width:"100%", padding:"16px", borderRadius:"14px", fontSize:"16px", fontWeight:700, border:"none", cursor:"pointer", color:"#050a14", opacity: publishing ? 0.7 : 1, boxShadow:"0 0 30px rgba(77,216,232,0.3)"}}>
          {publishing ? "Publishing to Walrus..." : "Publish Form to Walrus"}
        </button>
      </div>
    </main>
  );
}