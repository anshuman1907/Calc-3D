import React, { useState, useEffect, useRef } from 'react';
import './CalculatorTable.css';

const CalculatorTable = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);
    const [history, setHistory] = useState([]);
    // Rotation state for both axes (allow 4-side rotation)
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);

    // Drag-to-rotate state (disable continuous auto-rotation)
    const draggingRef = useRef(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const startRotationXRef = useRef(0);
    const startRotationYRef = useRef(0);

    // Helper to get clientX for mouse/touch
    const getClientX = (e) => (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    const getClientY = (e) => (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;

    const handlePointerDown = (e) => {
        // start dragging
        draggingRef.current = true;
        startXRef.current = getClientX(e);
        startYRef.current = getClientY(e);
        startRotationXRef.current = rotationX;
        startRotationYRef.current = rotationY;
        // prevent text selection while dragging
        document.body.style.userSelect = 'none';
        // show grabbing cursor
        document.body.style.cursor = 'grabbing';
        // prevent default touch behavior
        if (e.touches) e.preventDefault();
    };

    // Attach global listeners for move/up so dragging works even if mouse leaves element
    useEffect(() => {
        const moveHandler = (e) => {
            if (!draggingRef.current) return;
            const clientX = getClientX(e);
            const clientY = getClientY(e);
            const deltaX = clientX - startXRef.current;
            const deltaY = clientY - startYRef.current;
            const sensitivityX = 0.45; // degrees per pixel horizontal
            const sensitivityY = 0.35; // degrees per pixel vertical

            // Horizontal drag -> rotate Y axis
            const newRotY = (startRotationYRef.current + deltaX * sensitivityX) % 360;
            // Vertical drag -> rotate X axis (invert so dragging down rotates forward)
            const newRotX = (startRotationXRef.current - deltaY * sensitivityY) % 360;

            setRotationY(((newRotY % 360) + 360) % 360);
            setRotationX(((newRotX % 360) + 360) % 360);

            // prevent scrolling while touch-dragging
            if (e.touches) e.preventDefault();
        };

        const upHandler = () => {
            if (!draggingRef.current) return;
            draggingRef.current = false;
            document.body.style.userSelect = '';
            // reset cursor
            document.body.style.cursor = '';
        };

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
        window.addEventListener('touchmove', moveHandler, { passive: false });
        window.addEventListener('touchend', upHandler);

        return () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
            window.removeEventListener('touchmove', moveHandler);
            window.removeEventListener('touchend', upHandler);
        };
    }, []);

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
        <div className="table-container">
            <div className="bg-math-deco" aria-hidden="true">
                <span className="math-symbol">+</span>
                <span className="math-symbol">−</span>
                <span className="math-symbol">×</span>
                <span className="math-symbol">÷</span>
                <span className="math-symbol">=</span>
                <span className="math-symbol">%</span>
            </div>
            {/* Rotating Table Background */}
            <div className="rotating-table-wrapper">
                <div
                    className="rotating-table"
                    onMouseDown={handlePointerDown}
                    onTouchStart={handlePointerDown}
                    style={{
                        transform: `perspective(1000px) scale(0.8) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                    }}
                >
                    {/* Reset rotation button (overlaid) */}
                    <button
                        className="reset-rotation-btn"
                        onClick={() => { setRotationX(0); setRotationY(0); }}
                        aria-label="Reset rotation"
                        title="Reset rotation"
                    >
                        ⟳
                    </button>
                    {/* Front of table */}
                    <div className="table-face table-front ">
                        <div className="table-content">
                            <div className="main-area">
                                {/* Top Section - Display */}
                                <div className="calculator-top">
                                    <h1 className="calculator-title">🧮 CALCULATOR</h1>
                                    <div className="display-area-table">
                                        <div className="display-table">{display}</div>
                                        {operation && previousValue !== null && (
                                            <div className="operation-info-table">
                                                {previousValue} <span className="op-symbol">{operation}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Middle Section - Buttons */}
                                <div className="buttons-grid-table">
                                    {/* Row 1 */}
                                    <button className="btn-table btn-clear" onClick={handleClear}>C</button>
                                    <button className="btn-table btn-backspace" onClick={handleBackspace}>⌫</button>
                                    <button className={`btn-table btn-operation ${operation === '%' ? 'active' : ''}`} onClick={() => handleOperation('%')}>%</button>
                                    <button className={`btn-table btn-operation ${operation === '/' ? 'active' : ''}`} onClick={() => handleOperation('/')}>/</button>

                                    {/* Row 2 */}
                                    <button className="btn-table" onClick={() => handleNumberClick(7)}>7</button>
                                    <button className="btn-table" onClick={() => handleNumberClick(8)}>8</button>
                                    <button className="btn-table" onClick={() => handleNumberClick(9)}>9</button>
                                    <button className={`btn-table btn-operation ${operation === '*' ? 'active' : ''}`} onClick={() => handleOperation('*')}>×</button>

                                    {/* Row 3 */}
                                    <button className="btn-table" onClick={() => handleNumberClick(4)}>4</button>
                                    <button className="btn-table" onClick={() => handleNumberClick(5)}>5</button>
                                    <button className="btn-table" onClick={() => handleNumberClick(6)}>6</button>
                                    <button className={`btn-table btn-operation ${operation === '-' ? 'active' : ''}`} onClick={() => handleOperation('-')}>−</button>

                                    {/* Row 4 */}
                                    <button className="btn-table" onClick={() => handleNumberClick(1)}>1</button>
                                    <button className="btn-table" onClick={() => handleNumberClick(2)}>2</button>
                                    <button className="btn-table" onClick={() => handleNumberClick(3)}>3</button>
                                    <button className={`btn-table btn-operation ${operation === '+' ? 'active' : ''}`} onClick={() => handleOperation('+')}>+</button>

                                    {/* Row 5 */}
                                    <button className="btn-table btn-zero" onClick={() => handleNumberClick(0)}>0</button>
                                    <button className="btn-table" onClick={handleDecimal}>.</button>
                                    <button className="btn-table btn-equals" onClick={handleEquals}>=</button>
                                </div>

                            </div>

                            {/* Right Side - History */}
                            <div className="side-area">
                                <div className="history-section-table">
                                    <h3>📋 History</h3>
                                    <div className="history-list-table">
                                        {history.length === 0 ? (
                                            <div className="history-empty-table">No calculations</div>
                                        ) : (
                                            history.map((entry, index) => (
                                                <div key={index} className="history-item-table">
                                                    {entry}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {history.length > 0 && (
                                        <button className="btn-clear-history-table" onClick={handleClearHistory}>
                                            Clear
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back of table - Mirror */}
                    <div className="table-face table-back">
                        <div className=""> Anshuman Calulator</div>
                    </div>


                </div>
            </div>

            {/* Glow effect light */}
            <div className="glow-light"></div>
        </div>
    );
};

export default CalculatorTable;
