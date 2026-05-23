import LegalLayout from "@/components/shared/legal-layouts";

async function getLegalData() {
  try {
    const { getLegalDocuments } = await import("@/lib/api");
    return await getLegalDocuments();
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Terms of Service | YetiHomes",
  description: "YetiHomes Terms of Service - Platform usage terms and conditions.",
};

export default async function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="April 26, 2026"
    >
      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or using the <strong>Yeti Homes</strong> website and our
        real estate services, you agree to be bound by these Terms of Service.
        If you disagree with any part of the terms, you may not access our
        platform or use our services.
      </p>

      <h2>2. Use of the Platform</h2>
      <p>
        Our platform serves as a digital intermediary connecting property
        buyers, sellers, and renters across Nepal. You agree to use this
        platform only for lawful purposes and in accordance with these Terms.
      </p>
      <ul>
        <li>
          You must be at least 18 years of age and capable of forming a binding
          contract under the laws of Nepal to use our services.
        </li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account.
        </li>
        <li>
          You agree not to use the platform in any way that could disable,
          overburden, damage, or impair the site or interfere with any other
          party's use of the platform.
        </li>
      </ul>

      <h2>3. Property Listings and Transactions</h2>
      <p>
        While we strive to provide the most accurate and up-to-date information,
        Yeti Homes does not guarantee the absolute accuracy, completeness, or
        reliability of any property listings.
      </p>
      <ul>
        <li>
          <strong>Pricing:</strong> All prices listed in Nepalese Rupees (NPR)
          are subject to change without prior notice depending on market
          fluctuations or seller adjustments.
        </li>
        <li>
          <strong>Verification:</strong> Buyers are strongly encouraged to
          independently verify all property details, including but not limited
          to, physical boundaries, road access, and the legal status of the{" "}
          <em>Lal Purja</em> (Land Ownership Certificate) before making any
          financial commitments.
        </li>
        <li>
          <strong>Agreements:</strong> Yeti Homes is not a party to the final
          legal agreements between buyers and sellers unless explicitly stated
          in a separate brokerage contract.
        </li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        The platform and its original content, features, functionality,
        architectural photography, and 3D virtual tours are owned by Yeti Homes
        and are protected by Nepalese and international copyright, trademark,
        and other intellectual property laws.
      </p>

      <h2>5. Governing Law</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws
        of Nepal, without regard to its conflict of law provisions. Our failure
        to enforce any right or provision of these Terms will not be considered
        a waiver of those rights.
      </p>
    </LegalLayout>
  );
}
