import React, { useState } from "react";
import { Transaction } from "interfaces";
import "./TransactionForm.css";

interface ErrorMessages {
  dateError?: string;
  amountError?: string;
  contentError?: string;
}

// Define the props interface
interface TransactionFormProps {
  addTransaction: (transaction: Transaction) => void;
  open: boolean;
  onClose: () => void;
}

const TransactionForm = (props: TransactionFormProps) => {
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<ErrorMessages>();
  // If Dialog open is false
  if (!props.open) return null;

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDate(value);

    // Validate date format YYYY/MM/DD
    const regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
    let errorMessage = "";

    if (!regex.test(value)) {
      errorMessage = "Date must be in YYYY/MM/DD format.";
    } else {
      const [year, month, day] = value.split("/").map(Number);
      if (!isValidDate(year, month, day)) {
        errorMessage = "Invalid date. Please check your input.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      dateError: errorMessage,
    }));
  };

  const isValidDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = value ? /^-?\d*$/.test(value) : false; // Check if the value is a valid integer or empty
    setAmount(value);
    setErrors((prev) => ({
      ...prev,
      amountError: isValid ? "" : "Please enter a valid integer.",
    }));
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Update content state
    setContent(value);

    // Update error state based on content validity
    setErrors((prev) => ({
      ...prev,
      contentError: value ? "" : "Please enter the Content.",
    }));
  };

  const handleSubmitTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addTransaction({ date, amount: parseInt(amount), content });
    setDate("");
    setAmount("");
    setContent("");
    props.onClose();
  };

  const isDisabled = () => {
    return (
      !!errors?.dateError ||
      !!errors?.amountError ||
      !!errors?.contentError ||
      !date ||
      !amount ||
      !content
    );
  };

  const transactionFormFields = [
    {
      name: "date",
      label: "Date",
      type: "text",
      placeholder: "YYYY/MM/DD",
      value: date,
      onChange: handleDateChange,
      error: errors?.dateError,
      required: true,
    },
    {
      name: "amount",
      label: "Amount",
      type: "text",
      value: amount,
      onChange: handleAmountChange,
      error: errors?.amountError,
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "text",
      value: content,
      onChange: handleContentChange,
      error: errors?.contentError,
      required: true,
    },
  ];

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h2>Add Transaction</h2>
          <button className="close-button" onClick={props.onClose}>
            &times;
          </button>
        </div>
        <div className="dialog-body">
          <form className="transaction-form" onSubmit={handleSubmitTransaction}>
            {transactionFormFields.map(
              ({
                name,
                label,
                type,
                placeholder,
                value,
                onChange,
                error,
                required,
              }) => (
                <div className="form-field" key={name}>
                  <label htmlFor={name}>
                    {label}
                    {required && <span className="required">*</span>}
                  </label>
                  <input
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                  />
                  {error && <span style={{ color: "red" }}>{error}</span>}
                </div>
              ),
            )}
            <button type="submit" disabled={isDisabled()}>
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
