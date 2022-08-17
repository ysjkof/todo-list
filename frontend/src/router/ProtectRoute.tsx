import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectRouteProps {
  isPass: boolean;
  goWhenFail: string;
  children?: ReactNode;
  alarm?: string;
}

export default function ProtectRoute({
  isPass,
  goWhenFail,
  children,
  alarm,
}: ProtectRouteProps) {
  const handleFailPass = () => {
    return Navigate({ to: goWhenFail, state: { alarm } });
  };
  return isPass ? <>{children}</> : handleFailPass();
}
