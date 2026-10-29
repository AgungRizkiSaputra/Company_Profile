'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { RfqItem } from '@/types/rfq';
import { Product } from '@/types/product';

interface RfqContextType {
  items: RfqItem[];
  addItem: (product: Product, quantity?: number, unit?: string, customSpecs?: string) => void;
  addCustomItem: (item: {
    productName: string;
    category: string;
    quantity: number;
    unit: string;
    customSpecs?: string;
  }) => void;
  updateItem: (id: string, updates: Partial<RfqItem>) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  itemCount: number;
  lastSubmission: Record<string, unknown> | null;
  setLastSubmission: (data: Record<string, unknown> | null) => void;
}

const RfqContext = createContext<RfqContextType | undefined>(undefined);

const STORAGE_KEY = 'velmora_rfq_items_v1';
const SUBMISSION_KEY = 'velmora_last_submission_v1';

export function RfqProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RfqItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore initial render
    }
    return [];
  });

  const [lastSubmission, setLastSubmissionState] = useState<Record<string, unknown> | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(SUBMISSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore initial render
    }
    return null;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save RFQ items to localStorage:', e);
    }
  }, [items]);

  const setLastSubmission = (data: Record<string, unknown> | null) => {
    setLastSubmissionState(data);
    try {
      if (data) {
        localStorage.setItem(SUBMISSION_KEY, JSON.stringify(data));
      } else {
        localStorage.removeItem(SUBMISSION_KEY);
      }
    } catch (e) {
      console.warn('Failed to sync last submission:', e);
    }
  };

  const addItem = (
    product: Product,
    quantity: number = 1,
    unit?: string,
    customSpecs?: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.slug && !item.isCustomSourcing
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        updated[existingIndex] = {
          ...existing,
          quantity: existing.quantity + quantity,
          customSpecs: customSpecs ? `${existing.customSpecs || ''} ${customSpecs}`.trim() : existing.customSpecs,
        };
        return updated;
      }

      const newItem: RfqItem = {
        id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        productId: product.slug,
        productName: product.name_en,
        category: product.category,
        quantity: Math.max(1, quantity),
        unit: unit || product.unit_en,
        customSpecs: customSpecs || '',
        isCustomSourcing: false,
      };
      return [...prev, newItem];
    });
  };

  const addCustomItem = (item: {
    productName: string;
    category: string;
    quantity: number;
    unit: string;
    customSpecs?: string;
  }) => {
    const newItem: RfqItem = {
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      productName: item.productName,
      category: item.category || 'Custom Sourcing',
      quantity: Math.max(1, item.quantity),
      unit: item.unit || 'Units',
      customSpecs: item.customSpecs || '',
      isCustomSourcing: true,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<RfqItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearItems = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);

  return (
    <RfqContext.Provider
      value={{
        items,
        addItem,
        addCustomItem,
        updateItem,
        removeItem,
        clearItems,
        itemCount,
        lastSubmission,
        setLastSubmission,
      }}
    >
      {children}
    </RfqContext.Provider>
  );
}

export function useRfq() {
  const context = useContext(RfqContext);
  if (!context) {
    throw new Error('useRfq must be used within an RfqProvider');
  }
  return context;
}
