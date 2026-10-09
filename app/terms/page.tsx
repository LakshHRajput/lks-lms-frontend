import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions for using LKS Learning Knowledge Solution educational services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-12 md:py-16">
      {" "}
      <Container>
        {" "}
        <article className="mx-auto max-w-4xl space-y-8">
          {" "}
          <header>
            {" "}
            <p className="text-sm font-medium text-primary">
              LKS - Learning Knowledge Solution{" "}
            </p>{" "}
            <h1 className="mt-3 text-3xl font-bold md:text-4xl">
              Terms & Conditions{" "}
            </h1>{" "}
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: October 9, 2026{" "}
            </p>{" "}
          </header>
          <section>
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              These Terms & Conditions govern your use of the LKS website,
              application and educational services. By using our platform, you
              agree to these terms. If you do not agree, please discontinue
              using the services.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">2. Our Services</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              LKS provides academic learning resources, courses, educational
              videos, notes, tests, progress tracking, admissions and related
              educational services. Offerings may include Classes 6–12,
              programming and digital marketing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              3. Accounts and Registration
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Users must provide accurate registration details and keep account
              credentials secure. Parents or legal guardians should supervise
              the use of the platform by minors where appropriate. Notify LKS if
              you suspect unauthorized access to your account.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">4. Acceptable Use</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Users must not misuse the platform, attempt unauthorized access,
              interfere with its security, upload unlawful content, cheat in
              assessments, or use the services to harm other users.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">5. Educational Content</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Videos, notes, tests, branding, software and other materials may
              be owned by LKS or its respective licensors. Users may access them
              for authorized learning purposes but must not reproduce, resell,
              distribute or commercially exploit them without permission.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">6. Fees and Payments</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Course and service fees will be communicated before purchase.
              Available payment methods may include UPI, bank transfer or
              supported payment gateways. Users should retain payment receipts
              and transaction references for their records.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              7. Refunds and Cancellations
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Refund and cancellation requests are handled according to the
              applicable service terms and our Refund & Cancellation Policy.
            </p>
            <Link
              className="mt-3 inline-block text-primary hover:underline"
              href="/refund-policy"
            >
              Read Refund & Cancellation Policy →
            </Link>
          </section>
          <section>
            <h2 className="text-xl font-semibold">8. Availability</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              We aim to keep our services available, but temporary interruptions
              may occur due to maintenance, connectivity, hosting or technical
              issues. We do not guarantee uninterrupted access at all times.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">9. Account Suspension</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              LKS may restrict or suspend access where reasonably necessary to
              address security risks, fraud, unlawful conduct or material
              violations of these terms, subject to applicable law.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              10. Educational Disclaimer
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Learning outcomes depend on individual effort and other factors.
              LKS does not guarantee specific examination marks, ranks,
              qualifications or employment outcomes unless expressly agreed in
              writing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              11. Changes to These Terms
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              We may update these terms as our services or legal requirements
              change. Updated terms will be published on this page with a
              revised date.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">12. Contact</h2>
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
