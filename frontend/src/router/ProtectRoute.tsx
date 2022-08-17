import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectRouteProps {
  isPass: boolean;
  children: ReactNode;
  goWhenFail: string;
  alarm?: string;
}

export default function ProtectRoute({
  isPass,
  children,
  goWhenFail,
  alarm,
}: ProtectRouteProps) {
  const handleFailPass = () => {
    return Navigate({ to: goWhenFail, state: { alarm } });
  };
  return isPass ? <>{children}</> : handleFailPass();
}
