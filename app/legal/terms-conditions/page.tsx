import type { Metadata } from "next";
import LegalLayout from "@/components/shared/legal-layouts";

export const metadata: Metadata = {
  title: "Terms of Service | Yeti Homes Estate",
  description:
    "Yeti Homes Estate Terms of Service - Platform usage terms and conditions.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/legal/terms-conditions",
  },
};

export default async function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 26, 2026">
      <h2>1. Legal Status &amp; Regulatory Compliance</h2>
      <br />
      <p>
        Yeti Homes Estate Pvt. Ltd. is a fully registered corporate entity under
        the laws of Nepal.
      </p>
      <p>
        <strong>Licensed Operator:</strong> We are formally licensed by the
        Department of Land Management and Archive (Bhumi Byabasthapan Tatha
        Abhilekh Bibag) to legally operate and facilitate real estate
        transactions in Nepal, strictly adhering to national property regulations
        and consumer protection frameworks.
      </p>

      <h2>2. Agreement to Terms</h2>
      <br />
      <p>
        By accessing this website and using our real estate services, you agree
        to be bound by these Terms, our Privacy Policy, and our Cookie Policy.
      </p>
      <p>
        If you disagree with any part, you must immediately cease using our
        platform.
      </p>

      <h2>3. Platform Use &amp; Eligibility</h2>
      <br />
      <ul>
        <li>
          <strong>Eligibility:</strong> You must be at least 18 years old and
          legally capable of forming contracts under Nepalese law.
        </li>
        <li>
          <strong>Purpose:</strong> Our platform serves as a licensed digital
          intermediary connecting property buyers, sellers, landlords, and
          renters across Nepal.
        </li>
        <li>
          <strong>Account Security:</strong> You are solely responsible for
          maintaining the confidentiality of your account credentials.
        </li>
      </ul>

      <h2>4. Listings, Pricing, and Mandatory Verification</h2>
      <br />
      <ul>
        <li>
          <strong>Listing Accuracy:</strong> While we maintain strict standards
          as a licensed agency, Yeti Homes does not guarantee the absolute
          perfection, completeness, or stability of every property listing.
        </li>
        <li>
          <strong>Currency &amp; Volatility:</strong> All prices are in Nepalese
          Rupees (NPR) and subject to change without prior notice.
        </li>
        <li>
          <strong>Mandatory Due Diligence:</strong> Users are strictly required
          to independently verify all property details before making financial
          commitments.<br />
          This includes physical boundaries, road access, and the legal status
          of the <em>Lal Purja</em> (Land Ownership Certificate) at the local
          Malpot Karyalaya (Land Revenue Office).
        </li>
        <li>
          <strong>Intermediary Status:</strong> Unless explicitly stated in a
          separate, written corporate brokerage contract with Yeti Homes Estate
          Pvt. Ltd., we are not a direct party to final transaction agreements
          between users.
        </li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <br />
      <p>
        All platform content&mdash;including text, logos, layout, architectural
        photography, and proprietary 3D virtual tours&mdash;is the exclusive
        property of Yeti Homes Estate Pvt. Ltd.
      </p>
      <p>
        All content is protected under Nepalese and international copyright
        laws.
      </p>

      <h2>6. Limitation of Liability</h2>
      <br />
      <p>
        To the maximum extent permitted by law, Yeti Homes shall not be liable
        for any financial losses, unauthorized platform access, or property
        disputes resulting from your transaction arrangements or reliance on
        unverified listing data.
      </p>

      <h2>7. Governing Law &amp; Jurisdiction</h2>
      <br />
      <p>
        These Terms are governed by the laws of Nepal. Any legal disputes
        arising from the use of this platform shall fall under the exclusive
        jurisdiction of the competent courts in Kathmandu, Nepal.
      </p>

      <h2>8. Contact Our Compliance Office</h2>
      <br />
      <p>
        For inquiries, legal compliance checks, or corporate details, please
        contact us:
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:estateyetihomes@gmail.com">
          estateyetihomes@gmail.com
        </a>
        <br />
        <strong>Office Address:</strong> Chuchepati, Chabahil, Kathmandu-06,
        Nepal
      </p>
    </LegalLayout>
  );
}
