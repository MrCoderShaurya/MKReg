import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

/* ─── Icons ──────────────────────────────────────────────────────── */
const Icon = {
  User: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Phone: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Spinner: () => (
    <svg width="18" height="18" className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  ),
  Lock: () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  AlertCircle: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Event: () => (
    <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

/* ─── Reusable Form Field Components ────────────────────────────── */
function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-indigo-500 ml-0.5">*</span>}
    </label>
  );
}

function InputField({ icon: IconComp, error, className = "", ...props }) {
  return (
    <div className="relative">
      {IconComp && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <IconComp />
        </span>
      )}
      <input
        {...props}
        className={`w-full ${IconComp ? "pl-9" : "pl-3.5"} pr-3.5 py-2.5 text-sm text-slate-800 bg-white border rounded-lg outline-none transition-all duration-150 placeholder:text-slate-400
          ${error
            ? "border-red-400 ring-2 ring-red-100"
            : "border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          } ${className}`}
      />
    </div>
  );
}

function SelectField({ icon: IconComp, children, ...props }) {
  return (
    <div className="relative">
      {IconComp && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
          <IconComp />
        </span>
      )}
      <select
        {...props}
        className={`w-full ${IconComp ? "pl-9" : "pl-3.5"} pr-8 py-2.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg outline-none transition-all duration-150 appearance-none cursor-pointer
          hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100`}
      >
        {children}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <Icon.ChevronDown />
      </span>
    </div>
  );
}

function TextareaField({ icon: IconComp, ...props }) {
  return (
    <div className="relative">
      {IconComp && (
        <span className="absolute left-3 top-3 text-slate-400 pointer-events-none">
          <IconComp />
        </span>
      )}
      <textarea
        {...props}
        className={`w-full ${IconComp ? "pl-9" : "pl-3.5"} pr-3.5 py-2.5 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg outline-none transition-all duration-150 placeholder:text-slate-400 resize-none
          hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100`}
      />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
        {children}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  );
}

/* ─── Toast Notification ─────────────────────────────────────────── */
function Toast({ notification, onClose }) {
  if (!notification) return null;
  const isSuccess = notification.type === "success";
  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in">
      <div
        className={`flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-lg border max-w-xs
          ${isSuccess
            ? "bg-white border-emerald-200 text-emerald-800"
            : "bg-white border-red-200 text-red-800"
          }`}
      >
        <span className={`mt-0.5 shrink-0 ${isSuccess ? "text-emerald-500" : "text-red-500"}`}>
          {isSuccess ? <Icon.CheckCircle /> : <Icon.AlertCircle />}
        </span>
        <p className="text-sm font-medium leading-snug flex-1">{notification.message}</p>
        <button
          onClick={onClose}
          className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors ml-1"
        >
          <Icon.Close />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
/** Extracts event from URL or fetches latest from database */
function useEventFromUrl() {
  const [eventName, setEventName] = useState("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventFromUrl = urlParams.get('event');
    
    if (eventFromUrl) {
      setEventName(eventFromUrl);
    } else {
      // Fetch latest event from database
      fetchLatestEvent();
    }
  }, []);
  
  const fetchLatestEvent = async () => {
    const { data, error } = await supabase
      .from('project')
      .select('name')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (!error && data && data.length > 0) {
      setEventName(data[0].name);
    }
  };
  
  return eventName;
}

/** Extracts and formats the event name from the URL path.
 *  e.g. /hello  → "Hello"
 *       /my-event-2025 → "My Event 2025"
 */
function useEventLabel() {
  const slug = window.location.pathname.split("/").filter(Boolean)[0] ?? "";
  const label = slug
    ? slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : null;
  return { slug, label };
}

export default function RegistrationForm() {
  const eventName = useEventFromUrl();
  const { slug: eventSlug, label: eventLabel } = useEventLabel();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    emergency_number: "",
    address: "",
    gender: "",
    a_date: "",
    d_date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "phone_number") setPhoneError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPhoneError("");

    if (form.phone_number) {
      const { data } = await supabase
        .from("users")
        .select("id")
        .eq("phone_number", form.phone_number)
        .limit(1);

      if (data && data.length > 0) {
        setPhoneError("This number is already registered.");
        setNotification({ message: "Phone number already registered for this event.", type: "error" });
        setIsSubmitting(false);
        return;
      }
    }

    const { error } = await supabase
      .from("users")
      .insert([{ ...form, status: "pending", event: eventName || eventSlug }]);

    if (error) {
      setNotification({ message: error.message, type: "error" });
    } else {
      setNotification({ message: "Registration submitted successfully!", type: "success" });
      setForm({ name: "", email: "", phone_number: "", emergency_number: "", address: "", gender: "", a_date: "", d_date: "" });
    }

    setIsSubmitting(false);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <>
      <Toast notification={notification} onClose={() => setNotification(null)} />

      {/* Page background */}
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center py-12 px-4">

        {/* Card */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Card Header */}
          <div className="bg-indigo-600 px-8 py-7">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-white/15 rounded-xl shrink-0">
                <Icon.Event />
              </div>
              <div className="min-w-0">
                {eventLabel ? (
                  <>
                    <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-0.5">
                      Registration
                    </p>
                    <h1 className="text-2xl font-bold text-white tracking-tight leading-tight truncate">
                      {eventLabel}
                    </h1>
                    <p className="text-indigo-200 text-sm mt-0.5">
                      Complete the form below to secure your spot
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
                      Event Registration
                    </h1>
                    <p className="text-indigo-300 text-sm mt-0.5">
                      No event specified in URL — visit{" "}
                      <span className="font-mono text-white/80">/your-event-name</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-7">

            {/* Personal Information */}
            <section>
              <SectionLabel>Personal Information</SectionLabel>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Full Name</Label>
                    <InputField
                      icon={Icon.User}
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label required>Email Address</Label>
                    <InputField
                      icon={Icon.Mail}
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label required>Gender</Label>
                  <SelectField
                    icon={Icon.Users}
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Prabhuji">Prabhuji</option>
                    <option value="Mataji">Mataji</option>
                    <option value="Other">Other</option>
                  </SelectField>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section>
              <SectionLabel>Contact Details</SectionLabel>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Phone Number</Label>
                    <InputField
                      icon={Icon.Phone}
                      name="phone_number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone_number}
                      onChange={handleChange}
                      error={phoneError}
                    />
                    {phoneError && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{phoneError}</p>
                    )}
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <InputField
                      icon={Icon.Shield}
                      name="emergency_number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.emergency_number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label>Home Address</Label>
                  <TextareaField
                    icon={Icon.MapPin}
                    name="address"
                    rows={3}
                    placeholder="Street, City, State, Country"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Event Dates */}
            <section>
              <SectionLabel>Event Dates</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Arrival Date</Label>
                  <InputField
                    icon={Icon.Calendar}
                    name="a_date"
                    type="date"
                    value={form.a_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Departure Date</Label>
                  <InputField
                    icon={Icon.Calendar}
                    name="d_date"
                    type="date"
                    value={form.d_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Icon.Spinner />
                    <span>Submitting…</span>
                  </>
                ) : (
                  <>
                    <span>Submit Registration</span>
                    <Icon.ArrowRight />
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 mt-4 text-slate-400 text-xs">
                <Icon.Lock />
                Your data is securely handled and will not be shared
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-slate-400 text-xs">
          © {new Date().getFullYear()} · All rights reserved
        </p>
      </div>
    </>
  );
}
