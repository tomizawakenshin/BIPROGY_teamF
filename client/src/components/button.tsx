import clsx from 'clsx';

type ButtonProps = React.ComponentProps<'button'>;

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button {...props} className={clsx('p-2 border-2 rounded', className)}>
      {children}
    </button>
  );
}
