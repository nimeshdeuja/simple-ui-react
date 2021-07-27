import {ReactNode} from 'react'

import styles from "./Dialog.module.css";

type Sizes = 'sm'|'md'|'lg'
type Themes = 'default'|'primary'|'secandary'|'danger'

interface Props {
    close:()=>void, 
    title:string, 
    size?:Sizes, 
    theme?:Themes, 
    open:boolean,
    className?:string,
    children:ReactNode
}
export const Dialog = ({close, title, size='md', theme='default', open, className='', children}:Props) =>{
    const closeAllClickHandler = (event:any) => {
      if (event.target && event.target.title === title) {
        close();
      }
    };
  
    let dialogElement = null;
    if (open)
      dialogElement = (
        <div
          className={`${styles.modal} ${className}`}
          onClick={closeAllClickHandler}
          title={title}
          data-testid='test-wrapper'
        >
          <div
            className={`${styles.modalContent} ${styles[size]} ${styles[theme]}`}
            data-testid='test-content'
          >
            <h2 
            data-testid='test-title'
            >
              {title} <span onClick={() => close()}>&times;</span>
            </h2>
            {children}
          </div>
        </div>
      );
    return dialogElement;
  };

interface PropsBody {
    className?:string, 
    children:ReactNode
}
export const DialogBody = ({className='', children}:PropsBody) => (
  <div className={`${styles.main} ${className}`} data-testid='test-body'>
    {children}
  </div>
);

type IsMultiple = 'multiple' | 'single'

interface PropsFooter {
    multiple:IsMultiple,
    className?:string,
    children:ReactNode
}
export const DialogFooter = ({multiple,className='',children}:PropsFooter) => {
  return (
    <div
      className={`${styles.footer} ${styles[multiple]} ${className}`}
      data-testid='test-footer'
    >
      {children}
    </div>
  );
};