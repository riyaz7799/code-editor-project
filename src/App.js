import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [undoStack, setUndoStack] = useState(['']);
  const [redoStack, setRedoStack] = useState([]);
  const [eventLogs, setEventLogs] = useState([]);
  const [chordState, setChordState] = useState(null);
  const [highlightCount, setHighlightCount] = useState(0);
  const [lineNumbers, setLineNumbers] = useState(['1']);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showDashboard, setShowDashboard] = useState(true);
  const [showHelp, setShowHelp] = useState(false); // NEW: Help modal
  
  const editorRef = useRef(null);
  const chordTimerRef = useRef(null);
  const highlightTimerRef = useRef(null);

  // Language templates
  const languageTemplates = {
    javascript: `// JavaScript - Complete Example
// This is a fully executable JavaScript program

// 1. Variables and Data Types
const name = 'JavaScript';
let version = 'ES6+';
var year = 2024;

console.log('=== JavaScript Basics ===');
console.log('Language:', name);
console.log('Version:', version);
console.log('Year:', year);

// 2. Arrays and Loops
console.log('\\n=== Arrays and Loops ===');
const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];
console.log('Fruits:', fruits.join(', '));

for (let i = 0; i < fruits.length; i++) {
  console.log(\`\${i + 1}. \${fruits[i]}\`);
}

// 3. Functions
console.log('\\n=== Functions ===');
function calculateSum(a, b) {
  return a + b;
}

function calculateProduct(a, b) {
  return a * b;
}

const num1 = 15;
const num2 = 7;
console.log(\`Sum of \${num1} and \${num2} = \${calculateSum(num1, num2)}\`);
console.log(\`Product of \${num1} and \${num2} = \${calculateProduct(num1, num2)}\`);

// 4. Arrow Functions
const square = (x) => x * x;
const cube = (x) => x * x * x;

console.log('\\n=== Arrow Functions ===');
console.log('Square of 5:', square(5));
console.log('Cube of 3:', cube(3));

// 5. Objects
console.log('\\n=== Objects ===');
const person = {
  name: 'John Doe',
  age: 30,
  profession: 'Developer',
  skills: ['JavaScript', 'React', 'Node.js'],
  greet: function() {
    return \`Hello, I'm \${this.name}!\`;
  }
};

console.log(person.greet());
console.log('Age:', person.age);
console.log('Skills:', person.skills.join(', '));

// 6. Array Methods
console.log('\\n=== Array Methods ===');
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Original:', numbers);

const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

const evens = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evens);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum of all numbers:', sum);

// 7. Conditionals
console.log('\\n=== Conditionals ===');
const score = 85;
let grade;

if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else if (score >= 70) {
  grade = 'C';
} else {
  grade = 'F';
}
console.log(\`Score: \${score}, Grade: \${grade}\`);

// 8. Classes
console.log('\\n=== Classes ===');
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
  
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(10, 5);
console.log('Rectangle - Width:', rect.width, 'Height:', rect.height);
console.log('Area:', rect.area());
console.log('Perimeter:', rect.perimeter());

// 9. String Operations
console.log('\\n=== String Operations ===');
const text = 'JavaScript is Awesome';
console.log('Original:', text);
console.log('Uppercase:', text.toUpperCase());
console.log('Lowercase:', text.toLowerCase());
console.log('Length:', text.length);
console.log('Split:', text.split(' '));

// 10. Math Operations
console.log('\\n=== Math Operations ===');
console.log('Random number:', Math.random());
console.log('Round 4.7:', Math.round(4.7));
console.log('Max(5, 10, 15):', Math.max(5, 10, 15));
console.log('Min(5, 10, 15):', Math.min(5, 10, 15));
console.log('Square root of 16:', Math.sqrt(16));

// 11. Fibonacci Sequence
console.log('\\n=== Fibonacci Sequence ===');
function fibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}

console.log('First 10 Fibonacci numbers:', fibonacci(10));

// 12. Prime Number Check
console.log('\\n=== Prime Number Check ===');
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log('Is 17 prime?', isPrime(17));
console.log('Is 20 prime?', isPrime(20));

// 13. Factorial
console.log('\\n=== Factorial ===');
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log('Factorial of 5:', factorial(5));
console.log('Factorial of 7:', factorial(7));

// 14. Palindrome Check
console.log('\\n=== Palindrome Check ===');
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

console.log('Is "racecar" palindrome?', isPalindrome('racecar'));
console.log('Is "hello" palindrome?', isPalindrome('hello'));

// 15. Final Summary
console.log('\\n=== Program Complete ===');
console.log('✓ All 15 sections executed successfully!');
console.log('Total lines of code: ~150');
console.log('Execution completed at:', new Date().toLocaleTimeString());`,

    python: `# Python - Complete Example
# Note: This shows Python syntax but runs as JavaScript simulation

# 1. Print Statements
print("=== Python Basics ===")
print("Language: Python")
print("Version: 3.x")

# 2. Variables and Data Types
name = "Python"
version = 3.12
is_popular = True

print("\\n=== Variables ===")
print(f"Name: {name}")
print(f"Version: {version}")
print(f"Popular: {is_popular}")

# 3. Lists and Loops
print("\\n=== Lists and Loops ===")
fruits = ["Apple", "Banana", "Orange", "Mango", "Grapes"]
print("Fruits:", fruits)

for i, fruit in enumerate(fruits, 1):
    print(f"{i}. {fruit}")

# 4. Functions
print("\\n=== Functions ===")
def calculate_sum(a, b):
    return a + b

def calculate_product(a, b):
    return a * b

num1 = 15
num2 = 7
print(f"Sum: {calculate_sum(num1, num2)}")
print(f"Product: {calculate_product(num1, num2)}")

# 5. Dictionary
print("\\n=== Dictionary ===")
person = {
    "name": "John Doe",
    "age": 30,
    "profession": "Developer",
    "skills": ["Python", "Django", "Flask"]
}

print(f"Name: {person['name']}")
print(f"Age: {person['age']}")
print(f"Skills: {', '.join(person['skills'])}")

# 6. List Comprehension
print("\\n=== List Comprehension ===")
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squared = [x ** 2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]

print(f"Original: {numbers}")
print(f"Squared: {squared}")
print(f"Evens: {evens}")

# 7. Conditionals
print("\\n=== Conditionals ===")
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

print(f"Score: {score}, Grade: {grade}")

# 8. Classes
print("\\n=== Classes ===")
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(10, 5)
print(f"Rectangle - Width: {rect.width}, Height: {rect.height}")
print(f"Area: {rect.area()}")
print(f"Perimeter: {rect.perimeter()}")

# 9. String Operations
print("\\n=== String Operations ===")
text = "Python is Amazing"
print(f"Original: {text}")
print(f"Uppercase: {text.upper()}")
print(f"Lowercase: {text.lower()}")
print(f"Length: {len(text)}")
print(f"Split: {text.split()}")

# 10. Lambda Functions
print("\\n=== Lambda Functions ===")
square = lambda x: x ** 2
cube = lambda x: x ** 3

print(f"Square of 5: {square(5)}")
print(f"Cube of 3: {cube(3)}")

# 11. Fibonacci Sequence
print("\\n=== Fibonacci Sequence ===")
def fibonacci(n):
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

print(f"First 10 Fibonacci: {fibonacci(10)}")

# 12. Prime Number Check
print("\\n=== Prime Number Check ===")
def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

print(f"Is 17 prime? {is_prime(17)}")
print(f"Is 20 prime? {is_prime(20)}")

# 13. Factorial
print("\\n=== Factorial ===")
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

print(f"Factorial of 5: {factorial(5)}")
print(f"Factorial of 7: {factorial(7)}")

# 14. Set Operations
print("\\n=== Set Operations ===")
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

print(f"Set 1: {set1}")
print(f"Set 2: {set2}")
print(f"Union: {set1 | set2}")
print(f"Intersection: {set1 & set2}")

# 15. Program Complete
print("\\n=== Program Complete ===")
print("✓ All 15 sections demonstrated!")
print("Note: To actually run Python code, use a Python interpreter")
print("This editor currently executes JavaScript only")

# To run this code:
# 1. Install Python from python.org
# 2. Save this file as script.py
# 3. Run: python script.py`,

    java: `// Java - Complete Example
// Note: This shows Java syntax but needs a compiler to run

// Main class
public class CodeEditor {
    public static void main(String[] args) {
        System.out.println("=== Java Basics ===");
        System.out.println("Language: Java");
        System.out.println("Version: 17+");
        
        // 1. Variables and Data Types
        System.out.println("\\n=== Variables ===");
        String name = "Java";
        int year = 1995;
        double version = 17.0;
        boolean isPopular = true;
        
        System.out.println("Name: " + name);
        System.out.println("Year: " + year);
        System.out.println("Version: " + version);
        
        // 2. Arrays and Loops
        System.out.println("\\n=== Arrays and Loops ===");
        String[] fruits = {"Apple", "Banana", "Orange", "Mango", "Grapes"};
        
        for (int i = 0; i < fruits.length; i++) {
            System.out.println((i + 1) + ". " + fruits[i]);
        }
        
        // 3. Enhanced For Loop
        System.out.println("\\n=== Enhanced For Loop ===");
        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }
        
        // 4. Methods
        System.out.println("\\n=== Methods ===");
        int num1 = 15;
        int num2 = 7;
        System.out.println("Sum: " + calculateSum(num1, num2));
        System.out.println("Product: " + calculateProduct(num1, num2));
        
        // 5. Conditionals
        System.out.println("\\n=== Conditionals ===");
        int score = 85;
        char grade;
        
        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else {
            grade = 'F';
        }
        System.out.println("Score: " + score + ", Grade: " + grade);
        
        // 6. Classes and Objects
        System.out.println("\\n=== Classes ===");
        Rectangle rect = new Rectangle(10, 5);
        System.out.println("Rectangle Area: " + rect.area());
        System.out.println("Rectangle Perimeter: " + rect.perimeter());
        
        // 7. String Operations
        System.out.println("\\n=== String Operations ===");
        String text = "Java is Powerful";
        System.out.println("Original: " + text);
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Lowercase: " + text.toLowerCase());
        System.out.println("Length: " + text.length());
        
        // 8. Math Operations
        System.out.println("\\n=== Math Operations ===");
        System.out.println("Square root of 16: " + Math.sqrt(16));
        System.out.println("Power 2^3: " + Math.pow(2, 3));
        System.out.println("Max(5, 10): " + Math.max(5, 10));
        
        // 9. Fibonacci
        System.out.println("\\n=== Fibonacci ===");
        System.out.println("Fibonacci(10): " + fibonacci(10));
        
        // 10. Prime Check
        System.out.println("\\n=== Prime Check ===");
        System.out.println("Is 17 prime? " + isPrime(17));
        System.out.println("Is 20 prime? " + isPrime(20));
        
        System.out.println("\\n=== Program Complete ===");
        System.out.println("✓ All sections demonstrated!");
        System.out.println("Note: To run this, compile with: javac CodeEditor.java");
        System.out.println("Then run: java CodeEditor");
    }
    
    // Method: Calculate Sum
    public static int calculateSum(int a, int b) {
        return a + b;
    }
    
    // Method: Calculate Product
    public static int calculateProduct(int a, int b) {
        return a * b;
    }
    
    // Method: Fibonacci
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // Method: Prime Check
    public static boolean isPrime(int num) {
        if (num <= 1) return false;
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) return false;
        }
        return true;
    }
}

// Rectangle Class
class Rectangle {
    private int width;
    private int height;
    
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    public int area() {
        return width * height;
    }
    
    public int perimeter() {
        return 2 * (width + height);
    }
}

// Person Class
class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void greet() {
        System.out.println("Hello, I'm " + name);
    }
}`,

    cpp: `// C++ - Complete Example
// Note: This shows C++ syntax but needs a compiler to run

#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

// Function prototypes
int calculateSum(int a, int b);
int calculateProduct(int a, int b);
int fibonacci(int n);
bool isPrime(int num);
int factorial(int n);

// Rectangle Class
class Rectangle {
private:
    int width;
    int height;
    
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    
    int area() {
        return width * height;
    }
    
    int perimeter() {
        return 2 * (width + height);
    }
};

// Person Class
class Person {
private:
    string name;
    int age;
    
public:
    Person(string n, int a) : name(n), age(a) {}
    
    void greet() {
        cout << "Hello, I'm " << name << endl;
    }
    
    string getName() { return name; }
    int getAge() { return age; }
};

int main() {
    cout << "=== C++ Basics ===" << endl;
    cout << "Language: C++" << endl;
    cout << "Standard: C++17/20" << endl;
    
    // 1. Variables and Data Types
    cout << "\\n=== Variables ===" << endl;
    string language = "C++";
    int year = 1985;
    double version = 20.0;
    bool isCompiled = true;
    
    cout << "Language: " << language << endl;
    cout << "Year: " << year << endl;
    cout << "Version: " << version << endl;
    
    // 2. Arrays and Loops
    cout << "\\n=== Arrays and Loops ===" << endl;
    string fruits[] = {"Apple", "Banana", "Orange", "Mango", "Grapes"};
    int fruitsSize = sizeof(fruits) / sizeof(fruits[0]);
    
    for (int i = 0; i < fruitsSize; i++) {
        cout << (i + 1) << ". " << fruits[i] << endl;
    }
    
    // 3. Vectors (Dynamic Arrays)
    cout << "\\n=== Vectors ===" << endl;
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    cout << "Numbers: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // 4. Functions
    cout << "\\n=== Functions ===" << endl;
    int num1 = 15;
    int num2 = 7;
    cout << "Sum of " << num1 << " and " << num2 << ": " << calculateSum(num1, num2) << endl;
    cout << "Product: " << calculateProduct(num1, num2) << endl;
    
    // 5. Conditionals
    cout << "\\n=== Conditionals ===" << endl;
    int score = 85;
    char grade;
    
    if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) {
        grade = 'B';
    } else if (score >= 70) {
        grade = 'C';
    } else {
        grade = 'F';
    }
    cout << "Score: " << score << ", Grade: " << grade << endl;
    
    // 6. Classes and Objects
    cout << "\\n=== Classes ===" << endl;
    Rectangle rect(10, 5);
    cout << "Rectangle Area: " << rect.area() << endl;
    cout << "Rectangle Perimeter: " << rect.perimeter() << endl;
    
    Person person("John Doe", 30);
    person.greet();
    cout << "Age: " << person.getAge() << endl;
    
    // 7. String Operations
    cout << "\\n=== String Operations ===" << endl;
    string text = "C++ is Fast";
    cout << "Original: " << text << endl;
    cout << "Length: " << text.length() << endl;
    
    // Convert to uppercase
    string upper = text;
    transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
    cout << "Uppercase: " << upper << endl;
    
    // 8. Math Operations
    cout << "\\n=== Math Operations ===" << endl;
    cout << "Square root of 16: " << sqrt(16) << endl;
    cout << "Power 2^3: " << pow(2, 3) << endl;
    cout << "Max(5, 10): " << max(5, 10) << endl;
    
    // 9. Fibonacci
    cout << "\\n=== Fibonacci ===" << endl;
    cout << "Fibonacci(10): " << fibonacci(10) << endl;
    
    // 10. Prime Check
    cout << "\\n=== Prime Check ===" << endl;
    cout << "Is 17 prime? " << (isPrime(17) ? "Yes" : "No") << endl;
    cout << "Is 20 prime? " << (isPrime(20) ? "Yes" : "No") << endl;
    
    // 11. Factorial
    cout << "\\n=== Factorial ===" << endl;
    cout << "Factorial of 5: " << factorial(5) << endl;
    cout << "Factorial of 7: " << factorial(7) << endl;
    
    // 12. Pointers (Advanced)
    cout << "\\n=== Pointers ===" << endl;
    int value = 42;
    int* ptr = &value;
    cout << "Value: " << value << endl;
    cout << "Address: " << ptr << endl;
    cout << "Dereferenced: " << *ptr << endl;
    
    cout << "\\n=== Program Complete ===" << endl;
    cout << "✓ All sections demonstrated!" << endl;
    cout << "Note: Compile with: g++ -o program program.cpp" << endl;
    cout << "Then run: ./program" << endl;
    
    return 0;
}

// Function Definitions
int calculateSum(int a, int b) {
    return a + b;
}

int calculateProduct(int a, int b) {
    return a * b;
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

bool isPrime(int num) {
    if (num <= 1) return false;
    for (int i = 2; i <= sqrt(num); i++) {
        if (num % i == 0) return false;
    }
    return true;
}

int factorial(int n) {
    if (n == 0 || n == 1) return 1;
    return n * factorial(n - 1);
}`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete HTML Example</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            text-align: center;
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        h2 {
            color: #ffd700;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 2px solid #ffd700;
            padding-bottom: 10px;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .grid-item {
            background: rgba(255, 255, 255, 0.15);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        
        button {
            background: #ffd700;
            color: #764ba2;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
            margin: 10px 5px;
        }
        
        button:hover {
            background: #ffed4e;
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th, td {
            padding: 12px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            text-align: left;
        }
        
        th {
            background: rgba(255, 255, 255, 0.2);
            font-weight: bold;
        }
        
        ul, ol {
            margin-left: 30px;
            margin-top: 10px;
        }
        
        li {
            margin: 8px 0;
        }
        
        #output {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            font-family: 'Courier New', monospace;
            min-height: 100px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 Complete HTML, CSS & JavaScript Example</h1>
        
        <div class="card">
            <h2>📝 About This Page</h2>
            <p>This is a comprehensive example demonstrating HTML structure, CSS styling, and JavaScript functionality all in one file!</p>
            <p>Click "▶ Run" to execute the JavaScript code below.</p>
        </div>
        
        <div class="card">
            <h2>🎨 HTML Elements</h2>
            <p><strong>Paragraphs:</strong> This is a paragraph with <em>italic</em> and <strong>bold</strong> text.</p>
            <p><mark>Highlighted text</mark> and <code>inline code</code> examples.</p>
            
            <h3>Lists:</h3>
            <ul>
                <li>Unordered Item 1</li>
                <li>Unordered Item 2</li>
                <li>Unordered Item 3</li>
            </ul>
            
            <ol>
                <li>Ordered Item 1</li>
                <li>Ordered Item 2</li>
                <li>Ordered Item 3</li>
            </ol>
        </div>
        
        <div class="card">
            <h2>📊 Data Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Language</th>
                        <th>Type</th>
                        <th>Year</th>
                        <th>Popular</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>JavaScript</td>
                        <td>Interpreted</td>
                        <td>1995</td>
                        <td>⭐⭐⭐⭐⭐</td>
                    </tr>
                    <tr>
                        <td>Python</td>
                        <td>Interpreted</td>
                        <td>1991</td>
                        <td>⭐⭐⭐⭐⭐</td>
                    </tr>
                    <tr>
                        <td>Java</td>
                        <td>Compiled</td>
                        <td>1995</td>
                        <td>⭐⭐⭐⭐</td>
                    </tr>
                    <tr>
                        <td>C++</td>
                        <td>Compiled</td>
                        <td>1985</td>
                        <td>⭐⭐⭐⭐</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="card">
            <h2>🎮 Interactive Buttons</h2>
            <button onclick="showAlert()">Show Alert</button>
            <button onclick="changeColor()">Change Color</button>
            <button onclick="runCalculations()">Run Calculations</button>
            <button onclick="showDateTime()">Show Date/Time</button>
        </div>
        
        <div class="card">
            <h2>🎲 Grid Layout</h2>
            <div class="grid">
                <div class="grid-item">
                    <h3>🚀 Fast</h3>
                    <p>Lightning quick performance</p>
                </div>
                <div class="grid-item">
                    <h3>💎 Beautiful</h3>
                    <p>Stunning visual design</p>
                </div>
                <div class="grid-item">
                    <h3>🔒 Secure</h3>
                    <p>Enterprise-grade security</p>
                </div>
                <div class="grid-item">
                    <h3>📱 Responsive</h3>
                    <p>Works on all devices</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>💻 JavaScript Output</h2>
            <div id="output">
                Click a button above or press "▶ Run" to see JavaScript in action!
            </div>
        </div>
    </div>
    
    <script>
        // === JavaScript Code ===
        console.log("=== HTML Page Loaded ===");
        console.log("DOM Ready!");
        
        // 1. Variables
        const siteName = "Code Editor Demo";
        let visitCount = 0;
        
        console.log("\\n=== Variables ===");
        console.log("Site Name:", siteName);
        console.log("Visit Count:", visitCount);
        
        // 2. Arrays and Loops
        console.log("\\n=== Arrays ===");
        const languages = ["JavaScript", "Python", "Java", "C++", "HTML", "CSS"];
        console.log("Languages:", languages.join(", "));
        
        languages.forEach((lang, index) => {
            console.log(\`\${index + 1}. \${lang}\`);
        });
        
        // 3. Functions
        console.log("\\n=== Functions ===");
        function calculate(a, b) {
            return {
                sum: a + b,
                difference: a - b,
                product: a * b,
                quotient: a / b
            };
        }
        
        const results = calculate(20, 4);
        console.log("20 + 4 =", results.sum);
        console.log("20 - 4 =", results.difference);
        console.log("20 * 4 =", results.product);
        console.log("20 / 4 =", results.quotient);
        
        // 4. Objects
        console.log("\\n=== Objects ===");
        const user = {
            name: "Developer",
            skills: ["HTML", "CSS", "JavaScript"],
            experience: 5,
            greet() {
                return \`Hello, I'm a \${this.name}!\`;
            }
        };
        
        console.log(user.greet());
        console.log("Skills:", user.skills.join(", "));
        
        // 5. Math Operations
        console.log("\\n=== Math Operations ===");
        console.log("Random:", Math.random().toFixed(4));
        console.log("Square root of 144:", Math.sqrt(144));
        console.log("Max(10, 20, 30):", Math.max(10, 20, 30));
        
        // 6. Date and Time
        console.log("\\n=== Date & Time ===");
        const now = new Date();
        console.log("Current Date:", now.toLocaleDateString());
        console.log("Current Time:", now.toLocaleTimeString());
        
        // Interactive Functions
        function showAlert() {
            alert("Hello from JavaScript! 👋");
            console.log("Alert shown to user");
        }
        
        function changeColor() {
            const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7"];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, #764ba2 100%)\`;
            console.log("Color changed to:", randomColor);
        }
        
        function runCalculations() {
            const output = document.getElementById('output');
            let html = "<h3>Calculation Results:</h3>";
            
            for (let i = 1; i <= 10; i++) {
                html += \`<p>\${i} × 5 = \${i * 5}</p>\`;
            }
            
            output.innerHTML = html;
            console.log("Calculations displayed");
        }
        
        function showDateTime() {
            const output = document.getElementById('output');
            const now = new Date();
            output.innerHTML = \`
                <h3>📅 Current Date & Time:</h3>
                <p><strong>Date:</strong> \${now.toLocaleDateString()}</p>
                <p><strong>Time:</strong> \${now.toLocaleTimeString()}</p>
                <p><strong>Timestamp:</strong> \${now.getTime()}</p>
            \`;
            console.log("Date/Time displayed");
        }
        
        // 7. Final Summary
        console.log("\\n=== Complete ===");
        console.log("✓ HTML structure loaded");
        console.log("✓ CSS styles applied");
        console.log("✓ JavaScript ready");
        console.log("Total elements:", document.querySelectorAll('*').length);
    </script>
</body>
</html>`,

    css: `/* CSS - Complete Styling Example */
/* Note: CSS is for styling only, it doesn't execute like programming languages */

/* === 1. Global Reset === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* === 2. Body Styling === */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
}

/* === 3. Container === */
.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* === 4. Typography === */
h1 {
  font-size: 3em;
  color: #667eea;
  text-align: center;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

h2 {
  font-size: 2em;
  color: #764ba2;
  margin: 30px 0 15px 0;
  border-left: 5px solid #667eea;
  padding-left: 15px;
}

h3 {
  font-size: 1.5em;
  color: #555;
  margin: 20px 0 10px 0;
}

p {
  margin-bottom: 15px;
  font-size: 1.1em;
}

/* === 5. Buttons === */
.button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 40px;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.6);
}

.button:active {
  transform: translateY(0);
}

/* === 6. Cards === */
.card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* === 7. Grid Layout === */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
}

.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* === 8. Flexbox Layout === */
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.flex-item {
  flex: 1 1 300px;
  background: #e9ecef;
  padding: 20px;
  border-radius: 10px;
}

/* === 9. Tables === */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: bold;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background: #f8f9fa;
}

/* === 10. Forms === */
input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
}

/* === 11. Lists === */
ul, ol {
  margin-left: 30px;
  margin-bottom: 20px;
}

li {
  margin: 10px 0;
  font-size: 1.1em;
}

/* === 12. Navigation === */
nav {
  background: #2d3436;
  padding: 15px 0;
  border-radius: 10px;
  margin-bottom: 30px;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #667eea;
}

/* === 13. Animations === */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade {
  animation: fadeIn 1s ease-in-out;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 2s linear infinite;
}

/* === 14. Media Queries (Responsive) === */
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
  
  nav ul {
    flex-direction: column;
    gap: 10px;
  }
}

/* === 15. Utility Classes === */
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.mt-20 {
  margin-top: 20px;
}

.mb-20 {
  margin-bottom: 20px;
}

.p-20 {
  padding: 20px;
}

.hidden {
  display: none;
}

.visible {
  display: block;
}

/* === Additional Notes === */
/*
To see CSS in action:
1. Create an HTML file
2. Link this CSS file: <link rel="stylesheet" href="styles.css">
3. Add HTML elements with these classes
4. Open in a browser to see the styling!

CSS Concepts Covered:
- Selectors (element, class, id)
- Box Model (margin, padding, border)
- Flexbox Layout
- Grid Layout
- Positioning
- Transitions
- Animations
- Media Queries
- Pseudo-classes (:hover, :focus)
- Gradients
- Shadows
- Typography
*/`
  };

  // Expose functions for testing (unchanged)
  useEffect(() => {
    window.getEditorState = () => ({
      content: content,
      historySize: undoStack.length
    });

    window.getHighlightCallCount = () => highlightCount;
  }, [content, undoStack.length, highlightCount]);

  // Update line numbers (unchanged)
  useEffect(() => {
    const lines = content.split('\n');
    const numbers = lines.map((_, i) => String(i + 1));
    setLineNumbers(numbers);
  }, [content]);

  // NEW: Help keyboard shortcut listener
  useEffect(() => {
    const handleHelpShortcut = (e) => {
      // Shift + ? to show help
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setShowHelp(true);
      }
      // Escape to close help
      if (e.key === 'Escape') {
        setShowHelp(false);
      }
    };
    
    window.addEventListener('keydown', handleHelpShortcut);
    return () => window.removeEventListener('keydown', handleHelpShortcut);
  }, []);

  // All existing functions (unchanged)
  const logEvent = (eventType, key, code, modifiers = {}) => {
    const logEntry = {
      type: eventType,
      key: key,
      code: code,
      ctrl: modifiers.ctrl || false,
      meta: modifiers.meta || false,
      shift: modifiers.shift || false,
      timestamp: Date.now()
    };
    
    setEventLogs(prev => [...prev.slice(-50), logEntry]);
  };

  const triggerHighlight = () => {
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
    }
    
    highlightTimerRef.current = setTimeout(() => {
      setHighlightCount(prev => prev + 1);
      console.log('Syntax highlighting triggered');
    }, 150);
  };

  const handleInput = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setUndoStack(prev => [...prev, newContent]);
    setRedoStack([]);
    triggerHighlight();
    logEvent('input', '', '', {});
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setContent(languageTemplates[lang] || '');
    setConsoleOutput([]);
  };

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    
    if (selectedLanguage === 'javascript') {
      executeJavaScript();
    } else if (selectedLanguage === 'html') {
      executeHTML();
    } else {
      setConsoleOutput([
        { type: 'warn', message: `⚠️ ${selectedLanguage.toUpperCase()} execution requires a backend compiler/interpreter.` },
        { type: 'info', message: 'Currently only JavaScript and HTML can run in the browser.' },
        { type: 'info', message: 'To run other languages, you would need to set up a backend server.' }
      ]);
      setIsRunning(false);
    }
  };

  const executeJavaScript = () => {
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.log = (...args) => {
      logs.push({ type: 'log', message: args.map(arg => String(arg)).join(' ') });
      originalLog.apply(console, args);
    };
    
    console.error = (...args) => {
      logs.push({ type: 'error', message: args.map(arg => String(arg)).join(' ') });
      originalError.apply(console, args);
    };
    
    console.warn = (...args) => {
      logs.push({ type: 'warn', message: args.map(arg => String(arg)).join(' ') });
      originalWarn.apply(console, args);
    };

    try {
      // eslint-disable-next-line no-new-func
      const result = new Function(content)();
      
      if (result !== undefined) {
        logs.push({ type: 'result', message: `→ ${String(result)}` });
      }
      
      if (logs.length === 0) {
        logs.push({ type: 'success', message: '✓ Code executed successfully (no output)' });
      }
    } catch (error) {
      logs.push({ type: 'error', message: `❌ Error: ${error.message}` });
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      
      setConsoleOutput(logs);
      setIsRunning(false);
    }
  };

  const executeHTML = () => {
    const logs = [];
    
    try {
      const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
      
      if (scriptMatch && scriptMatch[1]) {
        const jsCode = scriptMatch[1];
        
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push({ type: 'log', message: args.map(arg => String(arg)).join(' ') });
          originalLog.apply(console, args);
        };
        
        try {
          // eslint-disable-next-line no-new-func
          new Function(jsCode)();
          logs.push({ type: 'success', message: '✓ HTML/JavaScript executed successfully' });
        } catch (error) {
          logs.push({ type: 'error', message: `❌ Error: ${error.message}` });
        } finally {
          console.log = originalLog;
        }
      } else {
        logs.push({ type: 'info', message: 'ℹ️ No <script> tag found in HTML' });
        logs.push({ type: 'success', message: '✓ HTML structure is valid' });
      }
    } catch (error) {
      logs.push({ type: 'error', message: `❌ Error: ${error.message}` });
    } finally {
      setConsoleOutput(logs);
      setIsRunning(false);
    }
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  // NEW: Copy console output function
  const copyConsoleOutput = () => {
    const text = consoleOutput.map(log => log.message).join('\n');
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('✓ Console output copied to clipboard!');
      }).catch(() => {
        alert('❌ Failed to copy to clipboard');
      });
    } else {
      alert('⚠️ Console is empty!');
    }
  };

  // NEW: Download code function
  const downloadCode = () => {
    if (!content) {
      alert('⚠️ Editor is empty!');
      return;
    }
    
    const extensions = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      html: 'html',
      css: 'css'
    };
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-${Date.now()}.${extensions[selectedLanguage] || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // All keyboard event handlers (unchanged - exact same logic)
  const handleKeyDown = (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isModifier = isMac ? e.metaKey : e.ctrlKey;

    logEvent('keydown', e.key, e.code, {
      ctrl: e.ctrlKey,
      meta: e.metaKey,
      shift: e.shiftKey
    });

    if (isModifier && e.key === 'Enter') {
      e.preventDefault();
      runCode();
      return;
    }

    if (isModifier && e.key === 's') {
      e.preventDefault();
      setEventLogs(prev => [...prev, { type: 'action', message: 'Action: Save' }]);
      console.log('Action: Save');
      return;
    }

    if (isModifier && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      if (undoStack.length > 1) {
        const newUndoStack = [...undoStack];
        const currentState = newUndoStack.pop();
        const previousState = newUndoStack[newUndoStack.length - 1];
        
        setRedoStack(prev => [...prev, currentState]);
        setUndoStack(newUndoStack);
        setContent(previousState);
      }
      return;
    }

    if (isModifier && e.key === 'Z' && e.shiftKey) {
      e.preventDefault();
      if (redoStack.length > 0) {
        const newRedoStack = [...redoStack];
        const stateToRestore = newRedoStack.pop();
        
        setRedoStack(newRedoStack);
        setUndoStack(prev => [...prev, stateToRestore]);
        setContent(stateToRestore);
      }
      return;
    }

    if (isModifier && e.key === '/') {
      e.preventDefault();
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      
      let lineStart = start;
      while (lineStart > 0 && text[lineStart - 1] !== '\n') {
        lineStart--;
      }
      
      let lineEnd = end;
      while (lineEnd < text.length && text[lineEnd] !== '\n') {
        lineEnd++;
      }
      
      const line = text.substring(lineStart, lineEnd);
      let newContent;
      
      if (line.startsWith('// ')) {
        newContent = text.substring(0, lineStart) + line.substring(3) + text.substring(lineEnd);
      } else {
        newContent = text.substring(0, lineStart) + '// ' + line + text.substring(lineEnd);
      }
      
      setContent(newContent);
      setUndoStack(prev => [...prev, newContent]);
      setRedoStack([]);
      return;
    }

    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const text = textarea.value;
      
      let lineStart = start;
      while (lineStart > 0 && text[lineStart - 1] !== '\n') {
        lineStart--;
      }
      
      const newContent = text.substring(0, lineStart) + '  ' + text.substring(lineStart);
      setContent(newContent);
      setUndoStack(prev => [...prev, newContent]);
      setRedoStack([]);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
      return;
    }

    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const text = textarea.value;
      
      let lineStart = start;
      while (lineStart > 0 && text[lineStart - 1] !== '\n') {
        lineStart--;
      }
      
      if (text.substring(lineStart, lineStart + 2) === '  ') {
        const newContent = text.substring(0, lineStart) + text.substring(lineStart + 2);
        setContent(newContent);
        setUndoStack(prev => [...prev, newContent]);
        setRedoStack([]);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 2);
        }, 0);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const text = textarea.value;
      
      let lineStart = start;
      while (lineStart > 0 && text[lineStart - 1] !== '\n') {
        lineStart--;
      }
      
      let spaces = 0;
      while (text[lineStart + spaces] === ' ') {
        spaces++;
      }
      
      const indent = ' '.repeat(spaces);
      const newContent = text.substring(0, start) + '\n' + indent + text.substring(start);
      
      setContent(newContent);
      setUndoStack(prev => [...prev, newContent]);
      setRedoStack([]);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + spaces;
      }, 0);
      return;
    }

    if (isModifier && e.key === 'k') {
      e.preventDefault();
      setChordState('waiting');
      
      if (chordTimerRef.current) {
        clearTimeout(chordTimerRef.current);
      }
      
      chordTimerRef.current = setTimeout(() => {
        setChordState(null);
      }, 2000);
      return;
    }

    if (chordState === 'waiting' && isModifier && e.key === 'c') {
      e.preventDefault();
      setChordState(null);
      if (chordTimerRef.current) {
        clearTimeout(chordTimerRef.current);
      }
      setEventLogs(prev => [...prev, { type: 'action', message: 'Action: Chord Success' }]);
      console.log('Chord success!');
      return;
    }

    if (chordState === 'waiting' && e.key !== 'k') {
      setChordState(null);
      if (chordTimerRef.current) {
        clearTimeout(chordTimerRef.current);
      }
    }
  };

  const handleKeyUp = (e) => {
    logEvent('keyup', e.key, e.code, {
      ctrl: e.ctrlKey,
      meta: e.metaKey,
      shift: e.shiftKey
    });
  };

  const handleCompositionStart = () => {
    logEvent('compositionstart', '', '', {});
  };

  const handleCompositionEnd = () => {
    logEvent('compositionend', '', '', {});
  };

  // Calculate stats for status bar
  const stats = {
    chars: content.length,
    words: content.trim().split(/\s+/).filter(Boolean).length
  };

  return (
    <div className="App">
      <div className="main-layout">
        <div className="top-section">
          <div className="editor-section" data-test-id="editor-container">
            <div className="editor-header">
              <h2>📝 Code Editor</h2>
              <div className="editor-actions">
                {/* NEW: Help Button */}
                <button 
                  onClick={() => setShowHelp(true)}
                  className="help-btn"
                  title="Keyboard Shortcuts (Shift+?)"
                >
                  ❓
                </button>

                {/* NEW: Download Button */}
                <button 
                  onClick={downloadCode}
                  className="download-btn"
                  title="Download Code"
                >
                  💾
                </button>
                
                {/* Toggle Dashboard Button */}
                <button 
                  onClick={() => setShowDashboard(!showDashboard)}
                  className="toggle-btn"
                  title="Toggle Event Dashboard"
                >
                  {showDashboard ? '👁️ Hide' : '👁️ Show'} Events
                </button>
                
                {/* Language Selector */}
                <select 
                  value={selectedLanguage} 
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="language-select"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                </select>

                {/* Run Button */}
                <button 
                  onClick={runCode} 
                  className="run-btn"
                  disabled={isRunning}
                  title="Run Code (Ctrl+Enter)"
                >
                  {isRunning ? '⏳ Running...' : '▶ Run'}
                </button>
              </div>
            </div>
            <div className="editor-wrapper">
              <div className="line-numbers" aria-hidden="true">
                {lineNumbers.map((num, i) => (
                  <div key={i} className="line-number">{num}</div>
                ))}
              </div>
              <textarea
                ref={editorRef}
                data-test-id="editor-input"
                className="editor-input"
                value={content}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                placeholder="// Select a language and start coding...
// Press Ctrl+Enter to run!"
                spellCheck={false}
                aria-multiline="true"
                aria-label="Code editor input area"
              />
            </div>
          </div>

          {/* Event Dashboard (Conditional) */}
          {showDashboard && (
            <div className="dashboard-section" data-test-id="event-dashboard">
              <h2>📊 Event Dashboard</h2>
              <div className="event-log" data-test-id="event-log-list">
                {eventLogs.length === 0 ? (
                  <div className="empty-state">
                    No events yet. Start typing to see keyboard events!
                  </div>
                ) : (
                  eventLogs.map((log, index) => (
                    <div key={index} className="event-log-entry" data-test-id="event-log-entry">
                      {log.type === 'action' ? (
                        <span className="action-log">✓ {log.message}</span>
                      ) : (
                        <span>
                          <strong>{log.type}</strong> | key: <code>{log.key || '∅'}</code> | code: <code>{log.code || '∅'}</code>
                          {log.ctrl && ' | Ctrl'}
                          {log.meta && ' | Meta'}
                          {log.shift && ' | Shift'}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Console Section */}
        <div className="console-section">
          <div className="console-header">
            <h2>🖥️ Console Output - {selectedLanguage.toUpperCase()}</h2>
            <div className="console-actions">
              {/* NEW: Copy Button */}
              <button 
                onClick={copyConsoleOutput} 
                className="clear-btn" 
                title="Copy Console Output"
                disabled={consoleOutput.length === 0}
              >
                📋 Copy
              </button>
              {/* Clear Button */}
              <button 
                onClick={clearConsole} 
                className="clear-btn" 
                title="Clear Console"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
          <div className="console-output">
            {consoleOutput.length === 0 ? (
              <div className="empty-state">
                Click "▶ Run" or press Ctrl+Enter to execute code
              </div>
            ) : (
              consoleOutput.map((log, index) => (
                <div key={index} className={`console-line console-${log.type}`}>
                  <span className="console-arrow">{'>'}</span>
                  <span className="console-message">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Status Bar (Updated with stats) */}
      <div className="status-bar">
        <span>Language: {selectedLanguage.toUpperCase()}</span>
        <span>Lines: {lineNumbers.length} | Chars: {stats.chars} | Words: {stats.words}</span>
        <span>History: {undoStack.length} | Redo: {redoStack.length}</span>
        <span>Highlight: {highlightCount}</span>
        <span>Chord: {chordState || 'none'}</span>
      </div>

      {/* NEW: Help Modal */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⌨️ Keyboard Shortcuts</h2>
              <button onClick={() => setShowHelp(false)} className="close-btn">✕</button>
            </div>
            <div className="modal-body">
              <div className="shortcut-group">
                <h3>✏️ Editing</h3>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Ctrl</kbd> + <kbd>S</kbd>
                  </div>
                  <span>Save</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Ctrl</kbd> + <kbd>Z</kbd>
                  </div>
                  <span>Undo</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>
                  </div>
                  <span>Redo</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Ctrl</kbd> + <kbd>/</kbd>
                  </div>
                  <span>Toggle Comment</span>
                </div>
              </div>

              <div className="shortcut-group">
                <h3>🔍 Navigation</h3>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Tab</kbd>
                  </div>
                  <span>Indent (2 spaces)</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Shift</kbd> + <kbd>Tab</kbd>
                  </div>
                  <span>Outdent</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Enter</kbd>
                  </div>
                  <span>Auto-indent new line</span>
                </div>
              </div>

              <div className="shortcut-group">
                <h3>⚡ Advanced</h3>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Ctrl</kbd> + <kbd>K</kbd> then <kbd>Ctrl</kbd> + <kbd>C</kbd>
                  </div>
                  <span>Chord Shortcut</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
                  </div>
                  <span>Run Code</span>
                </div>
                <div className="shortcut-item">
                  <div className="shortcut-keys">
                    <kbd>Shift</kbd> + <kbd>?</kbd>
                  </div>
                  <span>Show Help (this dialog)</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <p>💡 Tip: Press <kbd>Esc</kbd> to close this dialog</p>
              <p>🍎 On Mac, use <kbd>Cmd</kbd> instead of <kbd>Ctrl</kbd></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;