import React from "react";
import { screen } from '@testing-library/react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import HomePage from './HomePage';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Should not have newest products when is empty", async () => {
    const fakenewProducts = {};
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakenewProducts)
        })
    );
    
    await act(async () => {
        render(<HomePage />, container);
    });

    const element = await screen.findByText('No products found');

    expect(element).toBeInTheDocument();

    global.fetch.mockRestore();
});