import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const footerLinks = {
    product: [
        { label: "Features", href: "#features" },
        { label: "Marketplace", href: "#marketplace" },
        { label: "Clubs", href: "/clubs" },
        { label: "Rides", href: "/rides" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
    ],
    legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
    ],
    social: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Twitter", href: "https://twitter.com" },
        { label: "YouTube", href: "https://youtube.com" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image
                                src="/motorbike.png"
                                alt="Zoomies"
                                width={40}
                                height={40}
                                className="w-10 h-10"
                            />
                            <span className="text-xl font-bold">Zoomies</span>
                        </Link>
                        <p className="text-white/60 max-w-xs mb-6">
                            A social platform for bikers where you discover clubs through people
                            and participate in organized rides like clan wars.
                        </p>
                        <div className="flex gap-4">
                            {footerLinks.social.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="bg-white/10 mb-8" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
                    <p>© 2026 Zoomies. All rights reserved.</p>
                    <p>Made with 🧡 for the motorcycle community</p>
                </div>
            </div>
        </footer>
    );
}
