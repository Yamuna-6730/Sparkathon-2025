import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, List, Package, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 border border-blue-200">
              <Sparkles className="w-4 h-4 mr-2" />
              The Future of Shopping is Here
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shop physically,
            </span>
            <br />
            <span className="text-gray-800">check out digitally,</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              and walk out—
            </span>
            <br />
            <span className="text-gray-800">your bag follows you home.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the revolutionary phygital shopping platform that merges
            the offline shopping experience with online intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/smart-list">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                <List className="w-5 h-5 mr-2" />
                Create Smart List
              </Button>
            </Link>
            
            <Link href="/start-shopping">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
            
            <Link href="/orders">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                <Package className="w-5 h-5 mr-2" />
                View My Orders
              </Button>
            </Link>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Physical Shopping */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Shop In-Store
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Browse and collect items with gamified navigation
                  </p>
                </div>

                {/* Digital Checkout */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Digital Checkout
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Scan, pay, and verify with blockchain receipts
                  </p>
                </div>

                {/* Home Delivery */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Walk Out Free
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your items follow you home automatically
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}