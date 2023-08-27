import './Button.scss';

interface ButtonProps {
  classes?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={['config-button no-ripple', props.classes].join(' ')}
      {...props}
    ></button>
  );
};

export default Button;
