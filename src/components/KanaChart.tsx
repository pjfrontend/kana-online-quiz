import React from 'react';
import {Box, Typography} from '@mui/material';
import {useKanaChart} from '../hooks/useKanaChart';

export const KanaChart: React.FC = () => {
  const {kanaChart, columnMax, rowMax, getKanaByColumnRow} = useKanaChart();

  return (
    <>
      {Array.from(Array(rowMax).keys()).map((row: number) => {
        return (
          <Box key={`row-${row}`} display="flex" flexDirection="row">
            <>
              {Array.from(Array(columnMax).keys()).map((col: number) => {
                const kanaSymbol = getKanaByColumnRow(row, col);
                return (
                  <Box key={`row-${row}-col-${col}`} mr={1}>
                    <Typography variant="h6">{kanaSymbol?.kana}</Typography>
                    <Typography variant="body1">{kanaSymbol?.reading}</Typography>
                  </Box>
                );
              })}
            </>
          </Box>
        );
      })}
    </>
  );
};
