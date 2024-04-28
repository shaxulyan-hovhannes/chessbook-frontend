function getCssVariable(variableName = "") {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );

  return value.trim();
}

function hexToRgba(hex, alpha) {
  const hexClean = hex.replace("#", "");

  const r = parseInt(hexClean.substring(0, 2), 16);
  const g = parseInt(hexClean.substring(2, 4), 16);
  const b = parseInt(hexClean.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export { getCssVariable, hexToRgba };
