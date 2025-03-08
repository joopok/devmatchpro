import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  NodeChange, 
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Button } from '../../Button';

interface WorkflowNode extends Node {
  data: {
    label: string;
    type: string;
    config: Record<string, any>;
    validation?: string[];
  };
}

interface NodeConfigField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  options?: Array<{ value: string; label: string }>;
}

interface WorkflowBuilderProps {
  initialNodes: WorkflowNode[];
  initialEdges: Edge[];
  nodeTypes: Record<string, {
    label: string;
    configFields: NodeConfigField[];
  }>;
  onSave: (nodes: WorkflowNode[], edges: Edge[]) => Promise<void>;
  onValidate: (nodes: WorkflowNode[], edges: Edge[]) => string[];
}

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
  initialNodes,
  initialEdges,
  nodeTypes,
  onSave,
  onValidate,
}) => {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const updateNodeConfig = useCallback((nodeId: string, field: string, value: any) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              config: {
                ...node.data.config,
                [field]: value,
              },
            },
          };
        }
        return node;
      })
    );
  }, []);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as WorkflowNode[]);
    },
    []
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const handleSave = async () => {
    const validationErrors = onValidate(nodes, edges);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSave(nodes, edges);
      setErrors([]);
    } catch (error) {
      setErrors([error instanceof Error ? error.message : '저장 중 오류가 발생했습니다']);
    }
  };

  const renderConfigField = (field: NodeConfigField) => {
    if (!selectedNode) return null;

    const value = selectedNode.data.config[field.name];

    switch (field.type) {
      case 'select':
        return (
          <Select
            key={field.name}
            label={field.label}
            value={value || ''}
            onChange={(newValue) => 
              updateNodeConfig(selectedNode.id, field.name, newValue)
            }
            options={field.options || []}
          />
        );

      case 'checkbox':
        return (
          <input
            key={field.name}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) =>
              updateNodeConfig(selectedNode.id, field.name, e.target.checked)
            }
          />
        );

      default:
        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.type === 'number' ? 'number' : 'text'}
            value={value || ''}
            onChange={(e) =>
              updateNodeConfig(selectedNode.id, field.name, e.target.value)
            }
          />
        );
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onNodeClick={(_, node) => setSelectedNode(node as WorkflowNode)}
        />
      </div>
      {selectedNode && (
        <div style={{ width: 300, padding: 16 }}>
          <h3>{nodeTypes[selectedNode.data.type].label} 설정</h3>
          {nodeTypes[selectedNode.data.type].configFields.map(renderConfigField)}
        </div>
      )}
      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <Button onClick={handleSave}>저장</Button>
    </div>
  );
}; 