import React, { useState } from 'react';
import { Plane, ArrowRight, ArrowRightLeft, Star, ChevronDown, CheckCircle2, Minus, Info, ChevronRight, Clock, AlertCircle, Building2, Ticket, ShieldCheck, ChevronLeft, Briefcase, X, Utensils, Armchair, MoveRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FareSelection({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [selectedFare, setSelectedFare] = useState<'saver' | 'flexi' | 'upfront'>('flexi');

  const fares = {
    saver: {
      id: 'saver',
      title: 'Saver',
      basePrice: 24500,
      bluChipSavings: 2000,
      subtitle: 'Basic fare for budget travel',
    },
    flexi: {
      id: 'flexi',
      title: 'Flexi Plus',
      basePrice: 26200,
      bluChipSavings: 2500,
      subtitle: '+₹1,700 for flexibility',
      description: 'Free changes + meal + seat',
      badge: 'Most chosen',
      tagline: 'Best balance of price & flexibility'
    },
    upfront: {
      id: 'upfront',
      title: 'IndiGo UpFront',
      basePrice: 28700,
      bluChipSavings: 3000,
      subtitle: '+₹2,500 for premium comfort',
      description: 'Front row seat + extra baggage',
    }
  };

  const currentTotal = fares[selectedFare].basePrice - fares[selectedFare].bluChipSavings;

  return (
    <motion.div 
      key="fare-selection"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1200px] mx-auto w-full space-y-6 pb-24"
    >
      {/* Top Section */}
      <div className="flex flex-col items-center text-center mt-4">
        <div className="flex items-center gap-4 text-white/60 hover:text-white cursor-pointer transition-colors absolute left-4 lg:left-8 top-8 lg:top-24 mt-2 lg:mt-0" onClick={onBack}>
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Back to flights</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-3xl font-serif text-white">Kochi</h2>
          <ArrowRight className="w-5 h-5 text-white/50" />
          <h2 className="text-3xl font-serif text-white">Dubai</h2>
        </div>
        <p className="text-sm font-medium text-white/60 mb-8">29 Apr • 1 Passenger • Economy</p>

        <h3 className="text-xl font-bold tracking-tight text-white mb-1">Compare fares and choose what works best for you</h3>
        <p className="text-sm text-white/50">We’ve highlighted the most chosen option</p>
      </div>

      {/* Fare Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative">
        <FareCard 
          fare={fares.saver} 
          isSelected={selectedFare === 'saver'} 
          onSelect={() => setSelectedFare('saver')} 
          features={[
            { name: 'Cabin baggage', value: '7kg', icon: <Briefcase className="w-4 h-4" /> },
            { name: 'Check-in baggage', value: '30kg', icon: <Briefcase className="w-4 h-4" /> },
            { name: 'Change fee', value: 'Standard charges', isHighlight: false, icon: <AlertCircle className="w-4 h-4" /> },
            { name: 'Cancellation', value: 'Standard charges', isHighlight: false, icon: <AlertCircle className="w-4 h-4" /> },
            { name: 'Meal', value: 'No meal', isHighlight: false, icon: <Minus className="w-4 h-4 text-white/20" /> },
            { name: 'Seat selection', value: 'Standard seat', isHighlight: false, icon: <Armchair className="w-4 h-4" /> },
          ]}
        />
        
        <FareCard 
          fare={fares.flexi} 
          isSelected={selectedFare === 'flexi'} 
          onSelect={() => setSelectedFare('flexi')} 
          features={[
            { name: 'Cabin baggage', value: '7kg', icon: <Briefcase className="w-4 h-4" /> },
            { name: 'Check-in baggage', value: '30kg', icon: <Briefcase className="w-4 h-4" /> },
            { name: 'Change fee', value: 'Partial charges', isHighlight: true, icon: <AlertCircle className="w-4 h-4 text-blue-400" /> },
            { name: 'Cancellation', value: 'Partial charges', isHighlight: true, icon: <AlertCircle className="w-4 h-4 text-blue-400" /> },
            { name: 'Meal', value: 'Complimentary meal', isHighlight: true, icon: <Utensils className="w-4 h-4 text-emerald-400" /> },
            { name: 'Seat selection', value: 'Complimentary standard', isHighlight: true, icon: <Armchair className="w-4 h-4 text-emerald-400" /> },
          ]}
        />

        <FareCard 
          fare={fares.upfront} 
          isSelected={selectedFare === 'upfront'} 
          onSelect={() => setSelectedFare('upfront')} 
          features={[
            { name: 'Cabin baggage', value: '7kg', icon: <Briefcase className="w-4 h-4" /> },
            { name: 'Check-in baggage', value: '35kg', isHighlight: true, icon: <Briefcase className="w-4 h-4 text-emerald-400" /> },
            { name: 'Change fee', value: 'Zero change fee', isHighlight: true, icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
            { name: 'Cancellation', value: 'Low cancellation charges', isHighlight: true, icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
            { name: 'Meal', value: 'Complimentary meal', isHighlight: true, icon: <Utensils className="w-4 h-4 text-emerald-400" /> },
            { name: 'Seat selection', value: 'Front row seat', isHighlight: true, icon: <Armchair className="w-4 h-4 text-emerald-400" /> },
          ]}
        />
      </div>

      {/* Sticky Bottom Bar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 flex justify-center pointer-events-none"
      >
        <div className="glass-panel-dark border border-white/20 rounded-2xl px-6 py-4 flex items-center justify-between backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.4)] pointer-events-auto w-full max-w-4xl relative overflow-hidden bg-[#1e0a3c]/95">
           <div className="flex flex-col relative z-10">
             <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Total Fare</span>
             <div className="flex items-end gap-3">
               <span className="text-2xl font-black text-white leading-none tracking-tight">₹{currentTotal.toLocaleString('en-IN')}</span>
             </div>
           </div>
           
           <button onClick={onNext} className="bg-white text-[#001B94] hover:bg-gray-100 rounded-xl px-10 py-3.5 font-bold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,255,255,0.1)] relative z-10 group/btn">
             Next <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FareCard({ fare, isSelected, onSelect, features }: { fare: any; isSelected: boolean; onSelect: () => void; features: any[] }) {
  const finalPrice = fare.basePrice - fare.bluChipSavings;

  return (
    <div 
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-300 rounded-3xl overflow-hidden glass-panel-dark flex flex-col pt-6 pb-6 px-5 ${
        isSelected 
          ? 'border-2 border-emerald-400/50 bg-gradient-to-b from-[#1932ab]/30 to-[#0e1b60]/20 shadow-[0_0_40px_rgba(52,211,153,0.15)] scale-[1.02] z-10' 
          : 'border border-white/10 hover:border-white/20 hover:bg-white/[0.03] opacity-80 hover:opacity-100'
      }`}
    >
      {fare.badge && (
        <div className="absolute top-0 left-0 right-0 bg-emerald-500/20 border-b border-emerald-500/30 text-center py-1.5">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{fare.badge}</span>
        </div>
      )}
      
      {/* Radio indicator */}
      <div className={`absolute top-6 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
        isSelected ? 'border-emerald-400 bg-emerald-400/20' : 'border-white/20'
      }`}>
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
      </div>

      <div className={`flex flex-col ${fare.badge ? 'mt-4' : ''}`}>
        <div className="mb-3">
          <h4 className={`text-xl font-bold tracking-tight ${isSelected ? 'text-white' : 'text-white/90'}`}>{fare.title}</h4>
          {fare.tagline && <p className="text-[10px] font-medium text-emerald-400 mt-1">{fare.tagline}</p>}
        </div>
        
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-[12px] font-medium text-white/40 line-through decoration-white/20 mb-0.5">₹{fare.basePrice.toLocaleString('en-IN')}</p>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-black text-white leading-none tracking-tight">₹{finalPrice.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[11px] font-bold text-emerald-400 mt-1">You save ₹{fare.bluChipSavings.toLocaleString('en-IN')}</p>
        </div>

        <div className="mt-3 mb-6 pb-5 border-b border-white/10 flex flex-col gap-1">
          <p className={`text-[11px] font-medium ${isSelected ? 'text-emerald-300/80' : 'text-white/50'}`}>
            {fare.subtitle}
          </p>
          {fare.description && (
            <p className="text-[10px] font-medium text-white/40">
              {fare.description}
            </p>
          )}
        </div>

        {/* Features list */}
        <div className="flex flex-col gap-5 mt-2">
           {features.map((feat, i) => (
             <div key={i} className="flex items-center gap-3 min-h-[32px]">
                <div className={`w-5 flex justify-center shrink-0 ${feat.isHighlight && isSelected ? 'text-emerald-400' : 'text-white/30'}`}>
                   {feat.icon}
                </div>
                <div className="flex flex-col flex-1 justify-center">
                   <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider leading-tight mb-0.5">{feat.name}</span>
                   <span className={`text-[12px] font-bold leading-tight ${feat.isHighlight ? (isSelected ? 'text-white' : 'text-white/80') : 'text-white/60'}`}>{feat.value}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

