class MathCalculator {
    constructor() {
        this.apiUrl = 'http://localhost:3001/api';
        this.initializeElements();
        this.attachEventListeners();
    }
    
    initializeElements() {
        this.expressionInput = document.getElementById('expression');
        this.apiKeyInput = document.getElementById('apiKey');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resultContainer = document.getElementById('result');
        this.resultValue = document.getElementById('resultValue');
        this.errorContainer = document.getElementById('error');
        this.errorMessage = document.getElementById('errorMessage');
    }
    
    attachEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        this.expressionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculate();
            }
        });
        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculate();
            }
        });
    }
    
    async calculate() {
        const expression = this.expressionInput.value.trim();
        const apiKey = this.apiKeyInput.value.trim();
        
        if (!expression) {
            this.showError('Please enter a mathematical expression');
            return;
        }
        
        if (!apiKey) {
            this.showError('Please enter your API key');
            return;
        }
        
        this.setLoading(true);
        this.hideError();
        
        try {
            const response = await fetch(`${this.apiUrl}/calculate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: JSON.stringify({ expression })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                this.showResult(data.result, data.expression);
            } else {
                this.showError(data.message || 'Calculation failed');
            }
        } catch (error) {
            this.showError('Network error: Unable to connect to the server');
        } finally {
            this.setLoading(false);
        }
    }
    
    showResult(result, expression) {
        this.resultValue.textContent = `${expression} = ${result}`;
        this.resultContainer.classList.remove('hidden');
        this.hideError();
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorContainer.classList.remove('hidden');
        this.resultContainer.classList.add('hidden');
    }
    
    hideError() {
        this.errorContainer.classList.add('hidden');
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            this.calculateBtn.disabled = true;
            this.calculateBtn.textContent = 'Calculating...';
            this.resultValue.textContent = 'Calculating...';
        } else {
            this.calculateBtn.disabled = false;
            this.calculateBtn.textContent = 'Calculate';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MathCalculator();
});