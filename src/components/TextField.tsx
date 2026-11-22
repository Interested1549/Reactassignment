interface TextFieldProps {
  label: string;
  value: string | number;
  type?: string;
  error?: string;
  onChange: (val: string) => void;
  onBlur: () => void;
}

export function TextField({ label, value, type = 'text', error, onChange, onBlur }: TextFieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full border rounded px-3 py-2 text-sm ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
