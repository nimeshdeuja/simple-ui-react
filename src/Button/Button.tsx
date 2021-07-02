import styles from "./Button.module.css";

type Types = 'button' | 'submit' | 'reset'
type Thems = 'default' | 'primary' | 'secondary' | 'disabled' | 'danger';

interface Props {
    className?:string
    theme?:Thems,
    type:Types,
    clicked:(item:any)=>void,
    icon?:React.ReactNode,
    text:string,
}

const Button = ({className, theme='primary', type, clicked, icon, text}: Props) => {
    let classes = `${styles.button} ${styles[theme]}`;
    if(className) classes = `${styles.button} ${styles[theme]} ${className}`;
    return <button 
                className={classes} 
                type={type} 
                onClick={clicked} 
                disabled={theme==='disabled'}
                data-testid='test'
            >
                {icon}{text}
            </button>
}
export default Button