import Autocomplete from './Autocomplete';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';



type listTypes ={value:string, label:string, id:string|number, icon?:string}
type chageTypes = (e:listTypes[])=>void

const Element =({list,id,change,selected,placeholder,inputPlaceholder,emptyText, multiple,clear,selectedCallback}:{
    list:listTypes[],
    id:string
    change:chageTypes,
    selected?:listTypes[],
    placeholder?:string,
    inputPlaceholder?:string,
    emptyText?:string,
    multiple?:boolean,
    clear?:boolean,
    selectedCallback?:boolean
})=>{
    return <Autocomplete 
            list={list}
            id={id}
            change={change}
            selected={selected}
            placeholder={placeholder}
            inputPlaceholder={inputPlaceholder}
            emptyText={emptyText}
            multiple={multiple}
            clear={clear}
            selectedCallback={selectedCallback}
        />
  }

  
afterEach(cleanup);


describe('Autocomplete with icon',()=>{


    let lists = [
        {value:'Nimesh', label:'Nimesh', id:'Nimesh', icon:'https://unprint.pt/static/media/logo.4af0ed03.png'},
        {value:'Deuja', label:'Deuja', id:'Deuja', icon:'https://unprint.pt/static/media/logo.4af0ed03.png'}
    ]
    let testFunction = jest.fn();

    it('With selected',()=>{
        const utils = render(<Element 
            id='myName'
            list={lists}
            change={testFunction}
            selected={[
                {value:'Nimesh', label:'Nimesh', id:'Nimesh', icon:'https://unprint.pt/static/media/logo.4af0ed03.png'}
            ]}
            placeholder='This is placeholder'
            inputPlaceholder='This is input placeholder'
            emptyText='This is empty list text'
            multiple={true}
            clear={true}
            selectedCallback={true}
         />)

         let selectedElement = utils.getByTestId('test-selected');
         expect(selectedElement).toBeTruthy();
         expect(selectedElement).toHaveClass('selected');
         expect(selectedElement).toHaveAttribute('id', 'myNameselected')

         let listElement = utils.getAllByTestId('test-selected-li');
         expect(listElement).toBeTruthy();
         expect(listElement.length).toBe(1);
         expect(utils.getByText('Nimesh')).toBeTruthy();
         let item = utils.getByText('Nimesh');
         expect(item).toBeTruthy();
         expect(item).toContainHTML('<img src="https://unprint.pt/static/media/logo.4af0ed03.png">Nimesh');
         expect(item).toHaveClass('selected');
         expect(item).not.toHaveClass('notSelected');
         fireEvent.click(item)
         expect(testFunction).toBeCalled()

        let searchElement = utils.getByTestId('test-search');
        expect(searchElement).toBeTruthy();
        expect(searchElement).toHaveAttribute('id','myNamesearch');
        expect(searchElement).toHaveClass('search');


        let searchInput = utils.getByTestId('test-search-input');
        expect(searchInput).toBeTruthy();
        expect(searchInput).toHaveAttribute('id','myName')
        expect(searchInput).toHaveAttribute('placeholder','This is input placeholder')

        let OptionList = utils.getAllByTestId('test-search-list-li');
        expect(OptionList).toBeTruthy();
        expect(OptionList.length).toBe(2);
        expect(OptionList[0]).toContainHTML('Deuja');
        expect(OptionList[1]).toContainHTML('Nimesh');

        let searchList = utils.getByTestId('test-search-list');
        expect(searchList).toBeTruthy();
        expect(searchList).toHaveAttribute('id','myNamelist');
        userEvent.type(searchInput, '1234567890');
        expect(searchInput).toHaveValue('1234567890');

        let clearAll = utils.getByTestId('test-clearAll');
        expect(clearAll).toHaveClass('clearAll');
        expect(clearAll).toHaveClass('hide');
        
    })


    it('Without selected',()=>{
        const utils = render(<Element 
            id='myName'
            list={lists}
            change={testFunction}
            inputPlaceholder='This is input placeholder'
            multiple={true}
         />)

         let listElement = utils.getAllByTestId('test-selected-li');
         expect(listElement[0]).toHaveClass('notSelected');
         expect(listElement[0]).toHaveTextContent('Select');

    })
})