import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#43ffdd1a] to-[#15383c2a] blur-2xl animate-pulse opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#43ffdd] to-[#15383c] drop-shadow-2xl">
          404
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <Button
            onClick={() => navigate("/")}
            className="text-lg px-6 py-3 rounded-2xl bg-[#43ffdd] text-black hover:bg-[#2be2c7] transition-all"
          >
            Go Home
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating shapes */}
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#43ffdd44] rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute bottom-1/2 right-1/2 w-24 h-24 bg-[#15383c55] rounded-full blur-2xl animate-ping"></div>
    </div>
  );
};

export default NotFoundPage;
