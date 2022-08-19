import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectRouteProps {
  isPass: boolean;
  goWhenFail: string;
  children?: ReactNode;
  alarm?: string;
}

/**
 * 접근 권한이 없는 경로로 올 경우(`isPass === false`) 리다이렉트 한다
 * @param alarm `useLocation().state.alarm`에 전달한다
 */
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
