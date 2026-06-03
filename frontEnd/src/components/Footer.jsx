import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <SocialLink href="#" icon={<FiGithub />} />
            <SocialLink href="#" icon={<FiLinkedin />} />
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MultiModal AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-gray-500 transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

export default Footer;