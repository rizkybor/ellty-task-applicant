import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './PageSelector.module.css';

export default function Checkbox({ checked, indeterminate = false, onChange }) {
  const ref = useRef();
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className={styles.checkboxWrapper}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseOut={() => setIsActive(false)}
    >
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
      />
      <span
        className={clsx(
          styles.customCheckbox,
          checked && styles.checked,
          indeterminate && styles.indeterminate,
          isHover && styles.hover,
          isActive && styles.active
        )}
      />
    </label>
  );
}