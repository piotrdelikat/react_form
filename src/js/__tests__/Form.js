import renderer from 'react-test-renderer';
import React from 'react';
import Form from '../components/Form';

test('form renders correctly', () => {
  const form = renderer.create(
    <Form />
  ).toJSON();
  expect(form).toMatchSnapshot();
});
