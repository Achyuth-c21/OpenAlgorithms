/* eslint-disable react-refresh/only-export-components */
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";

// Lazy-load pages for code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AlgorithmPage = lazy(() => import("./pages/AlgorithmPage.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

import { ClerkProvider } from "@clerk/clerk-react";
import { UserSync } from "./components/UserSync";

// @ts-ignore
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

if (!PUBLISHABLE_KEY) {
  createRoot(document.getElementById("root")!).render(
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8 text-center font-sans">
      <div className="max-w-md space-y-4 neumorphic-card p-8 border-t-4 border-destructive">
        <h1 className="text-2xl font-bold text-red-400">System Configuration Missing</h1>
        <p className="text-slate-300">
          The <b>VITE_CLERK_PUBLISHABLE_KEY</b> environment variable is missing. 
          Please add it to your Vercel/Deployment settings to activate the platform.
        </p>
        <div className="text-xs text-slate-500 bg-black/30 p-2 rounded">
          Check your .env.local or production dashboard.
        </div>
      </div>
    </div>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <BrowserRouter>
            <UserSync />
            <RouteSyncer />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/achyuth-privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/algorithms/:slug" element={<AlgorithmPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </ThemeProvider>
      </ClerkProvider>
    </StrictMode>,
  );
}