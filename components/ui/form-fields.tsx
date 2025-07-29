import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

interface FormFieldProps {
    label: string;
    id: string;
    required?: boolean;
    helperText?: string;
    error?: string;
}

interface FormInputProps extends FormFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> { }

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, id, required, helperText, error, className = "", ...props }, ref) => {
        return (
            <div>
                <label htmlFor={id} className="form_label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    className={`form_input ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
                {helperText && !error && (
                    <p className="body-text-secondary text-xs mt-1">{helperText}</p>
                )}
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";

interface FormTextareaProps extends FormFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> { }

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ label, id, required, helperText, error, className = "", ...props }, ref) => {
        return (
            <div>
                <label htmlFor={id} className="form_label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                    ref={ref}
                    id={id}
                    name={id}
                    className={`form_textarea ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                />
                {helperText && !error && (
                    <p className="body-text-secondary text-xs mt-1">{helperText}</p>
                )}
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>
        );
    }
);

FormTextarea.displayName = "FormTextarea";

interface FormSelectProps extends FormFieldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
    options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    ({ label, id, required, helperText, error, options, className = "", ...props }, ref) => {
        return (
            <div>
                <label htmlFor={id} className="form_label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                    ref={ref}
                    id={id}
                    name={id}
                    className={`form_input ${error ? 'border-red-500' : ''} ${className}`}
                    {...props}
                >
                    <option value="">Select {label.toLowerCase()}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {helperText && !error && (
                    <p className="body-text-secondary text-xs mt-1">{helperText}</p>
                )}
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                )}
            </div>
        );
    }
);

FormSelect.displayName = "FormSelect";

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null;

    return (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {message}
        </div>
    );
};
