"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Tag,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function Contact() {
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentName, setSentName] = useState("");
  const renderedAt = useRef(Date.now());

  useEffect(() => {
    renderedAt.current = Date.now();
    setTimeout(() => setShowTitle(true), 100);
    setTimeout(() => setShowDesc(true), 300);
    setTimeout(() => setShowForm(true), 500);
    setTimeout(() => setShowBtn(true), 1300);
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, t: renderedAt.current }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSentName(form.name.trim());
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", company: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const resetForm = () => {
    renderedAt.current = Date.now();
    setStatus("idle");
    setErrorMsg("");
  };

  const textFields = [
    { name: "name", type: "text", placeholder: "Your name", icon: User, maxLength: 100 },
    { name: "email", type: "email", placeholder: "Your email", icon: Mail, maxLength: 254 },
    { name: "subject", type: "text", placeholder: "Subject", icon: Tag, maxLength: 150 },
  ];

  const fieldWrap = (i) => ({
    transitionDelay: showForm ? `${i * 100}ms` : "0ms",
  });
  const fieldClass = `duration-700 ease-out ${
    showForm
      ? "opacity-100 translate-x-0 blur-none"
      : "opacity-0 -translate-x-8 blur-[6px]"
  }`;

  const inputClass =
    "peer w-full pl-11 pr-4 py-3 rounded-xl bg-purple-700/10 border border-purple-700/40 outline-none placeholder:text-gray-500 focus:border-purple-500 focus:bg-purple-700/20 duration-300";
  const iconClass =
    "absolute left-3 top-3.5 w-5 h-5 text-purple-400/70 peer-focus:text-purple-400 duration-300";

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] py-12 px-4">
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        <h1
          className={`duration-800 text-4xl font-black text-purple-500 ${
            showTitle
              ? "opacity-100 translate-y-0 blur-none"
              : "opacity-0 -translate-y-12 blur-[8px]"
          }`}
        >
          Let&apos;s work together
        </h1>
        <h2
          className={`duration-800 text-lg text-gray-400 text-center ${
            showDesc
              ? "opacity-100 translate-y-0 blur-none"
              : "opacity-0 -translate-y-12 blur-[8px]"
          }`}
        >
          Got a project, an idea, or a job offer? Drop me a message.
        </h2>

        <div
          className={`w-full duration-800 ${
            showForm
              ? "opacity-100 translate-y-0 blur-none"
              : "opacity-0 translate-y-12 blur-[8px]"
          }`}
        >
          <div className="bg-[#15151550] border border-[#222] p-6 sm:p-8 rounded-2xl backdrop-blur-[8px]">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 className="w-20 h-20 text-purple-500 animate-check-pop" />
                <h3 className="text-2xl font-bold">Message sent!</h3>
                <p className="text-gray-400">
                  Thanks{sentName ? `, ${sentName}` : ""}. Your message landed
                  in my inbox. I&apos;ll reply to your email soon.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-2 px-5 py-2 font-bold bg-purple-700/30 hover:bg-purple-700/50 hover:scale-105 duration-300 border border-purple-700 rounded-xl"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                />

                {textFields.map((field, i) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name} style={fieldWrap(i)} className={fieldClass}>
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={form[field.name]}
                          onChange={handleChange}
                          required
                          maxLength={field.maxLength}
                          className={inputClass}
                        />
                        <Icon className={iconClass} />
                      </div>
                    </div>
                  );
                })}

                <div style={fieldWrap(3)} className={fieldClass}>
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Your message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                    <MessageSquare className={iconClass} />
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      {form.message.length}/5000
                    </span>
                  </div>
                </div>

                <div style={fieldWrap(4)} className={fieldClass}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full px-4 py-3 font-bold bg-purple-700/50 hover:bg-purple-700/75 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 duration-300 border border-purple-700 rounded-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {status === "sending" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send message"
                      )}
                    </span>
                  </button>
                </div>

                {status === "error" && (
                  <div className="flex items-center justify-center gap-2 text-red-400 font-semibold animate-check-pop">
                    <AlertCircle className="w-5 h-5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        <Link
          href="/"
          className={`px-4 py-2 font-bold bg-purple-700/25 hover:scale-110 hover:bg-purple-700/50 duration-300 border border-purple-700 rounded-2xl ${
            showBtn
              ? "opacity-100 translate-y-0 blur-none"
              : "opacity-0 -translate-y-12 blur-[8px]"
          } duration-800`}
        >
          Homepage
        </Link>
      </div>
    </div>
  );
}
