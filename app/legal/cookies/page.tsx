import type { Metadata } from "next";
import LegalLayout from "@/components/shared/legal-layouts";

export const metadata: Metadata = {
  title: "Cookie Policy | Yeti Homes Estate",
  description:
    "Yeti Homes Estate Cookie Policy - How we use cookies and tracking technologies.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/legal/cookies",
  },
};

export default async function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="April 26, 2026">
      <h2>1. What Are Cookies?</h2>
      <br />
      <p>
        Cookies are small text files stored on your device when you visit a
        website.<br />
        They help the site remember your actions and preferences over time so
        you don&apos;t have to re-enter them each visit.
      </p>
      <p>
        Some cookies are also used to understand how people use a website, which
        helps improve the experience for everyone.
      </p>

      <h2>2. How We Use Cookies</h2>
      <br />
      <p>
        Yeti Homes uses cookies and similar technologies to operate, secure, and
        improve our platform. Specifically, cookies help us:
      </p>
      <ul>
        <li>Keep you signed in to your Yeti Homes account across sessions.</li>
        <li>
          Remember your property search preferences — saved locations such as
          Lalitpur, Bhaktapur, or Pokhara, price ranges in NPR, and property
          type filters.
        </li>
        <li>
          Optimise the performance of interactive features including 3D virtual
          tours, image galleries, and map-based search.
        </li>
        <li>
          Detect and prevent fraudulent activity, spam, and abuse on the
          platform.
        </li>
        <li>
          Measure traffic patterns and understand which listings, pages, and
          features are most useful to our visitors.
        </li>
      </ul>

      <h2>3. Types of Cookies We Use</h2>
      <br />
      <p>
        <strong>Essential Cookies:</strong> Required for core functionality —
        authentication, security, and session management.<br />
        Without these, you cannot log in, save properties, or submit enquiries.
        These cannot be disabled.
      </p>
      <p>
        <strong>Functional Cookies:</strong> Remember your choices and
        preferences — language, currency display (NPR), recently viewed
        listings, and dark/light mode settings — to provide a more personalised
        experience.
      </p>
      <p>
        <strong>Analytical / Performance Cookies:</strong> Help us understand
        how visitors navigate the site, which pages are visited most, and where
        errors occur.<br />
        This data is aggregated and anonymised, meaning it cannot identify you
        personally.
      </p>
      <p>
        <strong>Marketing Cookies:</strong> Used to deliver relevant property
        recommendations and measure the effectiveness of our campaigns.<br />
        These may be set by third-party advertising partners and can track your
        browsing activity across other sites.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <br />
      <p>
        Some cookies are placed by services that appear on our pages but are
        operated by third parties. We do not control these cookies.
      </p>
      <p>Third parties that may set cookies through our site include:</p>
      <ul>
        <li>
          <strong>Google Analytics</strong> — for anonymised traffic and
          behaviour analysis.
        </li>
        <li>
          <strong>Google Maps</strong> — to power interactive property location
          maps and neighbourhood search.
        </li>
        <li>
          <strong>Meta (Facebook) Pixel</strong> — to measure ad performance and
          deliver relevant property listings on social platforms.
        </li>
      </ul>
      <p>
        Each third party operates under its own privacy and cookie policy.<br />
        We encourage you to review their policies directly.
      </p>

      <h2>5. Cookie Retention</h2>
      <br />
      <p>
        Cookies remain on your device for different periods depending on their
        type:
      </p>
      <ul>
        <li>
          <strong>Session cookies</strong> are temporary and are deleted
          automatically when you close your browser.
        </li>
        <li>
          <strong>Persistent cookies</strong> remain on your device until they
          expire or you manually delete them.<br />
          Our persistent cookies have a maximum lifespan of 12 months.
        </li>
      </ul>

      <h2>6. Managing Your Cookie Preferences</h2>
      <br />
      <p>
        You have control over which cookies are stored on your device. You can
        manage your preferences in the following ways:
      </p>
      <ul>
        <li>
          <strong>Browser settings:</strong> Most browsers allow you to block or
          delete cookies through their settings.<br />
          Consult your browser&apos;s help documentation for instructions
          specific to Chrome, Safari, Firefox, or Edge.
        </li>
        <li>
          <strong>Our cookie banner:</strong> When you first visit Yeti Homes,
          you will see a cookie consent banner where you can accept or customise
          which non-essential cookie categories are enabled.
        </li>
        <li>
          <strong>Opt-out links:</strong> For analytics, you can install the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </li>
      </ul>
      <p>
        Please note that disabling essential or functional cookies may degrade
        your experience — some features such as saved searches, account login,
        and interactive maps may not work as expected.
      </p>

      <h2>7. Updates to This Policy</h2>
      <br />
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        technology, regulation, or our business practices.
      </p>
      <p>
        The &ldquo;Last updated&rdquo; date at the top of this page indicates
        the most recent revision. We encourage you to review this page
        periodically.
      </p>

      <h2>8. Contact Us</h2>
      <br />
      <p>
        If you have questions about our use of cookies or your privacy, please
        contact us:
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:Estateyetihomes@gmail.com">
          Estateyetihomes@gmail.com
        </a>
        <br />
        <strong>Web:</strong> <a href="/contact">Contact page</a>
      </p>
    </LegalLayout>
  );
}
