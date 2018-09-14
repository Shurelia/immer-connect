import 'jest-dom/extend-expect';
import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { createBindings } from '~/index';

test('initial test', () => {
  const { getByText } = render(<div>123 asd</div>);
  expect(getByText(/^123/)).toHaveTextContent('123 asd');
});

test('another thing', () => {
  expect(createBindings()).toBe({});
});
