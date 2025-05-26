const mockI18n = {
  language: "en",
  changeLanguage: jest.fn((lng) => Promise.resolve()),
  on: jest.fn(),
  off: jest.fn(),
  init: jest.fn(),
};

const useTranslation = () => {
  const mockT = jest.fn((key: string) => key);

  return {
    t: mockT,
    i18n: {
      changeLanguage: jest.fn(),
    },
    ready: true,
  };
};

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(() => useTranslation()),
  use: mockI18n,
}));

jest.mock("../src/lib/i18n", () => ({
  i18n: mockI18n,
}));

jest.mock("../src/lib/storage");

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  mergeItem: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  flushGetRequests: jest.fn(),
}));
