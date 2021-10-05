import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(
  observable: Observable<T>
): [T | undefined, Error | undefined] {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const subscription = observable.subscribe({
      next: (value) => setValue(value),
      error: (error) => setError(error),
    });

    return () => subscription.unsubscribe();
  }, [observable]);

  return [value, error];
}
