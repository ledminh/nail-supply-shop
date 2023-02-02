import { FC } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import styles from './ErrorLayout.module.scss';


interface ErrorLayoutProps {
  statusCode?: number;
  errorMessage?: string;
  children?: React.ReactNode;
}

const ErrorLayout: FC<ErrorLayoutProps> = ({statusCode, errorMessage, children}) => {

  if(statusCode) {
    return (
      <div className={styles.wrapper}>
        <p>Error code: {statusCode}</p>
      </div>
    );
  }


  if(errorMessage) {
    return (
      <div className={styles.wrapper}>
        <p>Error message: {errorMessage}</p>
      </div>
    );
  }

  


  return (
    <div className={styles.wrapper}>
      <ErrorBoundary>
        {children? children : null}
      </ErrorBoundary>
    </div>
  )

}


export default ErrorLayout;
