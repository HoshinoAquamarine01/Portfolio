import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Notfound from "@/pages/Notfound";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/PageLoader";
import { useState, useEffect } from "react";

const VALID_HASH_SECTIONS = [
  "hero",
  "about",
  "skills",
  "certificates",
  "projects",
  "contact",
];

function App() {
  const [loading, setLoading] = useState(false);
  const [shouldShow404, setShouldShow404] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);
    window.addEventListener("navigation:start", handleStart);
    window.addEventListener("navigation:end", handleEnd);

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setShouldShow404(hash && !VALID_HASH_SECTIONS.includes(hash));
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("navigation:start", handleStart);
      window.removeEventListener("navigation:end", handleEnd);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <Toaster />
      <BrowserRouter basename="/Portfolio/">
        {shouldShow404 ? (
          <Notfound />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hero" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/skills" element={<Home />} />
            <Route path="/certificates" element={<Home />} />
            <Route path="/projects" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
