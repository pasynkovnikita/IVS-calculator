import { useState } from 'react';
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

const CalculatorApp = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === 'AC') {
      setExpression('');
      setResult('');
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const computeResult = () => {
    try {
      // TODO: update with actual calculator lib when ready
      const evalResult = eval(expression);
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };
  const baseButtons = [
    '(',
    ')',
    'del',
    '7',
    '8',
    '9',
    '4',
    '5',
    '6',
    '1',
    '2',
    '3',
    'AC',
    '0',
    '.',
  ];

  const extendedFunctions = ['÷', '×', '-', '+'];

  const scientificFunctions = ['√', '^', '!', 'σ'];

  const renderBasicButtons = () => (
    <div className="grid grid-cols-3 gap-2">
      {baseButtons.map((btn) => (
        <Button
          key={btn}
          variant="outlined"
          className="h-16"
          size="large"
          onClick={() => handleButtonClick(btn)}
          sx={{
            fontSize: '32px',
          }}
        >
          {btn}
        </Button>
      ))}
    </div>
  );

  const renderExtendedButtons = () => (
    <div className="grid grid-cols-1 gap-2">
      {extendedFunctions.map((btn) => (
        <Button
          key={btn}
          variant="outlined"
          className="h-16"
          color="info"
          onClick={() => handleButtonClick(btn)}
          sx={{
            fontSize: '32px',
          }}
        >
          {btn}
        </Button>
      ))}
    </div>
  );

  const renderScientificButtons = () => (
    <div className="grid grid-cols-1 gap-2">
      {scientificFunctions.map((btn) => (
        <Button
          key={btn}
          variant="contained"
          color="secondary"
          className="h-16 text-xl"
          onClick={() => handleButtonClick(btn)}
          sx={{
            fontSize: '32px',
          }}
        >
          {btn}
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
                variant="outlined"
                value={expression}
                fullWidth
                onChange={(e) => setExpression(e.target.value)}
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={computeResult}
                sx={{
                  paddingX: '16px',
                  fontSize: '24px',
                }}
              >
                =
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
                  </Accordion>

                  <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Power Function (^)</Typography>
                    </AccordionSummary>
                  </Accordion>

                  <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Factorial Function (!)</Typography>
                    </AccordionSummary>
                  </Accordion>

                  <Accordion disableGutters>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Standard Deviation Function (σ)</Typography>
                    </AccordionSummary>
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
