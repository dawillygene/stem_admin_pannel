import { FaUserShield, FaLock, FaUser, FaBuilding } from "react-icons/fa";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const containsHtml = (str) => /<[^>]+>/g.test(str);

const RegisterForm = ({
  name,
  setName,
  username,
  setUsername,
  registerEmail,
  setRegisterEmail,
  department,
  setDepartment,
  registerPassword,
  setRegisterPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  error,
  onSwitchToLogin,
  onSubmit
}) => {
  const handleSafeChange = (setter) => (e) => {
    const value = e.target.value;
    if (containsHtml(value)) return;
    setter(value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}
      
      <InputField
        label="Full Name"
        type="text"
        value={name}
        onChange={handleSafeChange(setName)}
        placeholder="ELIA WILLIAM MARIKI"
        required
        icon={FaUser}
        autoComplete="name"
        id="register-name"
        name="name"
      />

      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={handleSafeChange(setUsername)}
        placeholder="dawillygene"
        required
        icon={FaUserShield}
        autoComplete="username"
        id="register-username"
        name="username"
      />

      <InputField
        label="Email Address"
        type="email"
        value={registerEmail}
        onChange={handleSafeChange(setRegisterEmail)}
        placeholder="admin@udom.ac.tz"
        required
        icon={FaUserShield}
        autoComplete="email"
        id="register-email"
        name="email"
      />

      <InputField
        label="Department"
        type="text"
        value={department}
        onChange={handleSafeChange(setDepartment)}
        placeholder="Computer Science"
        required
        icon={FaBuilding}
        autoComplete="organization-title"
        id="register-department"
        name="department"
      />

      <InputField
        label="Password"
        type="password"
        value={registerPassword}
        onChange={handleSafeChange(setRegisterPassword)}
        placeholder="••••••••"
        required
        icon={FaLock}
        autoComplete="new-password"
        id="register-password"
        name="password"
      />

      <InputField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleSafeChange(setConfirmPassword)}
        placeholder="••••••••"
        required
        icon={FaLock}
        autoComplete="new-password"
        id="register-confirm-password"
        name="confirmPassword"
      />

      <AuthButton isLoading={isLoading}>
        Register
      </AuthButton>

      <div className="text-center mt-4">
        <button 
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-[#0066CC] hover:text-[#0066CC]/80"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;