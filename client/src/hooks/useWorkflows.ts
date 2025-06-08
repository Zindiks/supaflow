import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Workflow } from "@prisma/client";
import { workflowsApi, CreateWorkflowInput } from "../lib/api/workflowsApi";

// Define the workflow query keys
export const workflowKeys = {
  all: ["workflows"] as const,
  lists: () => [...workflowKeys.all, "list"] as const,
  list: (filters: string) => [...workflowKeys.lists(), { filters }] as const,
  details: () => [...workflowKeys.all, "detail"] as const,
  detail: (id: string) => [...workflowKeys.details(), id] as const,
};

// Hook for managing workflows
export function useWorkflows(userId: string | undefined) {
  const queryClient = useQueryClient();

  // Fetch all workflows for a user
  const workflows = useQuery({
    queryKey: workflowKeys.list(userId || ""),
    queryFn: async (): Promise<Workflow[]> => {
      if (!userId) return [];
      return workflowsApi.getWorkflows(userId);
    },
    enabled: !!userId, // Only run if userId is available
  });

  // Create a new workflow
  const createWorkflow = useMutation({
    mutationFn: async (data: CreateWorkflowInput): Promise<Workflow> => {
      return workflowsApi.createWorkflow(data);
    },
    onSuccess: () => {
      // Invalidate and refetch workflows list query
      queryClient.invalidateQueries({ queryKey: workflowKeys.lists() });
    },
  });

  // Get a specific workflow by ID
  const getWorkflow = async (id: string): Promise<Workflow | null> => {
    return workflowsApi.getWorkflow(id);
  };

  return {
    workflows: workflows.data || [],
    isLoading: workflows.isLoading,
    isError: workflows.isError,
    error: workflows.error,
    createWorkflow,
    getWorkflow,
  };
}
