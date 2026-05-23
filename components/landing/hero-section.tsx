import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#e3e7ec] overflow-hidden font-sans antialiased">
      <div className="absolute top-[15%] left-[20%] z-10 flex flex-col pointer-events-none">
        <h1 className="font-serif text-[8rem] leading-[0.8] text-gray-900 tracking-tight">
          Find the Best Properties
          <br />
          <span className="ml-[15%]">ARCADE</span>
        </h1>
      </div>

      <div className="absolute bottom-[0%] right-[0%] w-[100%] h-[70%] z-20 pointer-events-none">
        <Image
          src="/home.jpg"
          alt="Modern Architecture"
          fill
          className="object-contain object-center-bottom"
          priority
        />
      </div>

      <div className="absolute left-8 top-1/3 z-30 max-w-xs">
        <span className="border border-gray-400 rounded-full px-4 py-1 text-[10px] tracking-widest mb-4 inline-block">
          BEST REAL ESTATE AGENCY
        </span>
        <p className="text-xs text-gray-600 leading-relaxed mt-2 uppercase tracking-wide">
          Find your dream home, explore premium properties, and invest with
          confidence...
        </p>
      </div>

      <div className="absolute right-8 top-1/4 z-30 flex flex-col space-y-6 text-right">
        <div>
          <h3 className="text-3xl font-light">10K</h3>
          <p className="text-[9px] tracking-widest text-gray-500 uppercase">
            Happy Clients
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-light">5K</h3>
          <p className="text-[9px] tracking-widest text-gray-500 uppercase">
            Properties Sold
          </p>
        </div>
      </div>
    </section>
  );
}
