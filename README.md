# 🧮 React Calculator

A beautiful, modern calculator built with React featuring a clean UI with gradient background and calculation history.

## ✨ Features

- ➕ **Addition** - Add two numbers
- ➖ **Subtraction** - Subtract numbers
- ✖️ **Multiplication** - Multiply numbers
- ÷ **Division** - Divide numbers
- % **Modulo** - Get remainder
- 📋 **History** - Track all calculations
- 🎨 **Beautiful UI** - Modern gradient design
- 📱 **Responsive** - Works on all devices
- ⌫ **Backspace** - Delete last digit
- C **Clear** - Reset calculator

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd react-calculator

# Install dependencies
npm install

# Start the development server
npm start
```

The calculator will open at `http://localhost:3000`

## 📖 Usage

1. **Click number buttons** to enter numbers
2. **Click operation buttons** (+, -, *, /, %) to select operation
3. **Click = button** to calculate result
4. **View history** on the right side
5. **Clear history** using the Clear button in history panel

### Example Calculations

```
5 + 3 = 8
10 - 4 = 6
7 * 6 = 42
20 / 5 = 4
17 % 5 = 2
```

## 🎨 Design Features

- **Gradient Background** - Purple to violet gradient
- **Modern UI** - Clean, minimal design
- **Color-coded Buttons:**
  - Gray: Numbers and decimal
  - Purple: Operations (+, -, *, /)
  - Orange: Backspace
  - Red: Clear button
  - Green/Cyan: Equals button
- **Smooth Animations** - Button hover effects
- **History Panel** - Scrollable calculation history

## 🔧 Project Structure

```
react-calculator/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Calculator.jsx
│   ├── Calculator.css
│   └── index.jsx
├── package.json
├── .gitignore
└── README.md
```

## 📦 Available Scripts

### `npm start`
Runs the app in development mode.

### `npm build`
Builds the app for production.

### `npm test`
Launches the test runner.

## 🎯 Component Breakdown

### Calculator Component
- **Main Logic**: Handles all calculation operations
- **State Management**: 
  - `display` - Current display value
  - `previousValue` - Previous number for operation
  - `operation` - Current operation (+, -, *, /, %)
  - `history` - Array of calculation history

### Key Functions
- `handleNumberClick(num)` - Process number input
- `handleOperation(op)` - Set operation
- `handleEquals()` - Calculate result and update history
- `calculate()` - Perform mathematical operation
- `handleClear()` - Reset calculator
- `handleBackspace()` - Remove last digit

## 🎓 Learning Resource

Great for learning:
- React hooks (useState)
- Event handling
- State management
- CSS Grid layout
- Responsive design
- Component composition

## 🌟 Future Enhancements

- [ ] Scientific calculator mode
- [ ] Keyboard support
- [ ] Dark/Light theme toggle
- [ ] Local storage for history
- [ ] Calculation logs export
- [ ] Advanced operations (power, square root)

## 📝 Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## 🤝 Contributing

Feel free to fork, modify, and improve this calculator!

## 📄 License

Free for educational and personal use.

---

**Built with ❤️ using React**

Enjoy calculating! 🚀✨
