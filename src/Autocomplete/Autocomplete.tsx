import './Autocomplete.css';
import { ShortArray, InsertAfter } from '../Utility/Utility';

let simpleObj:any = {}

type listTypes ={value:string, label:string, id:string|number, icon?:string}
type chageTypes = (e:listTypes[])=>void

interface AutocompletProsp {
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
}
const Autocomplete = ({list, id, change, selected,placeholder='Select',inputPlaceholder='Search',emptyText='List is empty',multiple=true,clear=false,selectedCallback=false}:AutocompletProsp) => {
    const changeHandler = () =>change(simpleObj[id].selected)

    if(selected && !simpleObj[id]){
        simpleObj[id] = {};
        simpleObj[id].selected = selected;
        if(selectedCallback) changeHandler()
    }

    const clearAllHide =(type:'add'|'hide')=>{
        let clearAllElement = document.getElementById(id+'clearAll')! as HTMLSpanElement;
        if(clear && simpleObj[id] && simpleObj[id].selected){
            if(type === 'hide'){
                if(simpleObj[id].selected.length===0) clearAllElement.classList.add('hide');
            } else {
                if(simpleObj[id].selected.length>0) clearAllElement.classList.remove('hide');
            }
        }
        
    }

    const deleteClickEvent = (clicked:listTypes)=>{
        let selected = [];
        if(simpleObj[id]) selected = simpleObj[id].selected;

        // filter selected list
        if(!simpleObj[id].selected) simpleObj[id].selected = [] 

        let listForSelected = []
        if(selected.length>0){
            for (let select of selected){
                if(select.id !== clicked.id){
                    listForSelected.push(select);
                }
            }
        }
        if(simpleObj[id] && simpleObj[id].selected) simpleObj[id].selected = listForSelected;
        selectedOption();
        
        // filter option list
        simpleObj[id] && simpleObj[id].list && simpleObj[id].list.push(clicked);
        optionList();

        clearAllHide('hide');
        
        changeHandler();

    }

    const generateClearAllIcon =()=>{
        let element = document. getElementById(id+'clearAll') as HTMLSpanElement;
        if(!element){
            let searchBox = document.getElementById(id+'search') as HTMLDivElement;
            if(clear){
                let clearAllElement = document.createElement('span');
                clearAllElement.classList.add('clearAll');
                if(simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length === 0){
                    clearAllElement.classList.add('hide');
                }
                clearAllElement.setAttribute('id', id+'clearAll');
                clearAllElement.innerHTML = 'X';
                clearAllElement.addEventListener('click', clearAllHandler);
                if(searchBox) InsertAfter(clearAllElement, searchBox);
            }
        }
    }

    const selectClickEvent = (clicked:listTypes)=>{
        let fullList:listTypes[] = [];
        let list:listTypes[] = [];

        if(simpleObj[id]){
            fullList = simpleObj[id].fullList;
            list = simpleObj[id].list;
        }

        // filter selected list
        if(!simpleObj[id].selected) simpleObj[id].selected = []

        if(multiple){
            simpleObj[id].selected.push(clicked);
        } else {
            simpleObj[id].selected = [clicked];
        }
        selectedOption();

        // filter options list
        if(!simpleObj[id].list) simpleObj[id].list = [];
        
        let listForOption = [];
        if(multiple){
            if(list.length>0){
                for (let option of list){
                    if(option.id !== clicked.id){
                        listForOption.push(option);
                    }
                }
            }
        } else {
            if(fullList.length>0){
                for (let option of fullList){
                    if(option.id !== clicked.id){
                        listForOption.push(option);
                    }
                }
            }
        }
        simpleObj[id].list = listForOption;
        optionList();
        generateClearAllIcon();
        clearAllHide('add');
        changeHandler();
    }

    const selectedOption =()=>{
        let selectedElement = document.getElementById(id+'selected')! as HTMLDivElement;
        selectedElement.innerHTML = '';

        let selected:listTypes[] = [];

        if(simpleObj && simpleObj[id]) selected = simpleObj[id].selected;

        let ulElement = document.createElement("ul") as HTMLUListElement;
        if(selected.length>0){
            for (let item of selected){
                let liElement = document.createElement("li") as HTMLLIElement;
                liElement.classList.add('selected');
                liElement.setAttribute('data-testid','test-selected-li');
                if(!multiple)liElement.classList.add('single');
                if(item.icon){
                    let iconElement = document.createElement("img") as HTMLImageElement;
                    iconElement.setAttribute('src', item.icon);
                    iconElement.setAttribute('alt', item.label);
                    liElement.append(iconElement);
                }
                liElement.append(item.label);
                if(multiple)liElement.addEventListener("click", ()=>deleteClickEvent(item));
                ulElement.append(liElement);
            }
        } else {
            let liElement = document.createElement("li") as HTMLLIElement;
            liElement.classList.add('notSelected');
            liElement.setAttribute('data-testid','test-selected-li');
            liElement.innerText = `${placeholder}`;
            ulElement.append(liElement);
        }
        selectedElement.append(ulElement);
    }

    const generateEmpty =()=>{
        let emptyElement = document.createElement("li") as HTMLLIElement;
            emptyElement.setAttribute('data-testid','test-search-list-li');
            emptyElement.classList.add('isEmpty');
            emptyElement.innerText = emptyText;
            return emptyElement
    }

    const optionList =()=>{
        let listElement = document.getElementById(id+'list')! as HTMLInputElement;
        listElement.innerHTML = ''

        let list:listTypes[] = [];
        if(simpleObj[id].list) list = simpleObj[id].list;
        if(list.length>0) list = ShortArray(list, "ASC", "label");

        let ulElement = document.createElement("ul") as HTMLUListElement;
        
        if(list && list.length>0){
            if(simpleObj[id].input){
                list = list.filter(({label}:{label:string})=>{
                    let search = simpleObj[id].input
                    search = search.toUpperCase();
                    let text = label.toUpperCase();
                    return text.includes(search);
                })
            }
            if(list.length>0){
                for (let item of list){
                    let liElement = document.createElement("li") as HTMLLIElement;
                    liElement.setAttribute('data-testid','test-search-list-li');
                    if(item.icon){
                        let iconElement = document.createElement("img") as HTMLImageElement;
                        iconElement.setAttribute('src', item.icon);
                        iconElement.setAttribute('alt', item.label);
                        liElement.append(iconElement);
                    }
                    liElement.append(item.label);
                    liElement.addEventListener("click", ()=>selectClickEvent(item));
                    ulElement.append(liElement);
                }
            } else {
                ulElement.append(generateEmpty());
            }
        } else {
            ulElement.append(generateEmpty());
        }
        listElement.append(ulElement);
    }

    const closeOption = ()=>{
        let searchBox = document.getElementById(id+'search')! as HTMLDivElement;
        let inputElement = document.getElementById(id)! as HTMLInputElement;
        let blanketElement = document.getElementById(id+'blanket')! as HTMLDivElement;
        searchBox.style.display = 'none';
        blanketElement.remove();

        inputElement.value ='';
        simpleObj[id].input = '';
    }

    const generateBlanket=()=>{
        let divElement = document.createElement("div") as HTMLDivElement;
        let blanketE = document.getElementById(`${id}blanket`);
        if(!blanketE){
            divElement.classList.add('blanket');
            divElement.setAttribute("id", `${id}blanket`);
            divElement.addEventListener("click", ()=>closeOption());
            document.body.append(divElement);
        }
    }

    const filterOptionsList =()=>{
        let selectedItem:listTypes[] = [];

        if(simpleObj[id].selected) selectedItem = simpleObj[id].selected;

        if(selectedItem && selectedItem.length>0 && selectedItem.length<list.length){
            return list.filter((elem) => !selectedItem.find(({ id }) => elem.id === id));
        } else if(selectedItem && selectedItem.length === list.length){
            return []
        }
        return list
    }

    const clickHandler = ()=>{
        if(!simpleObj[id]) simpleObj[id] = {};
        simpleObj[id].fullList = list;

        // UnHide Search Box
        let searchBox = document.getElementById(id+'search')! as HTMLDivElement;
        searchBox.style.display = 'block'
        
        // generate Blanket
        generateBlanket();
   
        let inputElement = document.getElementById(id)! as HTMLInputElement;
        inputElement.focus();
        
        simpleObj[id].list = filterOptionsList()
        optionList()
    }

    const filterSearch = (event:React.ChangeEvent<HTMLInputElement>) =>{
        simpleObj[id].input = event.target.value;
        optionList()
    }

    const clearAllHandler =()=>{
       simpleObj[id].selected = []
       selectedOption();

       simpleObj[id].list = list
       optionList();
       changeHandler();

       clearAllHide('hide');
    }

    let selectedElement = <li className='notSelected' data-testid='test-selected-li'>{placeholder}</li>;
    if(selected && simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length>0) selectedElement = simpleObj[id].selected.map((item:listTypes, i:number)=><li key={i} data-testid='test-selected-li' className={`selected ${multiple?'':'single'}`} onClick={()=>multiple && deleteClickEvent(item)}>{item.icon && <img src={item.icon} />}{item.label}</li>);
    if(simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length>0) generateClearAllIcon()

    return (
        <>
            <div id={id+'selected'} data-testid='test-selected' className='selected' onClick={clickHandler}>
                <ul data-testid='test-selected-ui'>{selectedElement}</ul>
            </div>
            <div className='search' id={id+'search'} data-testid='test-search' style={{display:'none'}}>
                <input type='text' placeholder={inputPlaceholder} id={id} data-testid='test-search-input' onChange={filterSearch} />
                <div id={id+'list'} data-testid='test-search-list'></div>
            </div>
            {clear && simpleObj[id] && simpleObj[id].selected && simpleObj[id].selected.length>0 && <span id={id+'clearAll'} data-testid='test-clearAll' className='clearAll' onClick={clearAllHandler}>X</span>}
        </>
    )
}

export default Autocomplete
