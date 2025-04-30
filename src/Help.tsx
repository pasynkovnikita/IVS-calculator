import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const HelpSection = () => (
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
            Simply enter the first number, select the operator, enter the second
            number, and press =.
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
                    Enter the degree of the root (e.g., 2 for square root).
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
                  <li> Enter a series of numbers separated by commas (,) </li>
                </ul>
                <br /> <strong>Example:</strong> σ(2, 4, 4, 4, 5, 5, 7, 9) = 2
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  </div>
);

export default HelpSection;
