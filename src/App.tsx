import React, { useState, useRef, useEffect } from 'react';
import { Plane, Search, User, Briefcase, MapPin, Calendar, Clock, ArrowRightLeft, Package, Lock, ChevronRight, ChevronLeft, CheckCircle2, ChevronDown, SlidersHorizontal, Fingerprint, Zap, Car, Building2, Ticket, History, Building, Wallet, Info, ShieldCheck, RefreshCw, Tag, LayoutGrid, Utensils, Luggage, Star, Undo2, PlayCircle, Smartphone, SmartphoneNfc, FileText, QrCode, Apple, Sparkles, Palmtree, MountainSnow, Sunset, Waves, CalendarDays, TrendingDown, Facebook, Twitter, Instagram, Youtube, ArrowRight, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FlightResults from './FlightResults';

import FareSelection from './FareSelection';

type UserPersona = 'personal' | 'business';

export default function App() {
  const [persona, setPersona] = useState<UserPersona>('personal');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [bookingMode, setBookingMode] = useState<'manual' | 'ai'>('manual');
  const [bookingTab, setBookingTab] = useState<'flights' | 'hotels' | 'cabs'>('flights');
  const [showDigiYatra, setShowDigiYatra] = useState(false);
  
  // Deals & Offers Carousel State
  const dealsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleDealsScroll = () => {
    if (dealsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = dealsScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    handleDealsScroll();
  }, []);

  const scrollDeals = (direction: 'left' | 'right') => {
    if (dealsScrollRef.current) {
      const scrollAmount = 300; // approximate card width + gap
      dealsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Shared Travel State context
  const [currentPage, setCurrentPage] = useState<'home' | 'search-results' | 'fare-selection'>('home');
  const [travelState, setTravelState] = useState({
    origin: "Kochi (COK)",
    destination: "Dubai (DXB)",
    departureDate: "12 Apr",
    returnDate: "18 Apr",
    flightTravellers: "1 Adult, Economy",
    hotelGuests: "2 Adults, 1 Room"
  });
  const [cabType, setCabType] = useState<'airport' | 'rental' | 'intercity'>('airport');
  const [isScanning, setIsScanning] = useState(false);
  const [showPrime, setShowPrime] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackedStatus, setTrackedStatus] = useState<string | null>(null);
  const [bluTier, setBluTier] = useState<'Blu 1' | 'Blu 2' | 'Blu 3'>('Blu 1');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default true for demo
  const [bluChips, setBluChips] = useState(2750); // fake balance

  const destinations = [
    {
      id: 1,
      title: 'Athens',
      route: 'DEL → ATH',
      subtitle: 'Direct flight',
      price: 'from ₹34,999',
      image: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Dubai',
      route: 'BOM → DXB',
      subtitle: '3h 25m',
      price: 'from ₹18,499',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Maldives',
      route: 'BLR → MLE',
      subtitle: 'Popular route',
      price: 'from ₹28,500',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Paris',
      route: 'DEL → CDG',
      subtitle: '9h 15m',
      price: 'from ₹45,999',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'Tokyo',
      route: 'DEL → HND',
      subtitle: 'Direct flight',
      price: 'from ₹38,999',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Bangkok',
      route: 'CCU → BKK',
      subtitle: '2h 30m',
      price: 'from ₹12,999',
      image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <>
      {/* Abstract Background Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Minimal Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* Faint Aviation Paths */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 800">
          <defs>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Flight Paths */}
          <path d="M -100 900 Q 500 200 1600 -100" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M -200 700 Q 300 50 1500 -200" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M 100 1000 Q 800 400 1700 100" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
          
          {/* Primary Nodes (Slightly larger, glowing) */}
          <circle cx="625" cy="300" r="3" fill="white" filter="url(#nodeGlow)" opacity="0.7" /> 
          <circle cx="1012" cy="388" r="3.5" fill="white" filter="url(#nodeGlow)" opacity="0.7" />
          
          {/* Secondary Nodes (Smaller, faint) */}
          <circle cx="231" cy="575" r="1.5" fill="white" opacity="0.4" />
          <circle cx="1081" cy="75" r="2" fill="white" opacity="0.4" />
          <circle cx="475" cy="150" r="1.5" fill="white" opacity="0.4" />
        </svg>
      </div>

      <div className="min-h-screen font-sans selection:bg-blue-500/30 selection:text-white pt-8 pb-20 px-4 sm:px-6 lg:px-8 z-10 relative">
        
        {/* Header */}
        <header className="max-w-[1400px] mx-auto flex items-center justify-between mb-16 lg:mb-24">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setPersona('personal')}>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white leading-none">IndiGo</h1>
              <span className="text-xs text-white/60 font-medium tracking-wide">2026 Kinetic Ecosystem</span>
            </div>
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-6">
              <div className="relative group">
                <button className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1 py-2">
                  Book <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>
                <div className="absolute top-full right-0 w-48 rounded-xl bg-[#1e0a3c]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col p-1.5 translate-y-2 group-hover:translate-y-0">
                  <button onClick={() => { setPersona('personal'); setBookingTab('flights'); }} className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <Plane className="w-4 h-4" /> Flights
                  </button>
                  <button onClick={() => { setPersona('personal'); setBookingTab('hotels'); }} className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <Building2 className="w-4 h-4" /> Hotels
                  </button>
                  <button onClick={() => { setPersona('personal'); setBookingTab('cabs'); }} className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <Car className="w-4 h-4" /> Cabs
                  </button>
                  <div className="h-px bg-white/10 my-1 mx-2" />
                  <button onClick={() => { setPersona('personal'); setBookingTab('flights'); }} className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <User className="w-4 h-4" /> Group booking
                  </button>
                  <button onClick={() => { setPersona('business'); }} className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <Package className="w-4 h-4" /> Cargo
                  </button>
                  <button onClick={() => { setPersona('personal'); }} className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <Ticket className="w-4 h-4" /> Deals & offers
                  </button>
                </div>
              </div>
              <div className="relative group">
                <button className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1 py-2">
                  Trips <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>
                <div className="absolute top-full -right-4 w-48 rounded-xl bg-[#1e0a3c]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col p-1.5 translate-y-2 group-hover:translate-y-0">
                  <button className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Manage booking</button>
                  <button className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Flight status</button>
                  <button className="text-left px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Web check-in</button>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Check-in</a>
              <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">6E Pick</a>
              <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">BluChip</a>
              <div className="h-4 w-px bg-white/20 mx-2" />
              <button 
                onClick={() => setBookingMode(prev => prev === 'ai' ? 'manual' : 'ai')}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg border ${bookingMode === 'ai' ? 'bg-blue-600/30 border-blue-400/50 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]' : 'bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20'}`}
              >
                <Sparkles className="w-4 h-4" /> AI Assistant
              </button>
              <div className="h-4 w-px bg-white/20 mx-2" />
              <button onClick={() => setPersona('business')} className={`text-sm font-medium transition-colors ${persona === 'business' ? 'text-white font-bold' : 'text-white/80 hover:text-white'}`}>
                Corporate
              </button>
            </nav>
            <button className="w-10 h-10 rounded-full border border-white/20 glass-panel-dark flex items-center justify-center text-sm font-medium hover:bg-white/10 transition-colors">
              AK
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {currentPage === 'fare-selection' ? (
             <FareSelection onBack={() => setCurrentPage('search-results')} onNext={() => console.log('next')} />
          ) : currentPage === 'search-results' ? (
             <FlightResults onBack={() => setCurrentPage('home')} onSelect={() => setCurrentPage('fare-selection')} />
          ) : persona === 'personal' ? (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Hero Section */}
              <div className="max-w-[1400px] mx-auto text-center mb-10 relative">
                <h2 className="relative text-5xl sm:text-7xl font-serif mb-4 tracking-tight">Where would you like to go?</h2>
                <p className="relative text-xl sm:text-2xl text-white/80 font-light mb-3">
                  Best fares with on-time reliability across India.
                </p>
                <p className="relative text-sm text-white/60 font-medium mb-10 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 opacity-70" /> Trusted by millions across India
                </p>

                {/* HORIZONTAL BOOKING HEADER WIDGET */}
                <div className="max-w-5xl mx-auto glass-panel-dark rounded-[2rem] p-6 text-left relative z-20 backdrop-blur-3xl bg-white/5 flex flex-col gap-6">
                  {/* Ecosystem Tabs */}
                  <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 w-fit">
                    <button
                      onClick={() => setBookingTab('flights')}
                      className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${bookingTab === 'flights' ? 'bg-white/10 text-white shadow-sm border border-white/20' : 'text-white/70 hover:text-white'}`}
                    >
                      <Plane className="w-4 h-4" /> Flights
                    </button>
                    <button
                      onClick={() => setBookingTab('hotels')}
                      className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${bookingTab === 'hotels' ? 'bg-white/10 text-white shadow-sm border border-white/20' : 'text-white/70 hover:text-white'}`}
                    >
                      <Building2 className="w-4 h-4" /> Hotels
                    </button>
                    <button
                      onClick={() => setBookingTab('cabs')}
                      className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all ${bookingTab === 'cabs' ? 'bg-white/10 text-white shadow-sm border border-white/20' : 'text-white/70 hover:text-white'}`}
                    >
                      <Car className="w-4 h-4" /> Cabs
                    </button>
                  </div>

                  <div className="relative relative-z-10 min-h-[72px]">
                    <AnimatePresence mode="wait">
                      {bookingMode === 'manual' ? (
                        <div className="relative min-h-[140px]">
                          <AnimatePresence mode="wait">
                            {bookingTab === 'flights' && (
                              <motion.div 
                                key="flights"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="flex flex-col gap-6"
                              >
                                 <div className="flex items-center justify-between gap-4">
                                    <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
                                      <button onClick={() => setTripType('one-way')} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${tripType === 'one-way' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}>One-way</button>
                                      <button onClick={() => setTripType('round-trip')} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${tripType === 'round-trip' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}>Round-trip</button>
                                      <button className="px-4 py-1.5 text-xs font-semibold rounded-lg transition-all text-white/40 hover:text-white">Multi-city</button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center justify-center gap-2 text-white/70 text-xs font-semibold whitespace-nowrap bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                        <User className="w-3.5 h-3.5" /> {travelState.flightTravellers} <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                                      </div>
                                      <div className="flex items-center justify-center gap-1 text-white/70 text-xs font-semibold whitespace-nowrap bg-white/5 px-2 py-1.5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                        INR <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                                      </div>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_1.2fr_auto] gap-2 items-center relative">
                                   {/* FROM */}
                                   <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex flex-col justify-center px-5 relative cursor-text group transition-colors border-white/10">
                                     <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">From</span>
                                     <input type="text" value={travelState.origin} onChange={(e) => setTravelState(s => ({...s, origin: e.target.value}))} className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                   </div>

                                   {/* SWAP ICON */}
                                   <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 z-10 lg:-mx-4 mx-auto -my-3 lg:my-0 shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-95">
                                     <ArrowRightLeft className="w-4 h-4 text-white hover:text-white lg:rotate-0 rotate-90" />
                                   </button>

                                   {/* TO */}
                                   <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex flex-col justify-center px-5 relative cursor-text group transition-colors border-white/10 lg:pl-8">
                                     <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">To</span>
                                     <input type="text" value={travelState.destination} onChange={(e) => setTravelState(s => ({...s, destination: e.target.value}))} className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                   </div>

                                   {/* DATES */}
                                   <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex items-center justify-between px-5 relative cursor-text group transition-colors border-white/10">
                                     <div className="flex flex-col justify-center w-full relative">
                                       <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">Departure - Return</span>
                                       <input type="text" value={`${travelState.departureDate} - ${travelState.returnDate}`} readOnly className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                       {/* Promo Marker */}
                                       <span className="absolute -top-3 -right-2 bg-emerald-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm text-center">
                                         Best fares this week
                                       </span>
                                     </div>
                                     <Calendar className="w-5 h-5 text-white/40 shrink-0 ml-2" />
                                   </div>

                                   {/* SEARCH BUTTON */}
                                   <button 
                                     onClick={() => setCurrentPage('search-results')}
                                     className="h-16 px-8 rounded-xl bg-white text-[#001B94] hover:bg-gray-50 font-bold text-lg transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center gap-0.5 hover:scale-[1.02] active:scale-95 w-full lg:w-auto relative overflow-hidden group">
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#001B94]/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                                     <span className="flex items-center gap-2"><Search className="w-5 h-5" /> Search</span>
                                     <span className="text-[10px] font-medium opacity-80 tracking-tight">Flights from ₹18,000</span>
                                   </button>
                                 </div>

                                 {/* Loyalty Strip Layer */}
                                 <div className="w-full pt-6 border-t border-white/10">
                                   <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between backdrop-blur-sm shadow-sm hover:bg-white/10 transition-colors">
                                     <div className="flex items-center gap-3">
                                       <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                                          <Star className="w-4 h-4 text-blue-300" />
                                       </div>
                                       {isLoggedIn && bluChips > 0 ? (
                                         <span className="text-sm text-white/70 font-medium tracking-wide">
                                            Use <span className="text-emerald-400 font-bold">₹{bluChips.toLocaleString('en-IN')}</span> in BluChips to save on this fare
                                         </span>
                                       ) : isLoggedIn && bluChips === 0 ? (
                                         <span className="text-sm text-white/70 font-medium tracking-wide">
                                            Earn <span className="text-white font-bold">BluChips</span> on this booking to save on your next flight
                                         </span>
                                       ) : (
                                         <span className="text-sm text-white/70 font-medium tracking-wide">
                                            Earn <span className="text-white font-bold">BluChips</span> on every booking to start saving
                                         </span>
                                       )}
                                     </div>
                                     <button className="text-sm text-blue-400 font-semibold hover:text-blue-300 transition-colors flex items-center gap-1.5 group">
                                       {isLoggedIn && bluChips > 0 ? 'Apply' : isLoggedIn && bluChips === 0 ? 'Details' : 'Join now'} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                     </button>
                                   </div>
                                 </div>
                              </motion.div>
                            )}

                            {bookingTab === 'hotels' && (
                              <motion.div 
                                key="hotels"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="flex flex-col gap-6"
                              >
                                {/* Hotels Header (Guests & Options) */}
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 opacity-0 pointer-events-none">
                                    <button className="px-4 py-1.5 text-xs font-semibold">Spacer</button>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center gap-2 text-white/70 text-xs font-semibold whitespace-nowrap bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                                      <User className="w-3.5 h-3.5" /> {travelState.hotelGuests} <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr_auto] gap-2 items-center relative">
                                  {/* DESTINATION */}
                                  <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex flex-col justify-center px-5 relative cursor-text group transition-colors border-white/10">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">City, Property or Location</span>
                                    {/* Auto-filled from contextual flight destination */}
                                    <input type="text" value={travelState.destination.split(' (')[0].trim()} readOnly className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                  </div>

                                  {/* DATES */}
                                  <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex items-center justify-between px-5 relative cursor-text group transition-colors border-white/10">
                                    <div className="flex flex-col justify-center w-full">
                                      <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">Check-in - Check-out</span>
                                      <input type="text" value={`${travelState.departureDate} - ${travelState.returnDate}`} readOnly className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                    </div>
                                    <Calendar className="w-5 h-5 text-white/40 shrink-0 ml-2" />
                                  </div>

                                  {/* SEARCH BUTTON */}
                                  <button className="h-16 px-8 rounded-xl bg-white text-[#001B94] hover:bg-gray-50 font-bold text-lg transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 w-full lg:w-auto relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#001B94]/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                                    <Search className="w-5 h-5" /> Search Hotels
                                  </button>
                                </div>
                              </motion.div>
                            )}

                            {bookingTab === 'cabs' && (
                              <motion.div 
                                key="cabs"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                                className="flex flex-col gap-6"
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
                                    <button onClick={() => setCabType('airport')} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${cabType === 'airport' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}>Airport Transfer</button>
                                    <button onClick={() => setCabType('rental')} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${cabType === 'rental' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}>Rental</button>
                                    <button onClick={() => setCabType('intercity')} className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${cabType === 'intercity' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}>Intercity</button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.2fr_1fr_auto] gap-2 items-center relative">
                                  {/* PICKUP LOCATION */}
                                  <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex flex-col justify-center px-5 relative cursor-text group transition-colors border-white/10">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">Pickup Location</span>
                                    <input type="text" value={cabType === 'airport' ? `${travelState.destination.split(' (')[0].trim()} Airport` : ''} placeholder="City, Airport or Address..." readOnly={cabType === 'airport'} className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                  </div>

                                  {/* DROP LOCATION */}
                                  <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex flex-col justify-center px-5 relative cursor-text group transition-colors border-white/10">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">Drop Location</span>
                                    <input type="text" placeholder={cabType === 'rental' ? "Optional limit (e.g. 80km)" : "Enter Destination..."} className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                  </div>

                                  {/* DATES */}
                                  <div className="glass-input bg-white/5 hover:bg-white/10 rounded-xl h-16 flex flex-col justify-center px-5 relative cursor-text group transition-colors border-white/10">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">Pickup Date & Time</span>
                                    <input type="text" value={`${travelState.departureDate}, 14:30`} readOnly className="bg-transparent text-lg font-semibold text-white outline-none w-full placeholder:text-white/30" />
                                  </div>

                                  {/* SEARCH BUTTON */}
                                  <button className="h-16 px-8 rounded-xl bg-white text-[#001B94] hover:bg-gray-50 font-bold text-lg transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 w-full lg:w-auto relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#001B94]/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                                    <Search className="w-5 h-5" /> Search Cabs
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div
                          key="ai"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                          className="w-full"
                        >
                          <div className="relative group w-full">
                             <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                               <Search className="w-6 h-6 text-purple-400" />
                             </div>
                             <input
                               type="text"
                               placeholder="e.g. 'Book a flight to Athens next Friday for 2 adults under ₹40k...'"
                               className="w-full h-16 pl-16 pr-16 rounded-xl glass-input text-lg placeholder:text-white/60 focus:outline-none transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)_inset]"
                               autoFocus
                             />
                             <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                               <div className="px-2 py-1 border border-white/20 rounded font-mono text-xs text-white/50 bg-white/5 cursor-pointer hover:bg-white/10 pointer-events-auto transition-colors">
                                 ⌘K
                               </div>
                             </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                      {/* Price Insight */}
                <div className="max-w-5xl mx-auto flex items-center justify-center mt-4">
                  <p className="text-xs font-medium text-white/50 tracking-wide">
                    Prices dropped up to 12% this week on popular routes
                  </p>
                </div>
              </div>

                {/* Trending & Special Fares (Moved outside search box) */}
                <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 mt-6">
                  {/* Recent & Trending Searches */}
                  <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar max-w-full">
                     <span className="text-xs font-semibold text-white/40 uppercase tracking-widest pl-2">Trending</span>
                     <div className="flex gap-2 items-center">
                       <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-medium hover:bg-white/10 transition-colors whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm">
                         DEL <ArrowRightLeft className="w-3 h-3 text-white/40" /> BOM <span className="text-emerald-400 ml-1">from ₹2,999</span>
                       </button>
                       <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-medium hover:bg-white/10 transition-colors whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm">
                         BLR <ArrowRightLeft className="w-3 h-3 text-white/40" /> DXB <span className="text-emerald-400 ml-1">from ₹11,499</span>
                       </button>
                     </div>
                  </div>

                  {/* Fare Intelligence Layer */}
                  <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar max-w-full">
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-widest pl-2 shrink-0">Special Fares</span>
                    <div className="h-4 w-px bg-white/10 mx-1"></div>
                    {['Student fares', 'Senior citizen', 'Armed forces', 'Family fares'].map(chip => (
                      <button key={chip} className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-white/70 text-xs font-semibold hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap backdrop-blur-sm shrink-0">
                         {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="max-w-[1400px] mx-auto mt-12 space-y-16">
                  
                  {/* Why Book With Us Section */}
                  <div className="max-w-5xl mx-auto w-full relative z-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/[0.06] hover:border-white/20 transition-all">
                        <Clock className="w-8 h-8 text-white/80 mb-4" strokeWidth={1.5} />
                        <h4 className="text-sm font-bold text-white mb-1.5 tracking-wide uppercase">On-time Performance</h4>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">India's most punctual airline network</p>
                      </div>
                      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/[0.06] hover:border-white/20 transition-all">
                        <Tag className="w-8 h-8 text-white/80 mb-4" strokeWidth={1.5} />
                        <h4 className="text-sm font-bold text-white mb-1.5 tracking-wide uppercase">Lowest Fare Guarantee</h4>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">Unbeatable prices by booking direct</p>
                      </div>
                      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/[0.06] hover:border-white/20 transition-all">
                        <RefreshCw className="w-8 h-8 text-white/80 mb-4" strokeWidth={1.5} />
                        <h4 className="text-sm font-bold text-white mb-1.5 tracking-wide uppercase">Flexible Date Changes</h4>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">Easy planning with minimal fee shifts</p>
                      </div>
                      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/[0.06] hover:border-white/20 transition-all">
                        <ShieldCheck className="w-8 h-8 text-white/80 mb-4" strokeWidth={1.5} />
                        <h4 className="text-sm font-bold text-white mb-1.5 tracking-wide uppercase">Secure Booking</h4>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">End-to-end encrypted transactions</p>
                      </div>
                     </div>
                  </div>

                  {/* Explore Destinations Module */}
                  <div className="max-w-[1200px] mx-auto w-full relative z-20 mb-8">
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col relative shadow-lg">
                      
                      {/* Header Section */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                             <MapPin className="w-5 h-5 text-emerald-400" />
                             <h3 className="text-2xl font-medium tracking-wide">Explore destinations</h3>
                           </div>
                           <p className="text-sm text-white/60">Find your next getaway by budget or vibe.</p>
                        </div>
                        <span className="text-sm font-medium text-white/50 hover:text-white cursor-pointer transition-colors shrink-0">View all destinations &rarr;</span>
                      </div>
                      
                      {/* Filters Section (Full Width Row) */}
                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 relative z-10 w-full">
                         {/* Left Group: Budget */}
                         <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors shrink-0">Under ₹5,000</button>
                            <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors shrink-0">Under ₹10,000</button>
                            <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors shrink-0">Under ₹15,000</button>
                         </div>
                         {/* Right Group: Vibe */}
                         <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5 shrink-0"><Waves className="w-3.5 h-3.5"/> Beach</button>
                            <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5 shrink-0"><Building className="w-3.5 h-3.5"/> City</button>
                            <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5 shrink-0"><MountainSnow className="w-3.5 h-3.5"/> Nature</button>
                            <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5 shrink-0"><Sunset className="w-3.5 h-3.5"/> Weekend</button>
                         </div>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                         {destinations.slice(0, 6).map((dest) => (
                          <div key={dest.id} className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[16/10] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/5 hover:border-white/20 transition-all">
                            <img
                              src={dest.image}
                              alt={dest.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-300" />
                            
                            {/* Route tag */}
                            <div className="absolute top-5 left-5">
                              <p className="text-[10px] font-semibold text-white/50 tracking-widest uppercase">{dest.route}</p>
                            </div>

                            {/* Card Content Footer */}
                            <div className="absolute inset-0 p-5 flex flex-col justify-end">
                              <div className="flex justify-between items-end">
                                <div>
                                  <h4 className="text-2xl font-serif text-white leading-tight mb-1">{dest.title}</h4>
                                  <p className="text-xs text-white/60 mb-2 font-medium">{dest.subtitle}</p>
                                  <p className="text-base font-bold text-white">{dest.price}</p>
                                </div>
                                <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">View flights &rarr;</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deals & Offers Section */}
                  <div className="max-w-5xl mx-auto w-full relative z-20 pb-16">
                    <div className="flex items-center justify-between mb-6 px-2">
                       <h3 className="text-2xl font-medium tracking-wide">Deals & Offers</h3>
                       <div className="flex gap-2">
                         <button 
                           onClick={() => scrollDeals('left')}
                           disabled={!canScrollLeft}
                           className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                             canScrollLeft 
                               ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer' 
                               : 'bg-transparent border-white/5 text-white/20 cursor-not-allowed'
                           }`}
                         >
                           <ChevronLeft className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => scrollDeals('right')}
                           disabled={!canScrollRight}
                           className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                             canScrollRight 
                               ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer' 
                               : 'bg-transparent border-white/5 text-white/20 cursor-not-allowed'
                           }`}
                         >
                           <ChevronRight className="w-4 h-4" />
                         </button>
                       </div>
                    </div>
                    <div 
                      ref={dealsScrollRef}
                      onScroll={handleDealsScroll}
                      className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x"
                    >
                      {/* Card 1 */}
                      <div className="snap-start shrink-0 w-[280px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 flex flex-col hover:border-white/30 transition-colors backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.15)] group cursor-pointer relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 blur-[30px] rounded-full pointer-events-none" />
                         <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded inline-flex w-fit mb-3 border border-emerald-500/20 tracking-wider uppercase">Save up to ₹2500</div>
                         <h4 className="text-base font-bold text-white mb-1">HDFC Bank Offers</h4>
                         <p className="text-xs text-white/60 mb-5 leading-relaxed">Flat 15% discount on all domestic and international flights.</p>
                         <button className="mt-auto flex items-center text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                           View deal <ChevronRight className="w-3 h-3 ml-1" />
                         </button>
                      </div>
                      {/* Card 2 */}
                      <div className="snap-start shrink-0 w-[280px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 flex flex-col hover:border-white/30 transition-colors backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.15)] group cursor-pointer relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 blur-[30px] rounded-full pointer-events-none" />
                         <div className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-1 rounded inline-flex w-fit mb-3 border border-amber-500/20 tracking-wider uppercase">Save ₹5000</div>
                         <h4 className="text-base font-bold text-white mb-1">Flight + Hotel Bundle</h4>
                         <p className="text-xs text-white/60 mb-5 leading-relaxed">Unbeatable savings when you book your flight and stay together.</p>
                         <button className="mt-auto flex items-center text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                           View deal <ChevronRight className="w-3 h-3 ml-1" />
                         </button>
                      </div>
                      {/* Card 3 */}
                      <div className="snap-start shrink-0 w-[280px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 flex flex-col hover:border-white/30 transition-colors backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.15)] group cursor-pointer relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 blur-[30px] rounded-full pointer-events-none" />
                         <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded inline-flex w-fit mb-3 border border-emerald-500/20 tracking-wider uppercase">Prime for ₹99</div>
                         <h4 className="text-base font-bold text-white mb-1">Weekend Gateway</h4>
                         <p className="text-xs text-white/60 mb-5 leading-relaxed">Upgrade to 6E Prime and get free seats, meals, and fast forward.</p>
                         <button className="mt-auto flex items-center text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                           View deal <ChevronRight className="w-3 h-3 ml-1" />
                         </button>
                      </div>
                      {/* Card 4 */}
                      <div className="snap-start shrink-0 w-[280px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 flex flex-col hover:border-white/30 transition-colors backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.15)] group cursor-pointer relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/20 blur-[30px] rounded-full pointer-events-none" />
                         <div className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded inline-flex w-fit mb-3 border border-white/10 tracking-wider uppercase">Up to 20% Off</div>
                         <h4 className="text-base font-bold text-white mb-1">Student Special</h4>
                         <p className="text-xs text-white/60 mb-5 leading-relaxed">Extra baggage allowance and exclusive discounts for students.</p>
                         <button className="mt-auto flex items-center text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                           View deal <ChevronRight className="w-3 h-3 ml-1" />
                         </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Promo */}
                <div className="max-w-[1400px] mx-auto w-full relative z-20 mb-20">
                    <div className="glass-panel-dark border border-white/10 rounded-[2rem] p-8 flex flex-col sm:flex-row justify-between relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full pointer-events-none" />
                       <div className="relative z-10 flex-1">
                         <h3 className="text-2xl font-serif mb-2">Get better deals on the app.</h3>
                         <ul className="flex flex-wrap gap-6 mt-6 mb-8 text-sm font-medium text-white/70">
                           <li className="flex gap-2 items-center"><Smartphone className="w-4 h-4 text-white/40" /> Exclusive app-only offers</li>
                           <li className="flex gap-2 items-center"><Zap className="w-4 h-4 text-white/40" /> Faster booking experience</li>
                           <li className="flex gap-2 items-center"><Clock className="w-4 h-4 text-white/40" /> Real-time flight updates</li>
                         </ul>
                         <div className="flex flex-wrap gap-3">
                           <button className="px-4 py-2 border border-white/20 bg-white/5 rounded-xl flex items-center gap-2 hover:bg-white/10 text-xs font-bold transition-colors">
                             <Apple className="w-4 h-4"/> App Store
                           </button>
                           <button className="px-4 py-2 border border-white/20 bg-white/5 rounded-xl flex items-center gap-2 hover:bg-white/10 text-xs font-bold transition-colors">
                             <PlayCircle className="w-4 h-4"/> Play Store
                           </button>
                         </div>
                       </div>
                       
                       <div className="hidden sm:flex flex-col items-center justify-center p-6 bg-white/[0.03] rounded-2xl border border-white/10 ml-6 self-center shrink-0">
                         <QrCode className="w-24 h-24 text-white/80" strokeWidth={1.5} />
                         <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-4">Scan to download</span>
                       </div>
                    </div>
                </div>

                  {/* Footer Section */}
                  <footer className="w-full relative z-20 border-t border-white/10 bg-black/20 pt-16 pb-8">
                    <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                         {/* Column 1: Support */}
                         <div>
                            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Support</h4>
                            <ul className="space-y-4">
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Contact</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Help center</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">FAQs</a></li>
                            </ul>
                         </div>
                         {/* Column 2: Manage booking */}
                         <div>
                            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Manage booking</h4>
                            <ul className="space-y-4">
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Check-in</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Flight status</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Manage booking</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Refund tracking</a></li>
                            </ul>
                         </div>
                         {/* Column 3: Travel information */}
                         <div>
                            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Travel information</h4>
                            <ul className="space-y-4">
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Baggage policy</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Fare rules</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Travel guidelines</a></li>
                            </ul>
                         </div>
                         {/* Column 4: Company */}
                         <div>
                            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Company</h4>
                            <ul className="space-y-4">
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">About</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Careers</a></li>
                               <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">Press</a></li>
                            </ul>
                         </div>
                      </div>
                      
                      <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
                         <div className="flex flex-col sm:flex-row items-center gap-6">
                           <div className="flex items-center gap-2">
                              <span className="text-xl font-bold tracking-tight text-white/90">IndiGo</span>
                           </div>
                           <div className="hidden sm:block h-4 w-px bg-white/20"></div>
                           <div className="flex items-center gap-4 text-xs font-medium text-white/50">
                             <a href="#" className="hover:text-white transition-colors">Privacy</a>
                             <span className="w-1 h-1 rounded-full bg-white/20"></span>
                             <a href="#" className="hover:text-white transition-colors">Terms</a>
                             <span className="w-1 h-1 rounded-full bg-white/20"></span>
                             <a href="#" className="hover:text-white transition-colors">Policies</a>
                           </div>
                           <p className="text-white/30 text-xs sm:ml-2">© 2026 IndiGo Airlines. All rights reserved.</p>
                         </div>
                         
                         <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-all"><Youtube className="w-4 h-4" /></a>
                         </div>
                      </div>
                    </div>
                  </footer>

            </motion.div>
          ) : (
            <motion.div
              key="business"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Hero Section - Business */}
               <div className="max-w-[1400px] mx-auto text-center mb-16">
                 <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold uppercase tracking-widest text-[#e9d5ff] mb-6">
                   IndiGo Corporate Suite
                 </span>
                 <h2 className="text-5xl sm:text-6xl font-serif mb-4 tracking-tight">Enterprise Travel, Elevated.</h2>
                 <p className="text-xl text-white/70 font-light mb-10 max-w-3xl mx-auto leading-relaxed">
                   Automated policies, GST-compliant invoicing, and unified bookings for flights, hotels, and airport transfers.
                 </p>
               </div>

               {/* B2B Dashboard Layout */}
               <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
                 
                 {/* Left Column: Unified Booking Engine */}
                 <div className="glass-panel-dark rounded-[2rem] p-8 flex flex-col border border-white/20 bg-gradient-to-br from-white/5 to-transparent relative z-20">
                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                     <h3 className="text-2xl font-serif">Corporate Booking</h3>
                     {/* Horizontal Tabs: Flights, Hotels, Cabs */}
                     <div className="flex bg-black/20 p-1 rounded-xl border border-white/5 overflow-x-auto w-full sm:w-auto hide-scrollbar">
                        <button className="px-6 py-2 text-sm font-medium rounded-lg transition-all bg-white/10 text-white shadow-sm border border-white/20 whitespace-nowrap">Flights</button>
                        <button className="px-6 py-2 text-sm font-medium rounded-lg transition-all text-white/70 hover:text-white whitespace-nowrap">Hotels</button>
                        <button className="px-6 py-2 text-sm font-medium rounded-lg transition-all text-white/70 hover:text-white whitespace-nowrap">Transfers</button>
                     </div>
                   </div>

                   {/* Employee & Compliance Ribbon */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="glass-input bg-white/5 rounded-xl h-16 flex items-center px-4 border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
                        <User className="w-5 h-5 text-white/40 mr-3 group-hover:text-white/80 transition-colors" />
                        <div className="flex flex-col w-full">
                          <span className="text-[9px] uppercase text-white/40 font-bold tracking-wider mb-0.5">Booking For</span>
                          <input type="text" placeholder="Select Employee..." className="bg-transparent text-sm font-medium text-white outline-none w-full placeholder:text-white/30 cursor-pointer" />
                        </div>
                      </div>
                      <div className="glass-input bg-white/5 rounded-xl h-16 flex items-center px-4 border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
                        <Briefcase className="w-5 h-5 text-white/40 mr-3 group-hover:text-white/80 transition-colors" />
                        <div className="flex flex-col w-full">
                          <span className="text-[9px] uppercase text-white/40 font-bold tracking-wider mb-0.5">Cost Center</span>
                          <select className="bg-transparent text-sm font-medium text-white outline-none w-full appearance-none cursor-pointer">
                            <option className="bg-[#000F5C]">Sales & Marketing (CC-102)</option>
                            <option className="bg-[#000F5C]">Engineering (CC-204)</option>
                          </select>
                        </div>
                      </div>
                      <div className="glass-input bg-white/5 rounded-xl h-16 flex items-center px-4 border border-emerald-500/30 bg-emerald-500/5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
                        <div className="flex flex-col w-full">
                          <span className="text-[9px] uppercase text-emerald-400/70 font-bold tracking-wider mb-0.5">Policy Status</span>
                          <span className="text-sm font-semibold text-emerald-400 tracking-tight">Within Limits (L2)</span>
                        </div>
                      </div>
                   </div>

                   {/* Routing & Details */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative">
                      <div className="glass-input bg-white/5 rounded-xl h-16 flex flex-col justify-center px-5 border border-white/10 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">Origin</span>
                        <input type="text" defaultValue="Bengaluru (BLR)" className="bg-transparent text-lg font-semibold text-white outline-none w-full" />
                      </div>
                      <button className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#001B94] items-center justify-center border border-white/20 z-10 hover:bg-[#0024B3] transition-colors shadow-xl">
                        <ArrowRightLeft className="w-4 h-4 text-white hover:text-white" />
                      </button>
                      <div className="glass-input bg-white/5 rounded-xl h-16 flex flex-col justify-center px-5 border border-white/10 md:pl-8 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/55 mb-0.5">Destination</span>
                        <input type="text" defaultValue="Mumbai (BOM)" className="bg-transparent text-lg font-semibold text-white outline-none w-full" />
                      </div>
                   </div>

                   <button className="w-full h-16 px-8 rounded-xl bg-white text-[#001B94] font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex justify-center items-center gap-2 hover:scale-[1.01] active:scale-[0.99] mt-auto">
                     <Search className="w-5 h-5"/> Search Corporate Fares
                   </button>
                 </div>

                 {/* Right Column: Analytics & Approvals */}
                 <div className="flex flex-col gap-6">
                    {/* Approvals */}
                    <div className="glass-panel-dark rounded-[2rem] p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/20 flex flex-col gap-4 shadow-xl">
                      <div className="flex items-center justify-between mb-2">
                         <h4 className="font-serif text-xl tracking-tight">Pending Approvals</h4>
                         <span className="px-3 py-1 bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)] text-amber-400 rounded-lg text-xs font-bold uppercase tracking-wider">2 Action Required</span>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between group">
                         <div>
                           <p className="font-semibold text-sm text-white flex items-center gap-2">Rahul Sharma <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> <span className="text-white/40 font-normal text-xs">Out of Policy</span></p>
                           <p className="text-xs text-white/60 mt-1 font-medium tracking-wide">HYD → DEL <span className="mx-1">•</span> 24 Apr <span className="mx-1">•</span> Taj Lands End</p>
                         </div>
                         <button className="px-4 py-2 bg-white text-[#001B94] text-xs font-bold rounded-lg shadow-sm group-hover:bg-gray-100">Review</button>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors flex items-center justify-between group">
                         <div>
                           <p className="font-semibold text-sm text-white flex items-center gap-2">Priya Patel <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> <span className="text-white/40 font-normal text-xs">In Policy</span></p>
                           <p className="text-xs text-white/60 mt-1 font-medium tracking-wide">BLR → MAA <span className="mx-1">•</span> 28 Apr</p>
                         </div>
                         <button className="px-4 py-2 bg-white text-[#001B94] text-xs font-bold rounded-lg shadow-sm group-hover:bg-gray-100">Approve</button>
                      </div>
                    </div>

                    {/* Spend Analytics mini */}
                    <div className="glass-panel-dark flex-1 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden border border-white/20 shadow-xl">
                       <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/15 blur-[50px] rounded-full pointer-events-none" />
                       
                       <div className="relative z-10 flex flex-col items-start">
                         <h4 className="font-serif text-xl tracking-tight text-white/80 mb-2">Q2 Travel Spend</h4>
                         <p className="text-5xl font-light text-white tracking-tight mb-2 drop-shadow-sm">₹14.5L</p>
                         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <ChevronDown className="w-4 h-4 rotate-180 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400 tracking-wider">12% VS LAST QTR</span>
                         </div>
                       </div>
                       
                       {/* Mock Chart Bars */}
                       <div className="flex items-end gap-2 h-20 w-full pt-4 border-t border-white/10 relative z-10 mt-6">
                          <div className="flex-1 bg-white/10 hover:bg-white/20 transition-colors rounded-t cursor-pointer h-[40%]" />
                          <div className="flex-1 bg-white/10 hover:bg-white/20 transition-colors rounded-t cursor-pointer h-[60%]" />
                          <div className="flex-1 bg-white/10 hover:bg-white/20 transition-colors rounded-t cursor-pointer h-[30%]" />
                          <div className="flex-1 bg-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.3)] rounded-t cursor-pointer h-[90%]" />
                          <div className="flex-1 bg-white/5 hover:bg-white/10 transition-colors rounded-t cursor-pointer h-[20%]" />
                          <div className="flex-1 bg-white/5 hover:bg-white/10 transition-colors rounded-t cursor-pointer h-[40%]" />
                       </div>
                    </div>
                 </div>
                 
               </div>

               {/* B2B Ecosystem Grid (Bottom) */}
               <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                 {/* GST & Compliance */}
                 <div className="glass-panel-dark rounded-[2rem] p-8 flex flex-col border border-white/20 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                      <Lock className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-xl font-serif mb-3 text-white">Automated Compliance</h4>
                    <p className="text-sm text-white/60 leading-relaxed">Instant GST-compliant invoicing and mandatory cost-center tagging ensures accounting is handled before the flight even takes off.</p>
                 </div>
                 
                 {/* Unified Stay & Transfer */}
                 <div className="glass-panel-dark rounded-[2rem] p-8 flex flex-col border border-white/20 hover:bg-emerald-500/5 transition-colors cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                      <MapPin className="w-6 h-6 text-white/80 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h4 className="text-xl font-serif mb-3 text-white">Stays & Transfers Integrated</h4>
                    <p className="text-sm text-white/60 leading-relaxed">Unlock exclusive corporate rates for 5-star properties and guarantee zero-wait airport cabs seamlessly attached to your PNR.</p>
                 </div>
                 
                 {/* SmartKargo / Reporting */}
                 <div className="glass-panel-dark rounded-[2rem] p-8 flex flex-col border border-white/20 bg-gradient-to-br from-[#3b1e6d]/40 to-transparent hover:border-purple-400/30 transition-all cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                      <Package className="w-6 h-6 text-[#e9d5ff] group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-xl font-serif mb-3 text-white">SmartKargo Hub</h4>
                    <p className="text-sm text-white/60 leading-relaxed mb-6">Integrate natively with our platform to manage belly-cargo across 350+ aircraft, and scale using our dedicated A321 P2F freighters.</p>
                    {/* Interactive Cargo Widget */}
                    <div className="flex flex-col gap-2 mt-auto w-full">
                        {trackedStatus && (
                          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-lg flex items-center justify-between shadow-inner">
                            <span className="font-medium tracking-wide">{trackedStatus}</span>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex bg-black/40 rounded-xl p-1.5 border border-white/10 backdrop-blur-md relative overflow-hidden group-hover:border-white/20 transition-colors">
                          {isTracking && (
                            <motion.div 
                              className="absolute inset-0 bg-purple-500/20"
                              initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                          )}
                          <input type="text" placeholder="AWB Number..." className="bg-transparent px-4 py-2 text-sm w-full outline-none text-white placeholder:text-white/40 font-medium relative z-10" />
                          <button 
                            onClick={e => {
                               e.stopPropagation();
                               if (isTracking) return;
                               setIsTracking(true);
                               setTrackedStatus(null);
                               setTimeout(() => { setIsTracking(false); setTrackedStatus('Status: Arrived at LHR'); }, 2000);
                            }}
                            className="bg-[#3b1e6d]/80 border border-white/20 hover:bg-[#3b1e6d] text-white p-2 px-3 rounded-lg transition-colors shrink-0 relative z-10 font-bold text-xs tracking-wider"
                          >
                            TRACK
                          </button>
                        </div>
                    </div>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDigiYatra && (
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
             onClick={() => setShowDigiYatra(false)}
          >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
               onClick={e => e.stopPropagation()}
               className="glass-panel-dark p-10 rounded-3xl max-w-sm w-full flex flex-col items-center border border-white/20 shadow-2xl relative overflow-hidden bg-[#1e0a3c]/90"
             >
                <h3 className="text-2xl font-serif text-white mb-2">Digi Yatra</h3>
                <p className="text-white/60 text-center text-sm mb-8">Align your face to authenticate and retrieve your boarding pass seamlessly.</p>
                
                <div className="relative w-48 h-48 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center mb-8 overflow-hidden">
                   <Fingerprint className={`w-16 h-16 text-emerald-400 transition-all duration-1000 ${isScanning ? 'opacity-100 scale-110 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'opacity-50'}`} />
                   {isScanning && (
                     <motion.div 
                       initial={{ top: '-10%' }}
                       animate={{ top: '110%' }}
                       transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
                       className="absolute left-0 w-full h-2 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] z-10"
                     />
                   )}
                </div>
                
                <button 
                   onClick={() => {
                      if (isScanning) return;
                      setIsScanning(true);
                      setTimeout(() => { setIsScanning(false); setShowDigiYatra(false); }, 3000);
                   }}
                   className="w-full py-3 bg-white text-[#3b1e6d] rounded-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  {isScanning ? 'Scanning...' : 'Start Scan'}
                </button>
             </motion.div>
          </motion.div>
        )}

        {showPrime && (
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
             onClick={() => setShowPrime(false)}
          >
             <motion.div 
               initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }}
               onClick={e => e.stopPropagation()}
               className="glass-panel-dark p-8 rounded-3xl max-w-md w-full border border-white/20 shadow-2xl relative bg-[#1e0a3c]/90"
             >
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-amber-400" />
                  <h3 className="text-2xl font-serif text-white">6E Prime Upgrades</h3>
                </div>
                <p className="text-white/70 text-sm mb-6">Elevate your journey with priority privileges. Select your add-ons below.</p>
                
                <div className="space-y-3 mb-8">
                  <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 accent-amber-400 rounded focus:ring-amber-400/50" defaultChecked />
                      <div>
                        <p className="font-semibold text-white">Fast Forward</p>
                        <p className="text-xs text-white/50">Priority Check-in & Baggage</p>
                      </div>
                    </div>
                    <span className="font-bold text-amber-400">+₹400</span>
                  </label>
                  <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 accent-amber-400 rounded focus:ring-amber-400/50" />
                      <div>
                        <p className="font-semibold text-white">6E Eats Priority</p>
                        <p className="text-xs text-white/50">Hot meal served first</p>
                      </div>
                    </div>
                    <span className="font-bold text-amber-400">+₹350</span>
                  </label>
                </div>
                
                <button onClick={() => setShowPrime(false)} className="w-full py-4 bg-amber-400 text-black rounded-xl font-bold text-lg hover:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  Add to Itinerary
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

