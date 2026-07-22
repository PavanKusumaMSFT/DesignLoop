"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

/* ── Data types ─────────────────────────── */

export interface EmmResource {
  name: string;
  subscription: string;
  resourceGroup: string;
  location: string;
  status: "Enabled" | "Not enabled";
  type: "Virtual machine" | "Arc machine";
}

export interface EmmConfiguration {
  subscription: string;
  addons: string[];
  excludedResourceIds: string[];
  totalResources: number;
  vmCount: number;
  arcCount: number;
  enabledAt: string;
}

export interface EmmState {
  /** True when at least one configuration has been saved */
  isEnabled: boolean;
  /** Configurations created via the enable flow */
  configurations: EmmConfiguration[];
  /** Resources that appear in the populated browse grid */
  resources: EmmResource[];
}

/* ── Context value ──────────────────────── */

interface EmmContextValue extends EmmState {
  /** Save a new configuration from the enable fullblade and populate the browse grid */
  enable: (config: EmmConfiguration) => void;
  /** Remove a single resource row by name */
  removeResource: (name: string) => void;
  /** Remove multiple resource rows by name */
  removeResources: (names: string[]) => void;
  /** Full reset — back to Day 0 */
  reset: () => void;
}

const STORAGE_KEY = "emm-enablement-state";

const defaultState: EmmState = {
  isEnabled: false,
  configurations: [],
  resources: [],
};

const EmmStateContext = createContext<EmmContextValue | null>(null);

/* ── Resource generation ────────────────── */

function generateResources(config: EmmConfiguration): EmmResource[] {
  // Build resources from the allResources list used in emm-enable-fullblade,
  // excluding the ones the user opted out of.
  const allResources = [
    { id: "vm-1", name: "VM-01", type: "Virtual Machine" as const, rg: "RG-01", location: "East US" },
    { id: "vm-2", name: "VM-02", type: "Virtual Machine" as const, rg: "RG-01", location: "East US" },
    { id: "vm-3", name: "VM-03", type: "Virtual Machine" as const, rg: "RG-02", location: "West US" },
    { id: "vm-4", name: "VM-04", type: "Virtual Machine" as const, rg: "RG-02", location: "West US" },
    { id: "vm-5", name: "VM-05", type: "Virtual Machine" as const, rg: "RG-03", location: "East US" },
    { id: "vm-6", name: "VM-06", type: "Virtual Machine" as const, rg: "RG-03", location: "East US" },
    { id: "vm-7", name: "VM-07", type: "Virtual Machine" as const, rg: "RG-04", location: "Central US" },
    { id: "vm-8", name: "VM-08", type: "Virtual Machine" as const, rg: "RG-04", location: "Central US" },
    { id: "vm-9", name: "VM-09", type: "Virtual Machine" as const, rg: "RG-05", location: "East US" },
    { id: "vm-10", name: "VM-10", type: "Virtual Machine" as const, rg: "RG-05", location: "East US" },
    { id: "vm-11", name: "VM-11", type: "Virtual Machine" as const, rg: "RG-06", location: "West US" },
    { id: "vm-12", name: "VM-12", type: "Virtual Machine" as const, rg: "RG-06", location: "West US" },
    { id: "vm-13", name: "VM-13", type: "Virtual Machine" as const, rg: "RG-07", location: "Central US" },
    { id: "vm-14", name: "VM-14", type: "Virtual Machine" as const, rg: "RG-07", location: "Central US" },
    { id: "vm-15", name: "VM-15", type: "Virtual Machine" as const, rg: "RG-08", location: "East US" },
    { id: "vm-16", name: "ArcMachine-01", type: "Arc machine" as const, rg: "RG-08", location: "East US" },
    { id: "vm-17", name: "ArcMachine-02", type: "Arc machine" as const, rg: "RG-09", location: "West US" },
    { id: "vm-18", name: "ArcMachine-03", type: "Arc machine" as const, rg: "RG-09", location: "West US" },
    { id: "vm-19", name: "VM-16", type: "Virtual Machine" as const, rg: "RG-10", location: "Central US" },
    { id: "vm-20", name: "VM-17", type: "Virtual Machine" as const, rg: "RG-10", location: "Central US" },
    { id: "vm-21", name: "VM-18", type: "Virtual Machine" as const, rg: "RG-11", location: "East US" },
    { id: "vm-22", name: "VM-19", type: "Virtual Machine" as const, rg: "RG-11", location: "East US" },
    { id: "vm-23", name: "VM-20", type: "Virtual Machine" as const, rg: "RG-12", location: "West US" },
    { id: "vm-24", name: "ArcMachine-04", type: "Arc machine" as const, rg: "RG-12", location: "Central US" },
    { id: "vm-25", name: "VM-21", type: "Virtual Machine" as const, rg: "RG-13", location: "East US" },
    { id: "vm-26", name: "VM-22", type: "Virtual Machine" as const, rg: "RG-13", location: "East US" },
    { id: "vm-27", name: "ArcMachine-05", type: "Arc machine" as const, rg: "RG-14", location: "West US" },
    { id: "vm-28", name: "VM-23", type: "Virtual Machine" as const, rg: "RG-14", location: "West US" },
    { id: "vm-29", name: "VM-24", type: "Virtual Machine" as const, rg: "RG-15", location: "East US" },
    { id: "vm-30", name: "VM-25", type: "Virtual Machine" as const, rg: "RG-15", location: "East US" },
    { id: "vm-31", name: "ArcMachine-06", type: "Arc machine" as const, rg: "RG-16", location: "Central US" },
    { id: "vm-32", name: "VM-26", type: "Virtual Machine" as const, rg: "RG-16", location: "West US" },
    { id: "vm-33", name: "VM-27", type: "Virtual Machine" as const, rg: "RG-17", location: "Central US" },
    { id: "vm-34", name: "VM-28", type: "Virtual Machine" as const, rg: "RG-17", location: "East US" },
    { id: "vm-35", name: "VM-29", type: "Virtual Machine" as const, rg: "RG-18", location: "West US" },
  ];

  const excluded = new Set(config.excludedResourceIds);
  return allResources
    .filter((r) => !excluded.has(r.id))
    .map((r) => ({
      name: r.name,
      subscription: config.subscription,
      resourceGroup: r.rg,
      location: r.location,
      status: "Enabled" as const,
      type: r.type === "Arc machine" ? ("Arc machine" as const) : ("Virtual machine" as const),
    }));
}

/* ── Provider ───────────────────────────── */

export function EmmStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EmmState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as EmmState;
        if (parsed && typeof parsed.isEnabled === "boolean") {
          setState(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every state change (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const enable = useCallback((config: EmmConfiguration) => {
    const newResources = generateResources(config);
    setState((prev) => ({
      isEnabled: true,
      configurations: [...prev.configurations, config],
      resources: [...prev.resources, ...newResources],
    }));
  }, []);

  const removeResource = useCallback((name: string) => {
    setState((prev) => {
      const resources = prev.resources.filter((r) => r.name !== name);
      return {
        ...prev,
        isEnabled: resources.length > 0,
        resources,
      };
    });
  }, []);

  const removeResources = useCallback((names: string[]) => {
    const nameSet = new Set(names);
    setState((prev) => {
      const resources = prev.resources.filter((r) => !nameSet.has(r.name));
      return {
        ...prev,
        isEnabled: resources.length > 0,
        resources,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <EmmStateContext.Provider
      value={{ ...state, enable, removeResource, removeResources, reset }}
    >
      {children}
    </EmmStateContext.Provider>
  );
}

/** Hook to access EMM enablement state. Must be used inside EmmStateProvider. */
export function useEmmState(): EmmContextValue {
  const ctx = useContext(EmmStateContext);
  if (!ctx) throw new Error("useEmmState must be used within EmmStateProvider");
  return ctx;
}
