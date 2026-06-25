import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';

const Contact = () => {

  const fullName = "Mohd Afzal";
  const contactLinks = [
    {
      name: "Drop an Email",
      value: "mohdafzal_MA@outlook.com",
      href: "mailto:mohdafzal_MA@outlook.com",
      icon: FiMail,
      color: "hover:border-teal-500 hover:text-teal-700",
      accent: "text-teal-600 bg-teal-50"
    },
    {
      name: "Check out my GitHub",
      value: "github.com/sMv-Jones",
      href: "https://github.com/sMv-Jones",
      icon: FiGithub,
      color: "hover:border-cyan-500 hover:text-cyan-700",
      accent: "text-cyan-600 bg-cyan-50"
    },
    {
      name: "Let's connect on LinkedIn",
      value: "linkedin.com/in/mohd-afzal-web-dev",
      href: "https://www.linkedin.com/in/mohd-afzal-web-dev",
      icon: FiLinkedin,
      color: "hover:border-indigo-500 hover:text-indigo-700",
      accent: "text-indigo-600 bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 antialiased flex flex-col justify-between">
      <main className="flex-grow container mx-auto max-w-2xl px-6 py-12 space-y-10">

        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Say Hello
          </span>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent tracking-wider pt-2">
            {fullName}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
            Have a question about the project, want to talk about API setups, or just want to chat about AI? Feel free to reach out below!
          </p>
        </motion.div>

        {/* Action Direct Nodes */}
        <div className="space-y-4">
          {contactLinks.map(({ name, value, href, icon: Icon, color, accent }, idx) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`group flex items-center justify-between p-4 bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md ${color}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200/80 ${accent}`}>
                  <Icon className="text-lg" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{name}</h4>
                  <p className="text-sm font-bold tracking-wide text-slate-700 group-hover:text-inherit transition-colors duration-200">
                    {value}
                  </p>
                </div>
              </div>
              <FiArrowUpRight className="text-slate-400 group-hover:text-inherit transition-colors text-lg opacity-60 group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>

        {/* Floating Core Metadata Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500"
        >
        </motion.div>

      </main>
    </div>
  );
};

export default Contact;