import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20 text-dark-navy">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At BoardDecks, we take privacy seriously. This policy explains what we do — and just as importantly, what we don't do.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">No Cookies or Tracking</h2>
        <p className="mb-4">
          We do not use cookies, pixels, or any third-party trackers. We believe in respecting your privacy by default.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">What We Collect</h2>
        <p className="mb-4">
          If you submit your information via our early access form (name, email, company), we use it only to contact you about BoardDecks. That's it.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">How We Store It</h2>
        <p className="mb-4">
          Data is stored securely via trusted third-party platforms (e.g., Google Sheets or Notion). We do not sell, share, or expose your data.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
        <p>
          If you have any concerns, reach out at <a href="mailto:hello@boarddecks.com" className="text-primary underline">hello@boarddecks.com</a>.
        </p>
      </main>
    </>
  );
} 