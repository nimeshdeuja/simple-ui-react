import {Form} from './Form'
import {render, screen, fireEvent} from '@testing-library/react'


describe('Form render testing',()=>{

    it('Render form',()=>{
        let testFunction = jest.fn()
        render(<Form submit={testFunction} className='myClass' layout='outline'>I am Child component.</Form>)
        let form = screen.getByTestId('form')
        expect(form).toBeTruthy()
        expect(form.className).toContain('myClass')
        expect(form.className).not.toContain('default')
        expect(form.className).toContain('outline')
        expect(form.innerHTML).toEqual('I am Child component.')
    })

    it('Form submit',()=>{
        let testFunction = jest.fn()
        render(<Form submit={testFunction}>I am Child</Form>)
        let form = screen.getByTestId('form')
        fireEvent.submit(form)
        expect(testFunction).toHaveBeenCalled()
    })

})