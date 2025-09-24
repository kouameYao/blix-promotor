import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const socialData = [
  {
    title: 'Facebook',
    icon: <Facebook className="h-auto w-4" />,
    link: 'https://facebook.com'
  },
  {
    title: 'Twitter',
    icon: <Twitter className="h-auto w-4" />,
    link: 'https://twitter.com'
  },
  {
    title: 'Instagram',
    icon: <Instagram className="h-auto w-4" />,
    link: 'https://instagram.com'
  },
  {
    title: 'Youtube',
    icon: <Youtube className="h-auto w-4" />,
    link: 'https://youtube.com'
  }
];

export function SocialIcons() {
  return (
    <div className="mt-8 flex items-center justify-center gap-6 py-6 md:mt-10 lg:mt-0 xl:py-8">
      {socialData.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          rel="noreferrer norefferer"
          target="_blank"
          className="social-btn-shadow inline-block rounded-full bg-white p-3 text-gray-500 transition-all duration-300 hover:text-gray-1000 dark:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-1000"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
