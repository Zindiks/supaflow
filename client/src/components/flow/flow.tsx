import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Input Node", value: "" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: { label: "Default Node" },
  },
  {
    id: "3",
    position: { x: 500, y: 0 },
    data: { label: "Output Node", value: "" },
    type: "output",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const nodeTypes = {
  input: ({ data, id, setNodes }) => (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5 }}>
      <Handle type="source" position={Position.Right} />
      <form>
        <label>
          {data.label}
          <input
            type="text"
            value={data.value}
            onChange={(e) => {
              setNodes((nds) =>
                nds.map((node) =>
                  node.id === id
                    ? { ...node, data: { ...node.data, value: e.target.value } }
                    : node
                )
              );
            }}
          />
        </label>
      </form>
    </div>
  ),
  output: ({ data }) => (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5 }}>
      <Handle type="target" position={Position.Left} />
      <form>
        <label>
          {data.label}
          <input type="text" value={data.value} readOnly />
        </label>
      </form>
    </div>
  ),
};

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updateOutputNode = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.type === "output"
          ? {
              ...node,
              data: {
                ...node.data,
                value: nds.find((n) => n.type === "input").data.value,
              },
            }
          : node
      )
    );
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(changes) => {
        onNodesChange(changes);
        updateOutputNode();
      }}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
}
