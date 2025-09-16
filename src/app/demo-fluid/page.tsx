import { SplashCursor } from "@/components/ui/splash-cursor"

export default function FluidDemo() {
  return (
    <div className="relative w-full h-screen bg-black">
      <SplashCursor 
        DENSITY_DISSIPATION={3}
        VELOCITY_DISSIPATION={2}
        SPLAT_RADIUS={0.25}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-6xl font-bold text-white/80 text-center">
          Move Your Mouse
          <span className="block text-2xl mt-4 text-white/50">
            Interactive Fluid Simulation
          </span>
        </h1>
      </div>
    </div>
  )
}