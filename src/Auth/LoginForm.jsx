import { FaUserShield, FaLock } from "react-icons/fa";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  isLoading,
  error,
  onSwitchToRegister,
  onSubmit
}) => {
  const containsScript = (str) => /<\s*script/gi.test(str);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (containsScript(value)) return;
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (containsScript(value)) return;
    setPassword(value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && <ErrorMessage message={error} />}
      
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="dawillygene"
        required
        icon={FaUserShield}
        autoComplete="username"
        id="login-username"
        name="username"
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="••••••••"
        required
        icon={FaLock}
        autoComplete="current-password"
        id="login-password"
        name="password"
      />

      <AuthButton isLoading={isLoading}>
        Sign In
      </AuthButton>
      
      <div className="text-center mt-4">
        <a href="#" className="text-sm text-[#0066CC] hover:text-[#0066CC]/80 mr-4">
          Forgot your password?
        </a>
        <button 
          type="button"
          onClick={onSwitchToRegister}
          className="text-sm text-[#0066CC] hover:text-[#0066CC]/80"
        >
          Don't have an account? Register
        </button>
      </div>
    </form>
  );
};

export default LoginForm;