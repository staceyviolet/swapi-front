/** Renders SWAPI placeholder values ("unknown", "n/a", "none") as a dimmed dash. */
export const formatValue = (value: string) => {
  return value === 'unknown' || value === 'n/a' || value === 'none' ? (
    <span style={{ opacity: 0.4 }}>—</span>
  ) : (
    value
  );
};
