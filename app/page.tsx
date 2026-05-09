"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const divClass = visible
    ? "opacity-100 translate-y-0 transition-all duration-700"
    : "opacity-0 translate-y-10 transition-all duration-700";

  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <nav className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400">WalForm</h1>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
          Connect Wallet
        </button>
      </nav>

      <div className={divClass} style={{maxWidth:"896px", margin:"0 auto", padding:"80px 24px", textAlign:"center"}}>

        <div className="text-8xl mb-6">🦭</div>

        <h2 className="text-5xl font-bold mb-6 text-purple-400">
          Decentralized Forms on Walrus
        </h2>

        <p className="text-gray-400 text-xl mb-4">
          Create forms, collect responses, store everything onchain.
        </p>
        <p className="text-gray-500 text-sm mb-10">
          Powered by Walrus decentralized storage on Sui
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <a href="/create">
            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-lg font-semibold">
              Create Form
            </button>
          </a>
          <button className="border border-gray-700 hover:border-purple-500 px-8 py-4 rounded-xl text-lg font-semibold">
            View Demo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-bold mb-2">Build Forms</h3>
            <p className="text-gray-400 text-sm">Multiple field types supported</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">🦭</div>
            <h3 className="font-bold mb-2">Store on Walrus</h3>
            <p className="text-gray-400 text-sm">Fully decentralized storage</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-bold mb-2">Encrypted</h3>
            <p className="text-gray-400 text-sm">Private responses with Seal</p>
          </div>
        </div>
      </div>
    </main>
  );
}