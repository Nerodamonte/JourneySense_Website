import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col font-['Cormorant_Garamond',serif]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#faf8f3]/90 backdrop-blur-sm border-b border-amber-100/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-wide text-stone-700">
            Journey Sense
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm text-stone-500 font-['Lato',sans-serif]">
          <a href="#" className="hover:text-amber-600 transition-colors duration-200">
            Home
          </a>
          <a href="#" className="hover:text-amber-600 transition-colors duration-200">
            About
          </a>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 pt-[60px]">
        {/* Left – Hero image panel */}
        <div className="relative hidden md:flex md:w-[48%] lg:w-[45%] min-h-[calc(100vh-60px)] overflow-hidden">
          {/* Background image – mountain path at sunrise */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&auto=format&fit=crop')",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />

          {/* Text & icons */}
          <div className="relative z-10 flex flex-col justify-end pb-16 px-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-3">
              Welcome back to
              <br />
              your journey
            </h1>
            <p className="text-white/80 text-sm font-['Lato',sans-serif] tracking-wide mb-8">
              Let's continue exploring, one step at a time.
            </p>

            {/* Icon row */}
            <div className="flex gap-3">
              {[
                // Compass
                <svg key="a" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l-2 6 6-2-4-4zm1 4.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" />
                </svg>,
                // Share / network
                <svg key="b" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>,
                // Location
                <svg key="c" viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>,
              ].map((icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/35 transition-colors cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Sign in form */}
        <div className="flex-1 flex items-center justify-center bg-[#faf8f3] px-8 py-12">
          <div className="w-full max-w-[340px]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-stone-800 mb-1">Sign in</h2>
              <p className="text-sm text-stone-400 font-['Lato',sans-serif]">
                Continue your journey with us
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5 font-['Lato',sans-serif]">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-200 rounded-lg bg-white text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-200 font-['Lato',sans-serif] pr-10"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 fill-current"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5 font-['Lato',sans-serif]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-200 rounded-lg bg-white text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-200 font-['Lato',sans-serif] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition-colors"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="text-right mt-1.5">
                  <a
                    href="#"
                    className="text-xs text-stone-400 hover:text-amber-600 transition-colors font-['Lato',sans-serif]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md font-['Lato',sans-serif] mt-2"
              >
                Sign in to Journey Sense
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}