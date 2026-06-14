import type { Metadata } from "next";
import LegalLayout from "@/components/shared/legal-layouts";

export const metadata: Metadata = {
  title: "Disclaimer | Yeti Homes Estate",
  description:
    "Yeti Homes Estate disclaimer regarding property listings and website information.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/legal/disclaimer",
  },
};

export default async function DisclaimerPage() {
  return (
    <LegalLayout title="Legal Disclaimer" lastUpdated="April 26, 2026">
<h2>1. Regulatory Status &amp; Corporate Information</h2>
      <p>
        <strong>Yeti Homes Estate Pvt. Ltd.</strong> is a premier corporate real
        estate firm, fully registered, bonded, and licensed by the Government of
        Nepal to provide professional property brokerage, asset management,
        investment procurement, and structured real estate advisory services.
      </p>
      <p>
        All operations, corporate consultations, and transaction facilities are
        conducted in strict compliance with the prevailing regulatory frameworks
        of Nepal.
      </p>

      <h2>2. Professional Advisory &amp; Market Volatility Disclosure</h2>
      <p>
        With extensive on-the-field experience and a verified track record in
        the Nepalese property sector, Yeti Homes Estate Pvt. Ltd. provides
        clients with highly informed market insights, strategic evaluations, and
        professional property guidance. However, users and clients must note:
      </p>
      <ul>
        <li>
          <strong>Nature of Guidance:</strong> Professional opinions, market
          forecasts, and advisory insights shared on this platform or during
          consultations are intended to guide informed decision-making. They do
          not constitute absolute, legally binding financial guarantees or
          statutory mandates.
        </li>
        <li>
          <strong>Fiscal Dynamics:</strong> Interactive digital tools&mdash;including
          the &ldquo;Upfront Cash Calculator&rdquo; and
          &ldquo;Mortgage Calculator&rdquo;&mdash;utilize current market
          averages to provide estimations. Final transaction liabilities,
          including official agency commissions, government land registration
          taxes (Malpot duties), Capital Gains Tax (CGT), and commercial banking
          interest rates, are determined by live banking policies and shifting
          fiscal updates from the Government of Nepal.
        </li>
        <li>
          <strong>Client Due Diligence:</strong> While our seasoned team
          conducts extensive preliminary verifications, clients are encouraged
          to maintain independent legal and financial counsel to align
          acquisitions with their personal risk profiles.
        </li>
      </ul>

      <h2>3. Property Listing &amp; Data Integrity</h2>
      <p>
        Yeti Homes Estate Pvt. Ltd. enforces rigorous internal verification
        standards for all listed properties, structural specifications,
        dimensions, valuations, and titles. Material descriptions are published
        on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis utilizing
        data verified at the time of listing.
      </p>
      <p>
        Because property metrics, legal encumbrances, and valuations can be
        altered by primary owners or municipal zoning updates, Yeti Homes
        Estate Pvt. Ltd. reserves the right to update property portfolios
        without prior notice to maintain data accuracy.
      </p>

      <h2>4. Institutional Indemnity &amp; Third-Party Portals</h2>
      <p>
        For enhanced client convenience, this platform may feature direct
        integrations or hyperlinks to external institutional entities, such as
        commercial banking portals, land revenue offices, or statutory
        regulatory bodies.
      </p>
      <p>
        Yeti Homes Estate Pvt. Ltd. does not exercise administrative control
        over these third-party domains and explicitly disclaims liability for
        their independent digital security protocols, external operations, or
        data accuracy.
      </p>
    </LegalLayout>
  );
}
