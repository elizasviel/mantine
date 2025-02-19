import React from 'react';
import { Slider } from '@mantine/core';
import { MantineDemo } from '@mantine/ds';
import styled from '@emotion/styled';

const code = `
import { Slider } from '@mantine/core';
import styled from '@emotion/styled';

const StyledSlider = styled(Slider)\`
  & .mantine-Slider-bar {
    background-color: pink;
  }

  & .mantine-Slider-thumb {
    border-color: pink;
    background-color: white;
    width: 24px;
    height: 24px;
  }
\`;

function Demo() {
  return <StyledSlider defaultValue={40} />;
}
`;

const StyledSlider = styled(Slider)`
  & .mantine-Slider-bar {
    background-color: pink;
  }

  & .mantine-Slider-thumb {
    border-color: pink;
    background-color: white;
    width: 24px;
    height: 24px;
  }
`;

function Demo() {
  return <StyledSlider defaultValue={40} />;
}

export const stylesApi: MantineDemo = {
  type: 'demo',
  component: Demo,
  code,
};
