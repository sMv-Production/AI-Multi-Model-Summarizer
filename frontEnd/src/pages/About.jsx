import { motion } from 'framer-motion';
import { FiCpu, FiLayers, FiShield, FiSliders } from 'react-icons/fi';

const About = () => {
  const coreFeatures = [
    {
      icon: FiCpu,
      title: "Advanced OCR & Extraction",
      desc: "Automatically extracts text content from PDFs, high-resolution images, and raw plain text layouts seamlessly.",
      color: "text-teal-600 bg-teal-50"
    },
    {
      icon: FiLayers,
      title: "Multimodal Processing",
      desc: "Goes beyond simple text inputs by accepting audio tracks and video layouts to fetch linguistic layers.",
      color: "text-cyan-600 bg-cyan-50"
    },
    {
      icon: FiSliders,
      title: "Asynchronous Queueing",
      desc: "Utilizes polling pipeline architectures to monitor complex summary generation tasks safely without interface blockages.",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: FiShield,
      title: "Clean Context Filtering",
      desc: "Optimizes raw input content to compress word counts into core, actionable takeaways without losing critical context.",
      color: "text-rose-600 bg-rose-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 antialiased flex flex-col justify-between">
      <main className="flex-grow container mx-auto max-w-4xl px-6 py-12 space-y-12">
        
        {/* Intro Hero Section - Rewritten to be conversational */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent tracking-wider">
            About NeuroDigest
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            An intelligent, all-in-one assistant built to turn long, messy mix of files, audio, and videos into clear, bite-sized summaries.
          </p>
        </motion.div>

        {/* Core Architecture Matrix */}
        <div className="grid gap-6 sm:grid-cols-2">
          {coreFeatures.map(({ icon: Icon, title, desc, color }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-300 shadow-sm flex flex-col gap-3 text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 ${color}`}>
                <Icon className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-wide">{title}</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Project Vision Banner - Streamlined to eliminate jargon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-50 border border-slate-300 rounded-2xl p-6 shadow-inner text-center space-y-2"
        >
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">The Goal</h4>
          <p className="text-sm font-semibold text-slate-700 leading-relaxed max-w-xl mx-auto">
            We live in a world of information overload. This project was made to save you time by stripping away the noise from long documents and recordings, getting you straight to the points that actually matter.
          </p>
        </motion.div>

      </main>
    </div>
  );
};

export default About;