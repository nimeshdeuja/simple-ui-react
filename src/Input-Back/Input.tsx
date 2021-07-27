import "./form.css";
import "./form-default.css";
import "./form-outline.css";

type LabelText = 'right' | 'left'
type InputType = 'password' | 'number' | 'text'
export type ElementType = 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file'
type InputStyleWidth = 'half'

interface Props {
    elementConfig:{ type?: InputType; placeholder?: string, options?:any[], label?:string, labelText?:LabelText,rows?:number, id?:string, showPassword?:boolean }
    elementType:ElementType
    changed:(valye:any, e?:any)=>void,
    value:any
    className:string,
    invalid?:boolean,
    shouldValidate?:boolean,
    touched:boolean,
    inputStyle?:{ width: InputStyleWidth; isLast: boolean }
    autoComplete?:string
}

const Input = ({
    elementConfig,
    elementType,
    changed,
    value,
    className = "",
    invalid,
    shouldValidate,
    touched,
    inputStyle,
    autoComplete = "Off-text"}:Props) => {
    let inputStyleClass = inputStyle?.width ? inputStyle.width : "";
    let isFirstElement = inputStyle?.isLast ? "last" : "";
    let error = invalid && shouldValidate && touched ? "error" : "";

    const uploadImageHandler = (event:any) => {
       if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.addEventListener("load", () => {
          changed(reader.result);
        })
      }
    };

    const showHidePasswordHandler = (event:any)=>{
      let elementId = event.currentTarget.id
      let element = document.getElementById(elementId)

      let targetId = elementId.slice(0,-8);
      let targetElement = document.getElementById(targetId);
      if(targetElement && element){
        let eyeIcon = element.getElementsByClassName( 'showHide' )[0];
        let types = targetElement.getAttribute('type');
        targetElement.setAttribute('type', types==='password'?'text':'password')
        if(eyeIcon){
          if (types === "text") {
            eyeIcon.classList.remove("slash");
          } else {
            eyeIcon.classList.add("slash");
          }
        }
      }
    }

    let defaultInput = null;
    if (elementConfig && elementConfig.type === "password" && elementConfig.id) {
        defaultInput = (
          <div
            className={`custom-field ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
            data-testid='test-wrapper'
          >
            <input
              type="password"
              data-testid='test-input'
              value={value}
              id={elementConfig.id}
              className={value.length > 0 ? "focused" : ""}
              autoComplete={autoComplete}
              onChange={(e)=>changed(e.target.value, e)}
              onBlur={(event) => {
                if (event.target.value.length > 0) {
                  event.target.classList.add("focused");
                } else {
                  event.target.classList.remove("focused");
                }
              }}
            />

            <span className="placeholder" data-testid='test-label'>{elementConfig.placeholder}</span>
            {elementConfig.showPassword && (
            <div
              className="showHidePassword"
              id={elementConfig.id + "showHide"}
              data-testid='test-show-password'
              onClick={showHidePasswordHandler}
          >
            <div 
              className='showHide eye' 
            >
              <div></div>
            </div>
          </div>
        )}
          </div>
        );
      } else if (elementConfig && elementConfig.type === "number") {
        defaultInput = (
          <div
            className={`custom-field ${inputStyleClass} ${isFirstElement} ${className} ${error}`} data-testid='test-wrapper'
          >
            <input
              type="number"
              data-testid='test-input'
              value={value}
              className={value.length > 0 ? "focused" : ""}
              autoComplete={autoComplete}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === 'Dead') {
                  e.preventDefault();
                }
              }}
              onChange={(e)=>changed(e.target.value, e)}
              onBlur={(event) => {
                if (event.target.value.length > 0) {
                  event.target.classList.add("focused");
                } else {
                  event.target.classList.remove("focused");
                }
              }}
            />
            <span className="placeholder" data-testid='test-label'>{elementConfig.placeholder}</span>
          </div>
        );
      } else {
        defaultInput = (
          <div
            className={`custom-field ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
            data-testid='test-wrapper'
          >
            <input
              type="text"
              value={value}
              data-testid='test-input'
              className={value.length > 0 ? "focused" : ""}
              autoComplete={autoComplete}
              onChange={(e)=>changed(e.target.value, e)}
              onBlur={(event) => {
                if (event.target.value.length > 0) {
                  event.target.classList.add("focused");
                } else {
                  event.target.classList.remove("focused");
                }
              }}
            />
            <span className="placeholder" data-testid='test-label'>{elementConfig.placeholder}</span>
          </div>
        );
      }

      let inputElement = null;
      switch (elementType) {
        case "input":
          inputElement = defaultInput;
          break;
        case "textarea":
          inputElement = (
            <div
              className={`custom-textarea ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
              data-testid='test-wrapper'
            >
              <textarea
                defaultValue={value}
                data-testid='test-input'
                className={value.length > 0 ? "focused" : ""}
                rows={elementConfig && elementConfig.rows ? elementConfig.rows : 4}
                onChange={(e)=>changed(e.target.value, e)}
                onBlur={(event) => {
                  if (event.target.value.length > 0) {
                    event.target.classList.add("focused");
                  } else {
                    event.target.classList.remove("focused");
                  }
                }}
              ></textarea>
              <span className="placeholder" data-testid='test-label'>{elementConfig.placeholder}</span>
            </div>
          );
          break;
        case "select":
          inputElement = (
            <div
              className={`custom-select ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
              data-testid='test-wrapper'
            >
              <div className="holder">
                <select
                onChange={(e)=>changed(e.target.value, e)}
                  defaultValue={value}
                  data-testid='test-input'
                >
                  {elementConfig.options && elementConfig.options.map((item, index) => (
                    <option value={item.id} key={index} data-testid='test-option'>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span className="arrow"  data-testid='test-arrow'></span>
              </div>
              <span className="placeholder focused" data-testid='test-label'>
                {elementConfig.placeholder}
              </span>
            </div>
          );
          break;
        case "checkbox":
          let ele = (
            <input
              name="isGoing"
              type="checkbox"
              data-testid='test-input'
              checked={value}
              onChange={(e)=>changed(e.target.checked, e)}
            />
          );
          let checkboxElement = (
            <>
              {elementConfig.placeholder}
              {ele}
            </>
          );
          if (elementConfig && elementConfig.labelText === "right")
            checkboxElement = (
              <>
                {ele}
                {elementConfig.placeholder}
              </>
            );
          inputElement = (
            <div
              className={`custom-checkbox ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
              data-testid='test-wrapper'
            >
              {elementConfig.label !== "" && (
                <span className="title" data-testid='test-top-title'>{elementConfig.label}</span>
              )}
              <label className={elementConfig.labelText} data-testid='test-label'>{checkboxElement}</label>
            </div>
          );
          break;
        case "radio":
          inputElement = (
            <div
              className={`custom-radio ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
              data-testid='test-wrapper'
            >
              <span className="placeholder" data-testid='test-top-title'>{elementConfig.placeholder}</span>
              {elementConfig && elementConfig.options &&
                elementConfig.options.map((item, index) => {
                  let ele = (
                    <input
                      type="radio"
                      data-testid='test-input'
                      name={item.name}
                      value={item.value}
                      checked={value === item.value}
                      onChange={(e)=>changed(e.target.value, e)}
                    />
                  );
                  let radioElement = (
                    <>
                      {item.label}
                      {ele}
                    </>
                  );
                  if (elementConfig && elementConfig.labelText === "right")
                    radioElement = (
                      <>
                        {ele}
                        {item.label}
                      </>
                    );
    
                  return (
                    <label className={elementConfig.labelText} key={index} data-testid='test-label'>
                      {radioElement}
                    </label>
                  );
                })}
            </div>
          );
          break;
        case "file":
            inputElement = (
              <div
                className={`custom-file ${inputStyleClass} ${isFirstElement} ${className} ${error}`}
                data-testid='test-wrapper'
              >
                <input
                  type="file"
                  data-testid='test-input'
                  id={elementConfig.id}
                  onChange={uploadImageHandler}
                  className='fileUploader'
                />
              </div> 
            );
          break;
        default:
          inputElement = defaultInput;
      }

      return inputElement;
}

export default Input
