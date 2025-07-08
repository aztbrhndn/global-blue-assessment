# User Story 1

## Setup Instructions

### Prerequisites

- Node.js
- npm

### Installation

1. **Install Server Dependencies**

   ```bash
   cd server
   npm install
   ```

2. **Install Client Dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Create Environment File**

   ```bash
   cp .env.example .env
   ```

4. **Start the Server**

   ```bash
   cd server
   npm start
   ```

   The server will run on `http://localhost:3001`

5. **Start the Client**
   ```bash
   cd ../client
   npm start
   ```
   The client will run on `http://localhost:3000`

### Positive Test Cases

1. **Parentheses**

   - Input: `(2 + 3) * 4`
   - Expected Output: `20`

2. **Operator Precedence**

   - Input: `2 + 3 * 4`
   - Expected Output: `14`

### Negative Test Cases

1. **Invalid Expression**

   - Input: `2 + + 3`
   - Expected Output: Error message about invalid expression

2. **Invalid API Key**

   - Request with wrong API key
   - Expected Output: 403 error with message "Invalid API key"

3. **Empty Expression**
   - Input: `` (empty string)
   - Expected Output: Error message about missing expression

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a mathematical expression in the input field
3. Make sure the API key is filled in (default key is pre-filled)
4. Click "Calculate" to get the result
5. The result will be displayed below the form

