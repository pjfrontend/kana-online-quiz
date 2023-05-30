import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {Box} from '@mui/material';
import {MainMenu} from './containers/MainMenu';
import {Review} from './containers/Review';
import {Quiz} from './containers/Quiz';
import {KanaProvider} from './data/context';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <Box margin="auto" width="30rem" display="flex" justifyContent="center">
    <KanaProvider>
      <HashRouter basename="/">
        <Routes>
          <Route path="quiz/:kana" element={<Quiz />} />
          <Route path="review/:kana" element={<Review />} />
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </HashRouter>
    </KanaProvider>
  </Box>
);
