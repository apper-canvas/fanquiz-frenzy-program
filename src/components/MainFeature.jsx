import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

// Import required icons
const ArrowLeftIcon = getIcon('arrow-left');
const CheckCircleIcon = getIcon('check-circle');
const XCircleIcon = getIcon('x-circle');
const SmileIcon = getIcon('smile');
const FrownIcon = getIcon('frown');
const TrophyIcon = getIcon('trophy');
const RefreshCwIcon = getIcon('refresh-cw');

// Quiz questions data for each category
const quizData = {
  friends: [
    {
      question: "What is the name of Phoebe's twin sister?",
      options: ["Ursula", "Regina", "Valerie", "Christina"],
      correctAnswer: 0
    },
    {
      question: "Which character says the iconic line 'We were on a break!'?",
      options: ["Chandler", "Ross", "Joey", "Monica"],
      correctAnswer: 1
    },
    {
      question: "What is Joey's catchphrase?",
      options: ["I'll be there for you", "How you doin'?", "Oh my god!", "Could I BE any more...?"],
      correctAnswer: 1
    },
    {
      question: "What is the name of Ross and Monica's dog when they were growing up?",
      options: ["Rex", "Marcel", "Chi-Chi", "Cujo"],
      correctAnswer: 2
    },
    {
      question: "What does Ross dress up as to scare Phoebe and Rachel?",
      options: ["A zombie", "A vampire", "A ghost", "Spud-nik"],
      correctAnswer: 3
    },
    {
      question: "What was Monica's nickname when she was a field hockey goalie?",
      options: ["Big Mon", "Mon the Bomb", "The Terminator", "Big Fat Goalie"],
      correctAnswer: 2
    },
    {
      question: "What job did Rachel get after quitting Central Perk?",
      options: ["Fashion Designer", "Buyer at Bloomingdale's", "Assistant at Ralph Lauren", "Receptionist at a Fashion Magazine"],
      correctAnswer: 1
    },
    {
      question: "What's Chandler's middle name?",
      options: ["Muriel", "Charles", "Thomas", "Francis"],
      correctAnswer: 0
    },
    {
      question: "What's the name of the coffee house where the friends hang out?",
      options: ["Central Joe", "Central Cafe", "Central Coffee", "Central Perk"],
      correctAnswer: 3
    },
    {
      question: "Which country does Chandler tell Janice he's moving to?",
      options: ["Mexico", "Canada", "Yemen", "England"],
      correctAnswer: 2
    }
  ],
  modernfamily: [
    {
      question: "What is Phil Dunphy's profession?",
      options: ["Lawyer", "Doctor", "Real Estate Agent", "Teacher"],
      correctAnswer: 2
    },
    {
      question: "Which character is Jay Pritchett's second wife?",
      options: ["Gloria", "Claire", "Dede", "Cameron"],
      correctAnswer: 0
    },
    {
      question: "What is the name of Mitchell and Cameron's adopted daughter?",
      options: ["Alex", "Haley", "Lily", "Poppy"],
      correctAnswer: 2
    },
    {
      question: "Which one of these is NOT one of Claire and Phil's children?",
      options: ["Alex", "Luke", "Haley", "Dylan"],
      correctAnswer: 3
    },
    {
      question: "What is the name of Gloria's son from her first marriage?",
      options: ["Joe", "Manny", "Reuben", "Carlos"],
      correctAnswer: 1
    },
    {
      question: "What is the name of Phil and Claire's family dog?",
      options: ["Stella", "Larry", "Pepper", "Spot"],
      correctAnswer: 0
    },
    {
      question: "What is the name of the company that Jay owns?",
      options: ["Pritchett Closets", "Pritchett's Closets & Blinds", "Closet Empire", "Closet Factory"],
      correctAnswer: 1
    },
    {
      question: "What subject does Alex Dunphy tutor her 'enemy' in?",
      options: ["Math", "Chemistry", "History", "Spanish"],
      correctAnswer: 3
    },
    {
      question: "What is the name of Mitchell and Cam's second adopted child?",
      options: ["Rexford", "Larry", "Joe", "There is no second child"],
      correctAnswer: 0
    },
    {
      question: "What is Haley's twin babies' names?",
      options: ["George and Martha", "Poppy and George", "Joe and Lily", "Poppy and Rex"],
      correctAnswer: 1
    }
  ],
  harrypotter: [
    {
      question: "What house was Harry Potter sorted into?",
      options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
      correctAnswer: 0
    },
    {
      question: "What is the core of Harry Potter's wand?",
      options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Veela Hair"],
      correctAnswer: 2
    },
    {
      question: "What position does Harry play in Quidditch?",
      options: ["Chaser", "Beater", "Keeper", "Seeker"],
      correctAnswer: 3
    },
    {
      question: "Who was the Half-Blood Prince?",
      options: ["Voldemort", "Snape", "Harry", "Dumbledore"],
      correctAnswer: 1
    },
    {
      question: "What is the name of Harry Potter's owl?",
      options: ["Errol", "Hedwig", "Pigwidgeon", "Crookshanks"],
      correctAnswer: 1
    },
    {
      question: "Which of these is NOT a Deathly Hallow?",
      options: ["Elder Wand", "Resurrection Stone", "Cloak of Invisibility", "Sword of Gryffindor"],
      correctAnswer: 3
    },
    {
      question: "How many horcruxes did Voldemort create?",
      options: ["6", "7", "8", "5"],
      correctAnswer: 1
    },
    {
      question: "Who kills Dobby?",
      options: ["Voldemort", "Bellatrix Lestrange", "Lucius Malfoy", "Draco Malfoy"],
      correctAnswer: 1
    },
    {
      question: "What spell is used to disarm an opponent?",
      options: ["Stupefy", "Expelliarmus", "Impedimenta", "Petrificus Totalus"],
      correctAnswer: 1
    },
    {
      question: "What does the spell 'Obliviate' do?",
      options: ["Makes objects fly", "Makes the target sleep", "Destroys objects", "Erases memories"],
      correctAnswer: 3
    }
  ]
};

const MainFeature = ({ category, onBackToCategories }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const questions = quizData[category.id];
  
  // Reset the quiz state when category changes
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setShowAnswer(false);
  }, [category]);
  
  const handleOptionSelect = (optionIndex) => {
    if (showAnswer) return; // Prevent selecting another option after answer is shown
    
    setSelectedOption(optionIndex);
    setShowAnswer(true);
    
    const correct = optionIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
      toast.success('Correct answer!', {
        icon: '🎉',
        position: "top-center",
        autoClose: 1500,
      });
    } else {
      toast.error('Wrong answer!', {
        icon: '😕',
        position: "top-center",
        autoClose: 1500,
      });
    }
    
    // Move to next question or end quiz after a delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setShowAnswer(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: -50, opacity: 0, transition: { duration: 0.3 } }
  };
  
  // Calculate recommendation based on score
  const getRecommendation = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 80) {
      return {
        title: "Quiz Master!",
        message: `Amazing! You're a true ${category.name} fan!`,
        icon: TrophyIcon,
        iconColor: "text-yellow-500"
      };
    } else if (percentage >= 60) {
      return {
        title: "Great Job!",
        message: `You know ${category.name} pretty well!`,
        icon: SmileIcon,
        iconColor: "text-green-500"
      };
    } else if (percentage >= 40) {
      return {
        title: "Not Bad!",
        message: `You've got some ${category.name} knowledge, but there's room for improvement.`,
        icon: SmileIcon,
        iconColor: "text-blue-500"
      };
    } else {
      return {
        title: "Time to Binge Watch!",
        message: `Looks like you need to watch more ${category.name}!`,
        icon: FrownIcon,
        iconColor: "text-purple-500"
      };
    }
  };
  
  const recommendation = getRecommendation();
  
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="mb-8 flex items-center">
        <button 
          onClick={onBackToCategories}
          className="flex items-center text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Back to Categories</span>
        </button>
        
        <div className="ml-auto flex items-center">
          <div className={`h-3 w-3 rounded-full mr-2 ${!quizCompleted ? 'bg-green-500 animate-pulse' : 'bg-secondary'}`}></div>
          <span className={`text-sm font-medium ${!quizCompleted ? 'text-green-600 dark:text-green-400' : 'text-secondary'}`}>
            {!quizCompleted ? 'Quiz in progress' : 'Quiz completed'}
          </span>
        </div>
      </div>
      
      <div className={`py-3 px-4 rounded-lg mb-4 bg-${category.color}/10`}>
        <div className="flex items-center">
          <category.icon className={`h-5 w-5 mr-2 text-${category.color}`} />
          <h2 className={`text-lg font-medium text-${category.color}`}>{category.name} Quiz</h2>
          {!quizCompleted && (
            <div className="ml-auto text-sm font-medium bg-surface-200 dark:bg-surface-700 py-1 px-3 rounded-full">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          )}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {!quizCompleted ? (
          <motion.div
            key="question"
            className="quiz-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm font-medium text-surface-500 dark:text-surface-300">
                Score: {score}/{currentQuestion}
              </span>
              <div className="bg-surface-200 dark:bg-surface-700 h-2 flex-grow mx-4 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${category.color} transition-all duration-300 ease-out`}
                  style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-surface-500 dark:text-surface-300">
                {Math.round((currentQuestion / questions.length) * 100)}%
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-surface-900 dark:text-white">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  className={`question-option ${selectedOption === index ? 'option-selected' : ''} 
                    ${showAnswer && index === questions[currentQuestion].correctAnswer ? 'option-correct' : ''}
                    ${showAnswer && selectedOption === index && selectedOption !== questions[currentQuestion].correctAnswer ? 'option-incorrect' : ''}`}
                  onClick={() => handleOptionSelect(index)}
                  whileHover={!showAnswer ? { scale: 1.01 } : {}}
                  whileTap={!showAnswer ? { scale: 0.99 } : {}}
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white dark:bg-surface-600 text-surface-600 dark:text-surface-300 font-medium text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-grow">{option}</span>
                  
                  {showAnswer && index === questions[currentQuestion].correctAnswer && (
                    <CheckCircleIcon className="w-6 h-6 text-green-500 ml-2" />
                  )}
                  
                  {showAnswer && selectedOption === index && selectedOption !== questions[currentQuestion].correctAnswer && (
                    <XCircleIcon className="w-6 h-6 text-red-500 ml-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            className="quiz-card text-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-${category.color}/10`}>
              <recommendation.icon className={`w-10 h-10 ${recommendation.iconColor}`} />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{recommendation.title}</h3>
            <p className="text-surface-600 dark:text-surface-300 mb-6">{recommendation.message}</p>
            
            <div className="bg-surface-100 dark:bg-surface-800 rounded-xl p-6 mb-8">
              <div className="text-5xl font-bold mb-2 text-primary">
                {score}/{questions.length}
              </div>
              <p className="text-surface-500 dark:text-surface-400">Your Final Score</p>
              
              <div className="w-full bg-surface-200 dark:bg-surface-700 h-3 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  className={`h-full bg-${category.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / questions.length) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                ></motion.div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-surface-500 dark:text-surface-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary flex items-center justify-center"
                onClick={restartQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCwIcon className="w-5 h-5 mr-2" />
                Try Again
              </motion.button>
              
              <motion.button
                className="btn-outline flex items-center justify-center"
                onClick={onBackToCategories}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Different Category
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!quizCompleted && (
        <div className="mt-8 flex justify-between items-center text-sm text-surface-500 dark:text-surface-400">
          <div>
            <span className="font-medium">Score: </span>
            <span className="text-primary font-bold">{score}</span> correct answers
          </div>
          
          {showAnswer && (
            <div className="animate-pulse">
              Loading next question...
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MainFeature;