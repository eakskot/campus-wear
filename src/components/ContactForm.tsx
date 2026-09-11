"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const fieldClasses =
  "border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-ink";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [role, setRole] = useState("Elev / elevråd");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Henvendelse fra ${school || "skole"} — Campus Wear`);
    const body = encodeURIComponent(
      [
        `Navn: ${name}`,
        `Skole: ${school}`,
        `Rolle: ${role}`,
        `E-post: ${email}`,
        "",
        message,
      ].join("\n")
    );
    window.location.href = `mailto:hei@campuswear.no?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 bg-sand/40 p-6 md:p-10">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Navn"
        required
        className={fieldClasses}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="E-post"
        required
        className={fieldClasses}
      />
      <input
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        placeholder="Skole"
        required
        className={fieldClasses}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className={fieldClasses}
      >
        <option>Elev / elevråd</option>
        <option>Lærer / ansatt</option>
        <option>Russekomité</option>
        <option>Annet</option>
      </select>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Fortell oss hva dere trenger"
        rows={5}
        required
        className={fieldClasses}
      />
      <Button type="submit" variant="primary" className="w-full">
        Send henvendelse →
      </Button>
      <p className="text-xs text-ink/45">
        Åpner en ferdigutfylt e-post i din e-postklient.
      </p>
    </form>
  );
}
