import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt  } from "react-icons/fa";
import Image from "next/image";
import { Container } from "@/components/common/container";

const learningLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund & Cancellation Policy", href: "/refund-policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-muted/40">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="Home" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="Learning Knowledge Solution logo"
                width={52}
                height={52}
                className="h-22 w-22 object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              LKS - Learning Knowledge Solution is an educational learning
              platform focused on academic education, programming and digital
              skills.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Legal</h3>

            <div className="mt-5 flex flex-col gap-3">
              {learningLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>

            <div className="mt-5 space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>+91 9549521541</span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>info@lks.example</span>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>+91 8502800869</span>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Download App</h3>

            <div className="mt-4 space-y-3">
              {/* Google Play Store */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit min-w-48 items-center gap-3 rounded-xl border bg-black px-4 py-2.5 text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0"
                  fill="none"
                >
                  <path
                    d="M3.5 2.8L14 13 3.5 23.2C3.2 22.7 3 22.1 3 21.5V4.5C3 3.9 3.2 3.3 3.5 2.8Z"
                    fill="#00D7FF"
                  />
                  <path
                    d="M14 13L17.2 9.9L5.1 2.9C4.5 2.5 3.9 2.4 3.5 2.8L14 13Z"
                    fill="#00F076"
                  />
                  <path
                    d="M14 13L17.2 16.1L5.1 23.1C4.5 23.5 3.9 23.4 3.5 23.2L14 13Z"
                    fill="#FF3B30"
                  />
                  <path
                    d="M17.2 9.9L20.1 11.6C21.3 12.3 21.3 13.7 20.1 14.4L17.2 16.1L14 13L17.2 9.9Z"
                    fill="#FFD600"
                  />
                </svg>

                <div className="leading-tight">
                  <span className="block text-[10px] uppercase text-gray-300">
                    Get it on
                  </span>
                  <span className="block text-sm font-semibold">
                    Google Play
                  </span>
                </div>
              </Link>

              {/* Windows Download */}
              <Link
                href="#"
                download
                className="flex w-fit min-w-48 items-center gap-3 rounded-xl border bg-background px-4 py-2.5 text-foreground transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0 text-blue-600"
                  fill="currentColor"
                >
                  <path d="M3 5.5L10.5 4.45V11.5H3V5.5ZM11.5 4.3L21 3V11.5H11.5V4.3ZM3 12.5H10.5V19.55L3 18.5V12.5ZM11.5 12.5H21V21L11.5 19.7V12.5Z" />
                </svg>

                <div className="leading-tight">
                  <span className="block text-[10px] text-muted-foreground">
                    Download for
                  </span>
                  <span className="block text-sm font-semibold">Windows</span>
                </div>
              </Link>
            </div>

            {/* Follow Us */}
            <h3 className="mt-7 font-semibold">Follow Us</h3>

            <div className="mt-4 flex gap-3">
              <Link
                href="#"
                className="rounded-full border p-2 transition-colors hover:bg-background"
                aria-label="Facebook"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-2 transition-colors hover:bg-background"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-2 transition-colors hover:bg-background"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-2 transition-colors hover:bg-background"
                aria-label="YouTube"
              >
                <FaYoutube className="h-4 w-4" />
              </Link>
               <Link
                href="https://www.google.com/maps/place/LKS+DIGITAL+HUB/@26.9358766,75.7205246,17z/data=!3m1!4b1!4m6!3m5!1s0x66e1fc84946ee73:0x4c6c04725958012f!8m2!3d26.9358718!4d75.7230995!16s%2Fg%2F11n3vdksng?entry=ttu&g_ep=EgoyMDI2MTAwNS4wIKXMDSoASAFQAw%3D%3D"
                className="rounded-full border p-2 transition-colors hover:bg-background"
                aria-label="Map"
              >
                <FaMapMarkerAlt className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-300 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} LKS - Learning Knowledge Solution. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
