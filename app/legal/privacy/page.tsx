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
  title: "Privacy Policy | YetiHomes",
  description: "YetiHomes Privacy Policy - How we handle and protect your personal data.",
};

export default async function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="April 26, 2026"
    >
      <h2>1. Introduction</h2>
      <p>
        At <strong>Yeti Homes</strong>, we respect your privacy and are
        committed to protecting your personal data. This privacy policy will
        inform you as to how we look after your personal data when you visit our
        website (regardless of where you visit it from) and tell you about your
        privacy rights and how the law protects you, in compliance with the
        privacy laws of Nepal.
      </p>

      <h2>2. The Data We Collect About You</h2>
      <p>
        Personal data, or personal information, means any information about an
        individual from which that person can be identified. We may collect,
        use, store and transfer different kinds of personal data about you which
        we have grouped together follows:
      </p>
      <ul>
        <li>
          <strong>Identity Data:</strong> includes first name, last name,
          username or similar identifier, marital status, title, date of birth
          and gender.
        </li>
        <li>
          <strong>Contact Data:</strong> includes billing address, delivery
          address (within Kathmandu Valley or elsewhere in Nepal), email address
          and telephone numbers.
        </li>
        <li>
          <strong>Property Verification Data:</strong> documentation required
          for standard real estate transactions in Nepal, including copies of
          Citizenship Certificates and Lal Purja (Land Ownership Certificates)
          when facilitating a direct purchase.
        </li>
        <li>
          <strong>Technical Data:</strong> includes internet protocol (IP)
          address, your login data, browser type and version, time zone setting
          and location.
        </li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>
        We will only use your personal data when the law allows us to. Most
        commonly, we will use your personal data in the following circumstances:
      </p>
      <ul>
        <li>
          Where we need to perform the contract we are about to enter into or
          have entered into with you (e.g., booking a property viewing or
          processing an earnest money deposit).
        </li>
        <li>
          Where it is necessary for our legitimate interests (or those of a
          third party) and your interests and fundamental rights do not override
          those interests.
        </li>
        <li>
          Where we need to comply with a legal or regulatory obligation under
          the laws of Nepal.
        </li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We have put in place appropriate security measures to prevent your
        personal data from being accidentally lost, used or accessed in an
        unauthorised way, altered or disclosed. In addition, we limit access to
        your personal data to those employees, agents, contractors and other
        third parties who have a business need to know.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about this privacy policy or our privacy
        practices, please contact our data privacy manager in the following
        ways:
      </p>
      <p>
        Email address: privacy@yetihomes.com.np
        <br />
        Postal address: Baluwatar, Kathmandu, Nepal
      </p>
    </LegalLayout>
  );
}
