const settings = {
  theme: "light",
};

export function getSettings() {
  return { ...settings };
}

export function updateSettings(updates) {
  if (updates.theme !== undefined) settings.theme = updates.theme;
  return getSettings();
}
