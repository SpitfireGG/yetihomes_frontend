import type { Metadata } from "next";
import LegalLayout from "@/components/shared/legal-layouts";

export const metadata: Metadata = {
  title: "Disclaimer | Yeti Homes Estate",
  description: "Yeti Homes Estate disclaimer regarding property listings and website information.",
  alternates: {
    canonical: "https://www.yetihomesestate.com.np/legal/disclaimer",
  },
};

export default async function DisclaimerPage() {
  return (
    <LegalLayout
      title="Legal Disclaimer"
      lastUpdated="April 26, 2026"
    >
      <h2>1. General Information</h2>
      <p>
        The information contained on the <strong>Yeti Homes</strong> website is
        for general information purposes only. Yeti Homes assumes no
        responsibility for errors or omissions in the contents of the platform.
      </p>

      <h2>2. Real Estate and Financial Disclaimer</h2>
      <p>
        Purchasing, selling, or investing in real estate carries inherent
        financial risks. The content provided on Yeti Homes, including property
        valuations, mortgage estimates, and market trends, does not constitute
        financial, legal, or professional real estate investment advice.
      </p>
      <ul>
        <li>
          <strong>Calculators and Estimates:</strong> Tools such as our &quot;Upfront
          Cash Calculator&quot; or &quot;Mortgage Calculator&quot; are provided for
          illustrative purposes only. Actual costs, including agency fees,
          government registration taxes, and banking interest rates, will vary.
        </li>
        <li>
          <strong>Independent Counsel:</strong> We highly recommend consulting
          with certified legal professionals and financial advisors in Nepal
          before executing any real estate transactions.
        </li>
      </ul>

      <h2>3. External Links Disclaimer</h2>
      <p>
        The Yeti Homes website may contain links to external websites that are
        not provided or maintained by or in any way affiliated with Yeti Homes
        (such as banking portals, government land registry sites, or third-party
        service providers).
      </p>
      <p>
        Please note that Yeti Homes does not guarantee the accuracy, relevance,
        timeliness, or completeness of any information on these external
        websites.
      </p>

      <h2>4. &quot;As Is&quot; Disclaimer</h2>
      <p>
        All information on the platform is provided &quot;as is&quot;, with no guarantee
        of completeness, accuracy, timeliness or of the results obtained from
        the use of this information, and without warranty of any kind, express
        or implied, including, but not limited to warranties of performance,
        merchantability, and fitness for a particular purpose.
      </p>
    </LegalLayout>
  );
}
