import React from "react";
import { useWorkflows } from "@/hooks/useWorkflows";
import { useAuth } from "@/hooks/useAuth";
import { WorkflowCard } from "@/components/workflow/workflow-card";
import { CreateWorkflowDialog } from "@/components/workflow/create-workflow-dialog";

// Form schema for creating a workflow
interface WorkflowFormInput {
  name: string;
  description: string;
}

export default function WorkflowsPage() {
  const { user } = useAuth();

  const userId = user?.id;
  const { workflows, isLoading, createWorkflow } = useWorkflows(userId);
  const [open, setOpen] = React.useState(false);

  const handleCreateWorkflow = async (data: WorkflowFormInput) => {
    if (!userId) return;

    try {
      await createWorkflow.mutateAsync({
        name: data.name,
        description: data.description,
        userId: userId,
        status: "draft", // Default status
        definition: JSON.stringify({ steps: [] }), // Empty workflow definition
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to create workflow:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading workflows...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workflows</h1>

        <div>
          <CreateWorkflowDialog
            open={open}
            onOpenChange={setOpen}
            onSubmit={handleCreateWorkflow}
            isSubmitting={createWorkflow.isPending}
          />
        </div>
      </div>

      {workflows.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No workflows yet. Create your first workflow to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onClick={() => {
                // TODO: Navigate to workflow details page
                console.log("View workflow details", workflow.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
