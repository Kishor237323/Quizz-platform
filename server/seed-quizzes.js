const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config({ path: './config.env' });

const categories = [
  'General Knowledge',
  'Science',
  'History',
  'Sports',
  'Geography',
  'Literature'
];
const difficulties = ['Easy', 'Medium', 'Hard'];

// Helper to generate 20 questions for a category/difficulty
function generateQuestions(category, difficulty) {
  const baseQuestions = {
    'General Knowledge': [
      ["What is the capital of France?", ["London", "Berlin", "Paris", "Madrid"], 2, "Paris is the capital of France."],
      ["Which planet is known as the Red Planet?", ["Venus", "Mars", "Jupiter", "Saturn"], 1, "Mars is known as the Red Planet."],
      ["What is the largest ocean on Earth?", ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], 3, "The Pacific Ocean is the largest."],
      ["Who painted the Mona Lisa?", ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], 2, "Leonardo da Vinci painted the Mona Lisa."],
      ["What is the chemical symbol for gold?", ["Ag", "Au", "Fe", "Cu"], 1, "Au is the symbol for gold."],
      ["How many continents are there?", ["5", "6", "7", "8"], 2, "There are 7 continents."],
      ["Which language has the most native speakers?", ["English", "Mandarin", "Spanish", "Hindi"], 1, "Mandarin has the most native speakers."],
      ["What is the tallest mountain in the world?", ["K2", "Everest", "Kilimanjaro", "Denali"], 1, "Mount Everest is the tallest."],
      ["Who discovered penicillin?", ["Marie Curie", "Alexander Fleming", "Isaac Newton", "Louis Pasteur"], 1, "Alexander Fleming discovered penicillin."],
      ["What is the smallest prime number?", ["0", "1", "2", "3"], 2, "2 is the smallest prime number."],
      ["Which country is known as the Land of the Rising Sun?", ["China", "Japan", "Thailand", "South Korea"], 1, "Japan is the Land of the Rising Sun."],
      ["What is the hardest natural substance?", ["Gold", "Iron", "Diamond", "Quartz"], 2, "Diamond is the hardest."],
      ["Who wrote 'Romeo and Juliet'?", ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], 1, "Shakespeare wrote 'Romeo and Juliet'."],
      ["What is the boiling point of water?", ["90°C", "100°C", "110°C", "120°C"], 1, "Water boils at 100°C."],
      ["Which animal is known as the King of the Jungle?", ["Tiger", "Lion", "Elephant", "Leopard"], 1, "Lion is the King of the Jungle."],
      ["What is the main ingredient in guacamole?", ["Tomato", "Avocado", "Onion", "Pepper"], 1, "Avocado is the main ingredient."],
      ["Which gas do plants absorb?", ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 1, "Plants absorb carbon dioxide."],
      ["What is the largest planet?", ["Earth", "Mars", "Jupiter", "Saturn"], 2, "Jupiter is the largest planet."],
      ["Who invented the telephone?", ["Edison", "Bell", "Tesla", "Marconi"], 1, "Alexander Graham Bell invented the telephone."],
      ["What is the square root of 64?", ["6", "7", "8", "9"], 2, "8 is the square root of 64."]
    ],
    'Science': [
      ["What is H2O?", ["Oxygen", "Hydrogen", "Water", "Salt"], 2, "H2O is water."],
      ["What planet is closest to the sun?", ["Venus", "Mercury", "Earth", "Mars"], 1, "Mercury is closest to the sun."],
      ["What is the powerhouse of the cell?", ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], 1, "Mitochondria is the powerhouse."],
      ["What is the chemical symbol for sodium?", ["Na", "So", "S", "N"], 0, "Na is sodium."],
      ["What is the speed of light?", ["300,000 km/s", "150,000 km/s", "299,792 km/s", "1,000 km/s"], 2, "299,792 km/s is the speed of light."],
      ["Who developed the theory of relativity?", ["Newton", "Einstein", "Galileo", "Curie"], 1, "Einstein developed relativity."],
      ["What is the center of an atom called?", ["Electron", "Proton", "Nucleus", "Neutron"], 2, "Nucleus is the center."],
      ["What is the largest organ in the human body?", ["Heart", "Skin", "Liver", "Brain"], 1, "Skin is the largest organ."],
      ["What is the main gas in Earth's atmosphere?", ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 1, "Nitrogen is the main gas."],
      ["What is the process by which plants make food?", ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], 1, "Photosynthesis is the process."],
      ["What is the chemical symbol for iron?", ["Ir", "Fe", "In", "I"], 1, "Fe is iron."],
      ["What is the hardest natural substance?", ["Gold", "Iron", "Diamond", "Quartz"], 2, "Diamond is the hardest."],
      ["What is the boiling point of water?", ["90°C", "100°C", "110°C", "120°C"], 1, "Water boils at 100°C."],
      ["What is the main function of red blood cells?", ["Fight infection", "Carry oxygen", "Clot blood", "Digest food"], 1, "Red blood cells carry oxygen."],
      ["What is the basic unit of life?", ["Atom", "Molecule", "Cell", "Organ"], 2, "Cell is the basic unit of life."],
      ["What is the largest planet?", ["Earth", "Mars", "Jupiter", "Saturn"], 2, "Jupiter is the largest planet."],
      ["What is the chemical symbol for gold?", ["Ag", "Au", "Fe", "Cu"], 1, "Au is gold."],
      ["What is the main source of energy for Earth?", ["Wind", "Sun", "Water", "Coal"], 1, "Sun is the main source."],
      ["What is the freezing point of water?", ["0°C", "32°C", "100°C", "-10°C"], 0, "0°C is the freezing point."],
      ["Who discovered penicillin?", ["Marie Curie", "Alexander Fleming", "Isaac Newton", "Louis Pasteur"], 1, "Fleming discovered penicillin."]
    ],
    'History': [
      ["Who was the first President of the United States?", ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], 1, "George Washington was the first U.S. President."],
      ["In which year did World War II end?", ["1942", "1944", "1945", "1948"], 2, "World War II ended in 1945."],
      ["Who was the British Prime Minister during most of World War II?", ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Stanley Baldwin"], 0, "Winston Churchill was the British Prime Minister during most of WWII."],
      ["Who discovered America?", ["Columbus", "Magellan", "Vespucci", "Cook"], 0, "Columbus discovered America."],
      ["Who was the first man on the moon?", ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], 1, "Neil Armstrong was the first man on the moon."],
      ["What year did the Titanic sink?", ["1910", "1912", "1914", "1920"], 1, "The Titanic sank in 1912."],
      ["Who wrote the Declaration of Independence?", ["George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin"], 1, "Thomas Jefferson wrote it."],
      ["Who was the first female Prime Minister of the UK?", ["Margaret Thatcher", "Theresa May", "Angela Merkel", "Indira Gandhi"], 0, "Margaret Thatcher was the first female PM of the UK."],
      ["Who was the first Emperor of Rome?", ["Julius Caesar", "Augustus", "Nero", "Constantine"], 1, "Augustus was the first Roman Emperor."],
      ["Who was the longest reigning British monarch?", ["Queen Victoria", "Queen Elizabeth II", "King George III", "Queen Mary"], 1, "Queen Elizabeth II was the longest reigning."],
      ["Who was the first President of India?", ["Rajendra Prasad", "Jawaharlal Nehru", "Indira Gandhi", "Mahatma Gandhi"], 0, "Rajendra Prasad was the first President of India."],
      ["Who was the first US President to resign?", ["Nixon", "Ford", "Carter", "Reagan"], 0, "Nixon was the first to resign."],
      ["Who was the first woman to win a Nobel Prize?", ["Marie Curie", "Mother Teresa", "Rosalind Franklin", "Ada Lovelace"], 0, "Marie Curie was the first woman Nobel laureate."],
      ["Who was the first President of South Africa after apartheid?", ["Mandela", "Mbeki", "De Klerk", "Zuma"], 0, "Nelson Mandela was the first post-apartheid President."],
      ["Who was the first US President to be impeached?", ["Andrew Johnson", "Bill Clinton", "Richard Nixon", "Donald Trump"], 0, "Andrew Johnson was the first impeached."],
      ["Who was the first female US Secretary of State?", ["Condoleezza Rice", "Hillary Clinton", "Madeleine Albright", "Janet Reno"], 2, "Madeleine Albright was the first female Secretary of State."],
      ["Who was the first President of Russia?", ["Putin", "Yeltsin", "Gorbachev", "Medvedev"], 1, "Boris Yeltsin was the first President of Russia."],
      ["Who was the first US President to live in the White House?", ["John Adams", "Thomas Jefferson", "James Madison", "George Washington"], 0, "John Adams was the first to live in the White House."],
      ["Who was the first President of Pakistan?", ["Ayub Khan", "Iskander Mirza", "Zulfikar Ali Bhutto", "Pervez Musharraf"], 1, "Iskander Mirza was the first President of Pakistan."],
      ["Who was the first President of China?", ["Sun Yat-sen", "Mao Zedong", "Deng Xiaoping", "Chiang Kai-shek"], 0, "Sun Yat-sen was the first President of China."]
    ],
    'Sports': [
      ["How many players are there in a soccer team (on the field)?", ["9", "10", "11", "12"], 2, "There are 11 players on a soccer team."],
      ["Which country won the FIFA World Cup in 2018?", ["Brazil", "Germany", "France", "Argentina"], 2, "France won the 2018 FIFA World Cup."],
      ["Who holds the record for the most Olympic gold medals?", ["Usain Bolt", "Michael Phelps", "Larisa Latynina", "Mark Spitz"], 1, "Michael Phelps holds the record for most Olympic gold medals."],
      ["Which sport uses a shuttlecock?", ["Tennis", "Badminton", "Squash", "Table Tennis"], 1, "Badminton uses a shuttlecock."],
      ["Who is known as 'The Greatest' in boxing?", ["Mike Tyson", "Muhammad Ali", "Floyd Mayweather", "Manny Pacquiao"], 1, "Muhammad Ali is 'The Greatest'."],
      ["Which NBA player has won the most championships?", ["Michael Jordan", "Kareem Abdul-Jabbar", "Bill Russell", "LeBron James"], 2, "Bill Russell won 11 NBA championships."],
      ["What year did the first modern Olympic Games take place?", ["1892", "1896", "1900", "1904"], 1, "The first modern Olympics were in 1896."],
      ["Which tennis player has won the most Grand Slam titles?", ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Margaret Court"], 3, "Margaret Court has the most Grand Slam singles titles."],
      ["Which country has won the most Cricket World Cups?", ["Australia", "India", "England", "West Indies"], 0, "Australia has won the most Cricket World Cups."],
      ["Which country hosted the 2016 Summer Olympics?", ["China", "Brazil", "UK", "Russia"], 1, "Brazil hosted the 2016 Olympics."],
      ["Who is the fastest man in the world?", ["Usain Bolt", "Tyson Gay", "Yohan Blake", "Justin Gatlin"], 0, "Usain Bolt is the fastest man."],
      ["Which country won the first FIFA World Cup?", ["Brazil", "Uruguay", "Italy", "Germany"], 1, "Uruguay won the first World Cup."],
      ["Which sport is known as the 'king of sports'?", ["Basketball", "Soccer", "Tennis", "Cricket"], 1, "Soccer is the 'king of sports'."],
      ["Who is the all-time top scorer in men's international football?", ["Cristiano Ronaldo", "Pele", "Ali Daei", "Lionel Messi"], 0, "Cristiano Ronaldo is the top scorer."],
      ["Which country has won the most Olympic medals?", ["USA", "China", "Russia", "Germany"], 0, "USA has won the most Olympic medals."],
      ["Which country won the ICC Cricket World Cup in 2019?", ["Australia", "India", "England", "New Zealand"], 2, "England won the 2019 Cricket World Cup."],
      ["Who is the only player to win the FIFA World Cup three times?", ["Pele", "Maradona", "Zidane", "Ronaldo"], 0, "Pele won three World Cups."],
      ["Which country has won the most Rugby World Cups?", ["New Zealand", "Australia", "South Africa", "England"], 0, "New Zealand has won the most Rugby World Cups."],
      ["Who is the most decorated Olympian of all time?", ["Michael Phelps", "Larisa Latynina", "Paavo Nurmi", "Mark Spitz"], 0, "Michael Phelps is the most decorated Olympian."],
      ["Which country won the UEFA Euro 2016?", ["France", "Portugal", "Germany", "Spain"], 1, "Portugal won Euro 2016."]
    ],
    'Geography': [
      ["Which is the largest continent by area?", ["Africa", "Asia", "Europe", "North America"], 1, "Asia is the largest continent by area."],
      ["What is the longest river in the world?", ["Amazon", "Nile", "Yangtze", "Mississippi"], 1, "The Nile is the longest river."],
      ["Mount Kilimanjaro is located in which country?", ["Kenya", "Tanzania", "Uganda", "Ethiopia"], 1, "Mount Kilimanjaro is in Tanzania."],
      ["What is the capital of Australia?", ["Sydney", "Melbourne", "Canberra", "Perth"], 2, "Canberra is the capital of Australia."],
      ["Which country has the most islands?", ["Sweden", "Finland", "Norway", "Canada"], 0, "Sweden has the most islands."],
      ["What is the smallest country in the world?", ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], 1, "Vatican City is the smallest country."],
      ["Which desert is the largest in the world?", ["Sahara", "Gobi", "Kalahari", "Arabian"], 0, "Sahara is the largest desert."],
      ["Which ocean is the deepest?", ["Atlantic", "Indian", "Arctic", "Pacific"], 3, "Pacific is the deepest ocean."],
      ["What is the capital of Canada?", ["Toronto", "Vancouver", "Ottawa", "Montreal"], 2, "Ottawa is the capital of Canada."],
      ["Which country is known as the Land of the Rising Sun?", ["China", "Japan", "Thailand", "South Korea"], 1, "Japan is the Land of the Rising Sun."],
      ["Which river flows through London?", ["Seine", "Thames", "Danube", "Rhine"], 1, "The Thames flows through London."],
      ["Which is the largest country by area?", ["USA", "Russia", "China", "Canada"], 1, "Russia is the largest country by area."],
      ["Which is the highest waterfall in the world?", ["Niagara", "Angel Falls", "Victoria Falls", "Iguazu Falls"], 1, "Angel Falls is the highest waterfall."],
      ["Which is the largest lake in Africa?", ["Lake Victoria", "Lake Tanganyika", "Lake Malawi", "Lake Chad"], 0, "Lake Victoria is the largest lake in Africa."],
      ["Which is the smallest continent?", ["Europe", "Australia", "Antarctica", "South America"], 1, "Australia is the smallest continent."],
      ["Which country has the most population?", ["India", "USA", "China", "Russia"], 2, "China has the most population."],
      ["Which is the longest mountain range?", ["Andes", "Rockies", "Himalayas", "Alps"], 0, "Andes is the longest mountain range."],
      ["Which is the largest island in the world?", ["Greenland", "Australia", "Borneo", "Madagascar"], 0, "Greenland is the largest island."],
      ["Which is the capital of Egypt?", ["Cairo", "Alexandria", "Giza", "Luxor"], 0, "Cairo is the capital of Egypt."],
      ["Which is the capital of Brazil?", ["Rio de Janeiro", "Brasilia", "Sao Paulo", "Salvador"], 1, "Brasilia is the capital of Brazil."]
    ],
    'Literature': [
      ["Who wrote 'Romeo and Juliet'?", ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], 1, "Shakespeare wrote 'Romeo and Juliet'."],
      ["Who is the author of '1984'?", ["Aldous Huxley", "George Orwell", "Ray Bradbury", "J.K. Rowling"], 1, "George Orwell wrote '1984'."],
      ["Which novel begins with 'Call me Ishmael.'?", ["Moby-Dick", "Great Expectations", "Pride and Prejudice", "The Odyssey"], 0, "'Call me Ishmael.' is the opening line of Moby-Dick."],
      ["Who wrote 'Pride and Prejudice'?", ["Jane Austen", "Emily Bronte", "Charlotte Bronte", "Mary Shelley"], 0, "Jane Austen wrote 'Pride and Prejudice'."],
      ["Who wrote 'The Great Gatsby'?", ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "Mark Twain"], 0, "F. Scott Fitzgerald wrote 'The Great Gatsby'."],
      ["Who wrote 'To Kill a Mockingbird'?", ["Harper Lee", "J.D. Salinger", "George Orwell", "Ernest Hemingway"], 0, "Harper Lee wrote 'To Kill a Mockingbird'."],
      ["Who wrote 'The Catcher in the Rye'?", ["J.D. Salinger", "Harper Lee", "George Orwell", "F. Scott Fitzgerald"], 0, "J.D. Salinger wrote 'The Catcher in the Rye'."],
      ["Who wrote 'The Odyssey'?", ["Homer", "Virgil", "Sophocles", "Euripides"], 0, "Homer wrote 'The Odyssey'."],
      ["Who wrote 'The Divine Comedy'?", ["Dante Alighieri", "Geoffrey Chaucer", "John Milton", "William Blake"], 0, "Dante wrote 'The Divine Comedy'."],
      ["Who wrote 'War and Peace'?", ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"], 0, "Leo Tolstoy wrote 'War and Peace'."],
      ["Who wrote 'Crime and Punishment'?", ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"], 0, "Dostoevsky wrote 'Crime and Punishment'."],
      ["Who wrote 'The Brothers Karamazov'?", ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"], 0, "Dostoevsky wrote 'The Brothers Karamazov'."],
      ["Who wrote 'Great Expectations'?", ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], 0, "Charles Dickens wrote 'Great Expectations'."],
      ["Who wrote 'The Hobbit'?", ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "George R.R. Martin"], 0, "J.R.R. Tolkien wrote 'The Hobbit'."],
      ["Who wrote 'The Lord of the Rings'?", ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "George R.R. Martin"], 0, "J.R.R. Tolkien wrote 'The Lord of the Rings'."],
      ["Who wrote 'The Chronicles of Narnia'?", ["C.S. Lewis", "J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin"], 0, "C.S. Lewis wrote 'The Chronicles of Narnia'."],
      ["Who wrote 'Harry Potter'?", ["J.K. Rowling", "J.R.R. Tolkien", "C.S. Lewis", "George R.R. Martin"], 0, "J.K. Rowling wrote 'Harry Potter'."],
      ["Who wrote 'A Tale of Two Cities'?", ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], 0, "Charles Dickens wrote 'A Tale of Two Cities'."],
      ["Who wrote 'Anna Karenina'?", ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"], 0, "Leo Tolstoy wrote 'Anna Karenina'."],
      ["Who wrote 'Don Quixote'?", ["Miguel de Cervantes", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"], 0, "Miguel de Cervantes wrote 'Don Quixote'."]
    ]
  };

  // Use the base questions and repeat/shift for variety if needed
  const base = baseQuestions[category];
  const questions = [];
  for (let i = 0; i < 20; i++) {
    const idx = (i + (difficulty === 'Medium' ? 5 : difficulty === 'Hard' ? 10 : 0)) % base.length;
    const [question, options, correctAnswer, explanation] = base[idx];
    questions.push({
      question: `${question} (${difficulty} Q${i + 1})`,
      options,
      correctAnswer,
      explanation
    });
  }
  return questions;
}

const sampleQuizzes = [];
for (const category of categories) {
  for (const difficulty of difficulties) {
    sampleQuizzes.push({
      title: `${category} - ${difficulty} Quiz`,
      category,
      difficulty,
      description: `A ${difficulty.toLowerCase()} ${category.toLowerCase()} quiz with 20 questions`,
      questions: generateQuestions(category, difficulty),
      timeLimit: 20,
      pointsPerQuestion: 10
    });
  }
}

const seedQuizzes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing quizzes
    await Quiz.deleteMany({});
    console.log('Cleared existing quizzes');

    // Create a sample user ID (you'll need to replace this with a real user ID)
    const sampleUserId = new mongoose.Types.ObjectId();

    // Add sample user ID to all quizzes
    const quizzesWithUser = sampleQuizzes.map(quiz => ({
      ...quiz,
      createdBy: sampleUserId
    }));

    // Insert sample quizzes
    const result = await Quiz.insertMany(quizzesWithUser);
    console.log(`Successfully seeded ${result.length} quizzes`);

    // Display created quizzes
    result.forEach(quiz => {
      console.log(`- ${quiz.title} (${quiz.category}, ${quiz.difficulty})`);
    });

  } catch (error) {
    console.error('Error seeding quizzes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeding function
seedQuizzes(); 