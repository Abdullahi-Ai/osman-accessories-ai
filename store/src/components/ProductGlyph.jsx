import React from 'react';
import { Smartphone, Zap, ShieldHalf, Headphones, BatteryCharging, Watch, Speaker, Usb, Save, Tablet } from 'lucide-react';

const CATEGORY_META = {
  'Smartphones': { icon: Smartphone },
  'Tablets': { icon: Tablet },
  'Smart Watches': { icon: Watch },
  'Wireless Earbuds': { icon: Headphones },
  'Bluetooth Speakers': { icon: Speaker },
  'Power Banks': { icon: BatteryCharging },
  'Phone Cases': { icon: ShieldHalf },
  'Chargers': { icon: Zap },
  'USB Cables': { icon: Usb },
  'Memory Cards': { icon: Save },
};

const C = {
  navy: "#0A2540",
  navyDeep: "#071B33",
  navyLight: "#123A5C",
  gold: "#C89B3C",
  amber: "#E8A33D",
};

export default function ProductGlyph({ category, size = "md", tone = "navy" }) {
  const Icon = (CATEGORY_META[category] || {}).icon || Smartphone;
  const dims = size === "lg" ? "w-full h-64 md:h-80" : size === "sm" ? "w-16 h-16" : "w-full h-48";
  const iconSize = size === "lg" ? 84 : size === "sm" ? 22 : 46;
  const bg = tone === "gold"
    ? `linear-gradient(155deg, ${C.gold}22, ${C.amber}33)`
    : `linear-gradient(155deg, ${C.navy}0F, ${C.navyLight}1F)`;
    
  return (
    <div
      className={`${dims} rounded-2xl flex items-center justify-center relative overflow-hidden`}
      style={{ background: bg }}
    >
      <div
        className="absolute rounded-full"
        style={{ width: "70%", height: "70%", background: `radial-gradient(circle, ${C.gold}22, transparent 70%)` }}
      />
      <div
        className="rounded-2xl flex items-center justify-center relative z-10 transition-transform duration-500 hover:scale-105"
        style={{
          width: size === "lg" ? 128 : size === "sm" ? 44 : 84,
          height: size === "lg" ? 128 : size === "sm" ? 44 : 84,
          background: C.navy,
          boxShadow: "0 12px 24px -8px rgba(10,37,64,0.45)",
        }}
      >
        <Icon size={iconSize} color={C.gold} strokeWidth={1.6} />
      </div>
    </div>
  );
}
