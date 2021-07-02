import {Dailog, DailogBody, DailogFooter} from './Dailog'
import {render, fireEvent, cleanup, screen} from '@testing-library/react'

afterEach(cleanup)

describe('Dailog box test',()=>{

    describe('Dailog HTML test',()=>{
        it('Dailog HTML',()=>{
            let testFunction = jest.fn();
            render(<Dailog close={testFunction} title='My Dailog' theme='danger' size='lg' open={true} className='myClass'>Test</Dailog>)
            let wrapper = screen.getByTestId('test-wrapper')
            let content = screen.getByTestId('test-content')
            let title = screen.getByTestId('test-title')
    
            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).toContain('modal')
            expect(wrapper).toHaveProperty('title','My Dailog')
            fireEvent.click(wrapper)
            expect(testFunction).toBeCalled()
    
            expect(content).toBeTruthy()
            expect(content.className).toContain('modalContent')
            expect(content.className).toContain('danger')
            expect(content.className).toContain('lg')
            expect(content.className).not.toContain('md')
    
            expect(title).toBeTruthy()
            expect(title.innerHTML).toBe('My Dailog <span>×</span>')
        })
    })

    describe('Dailog body HTML test',()=>{
        it('Body HTML',()=>{
            render(<DailogBody className='myClass'>body content</DailogBody>)
            let body = screen.getByTestId('test-body')

            expect(body).toBeTruthy()
            expect(body.className).toContain('main')
            expect(body.className).toContain('myClass')
            expect(body.innerHTML).toBe('body content')

        })
    })

    describe('Dailog footer HTML test',()=>{
        it('Footer HTML',()=>{
            render(<DailogFooter multiple='single' className='myClass'>footer content</DailogFooter>)
            let footer = screen.getByTestId('test-footer')

            expect(footer).toBeTruthy()
            expect(footer.className).toContain('footer')
            expect(footer.className).toContain('single')
            expect(footer.className).toContain('myClass')
            expect(footer.innerHTML).toBe('footer content')
        })
    })


})