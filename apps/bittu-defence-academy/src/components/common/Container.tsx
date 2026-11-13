import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-12', className)}>{children}</div>
  );
}
