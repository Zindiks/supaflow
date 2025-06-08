// This file provides API functions to work with workflows
import { Workflow } from "@prisma/client";
import { prisma } from "../db";

// Types
export interface CreateWorkflowInput {
  name: string;
  description?: string;
  userId: string;
  status: string;
  definition: string;
}

// API client for workflows
export const workflowsApi = {
  // Fetch all workflows for a user
  async getWorkflows(userId: string): Promise<Workflow[]> {
    try {
      const workflows = await prisma.workflow.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return workflows;
    } catch (error) {
      console.error("Error fetching workflows:", error);
      throw error;
    }
  },

  // Create a new workflow
  async createWorkflow(workflow: CreateWorkflowInput): Promise<Workflow> {
    try {
      const newWorkflow = await prisma.workflow.create({
        data: {
          name: workflow.name,
          description: workflow.description || "",
          userId: workflow.userId,
          status: workflow.status,
          definition: workflow.definition,
        },
      });

      return newWorkflow;
    } catch (error) {
      console.error("Error creating workflow:", error);
      throw error;
    }
  },

  // Get a workflow by ID
  async getWorkflow(id: string): Promise<Workflow | null> {
    try {
      const workflow = await prisma.workflow.findUnique({
        where: {
          id: id,
        },
      });

      return workflow;
    } catch (error) {
      console.error("Error fetching workflow:", error);
      throw error;
    }
  },
};
