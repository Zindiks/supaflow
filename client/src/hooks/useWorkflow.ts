import { useQuery } from "@tanstack/react-query";
import { workflowKeys } from "./useWorkflows";
import { workflowsApi } from "../lib/api/workflowsApi";
import { Workflow } from "@prisma/client";

/**
 * Hook for fetching a specific workflow by ID
 */
export function useWorkflow(id: string | undefined) {
  const query = useQuery({
    //
    queryKey: id ? workflowKeys.detail(id) : [],
    queryFn: async (): Promise<Workflow | null> => {
      if (!id) return null;
      return workflowsApi.getWorkflow(id);
    },
    enabled: !!id, // Only run if id is provided
  });

  return {
    workflow: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
