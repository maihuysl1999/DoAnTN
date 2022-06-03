import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReactFlow, { Controls } from "react-flow-renderer";
import CustomNodeFlow from "../../NewDapp/components/custom_react_flow/CustomNodeFlow";
import FloatingEdge from "../../NewDapp/components/custom_react_flow/FloatingEdge";
import FloatingConnectionLine from "../../NewDapp/components/custom_react_flow/FloatingConnectionLine";

export default function Step3Diagram() {
    const dispatch = useDispatch();
    const step2Entities = useSelector((state) => state.Dapp.step2Entities);
    const step2Relationships = useSelector((state) => state.Dapp.step2Relationships);

    const nodeTypes = {
        customNode: CustomNodeFlow,
    };

    const edgeTypes = {
        customEdge: FloatingEdge,
    };

    const onLoad = useCallback((instance) => {
        instance.fitView();
    }, []);
    return (
        <div>
            <ReactFlow
                minZoom={0.5}
                maxZoom={2}
                style={{ width: "100%", height: "40rem", zIndex: "0" }}
                elements={[...step2Entities, ...step2Relationships]}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onlyRenderVisibleElements={false}
                onLoad={onLoad}
                snapToGrid={true}
                snapGrid={[15, 15]}
                key="diagram_step3"
                nodesDraggable={false}
                nodesConnectable={false}
                connectionLineComponent={FloatingConnectionLine}
            >
                <Controls />
                {/* <Background variant="dots" color="#f1f6f8" /> */}
            </ReactFlow>
        </div>
    );
}
