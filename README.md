
# 🎯 Quiz App

## ✨ Live Demo

[🔗 Add your demo link here]

## 🚀 Features

### 🔐 Authentication System
- **Secure Login** with username/password
- **Protected Routes** - automatic redirect if not authenticated
- **Session Persistence** using localStorage
- **Demo Credentials**: `teacher` / `teacher123`

### 📚 Quiz Management
- **Dynamic Questions** fetched from OpenTDB API
- **Multiple Categories** and difficulty levels
- **10 Questions** per quiz session
- **Real-time Progress** tracking

### ⏱️ Interactive Quiz Experience
- **Countdown Timer** (10 minutes per quiz)
- **One Question Per Page** for focused experience
- **Instant Feedback** when selecting answers
- **Auto-save Progress** - resume if browser closes
- **Smart Answer Shuffling** to prevent patterns

### 📊 Results & Analytics
- **Detailed Score Breakdown** with percentage
- **Performance Metrics** (correct/wrong answers, accuracy)
- **Time Analysis** with completion statistics
- **Visual Progress Indicators**
- **Performance Levels** (Novice to Master)

### 🎨 Modern UI/UX
- **Responsive Design** for all devices
- **Clean, Minimalist Interface**
- **Smooth Animations** and transitions
- **Accessible Components** with proper ARIA labels
- **Loading States** and error handling

## 🛠️ Tech Stack

- **React 18** - UI library with latest features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation for forms and API responses
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing
- **React Hooks** - Custom hooks for state management
- **LocalStorage** - Data persistence and session management

### API & Data
- **OpenTDB API** - Trivia question database
- **Fetch API** - Modern HTTP requests (no Axios)
- **Environment Variables** - Secure configuration

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [your-repo-link]
   cd quiz-app


2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file:
   ```env
   VITE_API_BASE_URL=https://opentdb.com/api.php
   VITE_QUIZ_AMOUNT=10
   VITE_QUIZ_CATEGORY=21
   VITE_QUIZ_DIFFICULTY=easy
   VITE_QUIZ_TYPE=multiple
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── quiz/               # Quiz-specific components
│   │   ├── QuizStart.tsx   # Quiz landing page
│   │   ├── QuizQuestion.tsx # Individual question view
│   │   └── QuizResult.tsx  # Results display
│   ├── LoginPage.tsx       # Authentication page
│   └── QuizPage.tsx        # Main quiz container
├── hooks/
│   ├── useLogin.ts         # Authentication logic
│   ├── useTogglePassword.ts # Password visibility toggle
│   └── useQuiz.ts          # Quiz state management
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── quiz-api.ts         # API service for questions
│   ├── quizStorage.ts      # localStorage management
│   └── utils.ts            # Helper functions
├── types/
│   └── quiz.ts             # TypeScript type definitions
└── App.tsx                 # Main application component
```

## 🎮 How to Use

1. **Login**
   - Visit the login page
   - Use demo credentials: `teacher` / `teacher123`
   - Secure authentication with form validation

2. **Start Quiz**
   - Click "Start New Quiz" on the dashboard
   - Choose to resume previous quiz if available
   - Timer starts automatically (10 minutes)

3. **Answer Questions**
   - One question displayed per page
   - Click any answer to proceed immediately
   - Progress bar shows completion status
   - Timer counts down in real-time

4. **View Results**
   - See detailed performance breakdown
   - Analyze correct/incorrect answers
   - Get accuracy percentage and time spent
   - Option to restart quiz

## 🔧 Key Features Implementation

### Authentication Flow
```typescript
// Custom hook for login logic
const useLogin = () => {
  // Handles form validation, API calls, and redirects
};

// Protected route wrapper
<ProtectedRoute>
  <QuizPage />
</ProtectedRoute>
```

### Quiz State Management
```typescript
const useQuiz = () => {
  // Manages questions, answers, timer, and progress
  // Auto-saves to localStorage
  // Handles resume functionality
};
```

### API Integration
```typescript
const quizApi = {
  getQuestions: async () => {
    // Fetches from OpenTDB API
    // Processes and shuffles answers
    // Handles errors gracefully
  }
};
```

## 🎯 API Reference

### OpenTDB API
- **Base URL**: `https://opentdb.com/api.php`
- **Parameters**: 
  - `amount`: Number of questions (default: 10)
  - `category`: Question category (21: Sports)
  - `difficulty`: easy/medium/hard
  - `type`: multiple/boolean

### Example Response
```json
{
  "response_code": 0,
  "results": [
    {
      "category": "Sports",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Which team won the 2015-16 English Premier League?",
      "correct_answer": "Leicester City",
      "incorrect_answers": ["Liverpool", "Chelsea", "Manchester United"]
    }
  ]
}
```

## 🔒 Security Features

- **Environment Variables** for API configuration
- **Input Validation** with Zod schemas
- **XSS Protection** through HTML entity decoding
- **Local Storage Encryption** (can be added)
- **Route Protection** from unauthorized access

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🚀 Performance Optimizations

- **Code Splitting** with React.lazy()
- **Memoized Components** to prevent re-renders
- **Efficient State Updates** with useCallback/useMemo
- **Optimized Assets** and bundle size
- **Fast API Responses** with proper caching

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenTDB](https://opentdb.com/) for the trivia questions API
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility framework
- [Lucide](https://lucide.dev/) for beautiful icons
- [React Hook Form](https://react-hook-form.com/) for form management

---

**Built with ❤️ using Modern Web Technologies**
```

## 📋 **Yang Perlu Anda Lengkapi:**

1. **Demo Link** - Ganti `[Add your demo link here]` dengan URL deployment Anda
2. **Repository Link** - Ganti `[your-repo-link]` dengan link GitHub repository Anda  
3. **Screenshots** - Bisa tambahkan screenshots untuk visual yang lebih menarik
4. **License** - Buat file LICENSE jika perlu
5. **Deployment Instructions** - Tambahkan jika menggunakan platform tertentu (Vercel, Netlify, dll)

README ini sudah lengkap dan professional, cocok untuk portfolio project! 🚀
