import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import codingIllustration from '../assets/codingIllustration.svg';

const Home = () => {
  useEffect(() => {
    document.title = 'Skillify - Improve Your Coding Skills';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Level Up Your Coding Skills with Real Challenges
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Practice with real-world coding challenges, get instant feedback, and track your progress. Join thousands of developers improving their skills daily.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/challenges" className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-center">
                Start Coding
              </Link>
              <Link to="/register" className="btn border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-center">
                Sign Up Free
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.img 
              src={codingIllustration} 
              alt="Coding illustration" 
              className="w-full h-auto rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Skillify?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-World Challenges",
              description: "Practice with challenges inspired by actual coding problems faced in the industry.",
              icon: "💻"
            },
            {
              title: "Instant Feedback",
              description: "Get immediate feedback on your code solutions with detailed explanations.",
              icon: "⚡"
            },
            {
              title: "Track Progress",
              description: "Monitor your improvement over time with detailed statistics and analytics.",
              icon: "📈"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gray-50 rounded-xl my-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Skillify helped me prepare for technical interviews better than any other platform I've tried.",
                author: "Alex Chen, Frontend Developer"
              },
              {
                quote: "The challenges are realistic and the feedback system is incredibly helpful for improving my skills.",
                author: "Sarah Johnson, Full Stack Developer"
              },
              {
                quote: "I've seen measurable improvement in my coding abilities since I started using Skillify regularly.",
                author: "Miguel Rodríguez, Software Engineer"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-medium text-gray-800">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Improve Your Coding Skills?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of developers who are leveling up their coding skills with Skillify's interactive challenges.</p>
        <Link to="/register" className="btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium inline-block">
          Get Started Today
        </Link>
      </section>
    </div>
  );
};

export default Home;