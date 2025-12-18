import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Bug, 
  Truck, 
  Users, 
  Thermometer, 
  Fuel, 
  ShieldCheck, 
  History,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  UserPlus,
  BookOpen,
  Plus,
  FileText,
  Upload,
  LayoutDashboard,
  Settings,
  Download
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('home');
  const [records, setRecords] = useState({
    cleaning: [],
    pest: [],
    fuel: [],
    training: [],
    vehicle: [],
    visitor: [],
    temps: [],
    documents: []
  });

  const staffList = [
    "Farm Manager", 
    "Staff Member 1", 
    "Staff Member 2", 
    "Staff Member 3", 
    "Staff Member 4", 
    "Seasonal Worker 1 (Harvest)", 
    "Seasonal Worker 2 (Harvest)"
  ];

  const stores = ["Cold Store 1", "Cold Store 2", "Cold Store 3", "Loading Bay", "Grading Area"];

  const requiredDocs = [
    { name: "HACCP Plan (Storage & Handling)", category: "Food Safety", id: "haccp" },
    { name: "Cleaning Schedule & Procedures", category: "Food Safety", id: "cleaning_proc" },
    { name: "Glass & Hard Plastic Register", category: "Food Safety", id: "glass_reg" },
    { name: "Site Map (Bait Points & Water)", category: "Site", id: "map" },
    { name: "Water Management Plan & Tests", category: "Environment", id: "water" },
    { name: "Waste Management Plan", category: "Environment", id: "waste" },
    { name: "Biodiversity / Environment Plan", category: "Environment", id: "bio" },
    { name: "Farm Safety Risk Assessment", category: "Safety", id: "fsra" },
    { name: "Health & Safety Policy", category: "Safety", id: "hsp" },
    { name: "Emergency Procedures (Spills/Fire)", category: "Safety", id: "ep" },
    { name: "First Aid & PPE Policy", category: "Safety", id: "ppe" },
    { name: "Traceability & Recall Procedure", category: "Quality", id: "trace" },
    { name: "Complaint & Quality Procedure", category: "Quality", id: "complaint" },
    { name: "Self-Assessment (Internal Audit)", category: "Quality", id: "internal" },
    { name: "Approved PPPL (Current Season)", category: "Tesco", id: "pppl_doc" },
    { name: "Residue Testing Plan", category: "Tesco", id: "residue" },
    { name: "Sustainable Farming Plan", category: "Tesco", id: "sustainable" }
  ];

  const ppplData = [
    { product: "InSyst", active: "Acetamiprid", group: "Insecticide", phi: "7 Days", status: "Approved" },
    { product: "Fazor", active: "Maleic Hydrazide", group: "Growth Reg", phi: "21 Days", status: "Approved" },
    { product: "Amistar", active: "Azoxystrobin", group: "Fungicide", phi: "7 Days", status: "Restricted" },
    { product: "Maxim", active: "Fludioxonil", group: "Seed Treatment", phi: "N/A", status: "Approved" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('farm_records_v5');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  const saveRecord = (type, data) => {
    const newRecords = {
      ...records,
      [type]: [{ ...data, id: Date.now(), timestamp: new Date().toLocaleString() }, ...records[type]]
    };
    setRecords(newRecords);
    localStorage.setItem('farm_records_v5', JSON.stringify(newRecords));
    setView('home');
  };

  // --- REUSABLE COMPONENTS ---

  const Sidebar = () => (
    <aside className="hidden md:flex flex-col w-64 bg-emerald-900 text-white min-h-screen sticky top-0">
      <div className="p-6 border-b border-emerald-800 flex items-center gap-3">
        <ShieldCheck className="text-emerald-400" size={32} />
        <span className="font-black text-xl tracking-tighter uppercase">Eire-Potato</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <button onClick={() => setView('home')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${view === 'home' ? 'bg-emerald-800' : 'hover:bg-emerald-800/50'}`}>
          <LayoutDashboard size={20} /> Dashboard
        </button>
        <button onClick={() => setView('documents')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${view === 'documents' ? 'bg-emerald-800' : 'hover:bg-emerald-800/50'}`}>
          <FileText size={20} /> Policy Vault
        </button>
        <button onClick={() => setView('history')} className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors ${view === 'history' ? 'bg-emerald-800' : 'hover:bg-emerald-800/50'}`}>
          <History size={20} /> Audit Trail
        </button>
        <div className="pt-4 pb-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-3">Field Records</div>
        <div className="px-3 py-2 text-xs text-emerald-300 italic opacity-60">Managed via Farm Plan</div>
      </nav>
      <div className="p-4 border-t border-emerald-800">
        <div className="flex items-center gap-3 text-sm opacity-80">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold">FM</div>
          Farm Manager
        </div>
      </div>
    </aside>
  );

  const BottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-8 py-4 flex justify-around items-center z-50 rounded-t-3xl shadow-lg">
      <button onClick={() => setView('home')} className={`flex flex-col items-center gap-1 ${view === 'home' ? 'text-emerald-700 scale-110' : 'text-slate-400'}`}>
        <LayoutDashboard size={24} />
        <span className="text-[10px] font-bold uppercase">Home</span>
      </button>
      <button onClick={() => setView('history')} className={`flex flex-col items-center gap-1 ${view === 'history' ? 'text-emerald-700 scale-110' : 'text-slate-400'}`}>
        <History size={24} />
        <span className="text-[10px] font-bold uppercase">Logs</span>
      </button>
      <button onClick={() => setView('documents')} className={`flex flex-col items-center gap-1 ${view === 'documents' ? 'text-emerald-700 scale-110' : 'text-slate-400'}`}>
        <FileText size={24} />
        <span className="text-[10px] font-bold uppercase">Vault</span>
      </button>
    </div>
  );

  // --- VIEWS ---

  const HomeView = () => (
    <div className="space-y-8 animate-in fade-in duration-500 p-4 md:p-8">
      {/* Hero / Header */}
      <div className="bg-emerald-800 md:bg-emerald-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">Operational Control</h1>
          <p className="text-emerald-200 text-sm max-w-md">Real-time record keeping for Bord Bia, Global GAP, and Tesco Nurture audits.</p>
          <div className="flex gap-3 mt-6">
            <div className="bg-emerald-700/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-emerald-600/30">
              <p className="text-[10px] uppercase font-bold text-emerald-400">Stores</p>
              <p className="text-lg font-black">3 BOX COLD</p>
            </div>
            <div className="bg-emerald-700/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-emerald-600/30">
              <p className="text-[10px] uppercase font-bold text-emerald-400">Staff</p>
              <p className="text-lg font-black">7 ACTIVE</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-12 opacity-10">
          <ShieldCheck size={240} />
        </div>
        <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold transition-all text-sm border border-white/20">
          <Download size={18} /> Export Audit Data
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'temps', label: 'Store Temperature', icon: Thermometer, color: 'bg-cyan-600', desc: 'Daily Box Store Monitoring' },
          { id: 'cleaning', label: 'Cleaning Logs', icon: ClipboardCheck, color: 'bg-blue-600', desc: 'Store & Box Hygiene' },
          { id: 'pest', label: 'Pest Control', icon: Bug, color: 'bg-rose-600', desc: 'Bait Point Inspections' },
          { id: 'vehicle', label: 'Vehicle Inspection', icon: Truck, color: 'bg-amber-600', desc: 'Inbound Customer Checks' },
          { id: 'pppl', label: 'Tesco PPPL', icon: BookOpen, color: 'bg-indigo-600', desc: 'Chemical Approval List' },
          { id: 'fuel', label: 'Fuel Usage', icon: Fuel, color: 'bg-slate-700', desc: 'Diesel & Asset Tracking' },
          { id: 'training', label: 'Staff Training', icon: Users, color: 'bg-purple-600', desc: 'Compliance Sign-offs' },
          { id: 'visitor', label: 'Visitor Log', icon: UserPlus, color: 'bg-emerald-700', desc: 'Health Declarations' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className="group flex flex-col items-start p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 transition-all active:scale-95 text-left"
          >
            <div className={`${item.color} p-3 rounded-2xl text-white mb-4 shadow-lg transition-transform group-hover:scale-110`}>
              <item.icon size={28} />
            </div>
            <p className="font-black text-slate-800 leading-tight mb-1">{item.label}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Recent Log Table for Desktop / Cards for Mobile */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-black text-xl text-slate-800 flex items-center gap-3">
            <History className="text-emerald-600" />
            Live Activity Stream
          </h2>
          <button onClick={() => setView('history')} className="text-emerald-700 font-bold hover:underline text-sm">Review All Records</button>
        </div>
        
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 border-b">
                <th className="pb-3 px-2">Timestamp</th>
                <th className="pb-3 px-2">Type</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {Object.values(records).flat().sort((a,b) => b.id - a.id).slice(0, 5).map((rec, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-2 text-sm font-medium text-slate-500">{rec.timestamp}</td>
                  <td className="py-4 px-2 font-bold text-slate-800 capitalize">Audit Check</td>
                  <td className="py-4 px-2">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">VERIFIED</span>
                  </td>
                  <td className="py-4 px-2"><ChevronRight className="text-slate-300" size={18} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3">
          {Object.values(records).flat().sort((a,b) => b.id - a.id).slice(0, 3).map((rec, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <CheckCircle2 className="text-emerald-500" size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800">{rec.timestamp}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Record Synchronized</p>
              </div>
            </div>
          ))}
          {Object.values(records).flat().length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <ClipboardCheck size={48} className="mx-auto opacity-20 mb-2" />
              <p className="text-sm italic">No entries captured yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const FormWrapper = ({ title, color, children }) => (
    <div className="animate-in slide-in-from-bottom duration-500 p-4 md:p-12 max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className={`${color} p-8 text-white flex justify-between items-center`}>
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">{title}</h2>
            <p className="text-white/70 text-sm mt-1">Submit record for audit history</p>
          </div>
          <button onClick={() => setView('home')} className="bg-black/20 p-3 rounded-2xl hover:bg-black/40 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );

  // --- COMPONENT RENDER ---

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900 overflow-x-hidden">
      <Sidebar />
      
      <main className="flex-1 w-full relative">
        <div className="md:hidden flex justify-between items-center p-4 bg-white border-b sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" />
            <span className="font-black text-lg tracking-tighter uppercase">Eire-Potato</span>
          </div>
          <button onClick={() => setView('history')} className="text-slate-400 hover:text-emerald-600">
            <History size={24} />
          </button>
        </div>

        <div className="pb-32 md:pb-8">
          {view === 'home' && <HomeView />}
          
          {view === 'temps' && (
            <FormWrapper title="Store Temperature" color="bg-cyan-700">
              <form onSubmit={(e) => { e.preventDefault(); saveRecord('temps', Object.fromEntries(new FormData(e.target))); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Cold Store Unit</label>
                    <select name="store" className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 font-bold">
                      <option>Cold Store 1</option><option>Cold Store 2</option><option>Cold Store 3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Temperature Reading (°C)</label>
                    <input name="temp" type="number" step="0.1" required placeholder="e.g. 2.4" className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 text-2xl font-black" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-cyan-900/20 transition-all uppercase tracking-tight">Record Temperature</button>
              </form>
            </FormWrapper>
          )}

          {view === 'pest' && (
            <FormWrapper title="Pest Control" color="bg-rose-700">
              <form onSubmit={(e) => { e.preventDefault(); saveRecord('pest', Object.fromEntries(new FormData(e.target))); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Bait Point ID</label>
                    <input name="baitPoint" type="number" required placeholder="Station #" className="w-full p-4 bg-slate-100 rounded-2xl outline-none text-2xl font-black" />
                  </div>
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-3 p-5 bg-slate-100 rounded-2xl cursor-pointer">
                      <input type="checkbox" name="replenished" className="w-6 h-6 accent-emerald-600 rounded-md" />
                      <span className="font-bold text-slate-700">Bait Replenished?</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col items-center justify-center p-6 border-2 rounded-3xl cursor-pointer hover:bg-slate-50 transition-all">
                    <input type="radio" name="status" value="Clear" defaultChecked className="w-6 h-6 mb-2 accent-emerald-600" />
                    <span className="font-black text-slate-800 uppercase text-xs">Clear</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-rose-100 rounded-3xl cursor-pointer hover:bg-rose-50 transition-all">
                    <input type="radio" name="status" value="Activity" className="w-6 h-6 mb-2 accent-rose-600" />
                    <span className="font-black text-rose-700 uppercase text-xs">Activity Found</span>
                  </label>
                </div>
                <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200 text-[10px] text-yellow-800 font-bold uppercase tracking-wider flex items-center gap-3">
                  <AlertTriangle size={20} /> TESCO NURTUREinfestation protocol applies to "Activity Found" logs.
                </div>
                <button type="submit" className="w-full bg-rose-700 hover:bg-rose-800 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-rose-900/20 transition-all uppercase tracking-tight">Log Inspection</button>
              </form>
            </FormWrapper>
          )}

          {view === 'pppl' && (
            <div className="p-4 md:p-12 max-w-5xl mx-auto w-full">
              <div className="flex items-center mb-8">
                <button onClick={() => setView('home')} className="p-3 bg-white rounded-xl shadow-sm mr-4 hover:bg-slate-50"><X /></button>
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Tesco PPPL <span className="text-emerald-600">2024/25</span></h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ppplData.map((p, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xl font-black text-slate-800 leading-none mb-1">{p.product}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.active}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-50">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-400">Harvest Interval</span>
                        <span className="font-black text-indigo-700">{p.phi}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-400">Class</span>
                        <span className="font-black text-slate-700">{p.group}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'documents' && (
            <div className="p-4 md:p-12 max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="hidden md:block p-3 bg-emerald-700 text-white rounded-2xl"><FileText size={32}/></div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none">Policy Vault</h2>
                    <p className="text-sm text-slate-400 font-bold uppercase mt-1">Audit Documentation Control</p>
                  </div>
                </div>
                <button onClick={() => setView('add_doc')} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-4 rounded-2xl font-black shadow-lg shadow-emerald-900/20 transition-all text-sm uppercase">
                  <Plus size={20}/> Log Policy
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {["Food Safety", "Site", "Environment", "Safety", "Quality", "Tesco"].map(cat => (
                  <section key={cat} className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                      <div className="w-8 h-[2px] bg-emerald-200"></div> {cat} Standards
                    </h3>
                    <div className="space-y-3">
                      {requiredDocs.filter(d => d.category === cat).map(doc => {
                        const uploaded = records.documents.find(d => d.requirementId === doc.id);
                        return (
                          <div key={doc.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-300 transition-all">
                            <div className="flex-1 pr-4">
                              <p className="text-sm font-black text-slate-800 group-hover:text-emerald-700 transition-colors">{doc.name}</p>
                              {uploaded ? (
                                <p className="text-[10px] text-emerald-600 font-black uppercase mt-1 flex items-center gap-1">
                                  <CheckCircle2 size={12} /> Last Review: {uploaded.versionDate}
                                </p>
                              ) : (
                                <p className="text-[10px] text-rose-500 font-black uppercase mt-1 flex items-center gap-1">
                                  <AlertTriangle size={12} /> Pending Upload
                                </p>
                              )}
                            </div>
                            <button 
                              onClick={() => setView('add_doc')}
                              className={`p-3 rounded-2xl transition-all ${uploaded ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700'}`}
                            >
                              {uploaded ? <ShieldCheck size={24}/> : <Upload size={24}/>}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}

          {view === 'add_doc' && (
            <FormWrapper title="Log Policy" color="bg-emerald-800">
              <form onSubmit={(e) => { e.preventDefault(); saveRecord('documents', Object.fromEntries(new FormData(e.target))); setView('documents'); }} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Requirement Category</label>
                  <select name="requirementId" className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-bold">
                    <option value="">Select Audit Point...</option>
                    {requiredDocs.map(rd => <option key={rd.id} value={rd.id}>{rd.name}</option>)}
                    <option value="custom">Specialist Policy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Document Display Name</label>
                  <input name="docName" required placeholder="e.g. 2024 Waste Mgmt Plan" className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Version/Revision Date</label>
                  <input name="versionDate" type="date" required className="w-full p-4 bg-slate-100 rounded-2xl outline-none" />
                </div>
                <div className="p-10 bg-emerald-50 rounded-[2rem] border-2 border-dashed border-emerald-200 text-center hover:bg-emerald-100/50 transition-colors">
                  <Upload className="mx-auto text-emerald-600 mb-4" size={48} />
                  <p className="text-sm font-black text-emerald-800 uppercase tracking-tight">Sync Metadata</p>
                  <p className="text-[10px] text-emerald-600 mt-2 font-bold uppercase">Ready for Audit Inspection</p>
                </div>
                <button type="submit" className="w-full bg-emerald-800 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 uppercase tracking-tight">Log Document</button>
              </form>
            </FormWrapper>
          )}

          {view === 'history' && (
            <div className="p-4 md:p-12 max-w-6xl mx-auto w-full">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm"><History className="text-emerald-700" size={32}/></div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none">Audit Trail</h2>
                    <p className="text-sm text-slate-400 font-bold uppercase mt-1">Verified Record History</p>
                  </div>
                </div>
                <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 bg-white px-6 py-4 rounded-2xl font-black border border-slate-200 shadow-sm hover:bg-slate-50 transition-all text-xs uppercase">
                  <Download size={16} /> Print for Auditor
                </button>
              </div>

              <div className="space-y-12">
                {Object.entries(records).map(([type, items]) => (
                  items.length > 0 && type !== 'documents' && (
                    <div key={type} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-700">{type} LOGS</h3>
                        <div className="flex-1 h-[1px] bg-slate-200"></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.map(item => (
                          <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-emerald-300 transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                              <ShieldCheck size={48} />
                            </div>
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter">{item.timestamp}</span>
                            </div>
                            <div className="space-y-2">
                              {Object.entries(item).filter(([k]) => !['id', 'timestamp', 'requirementId'].includes(k)).map(([k, v]) => (
                                <div key={k} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{k.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="text-xs font-black text-slate-800 truncate ml-4 max-w-[150px]">{String(v)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Simple Fallback for other forms */}
          {['fuel', 'training', 'vehicle', 'visitor', 'cleaning'].includes(view) && (
             <FormWrapper 
              title={view.charAt(0).toUpperCase() + view.slice(1)} 
              color={view === 'fuel' ? 'bg-slate-700' : view === 'training' ? 'bg-purple-700' : 'bg-emerald-800'}
             >
               <SimpleFormInner 
                type={view} 
                staffList={staffList} 
                stores={stores} 
                onSave={(data) => saveRecord(view, data)} 
               />
             </FormWrapper>
          )}
        </div>

        <BottomNav />
      </main>
    </div>
  );
};

// --- HELPER COMPONENT FOR REUSABLE FORMS ---

const SimpleFormInner = ({ type, staffList, stores, onSave }) => {
  const fields = {
    cleaning: [
      {label: 'Area', name: 'area', type: 'select', options: stores},
      {label: 'Staff Member', name: 'staff', type: 'select', options: staffList}
    ],
    fuel: [
      {label: 'Litres Supplied', name: 'qty', placeholder: '0.00'},
      {label: 'Vehicle / Asset', name: 'asset', placeholder: 'e.g. Forklift 2'}
    ],
    training: [
      {label: 'Staff Member', name: 'staff', type: 'select', options: staffList},
      {label: 'Topic', name: 'topic', type: 'select', options: ['Manual Handling', 'HACCP/Hygiene', 'Nurture Awareness', 'Global GAP Intro']}
    ],
    vehicle: [
      {label: 'Reg Number', name: 'reg', placeholder: '01-D-1234'},
      {label: 'Driver Name', name: 'driver'},
      {label: 'Condition Checked?', name: 'check', type: 'checkbox'}
    ],
    visitor: [
      {label: 'Visitor Name', name: 'name'},
      {label: 'Purpose', name: 'reason'}
    ]
  }[type];

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(Object.fromEntries(new FormData(e.target))); }} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {fields.map(f => (
          <div key={f.name} className={f.type === 'checkbox' ? 'flex items-end' : ''}>
            {f.type === 'checkbox' ? (
              <label className="flex items-center gap-3 p-4 bg-slate-100 rounded-2xl w-full cursor-pointer">
                <input type="checkbox" name={f.name} className="w-6 h-6 accent-emerald-600 rounded-md" required />
                <span className="font-bold text-slate-700">{f.label}</span>
              </label>
            ) : (
              <>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">{f.label}</label>
                {f.type === 'select' ? (
                  <select name={f.name} className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-bold">
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input name={f.name} required className="w-full p-4 bg-slate-100 rounded-2xl outline-none font-bold" placeholder={f.placeholder} />
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="w-full bg-emerald-800 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/20 uppercase tracking-tight transition-all active:scale-95">Submit Record</button>
    </form>
  );
};

export default App;
