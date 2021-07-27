import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';


describe('Button overall testing',()=>{

    it('Button with icon and theme', () => {
        render(<Button className='myClass' theme='danger' clicked={()=>{}} type='submit' text='click' />);
        let btn = screen.getByTestId('test')
        expect(btn).toBeTruthy()
        expect(btn.className).toContain('danger')
        expect(btn.className).toContain('myClass')
        expect(btn.className).toContain('button')
        expect(btn.innerHTML).toBe('click')
        expect(btn).toHaveProperty('type','submit')
        expect(btn).not.toContain('</svg>');

    });

    it('Button without icon and theme', () => {
        render(<Button className='myClass' clicked={()=>{}} type='submit' text='click' />);
        let btn = screen.getByText('click')
        expect(btn).not.toContain('<svg>')
        expect(btn.className).toContain('primary');
    });

    it('Button click funcntionality', () => {
        let buttonClicked = jest.fn();
        render(<Button clicked={buttonClicked} type='submit' text='click' />);
        let btn = screen.getByText('click')
        userEvent.click(btn)
        expect(buttonClicked).toHaveBeenCalled()
    });

    it('Button disabled', () => {
        render(<Button clicked={()=>{}} type='submit' text='click' theme='disabled' />);
        let btn = screen.getByText('click')
        expect(btn).toHaveProperty('disabled', true)
    });
    
})
