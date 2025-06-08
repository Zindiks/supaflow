// This file provides API functions to work with workflows
import { Workflow } from "@prisma/client";
import supabase from "../supabaseClient";

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
      // In a real implementation, you would fetch from your backend API
      // For now, we're using a direct call to Supabase
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("userId", userId)
        .order("createdAt", { ascending: false });

      if (error) throw error;
      return data as Workflow[];
    } catch (error) {
      console.error("Error fetching workflows:", error);
      throw error;
    }
  },

  // Create a new workflow
  async createWorkflow(workflow: CreateWorkflowInput): Promise<Workflow> {
    try {
      // In a real implementation, you would post to your backend API
      // For now, we're using a direct call to Supabase
      const { data, error } = await supabase
        .from("workflows")
        .insert([
          {
            name: workflow.name,
            description: workflow.description || "",
            userId: workflow.userId,
            status: workflow.status,
            definition: workflow.definition,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Workflow;
    } catch (error) {
      console.error("Error creating workflow:", error);
      throw error;
    }
  },

  // Get a workflow by ID
  async getWorkflow(id: string): Promise<Workflow | null> {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Record not found
        throw error;
      }

      return data as Workflow;
    } catch (error) {
      console.error("Error fetching workflow:", error);
      throw error;
    }
  },
};
