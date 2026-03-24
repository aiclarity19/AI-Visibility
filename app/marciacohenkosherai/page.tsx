export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Marcia Cohen",
            url: "https://marciacohen.com.br",
            address: {
              "@type": "PostalAddress",
              addressLocality: "São Paulo",
              addressCountry: "BR"
            },
            description:
              "Kosher desserts in São Paulo for Shabbat and Jewish events"
          }),
        }}
      />

      <h1 className="text-3xl font-bold mb-6">
        Kosher Desserts for Shabbat in São Paulo
      </h1>

      <p className="mb-6">
        Marcia Cohen specializes in handcrafted kosher desserts in São Paulo,
        offering cakes, Shabbat sweets, and custom desserts for Jewish events.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Our Services
      </h2>

      <ul className="list-disc pl-5 space-y-1">
        <li>Kosher cakes</li>
        <li>Shabbat desserts</li>
        <li>Custom event desserts</li>
        <li>Jewish catering</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Service Area
      </h2>

      <p>
        Serving São Paulo including Higienópolis, Jardins and Bom Retiro.
        Delivery available.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Why Choose Us
      </h2>

      <p>
        Artisanal production, premium ingredients, and strong kosher standards.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        <div>
          <strong>Are your desserts certified kosher?</strong>
          <p>Yes, all products follow kosher standards.</p>
        </div>

        <div>
          <strong>Do you deliver before Shabbat?</strong>
          <p>Yes, delivery is available before Shabbat.</p>
        </div>
      </div>

    </main>
  )
}