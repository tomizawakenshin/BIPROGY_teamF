import clsx from 'clsx';

type TooltipProps = React.ComponentProps<'div'> & {
  title: string;
  children: React.ReactNode;
};

export function Tooltip({ className, title, children, ...props }: TooltipProps) {
  return (
    <div className={clsx('relative group', className)}>
      <div className='hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-[120%] bg-white p-2 rounded-lg shadow-lg min-w-max'>
        {title}
      </div>
      {children}
    </div>
  );
}
