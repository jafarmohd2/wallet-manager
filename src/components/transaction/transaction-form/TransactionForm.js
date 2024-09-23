import { useState } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ addTransaction, open, onClose }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({ date: '', amount: '' });

  // If Dialog open is false
  if (!open) return null;

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);

    // Validate date format YYYY/MM/DD
    const regex = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
    let errorMessage = '';

    if (!regex.test(value)) {
      errorMessage = 'Date must be in YYYY/MM/DD format.';
    } else {
      const [year, month, day] = value.split('/').map(Number);
      if (!isValidDate(year, month, day)) {
        errorMessage = 'Invalid date. Please check your input.';
      }
    }

    setErrors((prev) => ({
      ...prev,
      date: errorMessage,
    }));
  };

  const isValidDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    const isValid = /^-?\d*$/.test(value); // Check if the value is a valid integer or empty

    setAmount(value);
    setErrors((prev) => ({
      ...prev,
      amount: isValid ? '' : 'Please enter a valid integer.',
    }));
  };

  const handleContentChange = (event) => {
    const value = event.target.value;

    // Update content state
    setContent(value);

    // Update error state based on content validity
    setErrors((prev) => ({
      ...prev,
      content: value ? '' : 'Please enter the Content.',
    }));
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ date: '', amount: '', content: '' });

    // Create an object to hold error messages
    const validationErrors = {};

    // Validate fields
    if (!date) validationErrors.date = 'Please enter the Date.';
    if (!amount) validationErrors.amount = 'Please enter the Amount.';
    if (!content) validationErrors.content = 'Please enter the Content.';

    // If there are errors, update state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Add transaction and reset fields
    addTransaction({ date, amount: parseInt(amount), content });
    setDate('');
    setAmount('');
    setContent('');
    onClose();
  };

  const transactionFormFields = [
    {
      name: 'date',
      label: 'Date',
      type: 'text',
      placeholder: 'YYYY/MM/DD',
      value: date,
      onChange: handleDateChange,
      error: errors.date,
      required: true,
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'text',
      value: amount,
      onChange: handleAmountChange,
      error: errors.amount,
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'text',
      value: content,
      onChange: handleContentChange,
      error: errors.content,
      required: true,
    },
  ];

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h2>Add Transaction</h2>
          <button className="close-button" onClick={onClose}>
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
                  {error && <span style={{ color: 'red' }}>{error}</span>}
                </div>
              )
            )}
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
