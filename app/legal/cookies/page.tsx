import LegalLayout from "@/components/shared/legal-layouts";

export const metadata = {
  title: "Cookie Policy | YetiHomes",
  description: "YetiHomes Cookie Policy - How we use cookies and tracking technologies.",
};

export default async function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      lastUpdated="April 26, 2026"
    >
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile
        device when you visit a website. They are widely used in order to make
        websites work, or work more efficiently, as well as to provide
        information to the owners of the site.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        Yeti Homes uses cookies to understand how you use our platform and to
        improve your experience. This includes:
      </p>
      <ul>
        <li>Keeping you signed in to your Yeti Homes account.</li>
        <li>
          Remembering your property search preferences (e.g., preferred
          locations like Lalitpur or Pokhara, price ranges in NPR).
        </li>
        <li>
          Understanding how you interact with our 3D virtual tours and image
          galleries to improve performance.
        </li>
      </ul>

      <h2>3. Types of Cookies We Use</h2>
      <p>
        <strong>Essential Cookies:</strong> These are cookies that are required
        for the operation of our website. They include, for example, cookies
        that enable you to log into secure areas of our website.
      </p>
      <p>
        <strong>Analytical/Performance Cookies:</strong> They allow us to
        recognise and count the number of visitors and to see how visitors move
        around our website when they are using it.
      </p>

      <h2>4. Managing Your Cookie Preferences</h2>
      <p>
        You can set your browser to refuse all or some browser cookies, or to
        alert you when websites set or access cookies. If you disable or refuse
        cookies, please note that some parts of the Yeti Homes platform may
        become inaccessible or not function properly.
      </p>
    </LegalLayout>
  );
}
