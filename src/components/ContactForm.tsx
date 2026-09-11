"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

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
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 border-2 border-ink p-6 shadow-hard md:p-8"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Navn"
        required
        className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="E-post"
        required
        className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
      />
      <input
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        placeholder="Skole"
        required
        className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
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
        className="border-2 border-ink/30 px-4 py-3 text-sm outline-none focus:border-ink"
      />
      <Button type="submit" variant="primary" className="w-full">
        Send henvendelse →
      </Button>
      <p className="text-xs text-ink/50">
        Åpner en ferdigutfylt e-post i din e-postklient.
      </p>
    </form>
  );
}
