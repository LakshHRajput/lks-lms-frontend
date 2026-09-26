import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { ClassesSection } from "@/components/home/classes-section";
import { CoursesSection } from "@/components/home/courses-section";
import { WhyLks } from "@/components/home/why-lks";
import { OnlineLearning } from "@/components/home/online-learning";
import { TestSeries } from "@/components/home/test-series";
import { ProgressSection } from "@/components/home/progress-section";
import { TeachersSection } from "@/components/home/teachers-section";
import { Testimonials } from "@/components/home/testimonials";
import { AdmissionCta } from "@/components/home/admission-cta";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Stats />

      <ClassesSection />

      <CoursesSection />

      <WhyLks />

      <OnlineLearning />

      <TestSeries />

      <ProgressSection />

      <TeachersSection />

      <Testimonials />

      <AdmissionCta />

      <ContactSection />
    </>
  );
}
