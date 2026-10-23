"use client";

import { useState } from "react";
import { User, Bell, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  // Form states
  const [name, setName] = useState("Irfan Karim");
  const [email, setEmail] = useState("irfan@example.com");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000); // Hide the "Saved" message after 3 seconds
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-2 shrink-0">
          <TabButton icon={<User size={18} />} label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
          <TabButton icon={<Bell size={18} />} label="Notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
          <TabButton icon={<Shield size={18} />} label="Security" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
        </aside>

        {/* Form Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSave} className="space-y-6">
            
            {activeTab === "profile" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-slate-600 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-slate-600 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <ToggleSwitch label="Email Notifications" description="Receive daily summaries and alerts." checked={emailNotifs} onChange={setEmailNotifs} />
                <ToggleSwitch label="Marketing Emails" description="Receive tips, product updates, and offers." checked={marketing} onChange={setMarketing} />
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800">Change Password</h3>
                  <p className="text-sm text-slate-500 mb-4">Ensure your account is using a long, random password to stay secure.</p>
                  <button type="button" className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition">
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            {activeTab !== "security" && (
              <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition flex items-center gap-2"
                >
                  <Save size={18} /> Save Changes
                </button>
                {saved && <span className="text-green-600 text-sm font-medium">Settings saved successfully!</span>}
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable UI Components
function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
        active ? "bg-blue-50 text-blue-700 font-medium border border-blue-100" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ToggleSwitch({ label, description, checked, onChange }: { label: string, description: string, checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-slate-800">{label}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}