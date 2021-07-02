import {ReactElement, ReactNode} from 'react'

type LayoutTypes = 'default' | 'outline'

interface Props {
    layout?:LayoutTypes,
    children: ReactNode,
    className?:string,
    submit:()=>void,
  };

export const Form =({layout='default',submit, className = "", children}:Props):ReactElement=> {
    const submitClickHandler = (event:any) => {
        event.preventDefault();
        submit();
      };
    return <form
    onSubmit={submitClickHandler}
    className={`simple-form ${layout} ${className}`}
    autoComplete="Off"
    data-testid='form'
  >
    {children}
  </form>
}

// Form validation
export const CheckValidity = (value:any, rules:any) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value !== "" && isValid;
    if (rules.checkbox) {
      isValid = value && isValid;
    } else if (!rules.isNumeric) {
      isValid = value !== "" && isValid;
    }
  }

  if (rules.min) {
    isValid = value.length >= rules.min && isValid;
  }

  if (rules.max) {
    isValid = value.length <= rules.max && isValid;
  }

  if (rules.minVal) {
    if (rules.isNumeric) {
      value = value.replaceAll(",", ".");
    }
    isValid = value >= rules.minVal && isValid;
  }

  if (rules.maxVal) {
    if (rules.isNumeric) {
      value = value.replaceAll(",", ".");
    }
    isValid = value <= rules.maxVal && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
