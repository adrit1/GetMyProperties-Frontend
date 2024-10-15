import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './AnimatedInput.module.css';
import { MdDateRange } from "react-icons/md";

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const AnimatedInput = ({ placeholder, value, onChange, type, icon, name, options, multiple, checked, bgc, width }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const controls = useAnimation();

    const handleFocus = () => {
        setIsFocused(true);
        controls.start({ y: -4, x: -18 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            controls.start({ y: 15, x: 7 });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={styles.input}
                    multiple={multiple}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        }
        else if (type === 'checkbox') {
            return (
                <input
                    name={name}
                    type={type}
                    value={checked}
                    checked={checked}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={styles.input}
                />
            );
        }
        else if (type === 'date') {
            return (
                <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date) => onChange({ target: { name, value: date } })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    customInput={<input className={styles.input} />}
                />
            );
        }

        return (
            <input
                type={type === 'password' && !showPassword ? 'password' : 'text'}
                name={name}
                value={type !== 'checkbox' ? value : undefined}
                checked={type === 'checkbox' ? checked : undefined}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={styles.input}
                style={{ backgroundColor: bgc }}
            />
        );
    };

    return (
        <div className={styles.container}
            style={{
                width: width || '500px',
            }}
        >
            <motion.label
                className={styles.placeholder}
                animate={controls}
                initial={{ y: value ? 0 : 15, x: 12 }}
                transition={{ duration: 0.15 }}
                style={{ backgroundColor: bgc }}
            >
                {placeholder}
            </motion.label>
            <div className={styles.inputContainer}>
                {icon && <span className={styles.icon}>{icon}</span>}
                {renderInput()}
                {type === 'password' && (
                    <span
                        className={styles.showPasswordIcon}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )}
                {type === 'date' && (
                    <span
                        className={styles.dateIcon}
                        onClick={handleFocus}
                    >
                        <MdDateRange />
                    </span>
                )}
            </div>
        </div>
    );
};

export default AnimatedInput;
