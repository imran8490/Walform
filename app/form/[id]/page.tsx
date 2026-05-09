"use client";
import { useState, useEffect } from "react";
import { getFromWalrus } from "../../walrus";

export default function FormPage({ params }: { params: Promise<{ id: string }> }) {
  const [form, setForm] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      console.log("Blob ID:", id);
      getFromWalrus(id)
        .then((data) => {
          setForm(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;

  if (error) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center flex-col gap-4">
      <p className="text-red-400">Error: {error}</p>
    </div>
  );

  if (submitted) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center text-2xl">Submitted!</div>;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-purple-400">WalForm</h1>
      </nav>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8">{form.title}</h2>
        <div className="space-y-6 mb-8">
          {form.fields?.map((field: any) => (
            <div key={field.id}>
              <label className="block text-sm font-medium mb-2 text-gray-300">{field.label}</label>
              <input
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                placeholder={"Enter " + field.label}
                onChange={(e) => setAnswers({ ...answers, [field.id]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setSubmitted(true)}
          className="bg-purple-600 hover:bg-purple-700 w-full py-3 rounded-xl font-semibold"
        >
          Submit Response
        </button>
      </div>
    </main>
  );
}