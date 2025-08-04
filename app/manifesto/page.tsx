import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EarlyAccessForm from "@/components/EarlyAccessForm";

export default function ManifestoPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-dark-navy">
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">The BoardDecks Manifesto</h1>

        <h2 className="text-2xl font-semibold mb-4">Why We Exist</h2>
        <p className="mb-6">
          Board meetings shouldn't be performance theater. They should be moments of clarity — where bold decisions are made with confidence.
        </p>
        <p className="mb-6">
          But today, they're anything but. ELT and key operating teams — the most expensive resources in the company — spend hours preparing slides and stitching together insights, only for the information to be <strong>stale by the time the boardroom discussion begins</strong>.
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Every portfolio company reports differently.</li>
          <li>Metrics are manually stitched together from tools like Salesforce, NetSuite, and Jira.</li>
          <li>Forecasts lack context, and insights are outdated before the meeting even starts.</li>
        </ul>
        <p className="mb-12">It's not a lack of effort — it's a lack of alignment.</p>

        <h2 className="text-2xl font-semibold mb-4">What We Believe</h2>
        <ul className="list-disc pl-6 mb-12 space-y-3">
          <li><strong>Strategy demands truth, not PowerPoint.</strong> Board decks shouldn't just show numbers — they should validate them.</li>
          <li><strong>Confidence comes from correlation.</strong> Marketing plans, pipeline, churn forecast, and delivery velocity aren't separate stories. They're one truth — and should be modeled that way.</li>
          <li><strong>Data should come with receipts.</strong> Third-party validation across your systems removes doubt and builds trust.</li>
          <li><strong>Security isn't a feature — it's a foundation.</strong> We treat your business-critical data with enterprise-grade encryption and permission controls.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">What We're Building</h2>
        <p className="mb-6">
          A <strong>living board deck</strong> that:
        </p>
        <ul className="list-disc pl-6 mb-12 space-y-2">
          <li>Connects systems across your company — or your entire portfolio</li>
          <li>Validates data with AI + ML models that understand context</li>
          <li>Highlights risks before they show up in churn or missed forecasts</li>
          <li>Standardizes KPIs so comparisons aren't just possible — they're automatic</li>
        </ul>
        <p className="mb-16">
          For <strong>PE and VC leaders</strong>, it's boardroom clarity — without the Sunday scramble.
          For <strong>portfolio operators</strong>, it's strategic insight — not more slide-building.
        </p>

        <blockquote className="border-l-4 border-primary pl-6 italic text-lg text-gray-700 mb-12">
          BoardDecks replaces manual prep with machine-validated confidence.
          Because the future of your business deserves better than bullet points.
        </blockquote>
      </section>

      <section className="bg-primary text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">Request early access and be the first to experience BoardDecks.</p>
          <EarlyAccessForm />
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
} 