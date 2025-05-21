import { useState } from 'react';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import { getIcon } from '../utils/iconUtils';

// Icons for categories
const TvIcon = getIcon('tv');
const UserIcon = getIcon('users');
const MagicWandIcon = getIcon('wand');

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Fade in animation for page
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };
  
  // Categories for the quiz
  const categories = [
    {
      id: 'friends',
      name: 'Friends',
      color: 'friends',
      icon: UserIcon,
      description: 'Test your knowledge of the iconic sitcom about six friends living in New York City.'
    },
    {
      id: 'modernfamily',
      name: 'Modern Family',
      color: 'modernfamily',
      icon: TvIcon,
      description: 'How well do you know the Pritchett-Dunphy-Tucker clan? Challenge yourself with these questions.'
    },
    {
      id: 'harrypotter',
      name: 'Harry Potter',
      color: 'harrypotter',
      icon: MagicWandIcon,
      description: 'Enter the wizarding world and see if you're as knowledgeable as Hermione Granger!'
    }
  ];
  
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {!selectedCategory ? (
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-900 dark:text-white">
              FanQuiz Frenzy
            </h1>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Test your knowledge with fun trivia quizzes on your favorite TV shows and movies!
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`category-card h-full`}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 + index * 0.1 } 
                }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className={`p-4 rounded-full mb-4 self-start bg-${category.color}/10 text-${category.color}`}>
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 text-${category.color}`}>
                    {category.name}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-300 mb-4 flex-grow">
                    {category.description}
                  </p>
                  <div className={`mt-auto inline-flex items-center justify-center rounded-lg bg-${category.color} text-white py-2 px-4 text-sm font-medium transition-colors`}>
                    Start Quiz
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center px-4 py-6 rounded-2xl bg-surface-100 dark:bg-surface-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-2">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4">
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h4 className="font-medium mb-1">Select a Category</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400">Choose from Friends, Modern Family, or Harry Potter</p>
              </div>
              <div className="p-4">
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h4 className="font-medium mb-1">Answer 10 Questions</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400">Each quiz has 10 multiple-choice questions</p>
              </div>
              <div className="p-4">
                <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h4 className="font-medium mb-1">Get Your Score</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400">See how well you know your favorite shows!</p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <MainFeature 
          category={selectedCategory} 
          onBackToCategories={() => setSelectedCategory(null)} 
        />
      )}
    </motion.div>
  );
};

export default Home;