import React, { useState } from 'react';
import { Plane, ArrowRight, ArrowRightLeft, Star, ChevronDown, CheckCircle2, Minus, Info, ChevronRight, Clock, AlertCircle, Building2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlightResults({ onBack, onSelect }: { onBack: () => void; onSelect?: () => void }) {
  const [activeSort, setActiveSort] = useState('Best');
  const [selectedDate, setSelectedDate] = useState('29 Jun');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [expandedFlights, setExpandedFlights] = useState<number[]>([]);
  const [selectedIntents, setSelectedIntents] = useState<string[]>(['Non-stop only']);
  
  // Dummy flight data
  const flights = [
    {
      id: 1,
      airline: 'IndiGo',
      flightNo: '6E 2341',
      departureTime: '06:00',
      arrivalTime: '08:15',
      duration: '2h 15m',
      stops: 'Non-stop',
      basePrice: 24500,
      bluChipsSavings: 2000,
      tagTitle: 'Best for early arrival',
      tagDesc: 'Reach early to start the day'
    },
    {
      id: 2,
      airline: 'IndiGo',
      flightNo: '6E 892',
      departureTime: '10:30',
      arrivalTime: '12:40',
      duration: '2h 10m',
      stops: 'Non-stop',
      basePrice: 22800,
      bluChipsSavings: 1500,
      tagTitle: 'Fastest',
      tagDesc: 'Fastest option available'
    },
    {
      id: 3,
      airline: 'IndiGo',
      flightNo: '6E 543',
      departureTime: '14:00',
      arrivalTime: '16:20',
      duration: '2h 20m',
      stops: 'Non-stop',
      basePrice: 27800,
      bluChipsSavings: 3200,
      tagTitle: 'Most booked today',
      tagDesc: 'Highly rated by passengers'
    },
    {
      id: 4,
      airline: 'IndiGo',
      flightNo: '6E 712',
      departureTime: '18:45',
      arrivalTime: '21:05',
      duration: '2h 20m',
      stops: 'Non-stop',
      basePrice: 28600,
      bluChipsSavings: 1800,
      tagTitle: 'Evening flight',
      tagDesc: 'Convenient post-work departure'
    },
    {
      id: 5,
      airline: 'IndiGo',
      flightNo: '6E 433',
      departureTime: '20:15',
      arrivalTime: '22:45',
      duration: '2h 30m',
      stops: 'Non-stop',
      basePrice: 18300,
      bluChipsSavings: 0,
      tagTitle: 'Lowest fare',
      tagDesc: 'Lowest price for this route'
    },
    {
      id: 6,
      airline: 'IndiGo',
      flightNo: '6E 055',
      departureTime: '22:30',
      arrivalTime: '01:10',
      duration: '2h 40m',
      stops: 'Non-stop',
      basePrice: 19500,
      bluChipsSavings: 1200,
      tagTitle: 'Best value',
      tagDesc: 'Great balance of price and time'
    },
    {
      id: 7,
      airline: 'IndiGo',
      flightNo: '6E 531',
      departureTime: '04:30',
      arrivalTime: '06:55',
      duration: '2h 25m',
      stops: 'Non-stop',
      basePrice: 95000,
      bluChipsSavings: 4000,
      tagTitle: 'Business Class',
      tagDesc: 'Premium comfort & priority services'
    }
  ];

  const economyFlights = flights.filter(f => f.tagTitle !== 'Business Class');
  const businessFlights = flights.filter(f => f.tagTitle === 'Business Class');

  return (
    <motion.div 
      key="search-results"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1400px] mx-auto w-full space-y-4"
    >
      {/* LAYER 1 — SUMMARY CONTAINER (TOP) */}
      <div className="w-full bg-white/[0.03] border border-white/5 rounded-[16px] py-4 px-5 lg:py-5 lg:px-6 flex flex-col lg:flex-row justify-between lg:items-start gap-8 lg:gap-12">
        
        {/* LEFT: Route, Meta, Insights */}
        <div className="flex items-start gap-4 w-full xl:w-auto">
          <button onClick={onBack} className="p-2 border border-white/10 hover:bg-white/5 rounded-lg transition-colors group shrink-0 mt-0.5">
             <ChevronRight className="w-5 h-5 text-white/70 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div className="flex flex-col shrink-0">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white/90">Kochi <ArrowRightLeft className="w-5 h-5 text-white/40" /> Dubai</h2>
            <p className="text-sm font-medium text-white/50 mt-2">29 Jun <span className="mx-1.5">•</span> 1 Adult <span className="mx-1.5">•</span> Economy</p>
            <p className="text-xs font-medium text-white/40 mt-1.5 inline-block py-0.5">7 of 23 flights • from ₹18.3K</p>
            <div className="flex items-center gap-2.5 text-[11px] font-medium text-white/60 mt-3 flex-wrap">
              <span className="flex items-center gap-1.5"><span className="text-[10px] opacity-40">●</span> ₹23K–₹26K typical</span>
              <span className="opacity-30">•</span>
              <span className="flex items-center gap-1.5"><span className="text-[10px] text-rose-400">▲</span> Price up ₹1.2K in 24h</span>
              <span className="opacity-30">•</span>
              <span className="flex items-center gap-1.5"><span className="text-[11px] text-emerald-400">✓</span> Free cancellation</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Date Selector Strip */}
        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto hide-scrollbar self-start">
             {[
               { date: '27 Jun', price: '₹21.5K' },
               { date: '28 Jun', price: '₹20.8K' },
               { date: '29 Jun', price: '₹22.5K' },
               { date: '30 Jun', price: '₹21.9K' },
               { date: '1 Jul', price: '₹19.8K' },
               { date: '2 Jul', price: '₹18.3K' },
             ].map((day, idx) => (
               <button 
                 key={idx} 
                 onClick={() => setSelectedDate(day.date)}
                 className={`px-4 py-2 flex flex-col items-center justify-center min-w-[70px] rounded-lg border transition-colors shrink-0 ${
                   selectedDate === day.date 
                     ? 'bg-white/10 border-white/30 shadow-sm' 
                     : 'bg-white/5 border-white/5 hover:border-white/10'
                 }`}
               >
                 <span className={`text-[10px] uppercase font-bold tracking-wider ${selectedDate === day.date ? 'text-white' : 'text-white/40'}`}>{day.date}</span>
                 <span className={`text-xs font-semibold ${selectedDate === day.date ? 'text-white/90' : 'text-white/60'}`}>{day.price}</span>
               </button>
             ))}
             <button className="px-4 py-2 flex flex-col items-center justify-center min-w-[70px] rounded-lg border bg-white/5 border-white/5 hover:border-white/10 transition-colors shrink-0">
               <span className="text-[14px] leading-none mb-1">📅</span>
               <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider">All dates</span>
             </button>
          </div>
        </div>

      {/* FILTER AND SORT CHIPS */}
      <div className="flex flex-wrap items-center gap-2 mt-4 mb-4">
        {['Best', 'Cheapest', 'Fastest', 'Non-stop', 'Flexible'].map(opt => (
          <button 
            key={opt}
            onClick={() => setActiveSort(opt)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              activeSort === opt 
                ? 'bg-white/20 border-white/40 text-white shadow-sm' 
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
        <button className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all border bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white flex items-center gap-1">
          More filters <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SMART PICK STICKY STRIP */}
      <div className="sticky top-4 z-40 bg-blue-900/60 backdrop-blur-xl border border-blue-400/20 rounded-xl px-4 py-3 flex items-center justify-between mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
        <p className="text-[11px] sm:text-xs font-medium text-blue-100">
           <span className="font-bold text-white mr-1.5">Smart pick:</span> <span className="whitespace-nowrap">06:00 → 08:15 • ₹22,500 • Non-stop</span>
        </p>
        <button onClick={onSelect} className="text-[10px] sm:text-[11px] font-bold bg-white text-blue-900 transition-colors px-3 sm:px-4 py-1.5 rounded-md hover:bg-blue-50">View</button>
      </div>

      {/* Main List */}
      <div className="w-full space-y-3">

          <div className="flex flex-col gap-3">
            {economyFlights.map((flight, idx) => (
              <React.Fragment key={flight.id}>
                {idx === 0 && (
                   <div className="flex items-center gap-2 px-2 mt-2">
                      <Star className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white/90">Recommended for you</h3>
                   </div>
                )}
                {idx === 2 && (
                   <h3 className="text-sm font-bold text-white/90 px-2 mt-4">Other flights</h3>
                )}
                <div className="glass-panel-dark border border-white/10 hover:border-white/20 rounded-2xl p-4 relative overflow-hidden backdrop-blur-lg group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1">
                  
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center relative z-0 mt-2 lg:mt-0">
                    
                    {/* LEFT - Flight Understanding */}
                    <div className="flex flex-col w-[200px] shrink-0 mb-5 lg:mb-0">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="w-6 h-6 bg-white rounded flex items-center justify-center p-0.5 shrink-0">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IndiGo_Airlines_logo.svg" alt="IndiGo" className="w-full object-contain" />
                         </div>
                         <p className="text-sm font-semibold text-white/70">{flight.airline} • {flight.flightNo}</p>
                       </div>
                       
                       <div className="flex flex-col gap-1.5 w-full mt-1">
                         <div className="inline-flex bg-white/5 text-white/80 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1.5 rounded items-center gap-2 w-fit border border-white/5">
                           <Star className="w-3.5 h-3.5 text-emerald-400" /> {flight.tagTitle}
                         </div>
                         <p className="text-[11px] text-white/50 font-medium ml-1 leading-snug">{flight.tagDesc}</p>
                       </div>
                    </div>

                    {/* CENTER - Route Visualization */}
                    <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-start min-w-[280px]">
                       {/* Departure */}
                       <div className="text-right">
                         <p className="font-extrabold text-2xl leading-none mb-1">{flight.departureTime}</p>
                         <p className="text-xs font-medium text-white/50">Kochi</p>
                       </div>

                       {/* Visual Line Block */}
                       <div className="flex flex-col items-center px-2 w-[160px] sm:w-[240px]">
                         {/* Top Route Info */}
                         <p className="text-[10px] font-medium text-white/40 whitespace-nowrap mb-1.5 hidden sm:block">
                           {flight.duration} • <span className={flight.stops === 'Non-stop' ? 'text-emerald-400 font-bold' : ''}>{flight.stops}</span>
                         </p>

                         {/* Route Line */}
                         <div className="flex items-center w-full">
                           <div className="w-1.5 h-1.5 rounded-full border border-white/30 bg-transparent z-10 box-content flex-shrink-0" />
                           <div className="flex-1 h-px bg-white/20 mx-0.5" />
                           <div className="w-1.5 h-1.5 rounded-full border border-white/30 bg-white z-10 box-content flex-shrink-0" />
                         </div>
                         
                         {/* Bottom Emotional Info */}
                         {flight.tagTitle === 'Best for early arrival' && (
                           <div className="flex flex-col items-center mt-2 hidden sm:flex text-center">
                             <p className="text-[9px] font-medium text-white/40 leading-snug">
                               Reach Dubai<br />before the city wakes up
                             </p>
                           </div>
                         )}
                       </div>

                       {/* Arrival */}
                       <div className="text-left">
                         <p className="font-extrabold text-2xl leading-none mb-1">{flight.arrivalTime}</p>
                         <p className="text-xs font-medium text-white/50">Dubai</p>
                       </div>
                    </div>

                    <div className="hidden lg:block w-px h-12 bg-white/10 mx-6 shrink-0" />

                    {/* RIGHT - Decision Confirmation */}
                    <div className="flex flex-col justify-center items-end w-full lg:w-[280px] shrink-0 mt-5 lg:mt-0">
                      
                      {/* Pricing Block */}
                      <div className="flex flex-col items-end text-right w-full gap-1">
                         <p className="text-2xl font-bold text-white tracking-tight">₹{(flight.basePrice - flight.bluChipsSavings).toLocaleString('en-IN')}</p>
                         
                         {flight.bluChipsSavings > 0 && (
                           <p className="text-[11px] font-medium text-white/40 whitespace-nowrap">
                             <span className="line-through decoration-white/20">₹{flight.basePrice.toLocaleString('en-IN')}</span> • save ₹{flight.bluChipsSavings.toLocaleString('en-IN')} with BluChips
                           </p>
                         )}
                      </div>
                      
                      {/* CTA Group */}
                      <div className="flex flex-col items-end mt-3">
                        <p className="text-[10px] text-white/50 mb-1.5 font-medium">Saver fare included</p>
                        <button onClick={onSelect} className="bg-white/5 hover:bg-white/10 active:bg-white/5 active:scale-[0.98] border border-white/10 hover:border-white/20 text-white rounded-md px-6 py-2.5 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 w-auto group/btn">
                           Select <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"/>
                        </button>
                        <p className="text-[9px] text-orange-200/60 mt-2 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400/50"></span> Fare held for a few minutes
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p 
                        onClick={() => setExpandedFlights(prev => prev.includes(flight.id) ? prev.filter(id => id !== flight.id) : [...prev, flight.id])}
                        className="text-[11px] font-bold text-white/40 hover:text-white/80 transition-colors cursor-pointer w-fit flex items-center gap-1"
                      >
                        View details <ChevronDown className={`w-3 h-3 transition-transform ${expandedFlights.includes(flight.id) ? 'rotate-180' : ''}`} />
                      </p>
                      
                    <div className="flex items-center gap-4 ml-auto">
                      {/* Compare Text Button */}
                      <button 
                        onClick={(e) => {
                           e.stopPropagation();
                           if (compareList.includes(flight.id)) {
                             setCompareList(compareList.filter(id => id !== flight.id));
                           } else {
                             setCompareList([...compareList, flight.id]);
                           }
                        }}
                        className={`text-[10px] sm:text-[11px] font-bold transition-all px-3 py-1.5 rounded-md border ${
                          compareList.includes(flight.id) 
                            ? 'bg-white/10 text-white border-white/20' 
                            : 'bg-transparent text-white/40 border-transparent hover:text-white/80 hover:bg-white/5'
                        }`}
                      >
                        {compareList.includes(flight.id) ? 'Added to compare' : 'Compare'}
                      </button>
                    </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {expandedFlights.includes(flight.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-1 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            
                            {/* Included */}
                            <div className="flex flex-col gap-2">
                              <h5 className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Included</h5>
                              <ul className="text-[11px] text-white/70 space-y-1.5">
                                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Cabin baggage: 7kg</li>
                                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Check-in baggage: {flight.airline === 'Air India' || flight.airline === 'Emirates' ? '25-30kg' : '15kg'}</li>
                                <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Standard seat</li>
                                {flight.airline === 'Air India' || flight.airline === 'Emirates' || flight.airline === 'Vistara' ? (
                                  <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Meal included</li>
                                ) : (
                                  <li className="flex items-start gap-1.5 text-white/40"><Minus className="w-3.5 h-3.5 shrink-0" /> Meal (Optional)</li>
                                )}
                              </ul>
                            </div>

                            {/* Flexibility */}
                            <div className="flex flex-col gap-2">
                              <h5 className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Flexibility</h5>
                              <ul className="text-[11px] text-white/70 space-y-1.5">
                                {idx === 0 || idx === 1 ? (
                                  <>
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Free date change</li>
                                    <li className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Lower cancellation fee</li>
                                  </>
                                ) : (
                                  <>
                                    <li className="flex items-start gap-1.5 text-white/40"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> Change fee applies</li>
                                    <li className="flex items-start gap-1.5 text-white/40"><AlertCircle className="w-3.5 h-3.5 shrink-0" /> Cancellation charges apply</li>
                                  </>
                                )}
                              </ul>
                            </div>

                            {/* Extras */}
                            <div className="flex flex-col gap-2">
                              <h5 className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Extras</h5>
                              <ul className="text-[11px] text-white/70 space-y-1.5">
                                <li className="flex items-start gap-1.5 text-white/40"><span className="w-3 h-3 flex items-center justify-center shrink-0 border border-white/20 rounded-[2px] mt-0.5 text-[8px] leading-none">+</span> Add extra baggage</li>
                                <li className="flex items-start gap-1.5 text-white/40"><span className="w-3 h-3 flex items-center justify-center shrink-0 border border-white/20 rounded-[2px] mt-0.5 text-[8px] leading-none">+</span> Seat selection</li>
                                <li className="flex items-start gap-1.5 text-white/40"><span className="w-3 h-3 flex items-center justify-center shrink-0 border border-white/20 rounded-[2px] mt-0.5 text-[8px] leading-none">+</span> Priority boarding</li>
                              </ul>
                            </div>
                            
                          </div>
                          
                          {(idx === 0 || idx === 2) && (
                            <p className="text-[10px] text-white/30 mt-3 pt-3 border-t border-white/5 w-full text-right">{idx === 0 ? "Good value for this route" : "Best for short trips"}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </React.Fragment>
            ))}

            {businessFlights.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-sm font-bold text-white/90 mb-4 px-2">Business Class</h3>
                <div className="flex flex-col gap-3">
                  {businessFlights.map((flight, idx) => (
                    <React.Fragment key={flight.id}>
                      <div className="glass-panel-dark border border-white/10 hover:border-white/20 rounded-2xl p-4 relative overflow-hidden backdrop-blur-lg group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1">
                        
                        <div className="flex flex-col lg:flex-row justify-between lg:items-center relative z-0 mt-2 lg:mt-0">
                          
                          {/* LEFT - Flight Understanding */}
                          <div className="flex flex-col w-[200px] shrink-0 mb-5 lg:mb-0">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-6 h-6 bg-white rounded flex items-center justify-center p-0.5 shrink-0">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IndiGo_Airlines_logo.svg" alt="IndiGo" className="w-full object-contain" />
                              </div>
                              <p className="text-sm font-semibold text-white/70">{flight.airline} • {flight.flightNo}</p>
                            </div>
                            
                            <div className="flex flex-col gap-1.5 w-full mt-1">
                              <div className="inline-flex bg-orange-400/10 text-orange-200/90 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1.5 rounded items-center gap-2 w-fit border border-orange-400/20">
                                <Star className="w-3.5 h-3.5 text-orange-400" /> {flight.tagTitle}
                              </div>
                              <p className="text-[11px] text-white/50 font-medium ml-1 leading-snug">{flight.tagDesc}</p>
                            </div>
                          </div>

                          {/* CENTER - Route Visualization */}
                          <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-start min-w-[280px]">
                            <div className="text-right">
                              <p className="font-extrabold text-2xl leading-none mb-1">{flight.departureTime}</p>
                              <p className="text-xs font-medium text-white/50">Kochi</p>
                            </div>
                            <div className="flex flex-col items-center px-2 w-[160px] sm:w-[240px]">
                              <p className="text-[10px] font-medium text-white/40 whitespace-nowrap mb-1.5 hidden sm:block">
                                {flight.duration} • <span className={flight.stops === 'Non-stop' ? 'text-emerald-400 font-bold' : ''}>{flight.stops}</span>
                              </p>
                              <div className="flex items-center w-full">
                                <div className="w-1.5 h-1.5 rounded-full border border-white/30 bg-transparent z-10 box-content flex-shrink-0" />
                                <div className="flex-1 h-px bg-white/20 mx-0.5" />
                                <div className="w-1.5 h-1.5 rounded-full border border-white/30 bg-white z-10 box-content flex-shrink-0" />
                              </div>
                            </div>
                            <div className="text-left">
                              <p className="font-extrabold text-2xl leading-none mb-1">{flight.arrivalTime}</p>
                              <p className="text-xs font-medium text-white/50">Dubai</p>
                            </div>
                          </div>

                          <div className="hidden lg:block w-px h-12 bg-white/10 mx-6 shrink-0" />

                          {/* RIGHT - Decision Confirmation */}
                          <div className="flex flex-col justify-center items-end w-full lg:w-[280px] shrink-0 mt-5 lg:mt-0">
                            <div className="flex flex-col items-end text-right w-full gap-1">
                              <p className="text-2xl font-bold text-white tracking-tight">₹{(flight.basePrice - flight.bluChipsSavings).toLocaleString('en-IN')}</p>
                              {flight.bluChipsSavings > 0 && (
                                <p className="text-[11px] font-medium text-white/40 whitespace-nowrap">
                                  <span className="line-through decoration-white/20">₹{flight.basePrice.toLocaleString('en-IN')}</span> • save ₹{flight.bluChipsSavings.toLocaleString('en-IN')} with BluChips
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end mt-3">
                              <p className="text-[10px] text-white/50 mb-1.5 font-medium">Business fare included</p>
                              <button onClick={onSelect} className="bg-white/5 hover:bg-white/10 active:bg-white/5 active:scale-[0.98] border border-white/10 hover:border-white/20 text-white rounded-md px-6 py-2.5 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 w-auto group/btn">
                                Select <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1"/>
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* End of results block */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center">
              <h3 className="text-lg font-bold text-white mb-6">Still unsure?</h3>
              <div className="glass-panel-dark border border-white/10 hover:border-white/20 rounded-2xl p-6 w-full max-w-[600px] flex flex-col sm:flex-row items-center gap-6 transition-colors">
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <Star className="w-4 h-4 text-emerald-400" />
                    <p className="text-sm font-bold text-white/90">Best overall choice</p>
                  </div>
                  <p className="text-xs text-white/60 font-medium">Non-stop &bull; Departs 06:00 &bull; Lowest price</p>
                </div>
                <button onClick={onSelect} className="bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 hover:border-white/20 text-white rounded-lg px-6 py-3 font-bold text-[12px] transition-all flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 group/recbtn">
                  Select recommended flight <ArrowRight className="w-4 h-4 transition-transform group-hover/recbtn:translate-x-1" />
                </button>
              </div>
              
              <div className="mt-16 flex flex-col items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mb-2" />
                <p className="text-sm font-bold text-white/40">End of results</p>
                <p className="text-[11px] font-medium text-white/30">7 of 23 flights for Kochi → Dubai</p>
                
                <button className="mt-6 text-[12px] font-medium text-white/40 hover:text-white/80 transition-colors flex items-center gap-1.5 group">
                  Join BluChip — earn rewards on every trip <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>

      {/* Compare Tray */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center pointer-events-none"
          >
            <div className="glass-panel-dark border border-white/20 rounded-2xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.3)] pointer-events-auto w-full max-w-4xl">
               <div className="flex items-center gap-3 flex-1 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
                 {/* Selected flight boxes */}
                 {compareList.map(id => {
                    const f = flights.find(f => f.id === id);
                    return (
                       <div key={id} className="bg-white/10 rounded-xl px-3 py-2 flex items-center gap-3 shrink-0 border border-white/10 hover:border-white/30 transition-colors">
                          <div className="flex flex-col">
                             <div className="flex items-center gap-1.5">
                                <Plane className="w-3 h-3 text-white/70" />
                                <span className="text-xs font-bold text-white">{f?.airline}</span>
                             </div>
                             <span className="text-[10px] text-white/50 font-medium tracking-wide mt-0.5">{f?.departureTime} - {f?.arrivalTime}</span>
                          </div>
                          <button onClick={() => setCompareList(compareList.filter(compareId => compareId !== id))} className="text-white/40 hover:text-red-400 p-1 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                       </div>
                    );
                 })}
                 {compareList.length < 3 && (
                   <div className="bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-2 flex items-center justify-center text-[11px] font-bold text-white/40 shrink-0 h-11">
                     + Add another
                   </div>
                 )}
               </div>
               <button className="bg-white text-[#001B94] hover:bg-gray-100 rounded-xl px-6 py-3 sm:py-0 h-11 font-bold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shrink-0 shadow-[0_4px_15px_rgba(255,255,255,0.1)]">
                 Compare →
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
