import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow } from "@prisma/client";

interface WorkflowCardProps {
  workflow: Workflow;
  onClick?: () => void;
}

export function WorkflowCard({ workflow, onClick }: WorkflowCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col h-full">
        <div>
          <h3 className="text-lg font-medium">{workflow.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {workflow.description || "No description"}
          </p>
        </div>
        <div className="mt-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              workflow.status === "active"
                ? "bg-green-100 text-green-800"
                : workflow.status === "draft"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {workflow.status}
          </span>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          Created {new Date(workflow.createdAt).toLocaleDateString()}
        </div>
        <div className="mt-auto pt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClick}>
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
