/**
 * Implementation of a ngraph modules wrapper for react
 */
import { useEffect } from "react";

import { Graph, Node, Link } from "ngraph.graph";
import renderGraph from "ngraph.pixel";
import createLayout from "ngraph.forcelayout";
import { ForwardsRating } from "@/model/localReputationMetric";

type ViewProps = {
  graph?: Graph;
  container: any;
};

const GREEN = 0x00e676;
const RED = 0xff4136;
const SOURCE = 0xc6ff00;

export type GraphNode = {
  source: boolean;
  forwards_rating: ForwardsRating;
};

function createNodeUI(node: Node<GraphNode>) {
  let color = RED;
  if (node.data) {
    color = SOURCE;
  }
  return {
    color: color,
    size: 10,
  };
}

function createLinkUI(link: Link) {
  return {
    fromColor: 0xbdbdbd,
    toColor: 0xbdbdbd,
  };
}

export default function NGraph({ graph, container }: ViewProps) {
  if (!container || !graph) {
    return <></>;
  }
  useEffect(() => {
    let render = renderGraph(graph, {
      container: container,
      clearAlpha: 0.0,
      is3D: true,
      createLayout: createLayout,
      node: createNodeUI,
      link: createLinkUI,
    });
  });
  return <></>;
}
