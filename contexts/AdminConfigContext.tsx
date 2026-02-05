import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SiteConfig, SectionConfig } from '../types';
import { siteConfig as defaultConfig } from '../data/siteConfig';
import { AdminStorage } from '../data/adminStorage';

interface AdminConfigContextType {
  config: SiteConfig;
  updateConfig: (config: SiteConfig) => void;
  updateSection: <T extends SectionConfig>(sectionId: string, updates: Partial<T>) => void;
  updateSectionData: (sectionId: string, dataUpdates: Record<string, unknown>) => void;
  reorderSections: (newOrder: string[]) => void;
  isDirty: boolean;
  save: () => void;
  reset: () => void;
  exportJSON: () => void;
  exportTypeScript: () => void;
  importConfig: (file: File) => Promise<void>;
  getTypeScriptCode: () => string;
}

const AdminConfigContext = createContext<AdminConfigContextType | null>(null);

interface AdminConfigProviderProps {
  children: React.ReactNode;
}

export const AdminConfigProvider: React.FC<AdminConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => AdminStorage.load());
  const [savedConfig, setSavedConfig] = useState<string>(() => JSON.stringify(AdminStorage.load()));

  const isDirty = JSON.stringify(config) !== savedConfig;

  // Auto-save to localStorage on changes
  useEffect(() => {
    AdminStorage.save(config);
  }, [config]);

  const updateConfig = useCallback((newConfig: SiteConfig) => {
    setConfig(newConfig);
  }, []);

  const updateSection = useCallback(<T extends SectionConfig>(
    sectionId: string,
    updates: Partial<T>
  ) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, ...updates } as T
          : section
      ),
    }));
  }, []);

  const updateSectionData = useCallback((
    sectionId: string,
    dataUpdates: Record<string, unknown>
  ) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId && 'data' in section
          ? {
              ...section,
              data: { ...(section as { data: Record<string, unknown> }).data, ...dataUpdates },
            } as SectionConfig
          : section
      ),
    }));
  }, []);

  const reorderSections = useCallback((newOrder: string[]) => {
    setConfig(prev => {
      const sectionMap = new Map(prev.sections.map(s => [s.id, s]));
      const reordered = newOrder
        .map(id => sectionMap.get(id))
        .filter((s): s is SectionConfig => s !== undefined);
      return { ...prev, sections: reordered };
    });
  }, []);

  const save = useCallback(() => {
    AdminStorage.save(config);
    setSavedConfig(JSON.stringify(config));
  }, [config]);

  const reset = useCallback(() => {
    AdminStorage.reset();
    setConfig(defaultConfig);
    setSavedConfig(JSON.stringify(defaultConfig));
  }, []);

  const exportJSON = useCallback(() => {
    AdminStorage.exportJSON(config);
  }, [config]);

  const exportTypeScript = useCallback(() => {
    AdminStorage.exportTypeScript(config);
  }, [config]);

  const importConfig = useCallback(async (file: File) => {
    const imported = await AdminStorage.importJSON(file);
    setConfig(imported);
  }, []);

  const getTypeScriptCode = useCallback(() => {
    return AdminStorage.getTypeScriptCode(config);
  }, [config]);

  return (
    <AdminConfigContext.Provider
      value={{
        config,
        updateConfig,
        updateSection,
        updateSectionData,
        reorderSections,
        isDirty,
        save,
        reset,
        exportJSON,
        exportTypeScript,
        importConfig,
        getTypeScriptCode,
      }}
    >
      {children}
    </AdminConfigContext.Provider>
  );
};

export const useAdminConfig = (): AdminConfigContextType => {
  const context = useContext(AdminConfigContext);
  if (!context) {
    throw new Error('useAdminConfig must be used within an AdminConfigProvider');
  }
  return context;
};

// Hook for reading config in non-admin components
export const useSiteConfig = (): SiteConfig => {
  const context = useContext(AdminConfigContext);
  // If outside provider (e.g., in main site), return loaded config
  if (!context) {
    return AdminStorage.load();
  }
  return context.config;
};
