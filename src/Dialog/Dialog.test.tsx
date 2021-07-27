import {Dialog, DialogBody, DialogFooter} from './Dialog'
import {render, fireEvent, cleanup, screen} from '@testing-library/react'


afterEach(cleanup)

describe('Dialog box test',()=>{

    describe('Dialog HTML test',()=>{
        it('Dialog HTML',()=>{
            let testFunction = jest.fn();
            render(<Dialog close={testFunction} title='My Dialog' theme='danger' size='lg' open={true} className='myClass'>Test</Dialog>)
            let wrapper = screen.getByTestId('test-wrapper')
            let content = screen.getByTestId('test-content')
            let title = screen.getByTestId('test-title')
    
            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).toContain('modal')
            expect(wrapper).toHaveProperty('title','My Dialog')
            fireEvent.click(wrapper)
            expect(testFunction).toBeCalled()
    
            expect(content).toBeTruthy()
            expect(content.className).toContain('modalContent')
            expect(content.className).toContain('danger')
            expect(content.className).toContain('lg')
            expect(content.className).not.toContain('md')
    
            expect(title).toBeTruthy()
            expect(title.innerHTML).toBe('My Dialog <span>×</span>')
        })
    })

    describe('Dialog body HTML test',()=>{
        it('Body HTML',()=>{
            render(<DialogBody className='myClass'>body content</DialogBody>)
            let body = screen.getByTestId('test-body')

            expect(body).toBeTruthy()
            expect(body.className).toContain('main')
            expect(body.className).toContain('myClass')
            expect(body.innerHTML).toBe('body content')

        })
    })

    describe('Dialog footer HTML test',()=>{
        it('Footer HTML',()=>{
            render(<DialogFooter multiple='single' className='myClass'>footer content</DialogFooter>)
            let footer = screen.getByTestId('test-footer')

            expect(footer).toBeTruthy()
            expect(footer.className).toContain('footer')
            expect(footer.className).toContain('single')
            expect(footer.className).toContain('myClass')
            expect(footer.innerHTML).toBe('footer content')
        })
    })


})