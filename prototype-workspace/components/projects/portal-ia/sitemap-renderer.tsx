/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import type React from "react"
import { Card } from "@fluentui/react-components"

interface SitemapNode {
  id: string
  title: string
  icon?: React.ReactNode
  color?: string
  children?: string[]
  level: number
}

interface SharedNode {
  id: string
  title: string
  level: number
}

interface SitemapRendererProps {
  data: SitemapNode[]
  level2Nodes: SitemapNode[]
  sharedNodes: SharedNode[]
  onNodeClick: (nodeId: string) => void
  pages: any[]
}

export const SitemapRenderer: React.FC<SitemapRendererProps> = ({
  data,
  level2Nodes,
  sharedNodes,
  onNodeClick,
  pages,
}) => {
  const renderNode = (node: SitemapNode, index: number, siblings: SitemapNode[]) => {
    const page = pages.find((p) => p.id === node.id)
    if (!page) return null

    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node thumbnail */}
        <div
          className="cursor-pointer group relative"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onNodeClick(node.id)
          }}
        >
          <Card className="w-32 h-24 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500">
            <div className={`w-full h-full ${page.color} opacity-20 relative`}>
              <div className="absolute inset-0 p-2 flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  <div className="text-slate-900">{page.icon}</div>
                  <span className="text-xs font-medium text-slate-900 truncate">{page.title}</span>
                </div>
                <div className="flex-1 bg-white/80 rounded text-[6px] p-1 space-y-[1px]">
                  <div className="h-[2px] bg-slate-600 rounded w-3/4"></div>
                  <div className="h-[2px] bg-slate-500 rounded w-1/2"></div>
                  <div className="h-[2px] bg-slate-500 rounded w-2/3"></div>
                  <div className="h-[2px] bg-slate-400 rounded w-1/3"></div>
                  <div className="h-[2px] bg-slate-400 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </Card>
          <div className="mt-3 text-center">
            <span className="text-base font-semibold text-slate-900">{node.title}</span>
          </div>
        </div>

        {/* Branching lines if has children */}
        {hasChildren && (
          <div className="relative mt-4">
            <svg width={node.children!.length * 150} height="60" className="mx-auto">
              {/* Vertical line down from parent */}
              <line
                x1={node.children!.length * 75}
                y1="0"
                x2={node.children!.length * 75}
                y2="20"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeDasharray="4,4"
                opacity="0.7"
              />

              {/* Horizontal line across children */}
              {node.children!.length > 1 && (
                <line
                  x1="75"
                  y1="20"
                  x2={node.children!.length * 150 - 75}
                  y2="20"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.7"
                />
              )}

              {/* Vertical lines down to each child */}
              {node.children!.map((_, childIndex) => (
                <line
                  key={childIndex}
                  x1={75 + childIndex * 150}
                  y1="20"
                  x2={75 + childIndex * 150}
                  y2="40"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.7"
                />
              ))}
            </svg>
          </div>
        )}

        {/* Render child references */}
        {hasChildren && (
          <div className="flex space-x-16 mt-4">
            {node.children!.map((childId, childIndex) => {
              const childPage = pages.find((p) => p.id === childId)
              if (!childPage) return null

              return (
                <div key={childId} className="flex flex-col items-center">
                  <div
                    className="cursor-pointer group relative"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onNodeClick(childId)
                    }}
                  >
                    <Card className="w-32 h-24 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500">
                      <div className={`w-full h-full ${childPage.color} opacity-20 relative`}>
                        <div className="absolute inset-0 p-2 flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="text-slate-900">{childPage.icon}</div>
                            <span className="text-xs font-medium text-slate-900 truncate">{childPage.title}</span>
                          </div>
                          <div className="flex-1 bg-white/80 rounded text-[6px] p-1 space-y-[1px]">
                            <div className="h-[2px] bg-slate-600 rounded w-3/4"></div>
                            <div className="h-[2px] bg-slate-500 rounded w-1/2"></div>
                            <div className="h-[2px] bg-slate-500 rounded w-2/3"></div>
                            <div className="h-[2px] bg-slate-400 rounded w-1/3"></div>
                            <div className="h-[2px] bg-slate-400 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <div className="mt-3 text-center">
                      <span className="text-base font-semibold text-slate-900">{childPage.title}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderLevel2Nodes = () => {
    if (level2Nodes.length === 0) return null

    return (
      <div className="mt-8">
        <div className="relative mb-6">
          <svg width="700" height="80" className="mx-auto">
            {/* Individual lines from each level 1 node to its respective level 2 stack */}
            {/* Discover to Service Hubs */}
            <line
              x1="145"
              y1="0"
              x2="145"
              y2="60"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />

            {/* Build to Projects */}
            <line
              x1="350"
              y1="0"
              x2="350"
              y2="60"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />

            {/* Manage to Cost Management */}
            <line
              x1="555"
              y1="0"
              x2="555"
              y2="60"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />
          </svg>
        </div>

        <div className="flex justify-center space-x-20">
          {level2Nodes.map((level2Node, index) => {
            const page = pages.find((p) => p.id === level2Node.id)
            if (!page) return null

            return (
              <div key={level2Node.id} className="flex flex-col items-center">
                <div
                  className="cursor-pointer group relative"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onNodeClick(level2Node.id)
                  }}
                >
                  <div className="relative">
                    {/* Fourth layer (furthest back) */}
                    <Card className="absolute top-6 left-3 ml-[30px] w-32 h-24 overflow-hidden opacity-20 transform rotate-2 shadow-sm">
                      <div className={`w-full h-full ${page.color} opacity-20`}></div>
                    </Card>

                    {/* Third layer */}
                    <Card className="absolute top-4 left-2 ml-[30px] w-32 h-24 overflow-hidden opacity-35 transform rotate-1 shadow-sm">
                      <div className={`w-full h-full ${page.color} opacity-20`}></div>
                    </Card>

                    {/* Second layer */}
                    <Card className="absolute top-2 left-1 ml-[30px] w-32 h-24 overflow-hidden opacity-50 transform -rotate-0.5 shadow-md">
                      <div className={`w-full h-full ${page.color} opacity-20`}></div>
                    </Card>

                    {/* Main thumbnail (front layer) */}
                    <Card className="relative ml-[30px] w-32 h-24 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500 bg-white shadow-lg">
                      <div className={`w-full h-full ${page.color} opacity-20 relative`}>
                        <div className="absolute inset-0 p-2 flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="text-slate-900">{page.icon}</div>
                            <span className="text-xs font-medium text-slate-900 truncate">{page.title}</span>
                          </div>
                          <div className="flex-1 bg-white/80 rounded text-[6px] p-1 space-y-[1px]">
                            <div className="h-[2px] bg-slate-600 rounded w-3/4"></div>
                            <div className="h-[2px] bg-slate-500 rounded w-1/2"></div>
                            <div className="h-[2px] bg-slate-500 rounded w-2/3"></div>
                            <div className="h-[2px] bg-slate-400 rounded w-1/3"></div>
                            <div className="h-[2px] bg-slate-400 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="mt-6 text-center max-w-48">
                    <span className="text-base font-semibold text-slate-900">{level2Node.title}</span>
                    <div className="text-xs text-slate-600 mt-1 leading-tight">
                      {index === 0
                        ? "Example of Discover L2 pages, i.e. Templates, Services, GetStarted pages"
                        : index === 1
                          ? "Example of Build L2 pages i.e. Resource Management, Service Groups, etc."
                          : "Example of Manage L2 pages i.e. AIF dashboard, Ops360 etc."}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderSharedNodes = () => {
    if (sharedNodes.length === 0) return null

    return (
      <div className="mt-8">
        <div className="relative mb-6">
          <svg width="700" height="100" className="mx-auto">
            {/* Left bracket arm */}
            <path
              d="M 175 20 Q 175 40 195 60 L 225 60"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              fill="none"
              opacity="0.7"
            />

            {/* Center bracket arm */}
            <line
              x1="350"
              y1="20"
              x2="350"
              y2="60"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />

            {/* Right bracket arm */}
            <path
              d="M 525 20 Q 525 40 505 60 L 475 60"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              fill="none"
              opacity="0.7"
            />

            {/* Horizontal connecting line */}
            <line
              x1="225"
              y1="60"
              x2="475"
              y2="60"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />

            {/* Vertical lines down to shared nodes */}
            <line
              x1="275"
              y1="60"
              x2="275"
              y2="80"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />
            <line
              x1="350"
              y1="60"
              x2="350"
              y2="80"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />
            <line
              x1="425"
              y1="60"
              x2="425"
              y2="80"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Shared nodes row */}
        <div className="flex justify-center space-x-12">
          {sharedNodes.map((sharedNode) => {
            const page = pages.find((p) => p.id === sharedNode.id)
            if (!page) return null

            return (
              <div key={sharedNode.id} className="flex flex-col items-center">
                <div
                  className="cursor-pointer group relative"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onNodeClick(sharedNode.id)
                  }}
                >
                  <Card className="w-32 h-24 overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500">
                    <div className={`w-full h-full ${page.color} opacity-20 relative`}>
                      <div className="absolute inset-0 p-2 flex flex-col">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="text-slate-900">{page.icon}</div>
                          <span className="text-xs font-medium text-slate-900 truncate">{page.title}</span>
                        </div>
                        <div className="flex-1 bg-white/80 rounded text-[6px] p-1 space-y-[1px]">
                          <div className="h-[2px] bg-slate-600 rounded w-3/4"></div>
                          <div className="h-[2px] bg-slate-500 rounded w-1/2"></div>
                          <div className="h-[2px] bg-slate-500 rounded w-2/3"></div>
                          <div className="h-[2px] bg-slate-400 rounded w-1/3"></div>
                          <div className="h-[2px] bg-slate-400 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <div className="mt-3 text-center">
                    <span className="text-base font-semibold text-slate-900">{sharedNode.title}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      {data.map((rootNode, index) => renderNode(rootNode, index, data))}
      {renderLevel2Nodes()}
      {renderSharedNodes()}
    </div>
  )
}
