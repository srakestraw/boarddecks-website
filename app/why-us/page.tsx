'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EarlyAccessForm from "@/components/EarlyAccessForm";

export default function WhyUsPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-dark-navy px-6 py-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Why Us</h1>

      <p className="text-lg mb-6 text-center">
        We're not just building another reporting tool — we've lived the problem from every seat in the boardroom.
      </p>

      <ul className="space-y-6 text-base leading-relaxed">
        <li>
          <strong>We've unlocked messy data and put it to work.</strong><br />
          From marketing attribution to financial planning and forecasting, we know how to align AI models to what matters.
        </li>

        <li>
          <strong>We've built products and measured what moves them.</strong><br />
          Our leadership team has a proven track record of tracking product velocity, usage, and health — and knowing what to do when signals point to risk.
        </li>

        <li>
          <strong>We've connected an entire industry.</strong><br />
          We built data-sharing platforms adopted by over 300 retailers and brands — creating trust, transparency, and real-time insights across the value chain.
        </li>

        <li>
          <strong>We've scaled alongside complexity.</strong><br />
          We've been part of a company that acquired and integrated over 80 businesses. We understand what it means to lead through ambiguity and drive alignment at scale.
        </li>

        <li>
          <strong>We've sat in your seat.</strong><br />
          We've worked at and with PE-backed companies and experienced first-hand how disconnected data and one-off board decks lead to sub-optimal decisions.
        </li>

        <li>
          <strong>We know how to tell the story.</strong><br />
          Our roots are in analytics and visualization — helping executive teams surface the signal, not just the noise.
        </li>

        <li>
          <strong>We build for boardroom reality.</strong><br />
          Our outputs integrate with how executives already work—push to PowerPoint and Google Slides for quick presentations, with Excel and Google Sheets for structured analysis.
        </li>

        <li>
          <strong>Whether your board needs a single KPI slide or a full deck, we make it push-button simple—into the formats you already use.</strong>
        </li>
      </ul>

      <p className="mt-12 text-lg text-center font-medium">
        We've lived the pain. That's why we're building BoardDecks — not just to automate reporting, but to deliver clarity where it counts.
      </p>
      </main>

      <section className="bg-primary text-white py-16 px-6" id="ready-to-get-started">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Join the waitlist and be among the first to experience the clarity of BoardDecks. No pitch decks. Just answers.
          </p>

          <EarlyAccessForm />
        </div>
      </section>

      <Footer />
    </>
  );
} 