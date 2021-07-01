import Index from './index'
import {render, screen} from '@testing-library/react'


describe('Hooks Function testing',()=>{
    it('test',()=>{
        render(<Index>I am Child component.</Index>)
        let test = screen.getByTestId('test')
        expect(test).toBeTruthy()
        expect(test.innerHTML).toBe('I am Child component.')
    })
})