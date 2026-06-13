import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);
    const [history, setHistory] = useState([]);

    const handleNumberClick = (num) => {
        if (waitingForNewValue) {
            setDisplay(String(num));
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const handleDecimal = () => {
        if (waitingForNewValue) {
            setDisplay('0.');
            setWaitingForNewValue(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperation = (op) => {
        const currentValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(currentValue);
        } else if (operation) {
            const result = calculate(previousValue, currentValue, operation);
            setDisplay(String(result));
            setPreviousValue(result);
        }

        setOperation(op);
        setWaitingForNewValue(true);
    };

    const calculate = (prev, current, op) => {
        switch (op) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '*':
                return prev * current;
            case '/':
                return current === 0 ? 0 : prev / current;
            case '%':
                return prev % current;
            default:
                return current;
        }
    };

    const handleEquals = () => {
        if (operation && previousValue !== null) {
            const currentValue = parseFloat(display);
            const result = calculate(previousValue, currentValue, operation);

            // Add to history
            const historyEntry = `${previousValue} ${operation} ${currentValue} = ${result}`;
            setHistory([historyEntry, ...history.slice(0, 9)]);

            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForNewValue(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
    };

    const handleBackspace = () => {
        if (display.length === 1) {
            setDisplay('0');
        } else {
            setDisplay(display.slice(0, -1));
        }
    };

    const handleClearHistory = () => {
        setHistory([]);
    };

    return (
        <div className="calculator-container">
            <div className="calculator-main">
                <div className="calculator-header">
                    <h1>🧮 Calculator</h1>
                </div>

                <div className="display-area">
                    <div className="display">{display}</div>
                    {operation && previousValue !== null && (
                        <div className="operation-info">
                            {previousValue} {operation}
                        </div>
                    )}
                </div>

                <div className="buttons-grid">
                    {/* Row 1: Clear and Operations */}
                    <button className="btn btn-clear" onClick={handleClear}>
                        C
                    </button>
                    <button className="btn btn-backspace" onClick={handleBackspace}>
                        ⌫
                    </button>
                    <button
                        className={`btn btn-operation ${operation === '%' ? 'active' : ''}`}
                        onClick={() => handleOperation('%')}
                    >
                        %
                    </button>
                    <button
                        className={`btn btn-operation ${operation === '/' ? 'active' : ''}`}
                        onClick={() => handleOperation('/')}
                    >
                        ÷
                    </button>

                    {/* Row 2: 7, 8, 9 */}
                    <button className="btn" onClick={() => handleNumberClick(7)}>
                        7
                    </button>
                    <button className="btn" onClick={() => handleNumberClick(8)}>
                        8
                    </button>
                    <button className="btn" onClick={() => handleNumberClick(9)}>
                        9
                    </button>
                    <button
                        className={`btn btn-operation ${operation === '*' ? 'active' : ''}`}
                        onClick={() => handleOperation('*')}
                    >
                        ×
                    </button>

                    {/* Row 3: 4, 5, 6 */}
                    <button className="btn" onClick={() => handleNumberClick(4)}>
                        4
                    </button>
                    <button className="btn" onClick={() => handleNumberClick(5)}>
                        5
                    </button>
                    <button className="btn" onClick={() => handleNumberClick(6)}>
                        6
                    </button>
                    <button
                        className={`btn btn-operation ${operation === '-' ? 'active' : ''}`}
                        onClick={() => handleOperation('-')}
                    >
                        −
                    </button>

                    {/* Row 4: 1, 2, 3 */}
                    <button className="btn" onClick={() => handleNumberClick(1)}>
                        1
                    </button>
                    <button className="btn" onClick={() => handleNumberClick(2)}>
                        2
                    </button>
                    <button className="btn" onClick={() => handleNumberClick(3)}>
                        3
                    </button>
                    <button
                        className={`btn btn-operation ${operation === '+' ? 'active' : ''}`}
                        onClick={() => handleOperation('+')}
                    >
                        +
                    </button>

                    {/* Row 5: 0, Decimal, Equals */}
                    <button className="btn btn-zero" onClick={() => handleNumberClick(0)}>
                        0
                    </button>
                    <button className="btn" onClick={handleDecimal}>
                        .
                    </button>
                    <button className="btn btn-equals" onClick={handleEquals}>
                        =
                    </button>
                </div>
            </div>

            {/* History Panel */}
            <div className="history-panel">
                <div className="history-header">
                    <h2>📋 History</h2>
                    {history.length > 0 && (
                        <button className="btn-clear-history" onClick={handleClearHistory}>
                            Clear
                        </button>
                    )}
                </div>
                <div className="history-list">
                    {history.length === 0 ? (
                        <div className="history-empty">No calculations yet</div>
                    ) : (
                        history.map((entry, index) => (
                            <div key={index} className="history-item">
                                {entry}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
