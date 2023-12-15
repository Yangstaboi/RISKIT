import React, { useState } from "react";

interface LoginProps {
    userName: string;
    userMoney: number | '';
    userLoggedIn: Boolean;
    onFormSubmit: (userName: string, userMoney: number) => void;
}

export default function LoginForm({ userName, userMoney, onFormSubmit}: LoginProps) {
    const [name, setName] = useState<string>('');
    const [money, setMoney] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submittedName: string = name;
        const submittedMoney: number = parseFloat(money.toString());

        onFormSubmit(submittedName, submittedMoney);

        setName('');
        setMoney('');
    };

    return (
        <div>
            <h2>Enter Your Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="money">Play Money:</label>
                    <input 
                        type="number"
                        id="money"
                        value={money}
                        onChange={(e) => setMoney(parseFloat(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Enter RISKIT</button>
            </form>
        </div>
    )
}