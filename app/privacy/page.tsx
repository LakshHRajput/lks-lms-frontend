import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
title: "Privacy Policy",
description:
"Learn how LKS Learning Knowledge Solution collects, uses and protects personal information.",
};

export default function PrivacyPolicyPage() {
return ( <main className="min-h-screen py-12 md:py-16"> <Container> <article className="mx-auto max-w-4xl space-y-8"> <header> <p className="text-sm font-medium text-primary">
LKS - Learning Knowledge Solution </p> <h1 className="mt-3 text-3xl font-bold md:text-4xl">
Privacy Policy </h1> <p className="mt-3 text-sm text-muted-foreground">
Last updated: October 9, 2026 </p> </header>


      <section>
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          This policy explains how LKS may collect, use, store and share
          information when you use our website, application and
          educational services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Information We Collect</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Depending on the services used, information may include names,
          email addresses, phone numbers, student and parent details,
          admission records, class and course details, attendance,
          assessments, progress reports, transaction references and
          technical usage data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. How We Use Information</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
          <li>Create and manage accounts.</li>
          <li>Provide courses and educational content.</li>
          <li>Manage admissions, attendance, tests and progress.</li>
          <li>Record and reconcile fees and payments.</li>
          <li>Respond to support requests and important enquiries.</li>
          <li>Protect platform security and prevent misuse.</li>
          <li>Improve our services and meet legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Students and Minors</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Our services may be used by school-age students. We aim to
          handle student information responsibly and will seek parent
          or guardian involvement or consent where required by applicable
          law. Parents or guardians can contact us regarding a student&apos;s
          information.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Payments</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Payments may be processed by banks, UPI providers or third-party
          payment gateways. Those providers may collect and process
          payment information under their own policies. LKS should not
          collect or store card PINs or CVVs in its own systems.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">6. Cookies and Storage</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Our website may use cookies, local storage or similar
          technologies for login sessions, preferences, security and
          service functionality. You can manage cookies through your
          browser settings, although some features may not work correctly
          if they are disabled.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">7. Sharing Information</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          We may share relevant information with authorized staff,
          hosting providers, technical service providers, payment
          processors or public authorities where necessary to provide
          services, comply with law or protect users and the platform.
          We do not sell personal information as a normal business
          practice.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">8. Security and Retention</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          We use reasonable safeguards to protect information. No
          internet-based system can guarantee absolute security.
          Information may be retained as necessary for service delivery,
          academic records, accounting, dispute resolution and legal
          obligations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">9. Your Choices and Requests</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Subject to applicable law, users may request access to,
          correction of or deletion of personal information. We may need
          to verify identity and retain certain records where legally
          required.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">10. Third-Party Services</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          External websites and payment services have their own privacy
          policies. Please review those policies before providing
          information directly to a third party.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">11. Policy Updates</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          We may update this policy as our services and legal
          requirements change. The latest version will appear on this
          page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">12. Contact Us</h2>
        <div className="mt-3 rounded-xl border bg-muted/30 p-5 leading-7">
          <p className="font-semibold">LKS - Learning Knowledge Solution</p>
          <p>Jaipur, Rajasthan, India</p>
          <p>Phone: +91 9549521541</p>
          <p>Alternate phone: +91 8502800869</p>
          <p>Support email: support@lks.com</p>
        </div>
      </section>

      <Link href="/" className="inline-block text-primary hover:underline">
        ← Back to Home
      </Link>
    </article>
  </Container>
</main>
);
}
