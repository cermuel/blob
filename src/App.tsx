import { useEffect, useState } from "react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import LoginButton from "./components/login-button";
import Blob from "./components/blob";
import { blobs } from "./constants";
import InfoModal from "./components/info";
import MobileBlock from "./components/mobile-blocker";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (!invalid) return;
    const t = window.setTimeout(() => setInvalid(false), 700);
    return () => window.clearTimeout(t);
  }, [invalid]);

  const handleSubmit = () => {
    const ok = email === "sam@mail.com" && password === "password";
    if (ok) {
      setSuccess(true);
    } else {
      setInvalid(false);
      window.requestAnimationFrame(() => setInvalid(true));
    }
  };

  return (
    <>
      <MobileBlock />
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
      <main className="min-h-screen bg-black text-white md:grid md:grid-cols-2">
        <section className="relative min-h-[42vh] overflow-hidden border-b border-[#222] bg-[#111] md:min-h-screen md:border-b-0 md:border-r">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-137.5 overflow-y-hidden">
              {blobs.map((spec) => (
                <Blob
                  key={spec.kind}
                  spec={spec}
                  showPassword={showPassword}
                  focused={focused}
                  invalid={invalid}
                  success={success}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="grid  min-h-[58vh] place-items-center bg-black px-4 py-10 md:min-h-screen md:px-10">
          <div className="w-full mt-auto max-w-115">
            <header className="mono mb-11 text-left">
              <h1 className="mb-2 text-xl font-bold leading-none tracking-[-0.05em] text-white md:text-[3.2rem]">
                Welcome back!
              </h1>
              <p className="text-sm text-[#f5f5f5] opacity-70">
                Please enter your details
              </p>
              <button
                type="button"
                onClick={() => setShowInfo(true)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#555] hover:text-white transition"
              >
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#444] text-[10px] leading-none">
                  i
                </span>
                View demo credentials
              </button>
            </header>
            <form
              className="mono flex flex-col gap-5"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="text"
                style={{ display: "none" }}
                autoComplete="username"
                readOnly
              />
              <input
                type="password"
                style={{ display: "none" }}
                autoComplete="password"
                readOnly
              />
              <label className="flex flex-col gap-2">
                <span className="text-[0.95rem] text-[#f5f5f5]">Email</span>
                <input
                  type="text"
                  name="contact_field"
                  value={email}
                  inputMode="email"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  data-lpignore="true"
                  data-1p-ignore="true"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  data-form-type="other"
                  className={`min-h-13 rounded-[10px] border border-[#222] bg-[#111] px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#444] ${invalid ? "fieldReject" : ""}`}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[0.95rem] text-[#f5f5f5]">Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="access_key_field"
                    value={password}
                    autoComplete="one-time-code"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-form-type="other"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`min-h-13 w-full rounded-[10px] border border-[#222] bg-[#111] px-3.5 py-3 pr-11 text-sm text-white outline-none transition focus:border-[#444] ${invalid ? "fieldReject" : ""}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center bg-transparent text-[#f5f5f5]"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </label>
              <LoginButton
                invalid={invalid}
                success={success}
                onClick={handleSubmit}
              />
            </form>
            <p className="mono mt-2 text-right text-xs tracking-tight text-[#f5f5f5] opacity-70">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-semibold"
                onClick={(e) => e.preventDefault()}
              >
                Sign Up
              </a>
            </p>
          </div>
          <p className="mono mt-auto text-right text-xs tracking-tight text-[#f5f5f5] opacity-70">
            <a
              href="https://cermuel.dev"
              className="font-semibold underline"
              target="_blank"
            >
              CERMUEL
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
