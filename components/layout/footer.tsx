import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin , FaYoutube  } from "react-icons/fa";
import Image from "next/image";
import { Container } from "@/components/common/container";


const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Classes", href: "/classes" },
  { label: "Teachers", href: "/teachers" },
  { label: "Results", href: "/results" },
];

const learningLinks = [
  { label: "Programming", href: "/courses/programming" },
  { label: "Web Development", href: "/courses/web-development" },
  { label: "Digital Marketing", href: "/courses/digital-marketing" },
  { label: "Class 11 PCM", href: "/courses/class-11-pcm" },
  { label: "Class 12 PCM", href: "/courses/class-12-pcm" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="Home" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="Learning Knowledge Solution logo"
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              LKS - Learning Knowledge Solution is an educational learning
              platform focused on academic education, programming and digital
              skills.
            </p>

            <div className="mt-5 flex gap-3">
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
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((item) => (
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
            <h3 className="font-semibold">Learning</h3>

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
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Jaipur, Rajasthan, India</span>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>info@lks.example</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} LKS - Learning Knowledge Solution. All
            rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>

            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
