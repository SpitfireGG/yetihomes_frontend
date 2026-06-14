import type { Metadata } from "next";
import LegalLayout from "@/components/shared/legal-layouts";

export const metadata: Metadata = {
  title: "Privacy Policy | Yeti Homes Estate",
  description:
    "Yeti Homes Estate Privacy Policy - How we handle and protect your personal data.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/legal/privacy",
  },
};

export default async function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 14, 2026">
      <h2>1. Introduction</h2>
      <p>
        <strong>Yeti Homes Estate Pvt. Ltd.</strong> (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your
        privacy in compliance with{" "}
        <strong>The Privacy Act, 2075 (2018) of Nepal</strong>.
      </p>
      <p>
        This policy explains how we collect and use your data when you visit our
        website or use our services.
      </p>

      <h2>2. The Data We Collect</h2>
      <p>
        We collect the following information to provide our real estate
        services:
      </p>
      <ul>
        <li>
          <strong>Identity Data:</strong> Name, date of birth, and gender.
        </li>
        <li>
          <strong>Contact Data:</strong> Phone numbers, email, and
          billing/property addresses in Nepal.
        </li>
        <li>
          <strong>Property Verification Data:</strong> Legal documents like
          Citizenship Certificates (Nagarikta) and{" "}
          <em>Lal Purja</em> (Land Ownership Certificates) required for
          property transactions.
        </li>
        <li>
          <strong>Technical Data:</strong> IP address, browser type, and
          location details.
        </li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>
        We process your data strictly under Nepalese law for the following
        purposes:
      </p>
      <ul>
        <li>
          <strong>Contract Performance:</strong> Processing earnest deposits,
          scheduling viewings, and managing property listings.
        </li>
        <li>
          <strong>Legal Obligations:</strong> Verifying ownership details with
          government entities and meeting regulatory checks.
        </li>
        <li>
          <strong>Service Optimization:</strong> Improving our website features
          and customer support.
        </li>
      </ul>

      <h2>4. Data Security &amp; Retention</h2>
      <p>
        We use strong security protocols to prevent your data from being lost,
        leaked, or accessed without authorization.
      </p>
      <p>
        Access to sensitive legal documents (Lal Purja / Citizenship copies) is
        strictly restricted to employees and agents with a verified business
        need.<br />
        We only retain your data for as long as required by Nepalese financial
        and property laws.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        Under <strong>The Privacy Act, 2075</strong>, you have the right to:
      </p>
      <ul>
        <li>Access your personal data held by us.</li>
        <li>Request corrections to inaccurate information.</li>
        <li>Withdraw your consent at any time.</li>
      </ul>

      <h2>6. Contact Us</h2>
      <p>
        For any questions or data requests, please contact us:
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:estateyetihomes@gmail.com">
          estateyetihomes@gmail.com
        </a>
        <br />
        <strong>CC:</strong>{" "}
        <a href="mailto:privacy@yetihomes.com.np">
          privacy@yetihomes.com.np
        </a>
      </p>
      <p>
        <strong>Phone:</strong> +977 9851446901&nbsp;|&nbsp;+977 9851446902
        <br />
        <strong>Office:</strong> Chuchepati, Chabahil, Kathmandu, Nepal
      </p>
    </LegalLayout>
  );
}
