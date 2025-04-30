import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import {
  E_OPERATION,
  TCalculatorButton,
  CALCULATOR_BUTTONS,
  KEY_MAPPINGS,
  CALCULATOR_LAYOUT,
} from './types/calculator';
import { Executor, Lexer, Parser, TNode, TToken } from './calculator';

const CalculatorApp = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const compute = useCallback(
    async () =>
      new Promise<string>((resolve, reject) => {
        let tokens: Array<TToken>;
        let tree: TNode;
        let executionResult: string;

        try {
          const lexer = new Lexer(expression);
          tokens = lexer.tokenize();
          console.log(tokens);
        } catch (error) {
          reject(error);
          return;
        }

        try {
          const parser = new Parser(tokens);
          tree = parser.parse();
        } catch (error) {
          reject(error);
          return;
        }

        try {
          const executor = new Executor();
          executionResult = executor.execute(tree);
        } catch (error) {
          reject(error);
          return;
        }

        resolve(executionResult);
      }),
    [expression]
  );

  useEffect(() => {
    if (expression) {
      try {
        compute()
          .then((r) => setResult(r))
          .catch((e) => {
            console.error(e);
            setResult(e);
          });
      } catch {
        setResult('Error');
      }
    } else {
      setResult('');
    }
  }, [compute, expression]);

  const handleButtonClick = (button: TCalculatorButton) => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();

    const currentPos = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;

    const currentValue = input.value;
    let newExp = currentValue;
    let newCursorPos = currentPos;

    if (button.operation === E_OPERATION.CLEAR) {
      newExp = '';
      newCursorPos = 0;
      setResult(' ');
    } else if (button.operation === E_OPERATION.DELETE) {
      if (currentPos === 0) return;
      newExp =
        currentValue.slice(0, currentPos - 1) +
        currentValue.slice(selectionEnd);
      newCursorPos = currentPos - 1;
    } else if (button.operation === E_OPERATION.EQUALS) {
      try {
        compute()
          .then((r) => setResult(r))
          .catch((e) => {
            console.error(e);
            setResult(e);
          });
      } catch {
        const errorMsg = 'Error';
        newExp = errorMsg;
        newCursorPos = errorMsg.length;
        setResult(errorMsg);
      }
    } else {
      const insertText =
        button.operation === E_OPERATION.SPACE ? ' ' : button.display;
      newExp =
        currentValue.slice(0, currentPos) +
        insertText +
        currentValue.slice(selectionEnd);
      newCursorPos = currentPos + insertText.length;
    }

    input.value = newExp;
    input.setSelectionRange(newCursorPos, newCursorPos);

    setExpression(newExp);
  };

  // const profile = () => {};

  const handleKeyDown = (event: globalThis.KeyboardEvent) => {
    const mapping = KEY_MAPPINGS.find((m) => m.key === event.key);
    if (mapping) {
      event.preventDefault();
      handleButtonClick(mapping.button);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const findButton = (value: E_OPERATION | string): TCalculatorButton => {
    const button = CALCULATOR_BUTTONS.find(
      (btn) => btn.value === value || btn.operation === value
    );
    if (!button) throw new Error(`Button not  found: ${value}`);
    return button;
  };

  const baseButtons = CALCULATOR_LAYOUT.basic.map(findButton);
  const extendedFunctions = CALCULATOR_LAYOUT.extended.map(findButton);
  const scientificFunctions = CALCULATOR_LAYOUT.scientific.map(findButton);

  const renderBasicButtons = () => (
    <div className="grid grid-cols-3 gap-2">
      {baseButtons.map((btn) => (
        <Button
          key={btn.value}
          variant="outlined"
          className="h-16"
          size="large"
          onClick={() => handleButtonClick(btn)}
          sx={{
            fontSize: '32px',
          }}
        >
          {btn.display}
        </Button>
      ))}
    </div>
  );

  const renderExtendedButtons = () => (
    <div className="grid grid-cols-1 gap-2">
      {extendedFunctions.map((btn) => (
        <Button
          key={btn.value}
          variant="outlined"
          className="h-16"
          color="info"
          onClick={() => handleButtonClick(btn)}
          sx={{
            fontSize: '32px',
          }}
        >
          {btn.display}
        </Button>
      ))}
    </div>
  );

  const renderScientificButtons = () => (
    <div className="grid grid-cols-1 gap-2">
      {scientificFunctions.map((btn) => (
        <Button
          key={btn.value}
          variant="contained"
          color="secondary"
          className="h-16 text-xl"
          onClick={() => handleButtonClick(btn)}
          sx={{
            fontSize: '32px',
            textTransform: 'inherit',
          }}
        >
          {btn.display}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-purple-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Stack spacing={2}>
            <Typography variant="h4" className="text-purple-800 mb-4">
              Calculator
            </Typography>

            <Stack direction="row" spacing={1}>
              <TextField
                label="Expression"
                focused={!!expression}
                variant="outlined"
                fullWidth
                inputRef={inputRef}
                onChange={(e) => setExpression(e.target.value)}
                value={expression}
                autoComplete={'off'}
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  handleButtonClick(
                    CALCULATOR_BUTTONS.find(
                      (btn) => btn.operation === E_OPERATION.EQUALS
                    )!
                  )
                }
                sx={{
                  paddingX: '16px',
                  fontSize: '24px',
                }}
              >
                {E_OPERATION.EQUALS}
              </Button>
            </Stack>

            <TextField
              label="Result"
              fullWidth
              variant="outlined"
              value={result}
            />
            <div className="grid grid-cols-5 gap-2 last:gap-6">
              <div className="col-span-3">{renderBasicButtons()}</div>
              <div>{renderExtendedButtons()}</div>
              <div>{renderScientificButtons()}</div>
            </div>
          </Stack>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Stack spacing={2}>
            <Typography variant="h4" className="text-purple-800 mb-4">
              Help
            </Typography>

            <Stack spacing={0}>
              <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Basic Functions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <b>Addition (+): Add two numbers.</b>
                  <br />
                  Example: 2 + 3 = 5
                </AccordionDetails>
                <AccordionDetails>
                  <b>Subtraction (-): Subtract one number from another.</b>
                  <br /> Example: 5 - 2 = 3
                </AccordionDetails>

                <AccordionDetails>
                  <b>Multiplication (*): Multiply two numbers.</b>
                  <br /> Example: 4 * 3 = 12
                </AccordionDetails>

                <AccordionDetails>
                  <b>Division (/): Divide one number by another.</b>
                  <br /> Example: 8 / 2 = 4
                </AccordionDetails>

                <AccordionDetails>
                  Simply enter the first number, select the operator, enter the
                  second number, and press =.
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Additional Functions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Square Root (√)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="list-disc pl-4">
                        <li>Click the √ button to switch to root mode.</li>
                        <li>
                          Enter the degree of the root (e.g., 2 for square
                          root).
                        </li>
                        <li>Enter the number you want to find the root of.</li>
                      </ul>
                      <br /> <strong>Example:</strong> √(2, 4) = 2
                    </AccordionDetails>
                  </Accordion>

                  <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Power Function (^)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="list-disc">
                        <li> Enter the base number. </li>
                        <li> Enter the exponent. </li>
                        <li> Click the ^ button. </li>
                      </ul>
                      <br /> <strong>Example:</strong> 3 ^ 4 = 81
                    </AccordionDetails>
                  </Accordion>

                  <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Factorial Function (!)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="list-disc">
                        <li> Enter a non-negative integer.</li>
                        <li> Click the ! button.</li>
                      </ul>
                      <br /> <strong>Example:</strong> 5! = 120
                    </AccordionDetails>
                  </Accordion>

                  <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Standard Deviation Function (σ)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul className="list-disc">
                        <li> Click the σ button.</li>
                        <li>
                          {' '}
                          Enter a series of numbers separated by commas (,){' '}
                        </li>
                      </ul>
                      <br /> <strong>Example:</strong> σ(2, 4, 4, 4, 5, 5, 7, 9)
                      = 2
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
