import { FC, ReactNode } from 'react';
import styles from './ErrorLayout.module.scss';
import { ResponseType } from '../../database';

import ErrorScreen from '../../components/ErrorScreen';

import getErrMessages from '../../utils/getErrMessages';

interface ErrorLayoutProps {
  responses: ResponseType<any>[];
  children: ReactNode;
}

const ErrorLayout: FC<ErrorLayoutProps> = ({responses, children}) => {
  
  const errMsgs = getErrMessages(...responses);
  
  if(errMsgs.length > 0) {
    return (
      <ErrorScreen
        errMessages={errMsgs}
      />
    )
  }



  return (
    <>
     {children}
    </>
  )


}


export default ErrorLayout;
