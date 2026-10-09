import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Review the refund and cancellation process for LKS courses and educational services.",
};

export default function RefundPolicyPage() {
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
              Refund & Cancellation Policy{" "}
            </h1>{" "}
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: October 9, 2026{" "}
            </p>{" "}
          </header>
          <section>
            <h2 className="text-xl font-semibold">1. Scope</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              This policy explains how cancellation and refund requests may be
              handled for paid courses, digital learning resources, admissions
              and other services offered by LKS.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">2. Before Purchasing</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Please review the course description, fees, access duration and
              any specific refund conditions displayed during purchase or
              registration. Any course-specific terms should be communicated
              clearly before payment.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">3. Cancellation Requests</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Cancellation eligibility may depend on the service purchased, the
              time of the request, whether the course has started, and whether
              digital content has been accessed. Contact LKS as soon as possible
              if you wish to cancel.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">4. Refund Eligibility</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Requests may be considered for duplicate payments, verified failed
              transactions, services not provided as agreed, or other
              circumstances covered by the applicable purchase terms or law.
              Refund eligibility will be assessed individually.
            </p>
            <p className="mt-3 leading-7 text-muted-foreground">
              Refunds are not automatic and may be subject to the disclosed
              terms of the relevant course or service. Nothing in this policy
              excludes rights that cannot lawfully be excluded.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              5. Digital Courses and Content
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Because online courses, videos, notes and other digital materials
              may be accessible immediately after purchase, special cancellation
              conditions may apply. Any restriction on refunds must be disclosed
              before purchase and must comply with applicable law.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              6. Duplicate or Failed Payments
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              If you are charged more than once for the same purchase, contact
              us with your transaction references. If a payment fails but money
              is debited, the bank or payment provider may reverse it
              automatically. If the amount is not returned within the
              provider&apos;s stated timeline, contact your bank or payment
              provider and notify LKS.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              7. Processing Approved Refunds
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Once a refund is approved, it will be initiated through the
              appropriate payment method where possible. The time taken for
              funds to appear depends on the bank or payment provider. We will
              communicate any additional verification requirements.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              8. How to Request a Refund
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Contact LKS and provide your name, registered contact details,
              course or service name, payment date, transaction reference and
              reason for the request. Do not send passwords, card PINs or CVVs.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              9. Admission and Registration Fees
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Admission and registration fees may have separate conditions. The
              applicable cancellation and refund terms should be provided before
              payment. Requests will be assessed against those disclosed terms
              and applicable law.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">
              10. Contact for Refund Requests
            </h2>
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
