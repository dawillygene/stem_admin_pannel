import { motion } from "framer-motion";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  autoComplete,
  id,
  name
}) => {
  const containsScript = (str) => /<\s*script/gi.test(str);

  const handleChange = (e) => {
    const value = e.target.value;
    if (containsScript(value)) {
      return;
    }
    onChange(e);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-3 text-gray-400">
            <Icon />
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          className={`${Icon ? 'pl-10' : 'pl-4'} block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#0066CC] focus:border-[#0066CC] bg-gray-50`}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
};

export default InputField;