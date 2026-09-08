import Link from "next/link";

export const PromoBento = () => {
  return (
    <section className="mt-16 md:mt-24">
      {/* Header Section */}
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
          Automate Your life
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base md:mt-6">
          Enjoy huge, limited-time deals on select devices so you&apos;ll never
          miss a moment this holiday season and beyond.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 lg:gap-6">
        <div className="group relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-[#111c33] to-slate-950 p-8 md:col-span-2 md:row-span-2 md:min-h-0">
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
            <div className="relative flex h-56 w-36 flex-col items-center rounded-full bg-gradient-to-b from-slate-400/20 to-transparent p-2 shadow-[0_-10px_40px_rgba(59,130,246,0.15)] backdrop-blur-md border-t-2 border-blue-400/30">
              {/* Glow Belakang */}
              <div className="absolute -bottom-10 h-32 w-48 rounded-full bg-blue-600/20 blur-3xl" />
              {/* Scroll Wheel */}
              <div className="mt-6 h-8 w-1.5 rounded-full bg-slate-300/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              {/* Logo / Indikator */}
              <div className="absolute bottom-12 h-4 w-4 rounded-full border-[3px] border-blue-400/60" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="mb-5 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Elegant functional mouse
            </h3>
            <Link
              href="/shop"
              className="inline-flex h-12 w-max items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-900 transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* --- KARTU 2: VR Glass (Lebar Kanan Atas) --- */}
        <div className="group relative flex min-h-[280px] flex-col justify-start overflow-hidden rounded-[2rem] bg-[#e2e4e9] p-8 md:col-span-2 md:row-span-1 md:min-h-0">
          {/* CSS Art: VR Headset */}
          <div className="absolute -right-4 bottom-0 flex h-full w-2/3 items-center justify-end pr-8 transition-transform duration-700 group-hover:scale-110">
            <div className="relative flex h-24 w-48 items-center justify-center rounded-[3rem] bg-white shadow-xl">
              {/* Visor Depan */}
              <div className="h-16 w-40 rounded-[2rem] bg-slate-800 shadow-inner flex items-center justify-center">
                <div className="h-2 w-12 rounded-full bg-white/10" />
              </div>
              {/* Tali Pengikat */}
              <div className="absolute -left-6 top-1/2 -z-10 h-4 w-12 -translate-y-1/2 bg-slate-700" />
            </div>
          </div>

          <div className="relative z-10 max-w-[50%]">
            <h3 className="mb-5 text-2xl font-bold tracking-tight text-slate-800">
              Vr glass
            </h3>
            <Link
              href="/shop"
              className="inline-flex h-12 w-max items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-slate-900 shadow-sm transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* --- KARTU 3: Earbud (Kecil Kanan Bawah 1) --- */}
        <div className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[2rem] bg-gradient-to-tr from-[#050014] to-[#1a0b2e] p-6 md:col-span-1 md:row-span-1 md:min-h-0">
          {/* CSS Art: Earbuds Case */}
          <div className="absolute inset-0 flex items-center justify-center pb-8 transition-transform duration-700 group-hover:-translate-y-2">
            <div className="relative h-24 w-28 rounded-3xl bg-gradient-to-b from-purple-500/20 to-transparent border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] flex justify-center pt-2">
              {/* Earbud 1 */}
              <div className="absolute top-0 -translate-y-1/2 left-4 h-10 w-6 rounded-full bg-slate-900 border border-purple-500/40" />
              {/* Earbud 2 */}
              <div className="absolute top-0 -translate-y-1/2 right-4 h-10 w-6 rounded-full bg-slate-900 border border-purple-500/40" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="mb-4 text-xl font-bold tracking-tight text-white">
              Earbud
            </h3>
            <Link
              href="/shop"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-slate-900 transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* --- KARTU 4: Smart Lock (Kecil Kanan Bawah 2) --- */}
        <div className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[2rem] bg-[#d3d3d3] p-6 md:col-span-1 md:row-span-1 md:min-h-0">
          {/* CSS Art: Smart Lock */}
          <div className="absolute inset-0 flex items-center justify-center pb-12 transition-transform duration-700 group-hover:scale-105">
            <div className="relative h-32 w-12 rounded-full bg-slate-800 shadow-xl flex flex-col items-center pt-4">
              {/* Sensor Sidik Jari / Wifi */}
              <div className="h-4 w-4 rounded-full border-2 border-blue-400" />
              <div className="mt-2 h-1 w-1 rounded-full bg-blue-400" />
              <div className="mt-1 h-1 w-1 rounded-full bg-slate-500" />

              {/* Handle Pintu */}
              <div className="absolute top-1/2 -right-16 h-3 w-16 -translate-y-1/2 rounded-r-full bg-slate-700 shadow-lg" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="mb-4 text-xl font-bold tracking-tight text-slate-800">
              Smart lock
            </h3>
            <Link
              href="/shop"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
