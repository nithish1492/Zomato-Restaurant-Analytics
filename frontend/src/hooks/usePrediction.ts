import { useCallback, useState } from 'react';
import { predictRestaurantCluster } from '@/services/predictionService';
import { getApiErrorMessage } from '@/services/api';
import type {
  PredictionFormValues,
  PredictionResponse,
  PredictionStatus,
} from '@/types/prediction';

interface UsePredictionReturn {
  status: PredictionStatus;
  result: PredictionResponse | null;
  errorMessage: string | null;
  submit: (values: PredictionFormValues) => Promise<void>;
  reset: () => void;
}

/**
 * Encapsulates the async lifecycle (idle/loading/success/error) of
 * requesting a prediction from the FastAPI backend, so the form
 * component stays purely presentational.
 */
export function usePrediction(): UsePredictionReturn {
  const [status, setStatus] = useState<PredictionStatus>('idle');
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = useCallback(async (values: PredictionFormValues) => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await predictRestaurantCluster(values);
      setResult(response);
      setStatus('success');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setErrorMessage(null);
  }, []);

  return { status, result, errorMessage, submit, reset };
}
