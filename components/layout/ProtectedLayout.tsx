// components/layouts/ProtectedLayout.tsx
'use client'

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '../misc/LoadingPage';

interface ProtectedLayoutProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
}

const ProtectedLayout = ({ children, roles, permissions }: ProtectedLayoutProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <LoadingPage />;

  if (!user) {
    router.push('/login');
    return null;
  }

  const userRoles = user.roles?.map(role => role.name) || [];
  const userPermissions = user.roles?.flatMap(role => role.permissions.map(permission => permission.name)) || [];

  if (roles && !roles.some(role => userRoles.includes(role))) {
    router.push('/not-authorized');
    return null;
  }

  if (permissions && !permissions.some(permission => userPermissions.includes(permission))) {
    router.push('/not-authorized');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
