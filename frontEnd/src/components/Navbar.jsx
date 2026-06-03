import { motion } from 'framer-motion';


const Navbar = () => {
 

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-blue-600"
            >
              MultiModal AI
            </motion.div>
          </div>
          
         
        </div>
      </div>
    </nav>
  );
};



export default Navbar;