import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Light Theme: Clean slate foundation with visible border rules
    <footer className="bg-slate-100 border-t border-slate-300  backdrop-blur-md">
      <div className="max-w-7xl mx-auto pt-12 pb-6 px-6 sm:px-8 lg:px-12">
        
        {/* Main Layout: Evenly spaced grid columns layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left pb-10">
          
          {/* Block 1: General Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-700 tracking-wider">
              NeuroDigest
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
              Transforming raw multimedia and text into clear, actionable summaries with state-of-the-art intelligence.
            </p>
          </div>

          {/* Block 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm font-bold tracking-wide text-slate-700">
              <Link to="/" className="hover:text-cyan-600 transition-all duration-200">
                Home
              </Link>
              <Link to="/about" className="hover:text-teal-600 transition-all duration-200">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-cyan-600 transition-all duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Block 3: Contact Info (Vertical + Social Nodes underneath) */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Contact Info
            </h4>
            
            <div className="flex flex-col space-y-2 text-sm font-bold tracking-wide text-slate-700">
              <Link to="mailto:mohdafzal_MA@outlook.com" className="hover:text-teal-600 transition-colors duration-200">
                mohdafzal_MA@outlook.com
              </Link>
            </div>

            {/* Social Icons clustered neatly below contact entries */}
            <div className="flex space-x-5 pt-1.5">
              <SocialLink to="mailto:mohdafzal_MA@outlook.com" title="Email" hoverColor="hover:text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
              </SocialLink>

              <SocialLink to="https://github.com/sMv-Jones" title="GitHub" hoverColor="hover:text-cyan-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
              </SocialLink>

              <SocialLink to="https://www.linkedin.com/in/mohd-afzal-web-dev" title="LinkedIn" hoverColor="hover:text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </SocialLink>
            </div>
          </div>

        </div>

        {/* Separated Copyright Block */}
        <div className="pt-6 border-t border-slate-300 text-center">
          <p className="text-slate-500 text-xs tracking-wider font-mono font-medium">
            &copy; {currentYear} NeuroDigest. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

const SocialLink = ({ to, children, title, hoverColor }) => (
  <a
    href={to}
    title={title}
    className={`text-slate-400 ${hoverColor} transition-all duration-300 transform hover:scale-110 active:scale-95`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default Footer;  