import { SiteConfig } from '../types';
import { siteConfig as defaultConfig } from './siteConfig';

const STORAGE_KEY = 'cosmetolog_admin_config';

export class AdminStorage {
  /**
   * Save configuration to localStorage
   */
  static save(config: SiteConfig): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save config to localStorage:', error);
    }
  }

  /**
   * Load configuration from localStorage with fallback to default
   */
  static load(): SiteConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with default config to ensure new fields are available
        return this.mergeWithDefaults(parsed);
      }
    } catch (error) {
      console.error('Failed to load config from localStorage:', error);
    }
    return defaultConfig;
  }

  /**
   * Deep merge stored config with defaults to handle new fields
   */
  private static mergeWithDefaults(stored: Partial<SiteConfig>): SiteConfig {
    return {
      ...defaultConfig,
      ...stored,
      meta: { ...defaultConfig.meta, ...stored.meta },
      theme: {
        ...defaultConfig.theme,
        ...stored.theme,
        colors: { ...defaultConfig.theme.colors, ...stored.theme?.colors },
        fonts: { ...defaultConfig.theme.fonts, ...stored.theme?.fonts },
      },
      contacts: { ...defaultConfig.contacts, ...stored.contacts },
      navigation: stored.navigation || defaultConfig.navigation,
      sections: this.mergeSections(stored.sections || [], defaultConfig.sections),
    };
  }

  /**
   * Merge sections, preserving stored data but ensuring all default sections exist
   */
  private static mergeSections(stored: any[], defaults: any[]): any[] {
    const storedMap = new Map(stored.map(s => [s.id, s]));

    return defaults.map(defaultSection => {
      const storedSection = storedMap.get(defaultSection.id);
      if (storedSection) {
        return {
          ...defaultSection,
          ...storedSection,
          style: { ...defaultSection.style, ...storedSection.style },
          data: storedSection.data !== undefined
            ? { ...(defaultSection.data || {}), ...storedSection.data }
            : defaultSection.data,
        };
      }
      return defaultSection;
    });
  }

  /**
   * Check if there's a stored config
   */
  static hasStoredConfig(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }

  /**
   * Reset to default config
   */
  static reset(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Export config as JSON file
   */
  static exportJSON(config: SiteConfig): void {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `siteConfig_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export config as TypeScript file ready for deployment
   */
  static exportTypeScript(config: SiteConfig): void {
    const jsonStr = JSON.stringify(config, null, 2);
    const tsContent = `import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = ${jsonStr};
`;

    const blob = new Blob([tsContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'siteConfig.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Import config from JSON file
   */
  static async importJSON(file: File): Promise<SiteConfig> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const config = JSON.parse(content);
          // Validate basic structure
          if (!config.meta || !config.sections || !config.contacts) {
            throw new Error('Invalid config structure');
          }
          resolve(this.mergeWithDefaults(config));
        } catch (error) {
          reject(new Error('Failed to parse config file'));
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  /**
   * Get copy-ready TypeScript code string
   */
  static getTypeScriptCode(config: SiteConfig): string {
    const jsonStr = JSON.stringify(config, null, 2);
    return `import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = ${jsonStr};
`;
  }
}
