import React, { useState } from 'react';
import { Plane, ArrowRight, ArrowRightLeft, Star, ChevronDown, CheckCircle2, Minus, Info, ChevronRight, Clock, AlertCircle, Building2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlightResults({ onBack, onSelect }: { onBack: () => void; onSelect?: () => void }) {
  const [activeSort, setActiveSort] = useState('Best');
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
            <p className="text-xs font-medium text-white/40 mt-1.5">Showing 7 of 23 flights • from ₹18,300</p>
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
        <div className="flex rounded-lg border border-white/5 overflow-hidden shrink-0 w-full lg:w-auto overflow-x-auto hide-scrollbar self-start">
             {[
               { date: '27 Jun', price: '₹21,500' },
               { date: '28 Jun', price: '₹20,800' },
               { date: '29 Jun', price: '₹22,500', isSelected: true },
               { date: '30 Jun', price: '₹21,900' },
               { date: '1 Jul', price: '₹19,800' },
             ].map((day, idx) => (
               <div key={idx} className={`px-4 py-2 flex flex-col items-center justify-center min-w-[75px] border-r border-white/5 last:border-0 ${day.isSelected ? 'bg-white/10 border-b border-b-white/20' : ''}`}>
                 <span className={`text-[10px] uppercase font-bold tracking-wider ${day.isSelected ? 'text-white' : 'text-white/40'}`}>{day.date}</span>
                 <span className={`text-xs font-semibold ${day.isSelected ? 'text-white/90' : 'text-white/60'}`}>{day.price}</span>
               </div>
             ))}
          </div>
        </div>

      {/* FILTER ROW (PRIMARY ACTION) */}
      <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
        <button className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all border bg-blue-600/20 border-blue-400/50 text-blue-100 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" /> Non-stop under ₹22k
        </button>
        <button className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all border bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white">
          Cheapest
        </button>
        <button className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all border bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white">
          Fastest
        </button>
        <button className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all border bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white">
          Flexible
        </button>
        <button className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all border bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white flex items-center gap-1">
          More filters <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main List */}
      <div className="w-full space-y-3">
          
          {/* Sorter */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex w-full bg-blue-900/10 backdrop-blur-md border border-white/10 shadow-sm rounded-xl p-1 relative z-10">
               {['Best', 'Cheapest', 'Fastest'].map(opt => (
                 <button 
                   key={opt}
                   onClick={() => setActiveSort(opt)}
                   className={`flex-1 py-2 text-xs font-bold transition-all rounded-lg border ${
                     activeSort === opt 
                       ? 'bg-blue-400/20 border-blue-400/20 text-white shadow-[0_2px_10px_rgba(59,130,246,0.15)]' 
                       : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/5'
                   }`}
                 >
                   {opt}
                 </button>
               ))}
            </div>
            <p className="text-[10px] font-medium text-white/40 px-2 mb-1">
              Sorted by: {activeSort} {activeSort === 'Best' ? '(price + duration balance)' : activeSort === 'Cheapest' ? '(lowest total fare)' : '(shortest travel time)'}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {flights.map((flight, idx) => (
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

                {/* CONTEXTUAL OFFER BLOCK 1: HOTEL */}
                {(idx === 0 || idx === 1 || idx === 3) && (
                  <div className="bg-white/[0.02] border border-white/5 lg:rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between backdrop-blur-sm -mx-4 lg:mx-0 my-1 gap-3 sm:gap-0 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center shrink-0">
                         <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <p className="text-[11px] font-medium text-white/70">
                        {idx === 1 
                          ? <>Stay in Dubai from <span className="font-bold text-white">₹3,000/night</span> + Earn <span className="text-emerald-400 font-bold">500 BluChips</span></>
                          : <>+ Add hotel & save <span className="text-white/90 font-bold">₹1,200</span> on this trip</>
                        }
                      </p>
                    </div>
                    <button className="w-full sm:w-auto text-[10px] font-bold text-white/80 hover:text-white transition-colors whitespace-nowrap px-4 border border-white/10 rounded py-1.5 hover:bg-white/5">View Hotels</button>
                  </div>
                )}

                {/* CONTEXTUAL OFFER BLOCK 2: EXPERIENCE */}
                {idx === 4 && (
                  <div className="bg-white/[0.02] border border-white/5 lg:rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between backdrop-blur-sm -mx-4 lg:mx-0 my-1 gap-3 sm:gap-0 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center shrink-0">
                         <Star className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <p className="text-[11px] font-medium text-white/70">Skip the line at <span className="font-bold text-white">Burj Khalifa</span> – Book tickets in advance</p>
                    </div>
                    <button className="w-full sm:w-auto text-[10px] font-bold text-white/80 hover:text-white transition-colors whitespace-nowrap px-4 border border-white/10 rounded py-1.5 hover:bg-white/5">Explore Tours</button>
                  </div>
                )}

                {/* CONTEXTUAL OFFER BLOCK 3: TRAVEL BUNDLE */}
                {idx === 6 && (
                  <div className="bg-white/[0.02] border border-white/5 lg:rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between backdrop-blur-sm -mx-4 lg:mx-0 my-1 gap-3 sm:gap-0 transition-colors hover:bg-white/[0.04]">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center shrink-0">
                         <Plane className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      <p className="text-[11px] font-medium text-white/70">Add a <span className="font-bold text-white">Free meal + baggage combo</span> for just <span className="text-purple-400 font-bold">₹499</span></p>
                    </div>
                    <button className="w-full sm:w-auto text-[10px] font-bold text-white/80 hover:text-white transition-colors whitespace-nowrap px-4 border border-white/10 rounded py-1.5 hover:bg-white/5">Add-ons</button>
                  </div>
                )}
              </React.Fragment>
            ))}

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
                <p className="text-[11px] font-medium text-white/30">Showing 7 of 23 flights for Kochi → Dubai</p>
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
