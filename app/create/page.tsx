[09/05/2026 18:52] Imrankhan 👾 BITS 🐦 SUI ♻️: "use client";
import { useState } from "react";
import { uploadToWalrus } from "../walrus";

interface Field {
  id: number;
  type: string;
  label: string;
  required: boolean;
  placeholder: string;
}

export default function CreateForm() {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, type: "text", label: "Your Name", required: true, placeholder: "Enter your name" },
  ]);
  const [title, setTitle] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [blobId, setBlobId] = useState("");

  const addField = (type: string) => {
    const labels: any = { text: "Short Answer", email: "Email Address", textarea: "Long Answer" };
    const placeholders: any = { text: "Type here...", email: "example@email.com", textarea: "Write your answer..." };
    setFields([...fields, {
      id: Date.now(),
      type,
      label: labels[type],
      required: false,
      placeholder: placeholders[type]
    }]);
  };

  const updateField = (id: number, key: string, value: string) => {
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
      alert("Upload failed — check connection");
    }
    setPublishing(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav style={{borderBottom:"1px solid rgba(139,92,246,0.3)"}} className="px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold" style={{background:"linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
          🦭 WalForm
        </a>
        <button style={{background:"linear-gradient(135deg, #7c3aed, #2563eb)", border:"none"}} className="px-4 py-2 rounded-lg text-sm font-medium">
          Connect Wallet
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Form Title */}
        <div style={{background:"rgba(139,92,246,0.08)", border:"1px solid rgba(139,92,246,0.3)", borderRadius:"16px", padding:"24px", marginBottom:"16px"}}>
          <input
            className="w-full bg-transparent outline-none font-bold text-white"
            style={{fontSize:"28px", marginBottom:"8px"}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Form Title"
          />
          <input
            className="w-full bg-transparent outline-none text-gray-400"
            style={{fontSize:"14px"}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Form description (optional)"
          />
        </div>

        {/* Fields */}
        <div className="space-y-4 mb-6">
          {fields.map((field, index) => (
            <div key={field.id} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(139,92,246,0.2)", borderRadius:"16px", padding:"20px"}}>
              <div className="flex justify-between items-center mb-3">
                <span style={{color:"#a78bfa", fontSize:"12px", fontWeight:600}}>
                  {field.type.toUpperCase()} FIELD
                </span>
                {fields.length > 1 && (
                  <button onClick={() => removeField(field.id)} style={{color:"#ef4444", background:"none", border:"none", cursor:"pointer", fontSize:"18px"}}>
                    ✕
                  </button>
                )}
[09/05/2026 18:52] Imrankhan 👾 BITS 🐦 SUI ♻️: </div>
              <input
                className="w-full bg-transparent outline-none font-semibold text-white mb-2"
                style={{fontSize:"16px", borderBottom:"1px solid rgba(139,92,246,0.3)", paddingBottom:"8px"}}
                value={field.label}
                onChange={(e) => updateField(field.id, "label", e.target.value)}
                placeholder="Question label"
              />
              <input
                className="w-full bg-transparent outline-none text-gray-500"
                style={{fontSize:"13px", marginTop:"8px"}}
                value={field.placeholder}
                onChange={(e) => updateField(field.id, "placeholder", e.target.value)}
                placeholder="Placeholder text"
              />
            </div>
          ))}
        </div>

        {/* Add Field Buttons */}
        <div className="flex gap-3 mb-8">
          <button onClick={() => addField("text")} style={{background:"rgba(139,92,246,0.15)", border:"1px solid rgba(139,92,246,0.4)", borderRadius:"8px", padding:"8px 16px", color:"#a78bfa", cursor:"pointer", fontSize:"13px"}}>
            + Text
          </button>
          <button onClick={() => addField("email")} style={{background:"rgba(139,92,246,0.15)", border:"1px solid rgba(139,92,246,0.4)", borderRadius:"8px", padding:"8px 16px", color:"#a78bfa", cursor:"pointer", fontSize:"13px"}}>
            + Email
          </button>
          <button onClick={() => addField("textarea")} style={{background:"rgba(139,92,246,0.15)", border:"1px solid rgba(139,92,246,0.4)", borderRadius:"8px", padding:"8px 16px", color:"#a78bfa", cursor:"pointer", fontSize:"13px"}}>
            + Long Text
          </button>
        </div>

        {/* Published */}
        {blobId && (
          <div style={{background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:"12px", padding:"16px", marginBottom:"16px"}}>
            <p style={{color:"#4ade80", fontSize:"13px", marginBottom:"8px"}}>
              Form published on Walrus!
            </p>
            <p style={{color:"white", fontSize:"12px", wordBreak:"break-all"}}>
              Share link: walform-tau.vercel.app/form/{blobId}
            </p>
          </div>
        )}

        {/* Publish Button */}
        <button
          onClick={publishForm}
          disabled={publishing}
          style={{background:"linear-gradient(135deg, #7c3aed, #2563eb)", width:"100%", padding:"14px", borderRadius:"12px", fontSize:"16px", fontWeight:600, border:"none", cursor:"pointer", opacity: publishing ? 0.7 : 1}}
        >
          {publishing ? "Publishing to Walrus..." : "Publish Form to Walrus"}
        </button>
      </div>
    </main>
  );
}