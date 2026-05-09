"use client";
import { useState } from "react";
import { uploadToWalrus } from "../walrus";

export default function CreateForm() {
  const [fields, setFields] = useState([
    { id: 1, type: "text", label: "Your Name", required: true },
  ]);
  const [title, setTitle] = useState("Untitled Form");
  const [publishing, setPublishing] = useState(false);
  const [blobId, setBlobId] = useState("");

  const addField = (type: string) => {
    setFields([...fields, { id: Date.now(), type, label: "New Field", required: false }]);
  };

  const updateLabel = (id: number, newLabel: string) => {
    setFields(fields.map((f) => f.id === id ? { ...f, label: newLabel } : f));
  };

  const publishForm = async () => {
    setPublishing(true);
    try {
      const formData = { title, fields, createdAt: Date.now() };
      const id = await uploadToWalrus(formData);
      setBlobId(id);
    } catch (err) {
      alert("Upload failed");
    }
    setPublishing(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-purple-400">WalForm</a>
        <button className="bg-purple-600 px-4 py-2 rounded-lg text-sm">
          Connect Wallet
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <input
          className="text-3xl font-bold bg-transparent border-b border-gray-700 w-full mb-8 pb-2 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-4 mb-8">
          {fields.map((field) => (
            <div key={field.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <input
                className="bg-transparent text-white w-full outline-none font-medium"
                value={field.label}
                onChange={(e) => updateLabel(field.id, e.target.value)}
              />
              <p className="text-gray-500 text-sm mt-1">{field.type} field</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-8">
          <button onClick={() => addField("text")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm">+ Text</button>
          <button onClick={() => addField("email")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm">+ Email</button>
          <button onClick={() => addField("textarea")} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm">+ Long Text</button>
        </div>

        {blobId && (
          <div className="bg-green-900 border border-green-700 rounded-xl p-4 mb-4">
            <p className="text-green-400 text-sm">Published! Share this link:</p>
            <p className="text-white text-xs break-all mt-1">
              walform-tau.vercel.app/form/{blobId}
            </p>
          </div>
        )}

        <button
          onClick={publishForm}
          disabled={publishing}
          className="bg-purple-600 hover:bg-purple-700 w-full py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {publishing ? "Publishing..." : "Publish Form to Walrus"}
        </button>
      </div>
    </main>
  );
}