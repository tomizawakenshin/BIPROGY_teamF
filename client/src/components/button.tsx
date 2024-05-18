export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className='p-2 border-2 rounded border-zinc-400 hover:bg-zinc-100'>{children}</button>
  );
}
