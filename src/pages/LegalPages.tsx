import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui/Sections';
import { site } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';

function LegalLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title}>
        Last updated: {site.legalUpdated}
      </PageHero>
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <article className="prose-legal">{children}</article>
        </div>
      </section>
    </>
  );
}

export function ContactLine() {
  return site.contact.email ? (
    <>
      by email at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or through our{' '}
      <Link to="/contact">Contact page</Link>
    </>
  ) : (
    <>
      through our <Link to="/contact">Contact page</Link>
    </>
  );
}

const governingLaw = site.jurisdiction
  ? `the laws of the Province of ${site.jurisdiction} and the federal laws of Canada applicable therein`
  : 'the laws of the Canadian province in which WeWin Consulting Group operates and the federal laws of Canada applicable therein';

export function PrivacyPage() {
  usePageMeta('Privacy Policy', `How ${site.name} collects, uses and protects personal information.`, '/privacy');
  return (
    <LegalLayout eyebrow="Legal" title="Privacy Policy">
      <p>
        {site.name} ("WeWin", "we", "us") respects your privacy. This policy explains how we collect, use, disclose and
        protect personal information in accordance with Canada's <em>Personal Information Protection and Electronic Documents
        Act</em> (PIPEDA) and applicable provincial privacy laws.
      </p>

      <h2>Information we collect</h2>
      <p>We collect only the information needed to respond to you and provide our services, including:</p>
      <ul>
        <li>Contact details you provide, such as your name, email address and phone number.</li>
        <li>
          Information about your inquiry, such as whether you are an individual or business client, the service you are
          interested in, a description of your needs, and your preferred contact method and time.
        </li>
        <li>
          For business funding inquiries: your business name and type, stage of operation, general financing purpose,
          requested funding range, estimated revenue and a general description of your credit profile.
        </li>
        <li>
          Basic technical information automatically recorded by our website hosting provider, such as IP address, browser
          type and pages requested, used to operate and secure the website.
        </li>
      </ul>
      <p>
        Our website forms are not designed to collect highly sensitive information. Please do not submit Social Insurance
        Numbers, government identification, banking credentials, account numbers or full credit reports through our website.
        If such information is required to provide a service, we will obtain your express consent and arrange a secure method
        of collection.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your inquiry and arrange a consultation.</li>
        <li>To understand your circumstances and provide the consulting services you request.</li>
        <li>To refer you to appropriate third-party professionals, with your consent.</li>
        <li>To maintain records, operate and secure our website, and meet legal and regulatory obligations.</li>
      </ul>
      <p>We do not sell or rent personal information.</p>

      <h2>Consent</h2>
      <p>
        By submitting a form, you consent to our collecting and using your information to contact you about your inquiry. We
        will seek additional consent before collecting more sensitive information or sharing your information with a third
        party for a referral. You may withdraw your consent at any time, subject to legal or contractual restrictions, by
        contacting us.
      </p>

      <h2>How we share information</h2>
      <ul>
        <li>
          <strong>Service providers.</strong> We use trusted providers to host our website and to deliver website inquiries
          securely to our team (including a secure messaging service). These providers process information on our behalf and
          may store or process it outside Canada, in which case it may be subject to the laws of those jurisdictions.
        </li>
        <li>
          <strong>Professionals and partners.</strong> With your consent, we may share relevant information with lenders,
          licensed insurance agents, accountants, lawyers, licensed insolvency trustees or other professionals to whom you
          ask to be referred.
        </li>
        <li>
          <strong>Legal requirements.</strong> We may disclose information where required or permitted by law.
        </li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not currently use advertising or analytics cookies. If that changes, we will update this policy
        and, where required, request your consent.
      </p>

      <h2>Retention and safeguards</h2>
      <p>
        We keep personal information only as long as needed for the purposes described above or as required by law, and then
        securely delete or anonymize it. We use reasonable administrative, technical and physical safeguards, including
        encrypted (HTTPS) connections, to protect personal information against loss, theft and unauthorized access.
      </p>

      <h2>Access, correction and complaints</h2>
      <p>
        You may request access to, or correction of, the personal information we hold about you by contacting us{' '}
        <ContactLine />. If you have concerns about how we handle your information, please contact us first. You may also
        contact the Office of the Privacy Commissioner of Canada.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The "last updated" date above shows when it was most recently revised.</p>
    </LegalLayout>
  );
}

export function TermsPage() {
  usePageMeta('Terms of Service', `Terms governing the use of the ${site.name} website.`, '/terms');
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Service">
      <p>
        These terms govern your use of this website, operated by {site.name}. By using the website, you agree to these
        terms.
      </p>

      <h2>Information only — not advice</h2>
      <p>
        Content on this website is for general information and educational purposes. It is not legal, tax, accounting,
        investment, insurance, actuarial or insolvency advice, and it should not be relied on as a substitute for advice
        tailored to your circumstances by an appropriately qualified professional.
      </p>

      <h2>No client relationship</h2>
      <p>
        Using this website or submitting a form does not create a client relationship. Any engagement for paid services is
        governed by a separate written service agreement, which sets out the scope of services, fees, payment arrangements and
        any cancellation or refund terms.
      </p>

      <h2>No guarantees</h2>
      <p>
        We do not guarantee any particular outcome, including financing or grant approval, debt settlement or resolution,
        credit score changes, removal of credit information, insurance approval, tax savings or investment returns. Outcomes
        depend on individual circumstances and on decisions made by third parties.
      </p>

      <h2>Third-party professionals and websites</h2>
      <p>
        Where we refer you to lenders, licensed insurance agents or other professionals, their services are provided under their own
        terms and are their responsibility. Links to third-party websites are provided for convenience; we are not
        responsible for their content or practices.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse the website, including by submitting false information, attempting to disrupt its operation
        or attempting to gain unauthorized access to any system.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The website's content, design, logo and trademarks belong to {site.name} or its licensors and may not be reproduced
        without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {site.name} is not liable for any loss or damage arising from your use of, or
        reliance on, this website or its content.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by {governingLaw}.</p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the website after changes are posted constitutes
        acceptance of the updated terms. Questions about these terms can be sent to us <ContactLine />.
      </p>
    </LegalLayout>
  );
}
