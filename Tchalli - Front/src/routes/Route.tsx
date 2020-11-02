import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  roles?: string[];
}
interface IRole {
  id: string;
  name: string;
}
interface IUser {
  id: string;
  role: IRole;
}
const Routes: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  roles,
  ...rest
}) => {
  const { user } = useAuth();
  const formatedUser = user as IUser;
  let allowed = true;
  if (roles && user) {
    const rolecurrent = formatedUser.role.name;
    allowed = roles.includes(rolecurrent);
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user && allowed ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Routes;
