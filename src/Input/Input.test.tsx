import React, { useState } from 'react'
import Input, {ElementType}  from './Input'
import {render, fireEvent, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

const InputElement =({elementConfig,elementType,invalid,shouldValidate,touched,className,inputStyle, changed}:{
    elementConfig:any,
    elementType:ElementType,
    invalid:boolean,
    shouldValidate:boolean,
    touched:boolean,
    className:string,
    inputStyle?:any,
    changed?:(ev:any)=>void
})=>{
    const [value, setValue] = useState('')
    const changedHandler =(ev:any)=>setValue(ev.target.value)
    return <Input 
            value={value}
            changed={changedHandler}
            elementConfig={elementConfig}
            elementType={elementType} 
            invalid={invalid}
            shouldValidate={shouldValidate}
            touched={touched}
            className={className}
            inputStyle={inputStyle}
        />
  }

describe('Input field test',()=>{

    describe('Input type password',()=>{

        it('Password',()=>{
            const utils = render(<InputElement 
                elementConfig={{
                    type: "password",
                    placeholder: "Password",
                    showPassword: true,
                    id: "password",
                }}
                elementType='input'
                invalid={false}
                shouldValidate={false}
                touched={false}
                className='myClass'
                inputStyle={{
                    width: "half",
                    isLast: false,
                }}
             />)

            const wrapper = utils.getByTestId('test-wrapper')
            const input = utils.getByTestId('test-input')
            const label = utils.getByTestId('test-label')
            const showPassword = utils.getByTestId('test-show-password')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).toContain('custom-field')
            expect(wrapper.className).toContain('half')
            expect(wrapper.className).not.toContain('last')
            expect(wrapper.className).not.toContain('error')

            expect(input).toBeTruthy()
            expect(input).toHaveProperty('type', 'password')
            expect(input.className).not.toContain('focused')
            expect(input).toHaveProperty('id', 'password')
            fireEvent.change(input, { target: { value: 'New Value' } })
            expect(input).toHaveProperty('value','New Value')
            expect(input.className).toContain('focused')

            expect(label).toBeTruthy()
            expect(label.className).toContain('placeholder')
            expect(label.innerHTML).toBe('Password')

            expect(showPassword).toBeTruthy()
            expect(showPassword.className).toContain('fa-eye')
            fireEvent.click(showPassword)
            expect(input).toHaveProperty('type', 'text')
            expect(showPassword.className).toContain('fa-eye-slash')
        })

    })


    describe('Input type Number',()=>{

        it('Number', ()=>{
            const utils = render(<InputElement 
                elementConfig={{
                    type: "number",
                    placeholder: "Number",
                }}
                elementType='input'
                invalid={true}
                shouldValidate={false}
                touched={false}
                className='myClass'
            />)
    
            const wrapper = utils.getByTestId('test-wrapper')
            const input = utils.getByTestId('test-input')
            const label = utils.getByTestId('test-label')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).toContain('custom-field')
            expect(wrapper.className).not.toContain('half')
            expect(wrapper.className).not.toContain('last')
            expect(wrapper.className).not.toContain('error')

            expect(input).toBeTruthy()
            expect(input.className).not.toContain('focused')
            expect(input).toHaveProperty('type', 'number')
            fireEvent.change(input, {target:{value:123456}})
            expect(input).toHaveProperty('value','123456')
            expect(input.className).toContain('focused')

            expect(label).toBeTruthy()
            expect(label.className).toContain('placeholder')
            expect(label.innerHTML).toBe('Number')
        })
    })


    describe('Input type text', ()=>{

        it('Text',()=>{
            const utils = render(<InputElement 
                elementConfig={{
                    type: "text",
                    placeholder: "Name",
                }}
                elementType='input'
                invalid={true}
                shouldValidate={false}
                touched={false}
                className='myClass'
            />)
    
            const wrapper = utils.getByTestId('test-wrapper')
            const input = utils.getByTestId('test-input')
            const label = utils.getByTestId('test-label')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).toContain('custom-field')
            expect(wrapper.className).not.toContain('half')
            expect(wrapper.className).not.toContain('last')
            expect(wrapper.className).not.toContain('error')

            expect(input).toBeTruthy()
            expect(input.className).not.toContain('focused')
            expect(input).toHaveProperty('type', 'text')
            fireEvent.change(input, {target:{value:'Nimesh Deuja'}})
            expect(input).toHaveProperty('value','Nimesh Deuja')
            expect(input.className).toContain('focused')

            expect(label).toBeTruthy()
            expect(label.className).toContain('placeholder')
            expect(label.innerHTML).toBe('Name')
        })

    })

    describe('Input type textarea',()=>{

        it('Textarea',()=>{
            const utils = render(<InputElement 
                elementConfig={{
                    placeholder: "Your feedback",
                    rows: 10,
                }}
                elementType='textarea'
                invalid={false}
                shouldValidate={false}
                touched={false}
                className='myClass'
            />)

            const wrapper = utils.getByTestId('test-wrapper')
            const textarea = utils.getByTestId('test-input')
            const label = utils.getByTestId('test-label')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('custom-textarea')
            expect(wrapper.className).toContain('myClass')

            expect(textarea).toBeTruthy()
            expect(textarea).toHaveProperty('rows',10)
            fireEvent.change(textarea, {target:{value:'My feedback'}})
            expect(textarea.innerHTML).toBe('My feedback')
            expect(textarea.className).toContain('focused')

            expect(label).toBeTruthy()
            expect(label.className).toContain('placeholder')
            expect(label.innerHTML).toBe('Your feedback')

        })

    })

    describe('Input type select',()=>{

        it('Select',()=>{
            const utils = render(<InputElement 
                elementConfig={{
                    placeholder: "Occupation",
                    options: [
                        { id: "1", name: "Select", value: "" },
                        { id: "2", name: "Developer", value: "developer" },
                        { id: "3", name: "UI/UX Designer", value: "designer" },
                    ]
                }}
                elementType='select'
                invalid={true}
                shouldValidate={true}
                touched={true}
                className='myClass'
            />)

            const wrapper = utils.getByTestId('test-wrapper')
            const select = utils.getByTestId('test-input')
            const label = utils.getByTestId('test-label')
            const arrow = utils.getByTestId('test-arrow')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('custom-select')
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).toContain('error')

            expect(select).toBeTruthy()
            userEvent.selectOptions(select, '2')
            expect(select).toHaveProperty('value','2')

            expect(arrow).toBeTruthy()
            expect(arrow.className).toContain('arrow')

            expect(label).toBeTruthy()
            expect(label.className).toContain('placeholder')
            expect(label.innerHTML).toBe('Occupation')

        })

    })

    describe('Input type checkbox',()=>{
        
        it('Checkbox',()=>{
            const utils = render(<InputElement 
                elementConfig={{
                    label: "Looking for full time job?",
                    placeholder: "Yes i am!",
                    labelText: "right",
                }}
                elementType='checkbox'
                invalid={false}
                shouldValidate={false}
                touched={false}
                className='myClass'
            />)

            const wrapper = utils.getByTestId('test-wrapper')
            const checkbox = utils.getByTestId('test-input')
            const label = utils.getByTestId('test-label')
            const title = utils.getByTestId('test-top-title')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('custom-checkbox')
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).not.toContain('error')

            expect(checkbox).toBeTruthy()
            expect(checkbox).toHaveProperty('name','isGoing')
            expect(checkbox).toHaveProperty('type','checkbox')
            expect(checkbox).toHaveProperty('checked',false)
            fireEvent.click(checkbox)
            expect(checkbox).toHaveProperty('checked',true)

            expect(title).toBeTruthy()
            expect(title.className).toContain('title')
            expect(title.innerHTML).toBe('Looking for full time job?')

            expect(label).toBeTruthy()
            expect(label.className).toContain('right')
            expect(label.innerHTML).toContain('Yes i am!')
            
        })

    })


    describe('Input type Radio',()=>{

        it('Radio',()=>{
            const utils = render(<InputElement 
                elementConfig={{
                    placeholder: "Are you married?",
                    labelText: "right",
                    options: [
                      { label: "Yes", value: "yes", name: "yesNo" },
                      { label: "No", value: "no", name: "yesNo" },
                    ],
                }}
                elementType='radio'
                invalid={false}
                shouldValidate={false}
                touched={false}
                className='myClass'
            />)

            const wrapper = utils.getByTestId('test-wrapper')
            const radio = utils.getAllByTestId('test-input')
            const label = utils.getAllByTestId('test-label')
            const title = utils.getByTestId('test-top-title')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('custom-radio')
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).not.toContain('error')

            expect(radio[0]).toBeTruthy()
            fireEvent.click(radio[0])
            expect(radio[0]).toHaveProperty('checked',true)
            expect(radio[1]).toHaveProperty('checked',false)
            fireEvent.click(radio[1])
            expect(radio[0]).toHaveProperty('checked',false)
            expect(radio[1]).toHaveProperty('checked',true)

            expect(label[0]).toBeTruthy()
            expect(label[0].className).toContain('right')
            
            expect(title).toBeTruthy()
            expect(title.className).toContain('placeholder')
            expect(title.innerHTML).toBe('Are you married?')

     
        })

    })

    describe('Input type file',()=>{

        it('File',()=>{
            const fileForUpload = new File(['dummy content'], 'example.png', {type: 'image/png'})
            const uploadFile= jest.fn()
            const utils = render(<InputElement 
                elementConfig={{
                    placeholder: "Upload CV",
                    id:'uploadFile'
                }}
                changed={uploadFile}
                elementType='file'
                invalid={false}
                shouldValidate={false}
                touched={false}
                className='myClass'
            />)


            const wrapper = utils.getByTestId('test-wrapper')
            const file = utils.getByTestId('test-input')

            expect(wrapper).toBeTruthy()
            expect(wrapper.className).toContain('custom-file')
            expect(wrapper.className).toContain('myClass')
            expect(wrapper.className).not.toContain('error')

            expect(file).toBeTruthy()
            expect(file.className).toContain('fileUploader')
            expect(file).toHaveProperty('type','file')
            fireEvent.change(file,{target: {files: [fileForUpload]}})

        })

    })

})