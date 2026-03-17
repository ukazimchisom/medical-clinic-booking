type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className="btn disabled:opacity-50">
      {children}
    </button>
  );
}
