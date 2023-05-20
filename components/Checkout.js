import React from 'react';
import styles from '@/styles/Checkout.module.css'

function StepItem({ step, index, activeStep }) {
    const isActive = index <= activeStep;
    const isCompleted = index < activeStep;

    return (
        <div
        key={step}
        className={`${styles.stepItem} ${
            isActive ? styles.activeStep : styles.inactiveStep
        }`}
        >
        {isCompleted ? <span>&#10003; </span> : null}
        {step}
        </div>
    );
}

export default function Checkout({ activeStep }) {
  return (
    <div className={styles.wrapper}>
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <StepItem key={step} step={step} index={index} activeStep={activeStep} />
        )
      )}
    </div>
  );
}
