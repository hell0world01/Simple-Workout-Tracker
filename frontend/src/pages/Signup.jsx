import { useState } from "react";
import useSignup from "../hooks/useSignup";
const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup, error, isLoading } = useSignup();
	console.log(error);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(email, password);
	};
	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Signup here</h3>
			<label htmlFor="email">Email</label>
			<input
				type="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button disabled={isLoading}>Signup</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Signup;
