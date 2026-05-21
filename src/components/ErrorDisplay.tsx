import { Alert } from 'antd';

import type { ApiError } from '../types/api';

import styles from './ErrorDisplay.module.css';

interface Props {
  error: ApiError;
}

export const ErrorDisplay = ({ error }: Props) => {
  const title =
    error.status === 404
      ? 'Not found'
      : error.status === 0
      ? 'Network error'
      : `Error ${error.status}`;

  const description =
    error.status === 0
      ? 'Could not reach the server. Check your connection and try again.'
      : error.message;

  return (
    <Alert
      type="error"
      showIcon
      message={title}
      description={
        <span>
          {description}
          {error.endpoint && error.endpoint !== 'unknown' && (
            <span className={styles.endpoint}>
              Endpoint: {error.endpoint}
            </span>
          )}
        </span>
      }
      className={styles.alert}
    />
  );
}
